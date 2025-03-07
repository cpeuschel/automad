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

import {
	App,
	Attr,
	Binding,
	Bindings,
	create,
	CSS,
	html,
	listen,
	requestAPI,
} from '../core';
import { Image } from '../types';
import { BaseComponent } from './Base';
import { ModalComponent } from './Modal/Modal';

/**
 * An image picker component.
 *
 * @example
 * <am-image-picker
 *     ${Attr.label}="Shared Files"
 *     ${Attr.binding}="bindingName"
 * ></am-image-picker>
 * <am-image-picker
 *      ${Attr.page}="url"
 *      ${Attr.label}="Page Files"
 *      ${Attr.binding}="bindingName"
 * ></am-image-picker>
 *
 * @extends BaseComponent
 */
class ImagePickerComponent extends BaseComponent {
	/**
	 * The binding that refers to the actual picked value.
	 */
	private binding: Binding = null;

	/**
	 * The array of observed attributes.
	 *
	 * @static
	 */
	static get observedAttributes(): string[] {
		return [Attr.page, Attr.label, Attr.binding];
	}

	/**
	 * The callback function used when an element is created in the DOM.
	 */
	connectedCallback(): void {
		this.binding = Bindings.get(this.elementAttributes[Attr.binding]);
		this.init();
	}

	/**
	 * Request the file list and initialze the picker.
	 *
	 * @async
	 */
	private async init(): Promise<void> {
		this.classList.add(CSS.field);

		if (this.elementAttributes[Attr.label]) {
			create('label', [CSS.fieldLabel], {}, this).textContent =
				this.elementAttributes[Attr.label];
		}

		const wrapper = create(
			'div',
			[],
			{},
			this,
			'<am-spinner></am-spinner>'
		);

		const { data } = await requestAPI('ImageCollection/list', {
			url: this.elementAttributes[Attr.page] || '',
		});

		wrapper.innerHTML = '';

		const { images } = data;

		if (!images.length) {
			wrapper.innerHTML = html`
				<am-icon-text
					${Attr.icon}="folder-x"
					${Attr.text}="${App.text('noImagesFound')}"
				></am-icon-text>
			`;

			return;
		}

		this.renderGrid(images, wrapper);
	}

	/**
	 * Render the image grid.
	 *
	 * @param images
	 */
	private renderGrid(images: Image[], wrapper: HTMLElement) {
		const grid = create('div', [CSS.imagePicker], {}, wrapper);
		const base = this.elementAttributes[Attr.page] ? '' : '/shared/';
		const modal = (this.closest('am-modal') as ModalComponent) || null;

		images.forEach((image: Image) => {
			const img = create(
				'img',
				[CSS.imagePickerImage],
				{
					src: image.thumbnail,
					value: `${base}${image.name}`,
					[Attr.tooltip]: image.name,
				},
				grid
			);

			listen(img, 'click', () => {
				this.binding.value = img.getAttribute('value');

				if (modal) {
					modal.close();
				}
			});
		});
	}
}

customElements.define('am-image-picker', ImagePickerComponent);
