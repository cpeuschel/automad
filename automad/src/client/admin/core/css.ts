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

/**
 * The enum with all classes used for HTML elements that are used by components.
 */
export const enum CSS {
	active = 'am-active',
	focus = 'am-focus',

	alert = 'am-c-alert',
	alertIcon = 'am-c-alert__icon',
	alertText = 'am-c-alert__text',

	badge = 'am-e-badge',
	badgeMuted = 'am-e-badge--muted',

	breadcrumbs = 'am-c-breadcrumbs',
	breadcrumbsItem = 'am-c-breadcrumbs__item',

	button = 'am-e-button',
	buttonAccent = 'am-e-button--accent',
	buttonPrimary = 'am-e-button--primary',
	buttonIcon = 'am-e-button--icon',

	card = 'am-c-card',
	cardHover = 'am-c-card--hover',
	cardActive = 'am-c-card--active',
	cardHeader = 'am-c-card__header',
	cardHeaderDropdown = 'am-c-card__header-dropdown',
	cardTeaser = 'am-c-card__teaser',
	cardTitle = 'am-c-card__title',
	cardBody = 'am-c-card__body',
	cardBodyLarge = 'am-c-card__body--large',
	cardButtons = 'am-c-card__buttons',
	cardIcon = 'am-c-card__icon',
	cardIconNarrow = 'am-c-card__icon--narrow',
	cardState = 'am-c-card__state',
	cardForm = 'am-c-card__form',
	cardFormButtons = 'am-c-card__form-buttons',
	cardFooter = 'am-c-card__footer',
	cardList = 'am-c-card__list',
	cardListItem = 'am-c-card__list-item',
	cardListItemFaded = 'am-c-card__list-item--faded',

	checkbox = 'am-f-checkbox',

	contents = 'am-e-contents',

	customIconCheckbox = 'am-f-custom-icon-checkbox',

	cursorPointer = 'am-u-cursor-pointer',

	displayNone = 'am-u-display-none',

	dropdown = 'am-c-dropdown',
	dropdownOpen = 'am-c-dropdown--open',
	dropdownRight = 'am-c-dropdown--right',
	dropdownContent = 'am-c-dropdown__content',
	dropdownDivider = 'am-c-dropdown__divider',
	dropdownItems = 'am-c-dropdown__items',
	dropdownItemsStretch = 'am-c-dropdown__items--stretch',
	dropdownItemsAutocomplete = 'am-c-dropdown__items--autocomplete',
	dropdownLink = 'am-c-dropdown__link',

	dropdownArrow = 'am-e-dropdown-arrow',

	feedFieldSelect = 'am-c-feed-field-select',
	feedFieldSelectMuted = 'am-c-feed-field-select--muted',
	feedFieldSelectArrows = 'am-c-feed-field-select__arrows',
	feedFieldSelectItem = 'am-c-feed-field-select__item',
	feedFieldSelectItemGhost = 'am-c-feed-field-select__item--ghost',
	feedFieldSelectItemChosen = 'am-c-feed-field-select__item--chosen',
	feedFieldSelectItemDrag = 'am-c-feed-field-select__item--drag',

	field = 'am-c-field',
	fieldLabel = 'am-c-field__label',

	filter = 'am-c-filter',
	filterInput = 'am-c-filter__input',
	filterKeyCombo = 'am-c-filter__key-combo',

	flex = 'am-u-flex',
	flexAlignCenter = 'am-u-flex--align-center',
	flexColumn = 'am-u-flex--column',
	flexGap = 'am-u-flex--gap',
	flexGapLarge = 'am-u-flex--gap-large',
	flexBetween = 'am-u-flex--between',
	flexItemGrow = 'am-u-flex__item-grow',

	formGroup = 'am-f-group',
	formGroupItem = 'am-f-group__item',

	grid = 'am-l-grid',

	iconText = 'am-c-icon-text',

	imagePicker = 'am-c-image-picker',
	imagePickerImage = 'am-c-image-picker__image',

	imageSelect = 'am-c-image-select',
	imageSelectPreview = 'am-c-image-select__preview',
	imageSelectPreviewError = 'am-c-image-select__preview--error',
	imageSelectCombo = 'am-c-image-select__combo',
	imageSelectMove = 'am-c-image-select__move',

	input = 'am-f-input',
	inputTitle = 'am-f-input--title',
	inputCombo = 'am-f-input-combo',
	inputComboColor = 'am-f-input-combo__color',
	inputComboButton = 'am-f-input-combo__button',

	keyCombo = 'am-e-key-combo',

	layoutCentered = 'am-l-centered',
	layoutCenteredNavbar = 'am-l-centered__navbar',
	layoutCenteredMain = 'am-l-centered__main',
	layoutCenteredContent = 'am-l-centered__content',

	layoutDashboard = 'am-l-dashboard',
	layoutDashboardNavbar = 'am-l-dashboard__navbar',
	layoutDashboardNavbarLeft = 'am-l-dashboard__navbar--left',
	layoutDashboardNavbarRight = 'am-l-dashboard__navbar--right',
	layoutDashboardSidebar = 'am-l-dashboard__sidebar',
	layoutDashboardMain = 'am-l-dashboard__main',
	layoutDashboardSection = 'am-l-dashboard__section',
	layoutDashboardSectionSticky = 'am-l-dashboard__section--sticky',
	layoutDashboardContent = 'am-l-dashboard__content',
	layoutDashboardContentNarrow = 'am-l-dashboard__content--narrow',
	layoutDashboardContentRow = 'am-l-dashboard__content--row',
	layoutDashboardFooter = 'am-l-dashboard__footer',

	mdEditor = 'am-c-md-editor',
	mdEditorFocus = 'am-c-md-editor--focus',

	menu = 'am-c-menu',
	menuItem = 'am-c-menu__item',

	modal = 'am-c-modal',
	modalDialog = 'am-c-modal__dialog',
	modalDialogLarge = 'am-c-modal__dialog--large',
	modalDialogSmall = 'am-c-modal__dialog--small',
	modalDialogFullscreen = 'am-c-modal__dialog--fullscreen',
	modalHeader = 'am-c-modal__header',
	modalClose = 'am-c-modal__close',
	modalBody = 'am-c-modal__body',
	modalCode = 'am-c-modal__code',
	modalFooter = 'am-c-modal__footer',
	modalSpinner = 'am-c-modal__spinner',
	modalSpinnerIcon = 'am-c-modal__spinner-icon',
	modalSpinnerText = 'am-c-modal__spinner-text',

	modalField = 'am-c-modal-field',
	modalFieldHeader = 'am-c-modal-field__header',
	modalFieldToggle = 'am-c-modal-field__toggle',

	modalJumpbarInput = 'am-c-modal__jumpbar-input',
	modalJumpbarItems = 'am-c-modal__jumpbar-items',
	modalJumpbarLink = 'am-c-modal__jumpbar-link',
	modalJumpbarDivider = 'am-c-modal__jumpbar-divider',

	nav = 'am-c-nav',
	navItem = 'am-c-nav__item',
	navItemActive = 'am-c-nav__item--active',
	navLabel = 'am-c-nav__label',
	navLink = 'am-c-nav__link',

	navbar = 'am-c-navbar',
	navbarItem = 'am-c-navbar__item',
	navbarGroup = 'am-c-navbar__group',

	notify = 'am-c-notify',
	notifyNode = 'am-c-notify__node',
	notifyIcon = 'am-c-notify__icon',
	notifyText = 'am-c-notify__text',
	notifyClose = 'am-c-notify__close',

	overflowHidden = 'am-u-overflow-hidden',

	privacyIndicator = 'am-c-privacy-indicator',

	root = 'am-c-root',
	rootLoading = 'am-c-root--loading',

	select = 'am-f-select',
	selectInline = 'am-f-select--inline',

	spinner = 'am-c-spinner',

	switcherSection = 'am-c-switcher-section',
	switcherSectionActive = 'am-c-switcher-section--active',

	textActive = 'am-u-text-active',
	textLink = 'am-u-text-link',
	textMono = 'am-u-text-mono',
	textMuted = 'am-u-text-muted',
	textParagraph = 'am-u-text-paragraph',
	textLimitRows = 'am-u-text-limit-rows',

	toggle = 'am-f-toggle',
	toggleButton = 'am-f-toggle--button',
	toggleLarge = 'am-f-toggle--large',
	toggleSelect = 'am-f-toggle--select',
	toggleOn = 'am-f-toggle--on',
	toggleOff = 'am-f-toggle--off',
	toggleDefaultOn = 'am-f-toggle--default-on',

	upload = 'am-c-upload',
	uploadDropzone = 'am-c-upload__dropzone',
	uploadPreviews = 'am-c-upload__previews',
}
