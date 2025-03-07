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

import {
	App,
	Binding,
	create,
	createImagePickerModal,
	createLinkModal,
	CSS,
	fire,
	FormDataProviders,
	listen,
	query,
	queryAll,
	resolveFileUrl,
	resolvePageUrl,
} from '../../core';
import { BaseFieldComponent } from './BaseField';
import Editor, { LinkMdNode } from '@toast-ui/editor';
import { ToolbarCustomOptions } from '@toast-ui/editor/types/ui';
import { Context, OpenTagToken } from '@toast-ui/editor/types/toastmark';
import { CustomHTMLRenderer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import Prism from 'prismjs';
// @ts-ignore
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

/**
 * Create a custom toolbar button.
 *
 * @param icon
 * @param label
 * @param onClick
 * @returns the toolbar item options
 */
const createCustomButton = (
	icon: string,
	label: string,
	onClick: Function
): ToolbarCustomOptions => {
	const el = create('button', ['toastui-editor-toolbar-icons', icon], {});

	listen(el, 'click', onClick);

	return {
		el,
		name: label,
		tooltip: label,
		onUpdated({ disabled }) {
			disabled
				? el.setAttribute('disabled', '')
				: el.removeAttribute('disabled');
		},
	};
};

/**
 * Use a custom renderer to correctly resolve page and image links.
 *
 * @see {@link docs https://github.com/nhn/tui.editor/blob/master/docs/en/custom-html-renderer.md}
 */
const htmlRenderer: CustomHTMLRenderer = {
	image(node: LinkMdNode, context: Context) {
		const { origin, entering } = context;
		const result = origin() as OpenTagToken;
		if (entering) {
			result.attributes = {
				src: resolveFileUrl(node.destination),
			};
		}
		return result;
	},
	link(node: LinkMdNode, context: Context) {
		const { origin, entering } = context;
		const result = origin() as OpenTagToken;
		if (entering) {
			result.attributes = {
				href: resolvePageUrl(node.destination),
				target: '_blank',
			};
		}
		return result;
	},
};

/**
 * Register translation.
 *
 * @see {@link docs https://github.com/nhn/tui.editor/blob/master/docs/en/i18n.md#use-case-2--some-value-overrides}
 * @see {@link en-US https://github.com/nhn/tui.editor/blob/master/apps/editor/src/i18n/en-us.ts}
 */
const setMdEditorLanguage = (): void => {
	Editor.setLanguage('en-US', {
		Write: App.text('write'),
		Preview: App.text('preview'),
		Headings: App.text('headings'),
		Heading: App.text('heading'),
		Paragraph: App.text('paragraph'),
		Strike: App.text('strikeThrough'),
		Code: App.text('inlineCode'),
		'Insert CodeBlock': App.text('insertCodeBlock'),
		Blockquote: App.text('blockquote'),
		'Unordered list': App.text('unorderedList'),
		'Ordered list': App.text('orderedList'),
		Line: App.text('insertHorizontalLine'),
		'Insert table': App.text('insertTable'),
		Indent: App.text('indent'),
		Outdent: App.text('outdent'),
	});
};

/**
 * A Markdown editor field.
 *
 * @see {@link tui-editor https://github.com/nhn/tui.editor/tree/master/apps/editor}
 * @extends BaseFieldComponent
 */
class MarkdownComponent extends BaseFieldComponent {
	/**
	 * The tag name.
	 *
	 * @static
	 * @readonly
	 */
	static readonly TAG_NAME = 'am-markdown';

	/**
	 * The editor value that serves a input value for the parent form.
	 */
	value: string;

	/**
	 * Create an input field.
	 */
	createInput(): void {
		const { name, id, value, placeholder } = this._data;
		const container = create(
			'div',
			[CSS.mdEditor, CSS.contents],
			{ id },
			this
		);

		this.setAttribute('name', name);
		this.value = value as string;

		const imageBindingName = `image_${id}`;
		const linkBindingName = `link_${id}`;

		const imageSelection = createCustomButton(
			'image',
			App.text('insertImage'),
			() => {
				createImagePickerModal(
					imageBindingName,
					App.text('insertImage')
				);
			}
		);

		const linkSelection = createCustomButton(
			'link',
			App.text('insertLink'),
			() => {
				createLinkModal(linkBindingName, 'insertLink');
			}
		);

		setMdEditorLanguage();

		const editor = new Editor({
			el: container,
			initialValue: value as string,
			usageStatistics: false,
			height: 'auto',
			hideModeSwitch: true,
			initialEditType: 'markdown',
			previewStyle: 'tab',
			placeholder: placeholder as string,
			previewHighlight: true,
			toolbarItems: [
				['heading', 'bold', 'italic', 'strike', 'code', 'quote'],
				['ul', 'ol', 'indent', 'outdent'],
				['table', imageSelection, linkSelection, 'hr', 'codeblock'],
			],
			customHTMLRenderer: htmlRenderer,
			events: {
				change: () => {
					this.value = editor.getMarkdown();
					fire('input', this);
				},
				focus: () => {
					container.classList.add(CSS.mdEditorFocus);
				},
				blur: () => {
					container.classList.remove(CSS.mdEditorFocus);
				},
			},
			plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
		});

		new Binding(imageBindingName, {
			onChange: (value) => {
				if (value) {
					editor.insertText(`\r\n![](${value})`);
				}
			},
		});

		new Binding(linkBindingName, {
			onChange: (value) => {
				if (value) {
					editor.insertText(
						`[${editor.getSelectedText() || value}](${value})`
					);
				}
			},
		});

		const tabs = query('.toastui-editor-tabs', this);
		const verticaToggle = create('div', ['tab-item'], {}, tabs);
		const tabItems = queryAll('div', tabs);

		verticaToggle.textContent = App.text('vertical');

		listen(
			tabs,
			'click',
			(event: Event) => {
				const target = event.target as HTMLElement;
				let activeIndex = 0;

				tabItems.forEach((item, index) => {
					if (item.isSameNode(target)) {
						activeIndex = index;
					}

					item.classList.toggle('active', item.isSameNode(target));
				});

				editor.changePreviewStyle(
					activeIndex === 2 ? 'vertical' : 'tab'
				);

				target.click();
			},
			'div'
		);
	}
}

FormDataProviders.add(MarkdownComponent.TAG_NAME);
customElements.define(MarkdownComponent.TAG_NAME, MarkdownComponent);
