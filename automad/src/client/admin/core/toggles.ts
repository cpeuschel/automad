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

import { Attr, CSS, EventName, listen, queryAll } from '.';

/**
 * Initialize all toggles within a given container and toggle the visibily of their targets accordingly.
 *
 * @param container
 */
export const initCheckboxToggles = (container: HTMLElement) => {
	const checkboxes = queryAll(
		`input[${Attr.toggle}]`,
		container
	) as HTMLInputElement[];

	checkboxes.forEach((checkbox) => {
		const targets = queryAll(checkbox.getAttribute(Attr.toggle));
		const toggleTargets = () => {
			targets.forEach((target) => {
				target.classList.toggle(CSS.displayNone, !checkbox.checked);
			});
		};

		listen(checkbox, `change ${EventName.changeByBinding}`, toggleTargets);
		toggleTargets();
	});
};
