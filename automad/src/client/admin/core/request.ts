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

import { App, create, fire, notifyError, query } from '.';
import { FormComponent } from '../components/Forms/Form';
import { KeyValueMap } from '../types';
import { getLogger } from './logger';

/**
 * The names of field that are submitted along with post requests.
 */
export const enum RequestKey {
	csrf = '__csrf__',
	json = '__json__',
}

/**
 * Get the current CSRF token that is stored in the meta tag.
 *
 * @returns the csrf token stored in the meta tag
 */
export const getCsrfToken = (): string => {
	return (query('meta[name="csrf"]') as HTMLMetaElement).content || '';
};

/**
 * Set a value inside a nested tree data structure by a given path as key,
 * where the path follows the default form notation formatting.
 *
 * @example
 * setValueByPath(obj, 'data[nested][key]', value);
 *
 * This will create the following structure:
 * {
 *   data: {
 *     nested: {
 *       key: value
 *     }
 *   }
 * }
 *
 * Also non-object arrays are transformed as follows:
 * setValueByPath(obj, 'data[nested][]', value1);
 * setValueByPath(obj, 'data[nested][]', value2);
 * {
 *   data: {
 *     nested: {
 *       0: value1,
 *       1: value2
 *     }
 *   }
 * }
 *
 * @param nodes
 * @param path the dot notation path
 * @param value
 */
export const setNodeByPath = (
	nodes: KeyValueMap,
	path: string,
	value: any
): void => {
	const parts = path.split(/(\[[^\[\]]*\])/g).filter((part) => part);
	const keys = parts.map((part) => part.replace(/[\[\]]/g, ''));

	let node = nodes;

	keys.forEach((key, index) => {
		const _key = key || Object.keys(node).length || 0;

		if (keys.length === index + 1) {
			if (typeof value === 'string') {
				if (value.length) {
					node[_key] = value;
				}
			} else {
				node[_key] = value;
			}
		} else {
			node[_key] = node[_key] || {};
			node = node[_key];
		}
	});
};

/**
 * Convert a key/value map where all keys are actually form encoded names into a object structure.
 *
 * @param data
 * @returns the structured data object
 */
const transformToTree = (data: KeyValueMap): KeyValueMap => {
	const tree = {};

	Object.keys(data).forEach((path) => {
		setNodeByPath(tree, path, data[path]);
	});

	return tree;
};

/**
 * Request a given URL and optionally post a stringified object as data.
 * When no data is passed, the request mehod will automatically be `GET`.
 * In case data is passed, it will be send as a stringified object in the '__raw__' field
 * that will be converted back to an array on the backend.
 *
 * @param url
 * @param [data]
 * @returns the Promise
 * @async
 */
export const request = async (
	url: string,
	data: KeyValueMap = null
): Promise<Response> => {
	const init: KeyValueMap = { method: 'GET' };

	if (data !== null) {
		const formData = new FormData();
		const tree = transformToTree(data);

		getLogger().log(url, tree);

		formData.append(RequestKey.csrf, getCsrfToken());
		formData.append(RequestKey.json, JSON.stringify(tree));

		init.method = 'POST';
		init.body = formData;
		init.headers = {};
	}

	return fetch(url, init);
};

/**
 * Send a request to an API endpoint such as `Page/data`.
 * Optionally execute a callback function that takes the response data as argument.
 * This is useful, in case the execution of the callback is critical and
 * has to be within the timespan of a pending request.
 *
 * @see {@link request}
 * @param route
 * @param [dataOrForm]
 * @param [parallel]
 * @param [callback]
 * @returns the Promise
 * @async
 */
export const requestAPI = async (
	route: string,
	dataOrForm: KeyValueMap | FormComponent = null,
	parallel: boolean = true,
	callback: Function = null
): Promise<KeyValueMap> => {
	if (!parallel) {
		while (!PendingRequests.idle) {
			await waitForPendingRequests();
		}
	}

	PendingRequests.add();

	// A form component can be used instead of a KeyValueMap to get the actual form data at the time when
	// the request is send to the server in order to be able to avoid outdated data from when a
	// non-parallel request was queued. Note that  between queuing a request and the actual time of submission,
	// form data can change due to bindings.
	let data = dataOrForm?.formData || dataOrForm;
	let responseData;

	try {
		const response = await request(`${App.baseURL}/api/${route}`, data);
		responseData = await response.json();

		if (typeof callback === 'function') {
			callback.apply(this, [responseData]);
		}
	} catch {
		notifyError(`${App.text('fetchingDataError')} (${route})`);
		responseData = {};
	}

	PendingRequests.remove();

	return responseData;
};

/**
 * Wait for pending requests to be finished.
 *
 * @returns a promise that resolves as soon there is no pending request
 */
export const waitForPendingRequests = async (): Promise<any> => {
	return new Promise((resolve, reject) => {
		const checkPendingRequests = () => {
			if (PendingRequests.idle) {
				resolve(true);

				window.removeEventListener(
					PendingRequests.EVENT_NAME,
					checkPendingRequests
				);
			}
		};

		window.addEventListener(
			PendingRequests.EVENT_NAME,
			checkPendingRequests
		);

		checkPendingRequests();
	});
};

/**
 * A util class that tracks the number of pending requests.
 */
class PendingRequests {
	/**
	 * The event name that is used when the count changes.
	 * Note that this should be kept inside the class and not in the EventName enum,
	 * sicne it is not shared between modules.
	 *
	 * @static
	 * @readonly
	 */
	static readonly EVENT_NAME = 'AutomadPendingRequestsChange';

	/**
	 * The number of currently pending requests.
	 *
	 * @static
	 */
	private static count: number = 0;

	/**
	 * Return true if the number of pending request is 0.
	 *
	 * @static
	 */
	static get idle(): boolean {
		return this.count <= 0;
	}

	/**
	 * Add a request.
	 *
	 * @static
	 */
	static add() {
		if (!query('am-spinner')) {
			create('am-spinner', [], {}, document.body);
		}

		this.count++;
		fire(this.EVENT_NAME);
	}

	/**
	 * Remove a request.
	 *
	 * @static
	 */
	static remove() {
		const spinner = query('am-spinner');

		this.count--;

		if (this.idle && spinner) {
			spinner.remove();
		}

		fire(this.EVENT_NAME);
	}
}
