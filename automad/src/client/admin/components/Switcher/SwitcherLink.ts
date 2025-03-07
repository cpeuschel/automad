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
import { App, Attr, CSS, EventName, listen } from '../../core';
import {
	getActiveSection,
	setActiveSection,
	SwitcherComponent,
} from './Switcher';

/**
 * A switcher link that is part of a switcher menu component.
 *
 * @see {@link SwitcherComponent}
 * @extends BaseComponent
 */
export class SwitcherLinkComponent extends BaseComponent {
	/**
	 * The tag name.
	 *
	 * @static
	 * @readonly
	 */
	static readonly TAG_NAME = 'am-switcher-link';

	/**
	 * The array of observed attributes.
	 *
	 * @static
	 */
	static get observedAttributes(): string[] {
		return [Attr.section];
	}

	/**
	 * The callback function used when an element is created in the DOM.
	 */
	connectedCallback(): void {
		this.listeners.push(
			listen(window, EventName.switcherChange, this.toggle.bind(this))
		);

		this.listeners.push(listen(this, 'click', this.select.bind(this)));
	}

	/**
	 * Toggle the active state of the switcher link.
	 */
	toggle(): void {
		this.classList.toggle(
			CSS.active,
			this.elementAttributes[Attr.section] == getActiveSection()
		);
	}

	/**
	 * Set the active section.
	 */
	select(): void {
		if (App.navigationIsLocked) {
			return;
		}

		setActiveSection(this.elementAttributes[Attr.section]);
	}
}

customElements.define(SwitcherLinkComponent.TAG_NAME, SwitcherLinkComponent);
