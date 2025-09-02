// src/admin-settings.js
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { EditorialControlSettings } from './components/EditorialControlSettings';
import '../../css/settings/admin-settings-page.scss';

domReady(() => {
	const rootEl = document.getElementById('editorial-control-page');
	if (!rootEl) return;

	const root = createRoot(rootEl);
	root.render(<EditorialControlSettings />);
});
