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

import { BaseComponent } from '../Base';
import { Attr, CSS, EventName, listen, query } from '../../core';
import { getActiveSection, SwitcherComponent } from './Switcher';
import { SwitcherLinkComponent } from './SwitcherLink';

/**
 * A label that reflects the active switcher link content.
 *
 * @see {@link SwitcherComponent}
 * @extends BaseComponent
 */

export class SwitcherLabelComponent extends BaseComponent {
	/**
	 * The callback function used when an element is created in the DOM.
	 */
	connectedCallback(): void {
		const dropdown = `.${CSS.dropdownItems}`;
		const menu = `.${CSS.menu}`;
		const getLink = () => {
			return `${SwitcherLinkComponent.TAG_NAME}[${
				Attr.section
			}="${getActiveSection()}"]`;
		};

		this.listeners.push(
			listen(window, EventName.switcherChange, () => {
				// Prefer links in menus and dropdowns before all other links
				// in order to exclude overview cards as links.
				this.innerHTML = (
					query(`${menu} ${getLink()}`) ||
					query(`${dropdown} ${getLink()}`) ||
					query(getLink())
				).innerHTML;
			})
		);
	}
}

customElements.define('am-switcher-label', SwitcherLabelComponent);
