/*
 *                    ....
 *                  .:   '':.
 *                  ::::     ':..
 *                  ::.         ''..
 *       .:'.. ..':.:::'    . :.   '':.
 *      :.   ''     ''     '. ::::.. ..:
 *      ::::.        ..':.. .''':::::  .
 *      :::::::..    '..::::  :. ::::  :
 *      ::'':::::::.    ':::.'':.::::  :
 *      :..   ''::::::....':     ''::  :
 *      :::::.    ':::::   :     .. '' .
 *   .''::::::::... ':::.''   ..''  :.''''.
 *   :..:::'':::::  :::::...:''        :..:
 *   ::::::. '::::  ::::::::  ..::        .
 *   ::::::::.::::  ::::::::  :'':.::   .''
 *   ::: '::::::::.' '':::::  :.' '':  :
 *   :::   :::::::::..' ::::  ::...'   .
 *   :::  .::::::::::   ::::  ::::  .:'
 *    '::'  '':::::::   ::::  : ::  :
 *              '::::   ::::  :''  .:
 *               ::::   ::::    ..''
 *               :::: ..:::: .:''
 *                 ''''  '''''
 *
 *
 * AUTOMAD
 *
 * Copyright (c) 2022-2023 by Marc Anton Dahmen
 * https://marcdahmen.de
 *
 * Licensed under the MIT license.
 */

import { App, Attr, CSS, html, queryAll } from '../../core';
import { File } from '../../types';
import { BaseComponent } from '../Base';
import { FileInfoComponent } from './FileInfo';

/**
 * A file card component.
 *
 * @extends BaseComponent
 */
class FileCardComponent extends BaseComponent {
	/**
	 * Set the file data and render the card.
	 *
	 * @param file
	 */
	set data(file: File) {
		this.render(file);
	}

	/**
	 * The callback function used when an element is created in the DOM.
	 */
	connectedCallback(): void {
		this.classList.add(CSS.card);
	}

	/**
	 * Render the file card.
	 *
	 * @param file
	 */
	private render(file: File): void {
		let dimensions = '';
		let caption = '';

		if (file.width && file.height) {
			dimensions = html`
				<am-icon-text
					${Attr.icon}="aspect-ratio"
					${Attr.text}="${file.width} ✗ ${file.height}"
				></am-icon-text>
			`;
		}

		if (file.caption) {
			caption = html`
				<am-icon-text
					${Attr.icon}="chat-square-text"
					${Attr.text}="$${file.caption}"
				></am-icon-text>
			`;
		}

		this.innerHTML = html`
			${this.renderPreview(file)}
			<am-file-info
				class="${CSS.flexItemGrow} ${CSS.flex} ${CSS.flexColumn} ${CSS.flexGap} ${CSS.cursorPointer}"
			>
				<div
					class="${CSS.cardTitle}"
					${Attr.tooltip}="$${file.basename}"
				>
					$${file.basename}
				</div>
				<div class="${CSS.cardBody}">
					${caption} ${dimensions}
					<am-icon-text
						${Attr.icon}="calendar2-date"
						${Attr.text}="${file.mtime || '-'}"
					></am-icon-text>
					<am-icon-text
						${Attr.icon}="hdd"
						${Attr.text}="${file.size || '-'}"
					></am-icon-text>
				</div>
			</am-file-info>
			<div class="${CSS.cardFooter}">
				${this.renderDropdown(file)}
				<am-checkbox name="delete[$${file.basename}]"></am-checkbox>
			</div>
		`;

		queryAll('am-file-info', this).forEach((edit: FileInfoComponent) => {
			edit.data = file;
		});
	}

	/**
	 * Render the preview for the file.
	 *
	 * @param file
	 * @returns the preview HTML
	 */
	private renderPreview(file: File): string {
		if (file.thumbnail) {
			return html`
				<am-file-robot
					${Attr.file}="${App.baseURL}${file.url}?${Date.now()}"
					class="${CSS.cardTeaser} ${CSS.cursorPointer}"
					${Attr.tooltip}="$${file.basename}"
				>
					<img src="${file.thumbnail}" />
				</am-file-robot>
			`;
		}

		return html`
			<am-file-info
				class="${CSS.cardTeaser} ${CSS.cursorPointer}"
				${Attr.tooltip}="$${file.basename}"
			>
				<i class="bi bi-file-earmark bi-filetype-${file.extension}"></i>
			</am-file-info>
		`;

		return '';
	}

	/**
	 * Render the dropdown.
	 *
	 * @param file
	 * @returns the rendered dropdown
	 */
	private renderDropdown(file: File): string {
		let editImage = '';

		if (file.thumbnail) {
			editImage = html`
				<am-file-robot
					${Attr.file}="${App.baseURL}${file.url}"
					class="${CSS.dropdownLink}"
				>
					<am-icon-text
						${Attr.icon}="pencil"
						${Attr.text}="${App.text('editImage')}"
					></am-icon-text>
				</am-file-robot>
			`;
		}

		return html`
			<am-dropdown>
				<i class="bi bi-three-dots"></i>
				<div class="${CSS.dropdownItems}">
					${editImage}
					<am-file-info class="${CSS.dropdownLink}">
						<am-icon-text
							${Attr.icon}="card-heading"
							${Attr.text}="${App.text('editFileInfo')}"
						></am-icon-text>
					</am-file-info>
					<am-copy class="${CSS.dropdownLink}" value="${file.url}">
						<am-icon-text
							${Attr.icon}="clipboard-plus"
							${Attr.text}="${App.text('copyUrlClipboard')}"
						></am-icon-text>
					</am-copy>
				</div>
			</am-dropdown>
		`;
	}
}

customElements.define('am-file-card', FileCardComponent);
