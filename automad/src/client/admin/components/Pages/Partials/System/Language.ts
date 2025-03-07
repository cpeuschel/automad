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
	CSS,
	EventName,
	html,
	listen,
} from '../../../../core';
import { Listener, SelectComponentOption } from '../../../../types';
import { SelectComponent } from '../../../Select';

/**
 * Create bindings for the form elements in the cache section.
 *
 * @param listeners
 */
const createBindings = (listeners: Listener[]): void => {
	const translation = new Binding('translation', {
		initial: App.system.translation,
	});

	listeners.push(
		listen(window, EventName.appStateChange, () => {
			translation.value = App.system.translation;
		})
	);
};

/**
 * Render the cache section.
 *
 * @param listeners
 * @returns the rendered HTML
 */
export const renderLanguageSection = (listeners: Listener[]): string => {
	const languages: SelectComponentOption[] = [];

	for (const [text, value] of Object.entries(App.languages)) {
		languages.push({ text, value });
	}

	createBindings(listeners);

	return html`
		<am-form
			${Attr.api}="Config/update"
			${Attr.event}="${EventName.appStateRequireUpdate}"
			${Attr.auto}
		>
			<input type="hidden" name="type" value="translation" />
			<div>
				<p>${App.text('systemLanguageInfo')}</p>
				${SelectComponent.create(
					languages,
					'',
					null,
					'translation',
					'',
					'',
					[CSS.selectInline],
					{
						[Attr.bind]: 'translation',
						[Attr.bindTo]: 'value',
					}
				).outerHTML}
			</div>
		</am-form>
	`;
};
