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

import { Attr, create, CSS, EventName, html, listen } from '../../core';
import { SwitcherDropdownData, SwitcherDropdownItem } from '../../types';
import { BaseComponent } from '../Base';
import { getActiveSection, Section } from './Switcher';

/**
 * The system menu switcher wrapper.
 *
 * @extends BaseComponent
 */
class SwitcherDropdownComponent extends BaseComponent {
	/**
	 * Initialze the menu by passing the menu data.
	 */
	set data(data: SwitcherDropdownData) {
		this.init(data);
	}

	/**
	 * The callback function used when an element is created in the DOM.
	 */
	connectedCallback(): void {
		this.classList.add(
			CSS.layoutDashboardSection,
			CSS.layoutDashboardSectionSticky
		);

		const toggle = () => {
			this.classList.toggle(
				CSS.displayNone,
				getActiveSection() == Section.overview
			);
		};

		this.listeners.push(
			listen(window, EventName.switcherChange, toggle.bind(this))
		);

		toggle();
	}

	/**
	 * Init the component.
	 */
	private init(data: SwitcherDropdownData): void {
		const wrapper = create(
			'div',
			[
				CSS.layoutDashboardContent,
				CSS.layoutDashboardContentRow,
				CSS.layoutDashboardContentNarrow,
			],
			{},
			this
		);

		const switcher = create(
			'am-switcher',
			[CSS.formGroup, CSS.flexItemGrow],
			{},
			wrapper
		);

		const overview = create(
			'am-switcher-link',
			[CSS.formGroupItem, CSS.button, CSS.buttonIcon],
			{ [Attr.section]: data.overview.section },
			switcher
		);

		overview.innerHTML = `<i class="bi bi-${data.overview.icon}"></i>`;

		const dropdown = create(
			'am-dropdown',
			[CSS.flexItemGrow, CSS.flex],
			{},
			switcher
		);

		create(
			'am-switcher-label',
			[
				CSS.formGroupItem,
				CSS.flexItemGrow,
				CSS.formGroupItem,
				CSS.select,
			],
			{},
			dropdown
		);

		const items = create(
			'div',
			[CSS.dropdownItems, CSS.dropdownItemsStretch],
			{},
			dropdown
		);

		data.items.forEach((item: SwitcherDropdownItem) => {
			items.innerHTML += html`
				<am-switcher-link
					class="${CSS.dropdownLink}"
					${Attr.section}="${item.section}"
				>
					${item.title}
				</am-switcher-link>
			`;
		});
	}
}

customElements.define('am-switcher-dropdown', SwitcherDropdownComponent);
