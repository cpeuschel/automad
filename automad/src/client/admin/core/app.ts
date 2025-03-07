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

import { RootComponent } from '../components/Root';
import {
	deleteSearchParam,
	EventName,
	fire,
	getSearchParam,
	listen,
	notifySuccess,
	query,
	request,
	requestAPI,
	setSearchParam,
} from '.';
import {
	InputElement,
	KeyValueMap,
	Pages,
	SystemSettings,
	ThemeCollection,
	User,
} from '../types';

/**
 * The static class that provides the app state and root element to be used across the application.
 */
export class App {
	/**
	 * The internal private state.
	 *
	 * @static
	 */
	private static _state: KeyValueMap;

	/**
	 * The internal private root element
	 *
	 * @static
	 */
	private static _root: RootComponent;

	/**
	 * The internal state of the nav.
	 *
	 * @static
	 */
	private static navigationLocks: KeyValueMap = {};

	/**
	 * Internal lock id counter.
	 *
	 * @static
	 */
	private static latestLockId: number = 0;

	/**
	 * The app initialization state.
	 *
	 * @static
	 */
	static isReady = false;

	/**
	 * The array of allowed file types.
	 *
	 * @static
	 */
	static get allowedFileTypes(): string[] {
		return this._state.allowedFileTypes;
	}

	/**
	 * The base URL for the website.
	 *
	 * @static
	 */
	static get baseURL(): string {
		return this._state.base;
	}

	/**
	 * The dashboard URL.
	 *
	 * @static
	 */
	static get dashboardURL(): string {
		return this._state.dashboard;
	}

	/**
	 * The feed URL.
	 *
	 * @static
	 */
	static get feedURL(): string {
		return this._state.feed;
	}

	/**
	 * The languages map.
	 *
	 * @static
	 */
	static get languages(): KeyValueMap {
		return this._state.languages;
	}

	/**
	 * The main theme path.
	 *
	 * @static
	 */
	static get mainTheme(): string {
		return this._state.mainTheme;
	}

	/**
	 * The pages array used to build the nav tree.
	 *
	 * @static
	 */
	static get pages(): Pages {
		return this._state.pages;
	}

	/**
	 * The map of reserved field names.
	 *
	 * @static
	 */
	static get reservedFields(): KeyValueMap {
		return this._state.reservedFields;
	}

	/**
	 * The array of content field names.
	 *
	 * @static
	 */
	static get contentFields(): string[] {
		return this._state.contentFields;
	}

	/**
	 * The name of the site.
	 *
	 * @static
	 */
	static get sitename(): string {
		return this._state.sitename;
	}

	/**
	 * The array of tags that are used across the site.
	 *
	 * @static
	 */
	static get tags(): string[] {
		return this._state.tags;
	}

	/**
	 * The array of installed themes.
	 *
	 * @static
	 */
	static get themes(): ThemeCollection {
		return this._state.themes;
	}

	/**
	 * The system settings.
	 *
	 * @static
	 */
	static get system(): SystemSettings {
		return this._state.system;
	}

	/**
	 * The current user.
	 *
	 * @static
	 */
	static get user(): User {
		return this._state.user;
	}

	/**
	 * The state.
	 *
	 * @static
	 */
	static get state(): KeyValueMap {
		return this._state;
	}

	/**
	 * The root element.
	 *
	 * @static
	 */
	static get root(): RootComponent {
		return this._root;
	}

	/**
	 * True if the nav is blocked.
	 *
	 * @static
	 */
	static get navigationIsLocked() {
		return Object.keys(this.navigationLocks).length > 0;
	}

	/**
	 * The Automad version.
	 *
	 * @static
	 */
	static get version() {
		return this._state.version;
	}

	/**
	 * The bootstrap method that requested the basic state data.
	 *
	 * @static
	 * @async
	 * @param root
	 */
	static async bootstrap(root: RootComponent): Promise<void> {
		this._root = root;

		const api = `${root.elementAttributes.base}/api`;
		const response = await request(`${api}/App/bootstrap`);
		const json = await response.json();

		this._state = json.data;

		listen(
			window,
			EventName.appStateRequireUpdate,
			this.updateState.bind(this)
		);

		setTimeout(async () => {
			const { success } = await requestAPI('App/getLanguagePacks');

			if (success) {
				notifySuccess(success, -1);
			}
		}, 10000);
	}

	/**
	 * Update the state according to a change of view.
	 *
	 * @async
	 * @static
	 */
	static async updateState(): Promise<void> {
		const response = await requestAPI('App/updateState', null, false);

		this._state = Object.assign({}, this._state, response.data);
		fire(EventName.appStateChange);
	}

	/**
	 * Set the nav state to be disabled.
	 *
	 * @static
	 * @return the lock id
	 */
	static addNavigationLock(): number {
		const id = this.latestLockId++;

		this.navigationLocks[id] = true;

		return id;
	}

	/**
	 * Save the current filter and window scroll states to the query string and reload the page.
	 *
	 * @static
	 */
	static reload(): void {
		const filter = query('am-filter input') as InputElement;

		if (filter) {
			setSearchParam('filter', filter.value);
		}

		setSearchParam('scroll', String(window.scrollY));

		window.location.reload();
	}

	/**
	 * Restore filter and scrollposition after reloading the page.
	 *
	 * @static
	 */
	static restoreFilterAndScroll(): void {
		const filter = query('am-filter input') as InputElement;
		const savedFilter = getSearchParam('filter');
		const savedScrollY = getSearchParam('scroll');

		if (savedFilter) {
			if (filter) {
				filter.value = savedFilter;

				fire('input', filter);
			}

			deleteSearchParam('filter');
		}

		if (savedScrollY) {
			window.scrollTo(0, parseInt(savedScrollY));

			deleteSearchParam('scroll');
		}
	}

	/**
	 * Set the nav state to not be disabled.
	 *
	 * @static
	 * @param id
	 */
	static removeNavigationLock(id: number): void {
		delete this.navigationLocks[id];
	}

	/**
	 * Get a text module by key.
	 *
	 * @static
	 * @param key
	 * @returns the requested text module
	 */
	static text(key: string): string {
		return this._state.text[key] || '';
	}

	/**
	 * Check for system updates.
	 */
	static async checkForSystemUpdate(): Promise<void> {
		const response = await requestAPI('System/checkForUpdate');

		if (!response.data) {
			return;
		}

		this._state.systemUpdate = response.data;
		fire(EventName.systemUpdateCheck, window);
	}

	/**
	 * Check for outdated packages.
	 */
	static async checkForOutdatedPackages(): Promise<void> {
		const { data } = await requestAPI('PackageManager/getOutdated');

		this._state.outdatedPackages = data?.outdated?.length || 0;
		fire(EventName.systemUpdateCheck, window);
	}
}
