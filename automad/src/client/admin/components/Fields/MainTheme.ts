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
 * Copyright (c) 2023 by Marc Anton Dahmen
 * https://marcdahmen.de
 *
 * Licensed under the MIT license.
 */

import { App, Attr, create, CSS, html, Route } from '../../core';
import { BaseFieldComponent } from './BaseField';
import { KeyValueMap, SelectComponentOption, Theme } from '../../types';
import { SelectComponent } from '../Select';

/**
 * A theme select field.
 *
 * @extends BaseFieldComponent
 */
export class MainThemeComponent extends BaseFieldComponent {
	/**
	 * Create the actual input field.
	 */
	protected createInput(): void {
		const { name, id, value } = this._data;
		const themes = Object.values(App.themes) as Theme[];
		const selectedTheme = App.themes[value as string] as Theme;
		const options: SelectComponentOption[] = [];

		themes.forEach((theme) => {
			options.push({ text: theme.name, value: theme.path });
		});

		SelectComponent.create(
			options,
			selectedTheme.path,
			this,
			name,
			id,
			'<i class="bi bi-box-seam"></i>'
		);

		const links = create('div', [CSS.flex, CSS.flexColumn], {}, this);

		create(
			'am-icon-text',
			[],
			{
				[Attr.icon]: 'file-earmark-text',
				[Attr.text]: App.text('themeReadme'),
			},
			create(
				'a',
				[],
				{ href: selectedTheme.readme, target: '_blank' },
				links
			)
		);

		create(
			'am-icon-text',
			[],
			{
				[Attr.icon]: 'cloud-download',
				[Attr.text]: App.text('moreThemes'),
			},
			create(
				'am-link',
				[CSS.textLink],
				{ [Attr.target]: Route.packages },
				links
			)
		);
	}
}

customElements.define('am-main-theme', MainThemeComponent);
