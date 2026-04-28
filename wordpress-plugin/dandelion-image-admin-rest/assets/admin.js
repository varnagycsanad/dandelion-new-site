(function () {
	'use strict';

	function createRow(label, value) {
		const row = document.createElement('div');
		row.className = 'dandelion-image-admin-bundle__row';

		const labelElement = document.createElement('span');
		labelElement.className = 'dandelion-image-admin-bundle__label';
		labelElement.textContent = label;

		const valueElement = document.createElement('code');
		valueElement.className = 'dandelion-image-admin-bundle__value';
		valueElement.textContent = value || '-';

		row.append(labelElement, valueElement);
		return row;
	}

	function renderAdminShell() {
		const root = document.getElementById('dandelion-image-admin-root');

		if (!root) {
			return;
		}

		const bridge = window.dandelionImageAdminBridge || {};
		const panel = document.createElement('section');
		panel.className = 'dandelion-image-admin-bundle';

		const eyebrow = document.createElement('p');
		eyebrow.className = 'dandelion-image-admin-bundle__eyebrow';
		eyebrow.textContent = 'WordPress admin bundle';

		const title = document.createElement('h2');
		title.className = 'dandelion-image-admin-bundle__title';
		title.textContent = 'Dandelion Image Admin';

		const status = document.createElement('p');
		status.className = 'dandelion-image-admin-bundle__status';
		status.textContent = bridge.restRoot
			? 'WordPress admin bridge aktiv.'
			: 'WordPress admin bridge nem erheto el.';

		const details = document.createElement('div');
		details.className = 'dandelion-image-admin-bundle__details';
		details.append(
			createRow('REST root', bridge.restRoot || ''),
			createRow('canManage', bridge.canManage ? 'true' : 'false'),
			createRow('Kovetkezo lepes', 'UI modulok bekotese')
		);

		panel.append(eyebrow, title, status, details);
		root.replaceChildren(panel);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderAdminShell);
	} else {
		renderAdminShell();
	}
}());
