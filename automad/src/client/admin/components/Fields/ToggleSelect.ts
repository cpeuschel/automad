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
 * Copyright (c) 2021-2023 by Marc Anton Dahmen
 * https://marcdahmen.de
 *
 * Licensed under the MIT license.
 */

import { App, create, CSS, html, listen, query } from '../../core';
import { BaseFieldComponent } from './BaseField';

/**
 * A checkbox field that can have a default global value.
 *
 * @extends BaseFieldComponent
 */
class ToggleSelectComponent extends BaseFieldComponent {
	/**
	 * Render the input field.
	 */
	createInput(): void {
		const { name, id, value, label, placeholder } = this._data;

		const wrapper = create(
			'div',
			[CSS.toggle, CSS.toggleSelect],
			{},
			this,
			html`
				<label for="${id}">
					<i class="bi"></i>
					<span>${label}</span>
				</label>
				<select name="${name}" id="${id}">
					<option value="">${App.text('useSharedDefault')}</option>
					<option value="0">${App.text('disable')}</option>
					<option value="1">${App.text('enable')}</option>
				</select>
			`
		);

		const toggle = () => {
			wrapper.classList.toggle(CSS.toggleOff, select.value === '0');
			wrapper.classList.toggle(CSS.toggleOn, select.value === '1');
		};

		wrapper.classList.toggle(CSS.toggleDefaultOn, placeholder != '');

		const select = query('select', wrapper) as HTMLSelectElement;
		select.value = (value as string) || '';

		this.listeners.push(listen(select, 'change', toggle.bind(this)));
		toggle();
	}
}

customElements.define('am-toggle-select', ToggleSelectComponent);
