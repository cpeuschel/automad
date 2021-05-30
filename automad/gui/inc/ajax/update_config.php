<?php 
/*
 *	                  ....
 *	                .:   '':.
 *	                ::::     ':..
 *	                ::.         ''..
 *	     .:'.. ..':.:::'    . :.   '':.
 *	    :.   ''     ''     '. ::::.. ..:
 *	    ::::.        ..':.. .''':::::  .
 *	    :::::::..    '..::::  :. ::::  :
 *	    ::'':::::::.    ':::.'':.::::  :
 *	    :..   ''::::::....':     ''::  :
 *	    :::::.    ':::::   :     .. '' .
 *	 .''::::::::... ':::.''   ..''  :.''''.
 *	 :..:::'':::::  :::::...:''        :..:
 *	 ::::::. '::::  ::::::::  ..::        .
 *	 ::::::::.::::  ::::::::  :'':.::   .''
 *	 ::: '::::::::.' '':::::  :.' '':  :
 *	 :::   :::::::::..' ::::  ::...'   .
 *	 :::  .::::::::::   ::::  ::::  .:'
 *	  '::'  '':::::::   ::::  : ::  :
 *	            '::::   ::::  :''  .:
 *	             ::::   ::::    ..''
 *	             :::: ..:::: .:''
 *	               ''''  '''''
 *	
 *
 *	AUTOMAD
 *
 *	Copyright (c) 2014-2021 by Marc Anton Dahmen
 *	https://marcdahmen.de
 *
 *	Licensed under the MIT license.
 *	https://automad.org/license
 */


namespace Automad\GUI;
use Automad\Core\Cache;
use Automad\Core\Config;
use Automad\Core\Debug;
use Automad\Core\Request;
use Automad\GUI\Utils\Text;


defined('AUTOMAD') or die('Direct access not permitted!');


/*
 *	Update or merge config/config.php with requested items.
 */


$output = array();


// Get config from json file, if exsiting.
$config = Config::read();
ksort($config);


if ($type = Request::post('type')) {
	
	// Cache
	if ($type == 'cache') {
		
		$cache = Request::post('cache');
		
		if (isset($cache['enabled'])) {
			$config['AM_CACHE_ENABLED'] = true;
		} else {
			$config['AM_CACHE_ENABLED'] = false;
		}
		
		$config['AM_CACHE_MONITOR_DELAY'] = intval($cache['monitor-delay']);
		$config['AM_CACHE_LIFETIME'] = intval($cache['lifetime']);
		
	}

	// Language
	if ($type == 'language') {

		$language = Request::post('language');
		$config['AM_FILE_GUI_TRANSLATION'] = $language;
		$output['redirect'] = '#3';
		$output['reload'] = true;
		
	}

	// Headless
	if ($type == 'headless') {
		
		if (isset($_POST['headless'])) {
			$config['AM_HEADLESS_ENABLED'] = true;
		} else {
			$config['AM_HEADLESS_ENABLED'] = false;
		}

		// Reload page to update the dashboard.
		$output['reload'] = true;
		
	}

	// Debugging
	if ($type == 'debug') {
		
		if (isset($_POST['debug'])) {
			$config['AM_DEBUG_ENABLED'] = true;
		} else {
			$config['AM_DEBUG_ENABLED'] = false;
		}
		
	}
	
}


if (Config::write($config)) {

	Debug::log($config, 'Updated config file');
	$output['success'] = Text::get('success_config_update');
	Cache::clear();

} else {

	$output['error'] = Text::get('error_permission') . '<br>' . AM_CONFIG;

}


$this->jsonOutput($output);


?>