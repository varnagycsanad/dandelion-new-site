(function () {
	'use strict';

	console.log('DANDELION_IMAGE_ADMIN_V2_JS_VERSION_2026_04_28_02');

	function createTableCell(tagName, text) {
		const cell = document.createElement(tagName);
		cell.textContent = text;
		return cell;
	}

	function createStatus(text, type) {
		const node = document.createElement('p');
		node.className = 'dandelion-image-admin-bundle__status';
		node.textContent = text || '';

		if (type === 'success') {
			node.classList.add('dnd-status-success');
		} else if (type === 'error') {
			node.classList.add('dnd-status-error');
		}

		return node;
	}

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

	function createSelectField(label) {
		const wrapper = document.createElement('label');
		wrapper.className = 'dnd-control';

		const labelElement = document.createElement('span');
		labelElement.className = 'dnd-control__label';
		labelElement.textContent = label;

		const select = document.createElement('select');
		select.className = 'regular-text';

		wrapper.append(labelElement, select);
		return { wrapper: wrapper, select: select };
	}

	function createInputField(label, value, placeholder) {
		const wrapper = document.createElement('label');
		wrapper.className = 'dnd-control';

		const labelElement = document.createElement('span');
		labelElement.className = 'dnd-control__label';
		labelElement.textContent = label;

		const input = document.createElement('input');
		input.type = 'text';
		input.className = 'regular-text';
		input.value = value || '';
		input.placeholder = placeholder || '';

		wrapper.append(labelElement, input);
		return { wrapper: wrapper, input: input };
	}

	function getAdminSettingsStorageKey() {
		return 'dandelion-image-admin-v2-settings';
	}

	function getDefaultAdminSettings() {
		return {
			apartmentGroups: [
				'D1',
				'D2',
				'Fügeház',
				'Zsálya',
				'Szőlőliget',
				'Szépvölgyi',
				'Royal Homes',
				'Vintage'
			],
			otherCategories: [
				'Marketing képek',
				'Környék / táj',
				'Blog képek'
			]
		};
	}

	function normalizeAdminSettingsList(list, fallback) {
		const source = Array.isArray(list) ? list : fallback;
		const seen = {};
		const items = [];

		source.forEach(function (item) {
			const value = String(item || '').trim();
			if (!value || seen[value]) {
				return;
			}
			seen[value] = true;
			items.push(value);
		});

		return items;
	}

	function loadAdminSettings() {
		const defaults = getDefaultAdminSettings();
		if (typeof window === 'undefined' || !window.localStorage) {
			return defaults;
		}

		try {
			const raw = window.localStorage.getItem(getAdminSettingsStorageKey());
			if (!raw) {
				return defaults;
			}

			const parsed = JSON.parse(raw);
			return {
				apartmentGroups: normalizeAdminSettingsList(parsed && parsed.apartmentGroups, defaults.apartmentGroups),
				otherCategories: normalizeAdminSettingsList(parsed && parsed.otherCategories, defaults.otherCategories)
			};
		} catch (error) {
			return defaults;
		}
	}

	function saveAdminSettings(settings) {
		if (typeof window === 'undefined' || !window.localStorage) {
			return false;
		}

		try {
			window.localStorage.setItem(
				getAdminSettingsStorageKey(),
				JSON.stringify({
					apartmentGroups: normalizeAdminSettingsList(settings && settings.apartmentGroups, getDefaultAdminSettings().apartmentGroups),
					otherCategories: normalizeAdminSettingsList(settings && settings.otherCategories, getDefaultAdminSettings().otherCategories)
				})
			);
			return true;
		} catch (error) {
			return false;
		}
	}

	function getUsedImageCategoriesStorageKey() {
		return 'dandelion-image-admin-v2-used-image-categories';
	}

	function loadUsedImageCategories() {
		if (typeof window === 'undefined' || !window.localStorage) {
			return {};
		}

		try {
			const raw = window.localStorage.getItem(getUsedImageCategoriesStorageKey());
			const parsed = raw ? JSON.parse(raw) : {};
			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
				return {};
			}
			return parsed;
		} catch (error) {
			return {};
		}
	}

	function saveUsedImageCategories(state) {
		if (typeof window === 'undefined' || !window.localStorage) {
			return false;
		}

		try {
			window.localStorage.setItem(
				getUsedImageCategoriesStorageKey(),
				JSON.stringify(state.usedImageCategoriesByMediaId || {})
			);
			return true;
		} catch (error) {
			return false;
		}
	}

	function getUsedImagesViewModeStorageKey() {
		return 'dandelion-image-admin-v2-used-images-view-mode';
	}

	function getSeoTopicStorageKey() {
		return 'dandelion-image-admin-v2-seo-topics';
	}

	function loadSeoTopics() {
		if (typeof window === 'undefined' || !window.localStorage) {
			return {};
		}

		try {
			const raw = window.localStorage.getItem(getSeoTopicStorageKey());
			const parsed = raw ? JSON.parse(raw) : {};
			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
				return {};
			}
			return parsed;
		} catch (error) {
			return {};
		}
	}

	function saveSeoTopics(state) {
		if (typeof window === 'undefined' || !window.localStorage) {
			return false;
		}

		try {
			window.localStorage.setItem(getSeoTopicStorageKey(), JSON.stringify(state.seoTopicsByMediaId || {}));
			return true;
		} catch (error) {
			return false;
		}
	}

	function loadUsedImagesViewMode() {
		if (typeof window === 'undefined' || !window.localStorage) {
			return 'list';
		}

		try {
			const raw = String(window.localStorage.getItem(getUsedImagesViewModeStorageKey()) || '').trim().toLowerCase();
			return raw === 'grid' ? 'grid' : 'list';
		} catch (error) {
			return 'list';
		}
	}

	function saveUsedImagesViewMode(viewMode) {
		if (typeof window === 'undefined' || !window.localStorage) {
			return false;
		}

		try {
			window.localStorage.setItem(getUsedImagesViewModeStorageKey(), viewMode === 'grid' ? 'grid' : 'list');
			return true;
		} catch (error) {
			return false;
		}
	}

	function getWebpPreparationStorageKey() {
		return 'dandelion-image-admin-v2-webp-preparation';
	}

	function loadWebpPreparationState() {
		if (typeof window === 'undefined' || !window.localStorage) {
			return {};
		}
		try {
			const raw = window.localStorage.getItem(getWebpPreparationStorageKey());
			const parsed = raw ? JSON.parse(raw) : {};
			return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
		} catch (error) {
			return {};
		}
	}

	function saveWebpPreparationState(state) {
		if (typeof window === 'undefined' || !window.localStorage) {
			return false;
		}
		try {
			window.localStorage.setItem(
				getWebpPreparationStorageKey(),
				JSON.stringify(state.webpPreparationByMediaId || {})
			);
			return true;
		} catch (error) {
			return false;
		}
	}

	function getApartmentCategoryValueByName(state, name) {
		const mapByName = {};
		(state.apartments || []).forEach(function (item) {
			if (!item || !item.name || !item.key) {
				return;
			}
			mapByName[normalizeSuggestionText(item.name)] = String(item.key);
		});

		const normalized = normalizeSuggestionText(name);
		if (mapByName[normalized]) {
			return mapByName[normalized];
		}
		const compact = normalized.replace(/[^a-z0-9]+/g, '');
		if (compact === 'royalhomes') {
			return 'royal_homes';
		}
		return compact || slugifySuggestion(name) || 'category';
	}

	function getOtherCategoryValueByName(name) {
		const normalized = normalizeSuggestionText(name);
		if (normalized.indexOf('marketing') !== -1) {
			return 'marketing';
		}
		if (normalized.indexOf('kornyek') !== -1 || normalized.indexOf('taj') !== -1) {
			return 'landscape';
		}
		if (normalized.indexOf('blog') !== -1) {
			return 'blog';
		}
		return slugifySuggestion(name) || 'category';
	}

	function getCategoryValueFromSettingsItem(state, listKey, name) {
		if (listKey === 'apartmentGroups') {
			return getApartmentCategoryValueByName(state, name);
		}
		return getOtherCategoryValueByName(name);
	}

	function normalizeUiValue(value) {
		return String(value || '').trim().toLowerCase();
	}

	function normalizeCategoryValue(state, value) {
		const normalized = normalizeUiValue(value);
		if (!normalized) {
			return '';
		}

		const apartmentMatch = (state.apartments || []).find(function (item) {
			return normalizeUiValue(item && item.key) === normalized || normalizeUiValue(item && item.name) === normalized;
		});
		if (apartmentMatch && apartmentMatch.key) {
			return normalizeUiValue(apartmentMatch.key);
		}

		const defaults = getDefaultAdminSettings();
		const settings = state.adminSettings || defaults;
		const apartmentNames = normalizeAdminSettingsList(settings.apartmentGroups, defaults.apartmentGroups);
		for (let index = 0; index < apartmentNames.length; index += 1) {
			const apartmentValue = normalizeUiValue(getApartmentCategoryValueByName(state, apartmentNames[index]));
			if (normalized === normalizeUiValue(apartmentNames[index]) || normalized === apartmentValue) {
				return apartmentValue;
			}
		}

		const categoryNames = normalizeAdminSettingsList(settings.otherCategories, defaults.otherCategories);
		for (let index = 0; index < categoryNames.length; index += 1) {
			const categoryValue = normalizeUiValue(getOtherCategoryValueByName(categoryNames[index]));
			if (normalized === normalizeUiValue(categoryNames[index]) || normalized === categoryValue) {
				return categoryValue;
			}
		}

		return normalizeUiValue(getOtherCategoryValueByName(value)) || normalized;
	}

	function persistUsedImageCategories(state) {
		const next = {};
		Object.keys(state.usedImageCategoriesByMediaId || {}).forEach(function (mediaId) {
			const normalizedMediaId = String(mediaId || '');
			const normalizedValue = normalizeCategoryValue(state, state.usedImageCategoriesByMediaId[mediaId]);
			if (!normalizedMediaId || !normalizedValue) {
				return;
			}
			next[normalizedMediaId] = normalizedValue;
		});
		state.usedImageCategoriesByMediaId = next;
		saveUsedImageCategories(state);
		return next;
	}

	function setMediaCategory(state, mediaId, value) {
		const normalizedMediaId = String(mediaId || '');
		const normalizedValue = normalizeCategoryValue(state, value);
		if (!normalizedMediaId) {
			return normalizedValue;
		}
		if (!normalizedValue) {
			if (state.usedImageCategoriesByMediaId) {
				delete state.usedImageCategoriesByMediaId[normalizedMediaId];
			}
			persistUsedImageCategories(state);
			return '';
		}
		state.usedImageCategoriesByMediaId[normalizedMediaId] = normalizedValue;
		persistUsedImageCategories(state);
		return normalizedValue;
	}

	function createLibraryDiagnosticSnapshot(state, values) {
		return {
			selectedMediaIds: (values && values.selectedMediaIds) || [],
			selectedTargetValue: values && values.selectedTargetValue ? values.selectedTargetValue : '',
			selectedTargetLabel: values && values.selectedTargetLabel ? values.selectedTargetLabel : '',
			isBackendApartment: !!(values && values.isBackendApartment),
			branch: values && values.branch ? values.branch : '',
			localStorageBefore: values && values.localStorageBefore ? values.localStorageBefore : '',
			localStorageAfter: values && values.localStorageAfter ? values.localStorageAfter : '',
			stateBefore: values && values.stateBefore ? values.stateBefore : {},
			stateAfter: values && values.stateAfter ? values.stateAfter : {},
			note: values && values.note ? values.note : ''
		};
	}

	function getDisplayLabel(value, state) {
		const normalized = normalizeUiValue(value);
		if (!normalized) {
			return String(value || '');
		}

		const apartmentMatch = (state.apartments || []).find(function (item) {
			return normalizeUiValue(item && item.key) === normalized;
		});
		if (apartmentMatch && apartmentMatch.name) {
			return String(apartmentMatch.name);
		}

		const defaults = getDefaultAdminSettings();
		const settings = state.adminSettings || defaults;
		const apartmentNames = normalizeAdminSettingsList(settings.apartmentGroups, defaults.apartmentGroups);
		for (let index = 0; index < apartmentNames.length; index += 1) {
			if (normalizeUiValue(getApartmentCategoryValueByName(state, apartmentNames[index])) === normalized) {
				return apartmentNames[index];
			}
		}

		const categoryNames = normalizeAdminSettingsList(settings.otherCategories, defaults.otherCategories);
		for (let index = 0; index < categoryNames.length; index += 1) {
			if (normalizeUiValue(getOtherCategoryValueByName(categoryNames[index])) === normalized) {
				return categoryNames[index];
			}
		}

		return String(value || '');
	}

	function resolveApartmentKey(state, value) {
		const normalized = normalizeUiValue(value);
		const match = (state.apartments || []).find(function (item) {
			return normalizeUiValue(item && item.key) === normalized;
		});
		return match && match.key ? String(match.key) : '';
	}

	function getCategoryOptions(state) {
		const defaults = getDefaultAdminSettings();
		const settings = state.adminSettings || defaults;
		const apartmentNames = normalizeAdminSettingsList(settings.apartmentGroups, defaults.apartmentGroups);
		const categoryNames = normalizeAdminSettingsList(settings.otherCategories, defaults.otherCategories);

		const options = [];
		const seen = {};
		apartmentNames.forEach(function (name) {
			const value = normalizeUiValue(getApartmentCategoryValueByName(state, name));
			if (!value || seen[value]) {
				return;
			}
			seen[value] = true;
			options.push({ value: value, label: getDisplayLabel(value, state) });
		});
		categoryNames.forEach(function (name) {
			const value = normalizeUiValue(getOtherCategoryValueByName(name));
			if (!value || seen[value]) {
				return;
			}
			seen[value] = true;
			options.push({ value: value, label: getDisplayLabel(value, state) });
		});
		return options;
	}

	function getLibraryCategoryOptions(state) {
		const defaults = getDefaultAdminSettings();
		const settings = state.adminSettings || defaults;
		const categoryNames = normalizeAdminSettingsList(settings.otherCategories, defaults.otherCategories);
		const options = [];
		const seen = {};
		categoryNames.forEach(function (name) {
			const value = normalizeUiValue(getOtherCategoryValueByName(name));
			if (!value || seen[value]) {
				return;
			}
			seen[value] = true;
			options.push({ value: value, label: getDisplayLabel(value, state) });
		});
		return options;
	}

	function getApartmentGroupOptions(state) {
		const defaults = getDefaultAdminSettings();
		const settings = state.adminSettings || defaults;
		const apartmentNames = normalizeAdminSettingsList(settings.apartmentGroups, defaults.apartmentGroups);
		const options = [];
		const seen = {};
		apartmentNames.forEach(function (name) {
			const value = normalizeUiValue(getApartmentCategoryValueByName(state, name));
			if (!value || seen[value]) {
				return;
			}
			seen[value] = true;
			options.push({ value: value, label: name });
		});
		return options;
	}

	// [CHANGE 2026-04-30] apartment truth source stabilizálás
	async function syncApartmentGroupsWithBackend(state) {
		if (!state.restRoot || state.isSyncingApartmentGroups) {
			return;
		}

		const desiredOptions = getApartmentGroupOptions(state);
		const backendByKey = {};
		let changed = false;

		(state.apartments || []).forEach(function (item) {
			const key = normalizeUiValue(item && item.key ? item.key : '');
			if (key) {
				backendByKey[key] = item;
			}
		});

		state.isSyncingApartmentGroups = true;
		try {
			for (let index = 0; index < desiredOptions.length; index += 1) {
				const option = desiredOptions[index];
				if (!option || !option.value || backendByKey[option.value]) {
					continue;
				}
				await fetchJson(state.restRoot + '/' + state.endpoints.apartments, {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': state.nonce
					},
					body: JSON.stringify({ key: option.value, name: option.label || option.value })
				});
				changed = true;
			}

			if (changed) {
				await loadApartments(state);
			}
		} finally {
			state.isSyncingApartmentGroups = false;
		}
	}

	function getMediaAssignments(state, mediaId) {
		const normalizedMediaId = String(mediaId || '');
		const raw = state.apartmentAssignments[normalizedMediaId];
		const directAssignments = Array.isArray(raw) ? raw.filter(Boolean) : [];
		if (directAssignments.length) {
			return directAssignments;
		}

		const derivedAssignments = [];
		Object.keys(state.apartmentGalleryByApartment || {}).forEach(function (apartmentKey) {
			const items = state.apartmentGalleryByApartment[apartmentKey];
			if (!Array.isArray(items)) {
				return;
			}
			const hasMedia = items.some(function (item) {
				return String(item && item.id || '') === normalizedMediaId;
			});
			if (!hasMedia) {
				return;
			}
			derivedAssignments.push({
				key: apartmentKey,
				name: getDisplayLabel(apartmentKey, state)
			});
		});
		return derivedAssignments;
	}

	function getMediaCategory(state, mediaItem) {
		const key = String(mediaItem && mediaItem.id || '');
		const existing = state.usedImageCategoriesByMediaId && state.usedImageCategoriesByMediaId[key];
		if (typeof existing === 'string' && existing.trim()) {
			return normalizeCategoryValue(state, existing);
		}
		return null;
	}

	function getAssignmentSummary(state, mediaItem) {
		const mediaId = String(mediaItem && mediaItem.id || '');
		const assignments = getMediaAssignments(state, mediaId);
		if (!assignments.length) {
			return 'Nincs társítva';
		}
		return assignments.map(function (entry) {
			return getDisplayLabel(entry.key || '', state);
		}).join(', ');
	}

	function formatPixelSize(width, height) {
		return width && height ? String(width) + 'x' + String(height) + ' px' : 'Nincs kitöltve';
	}

	function formatFileSize(bytes) {
		const size = Number(bytes || 0);
		if (!size) {
			return 'Nincs kitöltve';
		}
		if (size >= 1024 * 1024) {
			return (size / (1024 * 1024)).toFixed(2) + ' MB';
		}
		if (size >= 1024) {
			return Math.round(size / 1024) + ' KB';
		}
		return String(size) + ' B';
	}

	function shortenUrl(value) {
		const text = String(value || '');
		if (!text) {
			return 'Nincs kitöltve';
		}
		return text.length > 72 ? text.slice(0, 69) + '...' : text;
	}

	function createRichRow(label, valueNode) {
		const row = document.createElement('div');
		row.className = 'dandelion-image-admin-bundle__row';

		const labelElement = document.createElement('span');
		labelElement.className = 'dandelion-image-admin-bundle__label';
		labelElement.textContent = label;

		row.append(labelElement, valueNode);
		return row;
	}

	function createCopyableValue(value) {
		const wrap = document.createElement('div');
		wrap.className = 'dnd-copy-row';

		const text = document.createElement('code');
		text.className = 'dandelion-image-admin-bundle__value';
		text.textContent = shortenUrl(value);
		text.title = String(value || '');

		wrap.append(text);

		if (value && typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
			const copyButton = document.createElement('button');
			copyButton.type = 'button';
			copyButton.className = 'button button-small';
			copyButton.textContent = 'Másolás';
			copyButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				navigator.clipboard.writeText(String(value)).catch(function () {
					return null;
				});
			});
			wrap.append(copyButton);
		}

		return wrap;
	}

	function createStatusBadge(label, kind) {
		const badge = createBadge(label, kind);
		badge.classList.add('dnd-summary-badge');
		return badge;
	}

	function createAccordionSection(title, contentNodes) {
		const details = document.createElement('details');
		details.className = 'dnd-modal__accordion';

		const summary = document.createElement('summary');
		summary.className = 'dnd-modal__accordion-summary';
		summary.textContent = title;
		details.append(summary);

		const body = document.createElement('div');
		body.className = 'dnd-modal__accordion-body';
		(contentNodes || []).forEach(function (node) {
			if (node) {
				body.append(node);
			}
		});
		details.append(body);

		return details;
	}

	function createTwoColumnPanel(leftNodes, rightNodes, extraNodes) {
		const panel = document.createElement('div');
		panel.className = 'dnd-modal__panel-grid';

		const leftColumn = document.createElement('div');
		leftColumn.className = 'dnd-modal__panel-column';
		(leftNodes || []).forEach(function (node) {
			if (node) {
				leftColumn.append(node);
			}
		});

		const rightColumn = document.createElement('div');
		rightColumn.className = 'dnd-modal__panel-column';
		(rightNodes || []).forEach(function (node) {
			if (node) {
				rightColumn.append(node);
			}
		});

		panel.append(leftColumn, rightColumn);

		(extraNodes || []).forEach(function (node) {
			if (node) {
				const extraWrap = document.createElement('div');
				extraWrap.className = 'dnd-modal__panel-extra';
				extraWrap.append(node);
				panel.append(extraWrap);
			}
		});

		return panel;
	}

	function createThumb(url, alt, className) {
		if (!url) {
			const empty = document.createElement('div');
			empty.className = 'dnd-empty-thumb';
			empty.textContent = '-';
			return empty;
		}

		const img = document.createElement('img');
		img.src = url;
		img.alt = alt || 'preview';
		img.loading = 'lazy';
		img.className = className || 'dnd-thumb';
		return img;
	}

	function createUrlTableCell(url) {
		const cell = document.createElement('td');

		if (!url) {
			cell.textContent = '-';
			return cell;
		}

		const normalized = String(url);
		cell.textContent = normalized.length > 50 ? normalized.slice(0, 50) + '...' : normalized;
		cell.title = normalized;
		return cell;
	}

	function stripRenderedText(value) {
		return typeof value === 'string' ? value.replace(/<[^>]+>/g, '').trim() : '';
	}

	function getFileStem(fileName) {
		if (typeof fileName !== 'string' || !fileName.trim()) {
			return '';
		}

		return fileName.replace(/\.[^.]+$/, '');
	}

	function getFileNameFromUrl(url) {
		const cleanUrl = typeof url === 'string' ? url.split('?')[0].split('#')[0] : '';
		const parts = cleanUrl.split('/');
		return parts.length ? parts[parts.length - 1] : '';
	}

	function normalizeSuggestionText(value) {
		return String(value || '')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	}

	function slugifySuggestion(value) {
		return normalizeSuggestionText(value)
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function inferRoomLabel(sourceText) {
		const normalized = normalizeSuggestionText(sourceText);
		if (normalized.indexOf('nappali') !== -1) {
			return 'nappali';
		}
		if (normalized.indexOf('haloszoba') !== -1 || normalized.indexOf('halo') !== -1) {
			return 'hálószoba';
		}
		if (normalized.indexOf('konyha') !== -1) {
			return 'konyha';
		}
		if (normalized.indexOf('furdo') !== -1) {
			return 'fürdőszoba';
		}
		if (normalized.indexOf('terasz') !== -1) {
			return 'terasz';
		}
		if (normalized.indexOf('kert') !== -1) {
			return 'kert';
		}
		return 'belső tér';
	}

	function inferLocalityParts(sourceText) {
		const normalized = normalizeSuggestionText(sourceText);
		const locations = [
			{ key: 'kisapati', name: 'Kisapáti', inName: 'Kisapátiban' },
			{ key: 'badacsony', name: 'Badacsony', inName: 'Badacsonyban' },
			{ key: 'koveskal', name: 'Köveskál', inName: 'Köveskálon' },
			{ key: 'szent-gyorgy-hegy', name: 'Szent György-hegy', inName: 'Szent György-hegyen' },
			{ key: 'szent gyorgy hegy', name: 'Szent György-hegy', inName: 'Szent György-hegyen' }
		];

		for (let index = 0; index < locations.length; index += 1) {
			if (normalized.indexOf(locations[index].key) !== -1) {
				return locations[index];
			}
		}

		return {
			name: 'a Balaton-felvidéken',
			inName: 'a Balaton-felvidéken'
		};
	}

	function toSentenceCase(value) {
		const text = String(value || '').trim();
		if (!text) {
			return '';
		}

		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	function inferThemeText(mediaItem) {
		const manualTheme = typeof mediaItem.manualTheme === 'string' ? mediaItem.manualTheme.trim() : '';
		if (manualTheme) {
			return manualTheme;
		}

		const captionTheme = typeof mediaItem.caption === 'string' ? mediaItem.caption.trim() : '';
		if (captionTheme) {
			return captionTheme;
		}

		const titleTheme =
			typeof mediaItem.titleRaw === 'string' && mediaItem.titleRaw.trim()
				? mediaItem.titleRaw.trim()
				: typeof mediaItem.title === 'string'
					? mediaItem.title.trim()
					: '';
		if (titleTheme) {
			return titleTheme;
		}

		const sourceText = [
			mediaItem.fileName || '',
			mediaItem.manualTheme || '',
			mediaItem.caption || '',
			mediaItem.url || ''
		].join(' ');
		const inferredRoom = inferRoomLabel(sourceText);
		if (inferredRoom && inferredRoom !== 'belső tér') {
			return inferredRoom;
		}

		return 'vendégház részlet';
	}

	function getImageTypeOptions() {
		return [
			{ value: 'accommodation', label: 'Lakás kép', badge: 'Lakás kép' },
			{ value: 'landscape', label: 'Környék / táj', badge: 'Táj' },
			{ value: 'marketing', label: 'Marketing kép', badge: 'Marketing' },
			{ value: 'interior', label: 'Enteriőr részlet', badge: 'Enteriőr' }
		];
	}

	function getImageTypeBadgeLabel(imageType) {
		const match = getImageTypeOptions().find(function (option) {
			return option.value === imageType;
		});
		return match ? match.badge : 'Marketing';
	}

	function inferImageType(state, mediaItem) {
		if (mediaItem && typeof mediaItem.imageType === 'string' && mediaItem.imageType.trim()) {
			return mediaItem.imageType.trim();
		}

		const assignments = state.apartmentAssignments[String(mediaItem && mediaItem.id || '')] || [];
		if (assignments.length) {
			return 'accommodation';
		}

		const sourceText = normalizeSuggestionText([
			mediaItem && mediaItem.manualTheme || '',
			mediaItem && mediaItem.caption || '',
			mediaItem && mediaItem.titleRaw || '',
			mediaItem && mediaItem.title || '',
			mediaItem && mediaItem.fileName || '',
			mediaItem && mediaItem.url || ''
		].join(' '));

		if (
			sourceText.indexOf('badacsony') !== -1 ||
			sourceText.indexOf('balaton') !== -1 ||
			sourceText.indexOf('panorama') !== -1 ||
			sourceText.indexOf('kilatas') !== -1 ||
			sourceText.indexOf('hegy') !== -1 ||
			sourceText.indexOf('taj') !== -1 ||
			sourceText.indexOf('kert') !== -1 ||
			sourceText.indexOf('terasz') !== -1
		) {
			return 'landscape';
		}

		if (inferRoomLabel(sourceText) !== 'belső tér') {
			return 'interior';
		}

		if (
			sourceText.indexOf('marketing') !== -1 ||
			sourceText.indexOf('promo') !== -1 ||
			sourceText.indexOf('hangulat') !== -1 ||
			sourceText.indexOf('hero') !== -1
		) {
			return 'marketing';
		}

		return 'marketing';
	}

	function buildSeoSuggestions(state, mediaItem) {
		const assignments = state.apartmentAssignments[mediaItem.id] || [];
		const apartmentName = assignments.length
			? assignments[0].name
			: state.selectedApartmentKey
				? getApartmentName(state, state.selectedApartmentKey)
				: 'Dandelion vendégház';
		const sourceText = [
			mediaItem.fileName || '',
			mediaItem.manualTheme || '',
			mediaItem.caption || '',
			mediaItem.titleRaw || '',
			mediaItem.title || '',
			mediaItem.url || ''
		].join(' ');
		const theme = inferThemeText(mediaItem);
		const locality = inferLocalityParts(sourceText);
		const imageType = inferImageType(state, mediaItem);
		let alt = apartmentName + ' ' + theme + ' ' + locality.inName;
		let title = apartmentName + ' – ' + theme;
		let caption = toSentenceCase(theme) + ' a ' + apartmentName + ' vendégházban.';
		let description = 'A ' + apartmentName + ' ' + theme + '. Hangulatos részlet ' + locality.inName + '.';
		let slugBase = [apartmentName, locality.name, theme].map(slugifySuggestion).filter(Boolean).join('-');
		if (imageType === 'landscape') {
			alt = toSentenceCase(theme) + ' ' + locality.inName;
			title = toSentenceCase(theme);
			caption = toSentenceCase(theme) + ' ' + locality.inName + '.';
			description = 'Táj- és környékrészlet ' + locality.inName + '.';
			slugBase = [locality.name, theme].map(slugifySuggestion).filter(Boolean).join('-');
		} else if (imageType === 'marketing') {
			alt = 'Hangulatos ' + theme + ' a Balaton-felvidéken';
			title = 'Hangulatos ' + theme;
			caption = toSentenceCase(theme) + ' a Balaton-felvidéken.';
			description = 'Hangulati kép a Balaton-felvidékről, amely a vendégház élményét idézi meg.';
			slugBase = ['marketing', theme].map(slugifySuggestion).filter(Boolean).join('-');
		} else if (imageType === 'interior') {
			alt = 'Hangulatos ' + theme + ' a vendégházban';
			title = toSentenceCase(theme) + ' – vendégház';
			caption = toSentenceCase(theme) + ' a vendégházban.';
			description = 'Hangulatos belső részlet a vendégházból.';
			slugBase = ['interior', theme].map(slugifySuggestion).filter(Boolean).join('-');
		}
		return {
			alt: alt,
			title: title,
			caption: caption,
			description: description,
			slug: slugBase || slugifySuggestion(mediaItem.fileName || mediaItem.title || 'dandelion-kep')
		};
	}
	function prepareWebpSuggestion(mediaItem) {
		const fileName = typeof mediaItem.fileName === 'string' ? mediaItem.fileName : '';
		const sourceName = fileName || (typeof mediaItem.url === 'string' ? mediaItem.url.split('/').pop() : '') || 'dandelion-kep.jpg';
		const extensionMatch = sourceName.match(/\.([a-z0-9]+)$/i);
		const extension = extensionMatch ? extensionMatch[1].toLowerCase() : 'ismeretlen';
		const stem = getFileStem(sourceName) || 'dandelion-kep';

		return {
			currentType: extension,
			url: typeof mediaItem.url === 'string' ? mediaItem.url : '',
			suggestedWebpFileName: stem + '.webp',
			status: extension === 'webp' ? 'Előkészítve' : 'Még nincs WebP feldolgozás'
		};
	}

	async function fetchJson(url, options) {
		const response = await fetch(url, options);
		const payload = await response.json().catch(function () {
			return null;
		});

		if (!response.ok) {
			throw new Error(
				(payload && (payload.message || payload.error)) ||
				('HTTP ' + response.status)
			);
		}

		return payload;
	}

	function getMediaPageEndpoint(state, pageNumber) {
		return (
			state.wpRestRoot +
			'/media?media_type=image&per_page=50&page=' +
			encodeURIComponent(String(pageNumber)) +
			'&_fields=id,title,source_url,media_details,alt_text,caption,description,approved'
		);
	}

	function mapFetchedMediaItem(state, item) {
		const url = item && item.source_url ? String(item.source_url) : '';
		const thumb =
			item &&
			item.media_details &&
			item.media_details.sizes &&
			item.media_details.sizes.medium &&
			item.media_details.sizes.medium.source_url
				? String(item.media_details.sizes.medium.source_url)
				: item &&
				  item.media_details &&
				  item.media_details.sizes &&
				  item.media_details.sizes.thumbnail &&
				  item.media_details.sizes.thumbnail.source_url
					? String(item.media_details.sizes.thumbnail.source_url)
					: url;
		const title = item && item.title && item.title.rendered ? stripRenderedText(String(item.title.rendered)) : '';
		const caption =
			item && item.caption && item.caption.rendered
				? stripRenderedText(String(item.caption.rendered))
				: '';
		const description =
			item && item.description && item.description.rendered
				? stripRenderedText(String(item.description.rendered))
				: '';
		const alt = item && typeof item.alt_text === 'string' ? item.alt_text.trim() : '';
		const mediaId = item && item.id ? String(item.id) : '';
		const mediaItem = {
			id: mediaId,
			title: title || (url ? url.split('/').pop() : '-'),
			titleRaw: title,
			fileName: url ? url.split('/').pop() : '-',
			url: url,
			thumb: thumb,
			width:
				item && item.media_details && item.media_details.width
					? Number(item.media_details.width)
					: 0,
			height:
				item && item.media_details && item.media_details.height
					? Number(item.media_details.height)
					: 0,
			fileSize:
				item && item.media_details && item.media_details.filesize
					? Number(item.media_details.filesize)
					: 0,
			alt: alt,
			caption: caption,
			description: description,
			approved: !!(item && item.approved)
		};
		state.mediaDetailsCache[mediaId] = {
			id: mediaId,
			title: title,
			alt: mediaItem.alt,
			caption: mediaItem.caption,
			description: mediaItem.description,
			url: mediaItem.url,
			fileName: mediaItem.fileName || '',
			thumb: mediaItem.thumb || '',
			width: mediaItem.width || 0,
			height: mediaItem.height || 0,
			fileSize: mediaItem.fileSize || 0,
			approved: mediaItem.approved
		};
		return mediaItem;
	}

	function hasActiveLibraryFilters(state) {
		return !!(
			String(state.librarySearch || '').trim() ||
			normalizeUiValue(state.libraryFilterTarget || 'all') !== 'all' ||
			normalizeUiValue(state.libraryFilterCategory || 'all') !== 'all' ||
			state.libraryFilterUnassignedOnly ||
			state.libraryFilterSeoIncompleteOnly ||
			state.libraryFilterWebpMissingOnly
		);
	}

	async function ensureAllLibraryMediaLoaded(state) {
		if (state.libraryAllMediaLoaded && Array.isArray(state.libraryAllMediaItems) && state.libraryAllMediaItems.length) {
			return;
		}

		const allItems = [];
		let totalPages = state.libraryTotalPages || 1;
		for (let page = 1; page <= totalPages; page += 1) {
			const response = await fetch(getMediaPageEndpoint(state, page), {
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'X-WP-Nonce': state.nonce
				}
			});
			const payload = await response.json().catch(function () {
				return null;
			});

			if (!response.ok) {
				throw new Error(
					(payload && (payload.message || payload.error)) ||
					('HTTP ' + response.status)
				);
			}

			totalPages = Number(response.headers.get('X-WP-TotalPages') || String(totalPages || 1)) || 1;
			(Array.isArray(payload) ? payload : []).forEach(function (item) {
				allItems.push(mapFetchedMediaItem(state, item));
			});
		}

		state.libraryAllMediaItems = allItems;
		state.libraryAllMediaLoaded = true;
	}

	async function fetchMediaPage(state) {
		const response = await fetch(getMediaPageEndpoint(state, state.libraryPage), {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'X-WP-Nonce': state.nonce
			}
		});
		const payload = await response.json().catch(function () {
			return null;
		});

		if (!response.ok) {
			throw new Error(
				(payload && (payload.message || payload.error)) ||
				('HTTP ' + response.status)
			);
		}

		state.libraryTotal = Number(response.headers.get('X-WP-Total') || '0');
		state.libraryTotalPages = Number(response.headers.get('X-WP-TotalPages') || '1') || 1;
		state.mediaItems = Array.isArray(payload)
			? payload.map(function (item) {
				return mapFetchedMediaItem(state, item);
			})
			: [];
		state.libraryAllMediaLoaded = false;
		state.libraryAllMediaItems = [];
		state.selectedMediaIds = [];
	}

	async function fetchMediaDetails(state, mediaId) {
		if (!mediaId) {
			return null;
		}

		if (state.mediaDetailsCache[mediaId]) {
			return state.mediaDetailsCache[mediaId];
		}

		const endpoint =
			state.wpRestRoot +
			'/media/' +
			encodeURIComponent(String(mediaId)) +
			'?context=edit&_fields=id,title,source_url,alt_text,caption,description,media_details,approved';
		const payload = await fetchJson(endpoint, {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'X-WP-Nonce': state.nonce
			}
		});

		const details = {
			id: payload && payload.id ? String(payload.id) : String(mediaId),
			title:
				payload && payload.title && payload.title.rendered
					? stripRenderedText(String(payload.title.rendered))
					: '',
			alt:
				payload && typeof payload.alt_text === 'string' && payload.alt_text.trim()
					? payload.alt_text.trim()
					: '',
			caption:
				payload && payload.caption && payload.caption.raw
					? String(payload.caption.raw)
					: payload && payload.caption && payload.caption.rendered
						? stripRenderedText(String(payload.caption.rendered))
						: '',
			description:
				payload && payload.description && payload.description.raw
					? String(payload.description.raw)
					: payload && payload.description && payload.description.rendered
						? stripRenderedText(String(payload.description.rendered))
						: '',
			approved: !!(payload && payload.approved),
			url: payload && payload.source_url ? String(payload.source_url) : '',
			fileName:
				payload && payload.source_url
					? String(payload.source_url).split('/').pop()
					: '',
			width:
				payload && payload.media_details && payload.media_details.width
					? Number(payload.media_details.width)
					: 0,
			height:
				payload && payload.media_details && payload.media_details.height
					? Number(payload.media_details.height)
					: 0,
			fileSize:
				payload && payload.media_details && payload.media_details.filesize
					? Number(payload.media_details.filesize)
					: 0,
			thumb:
				payload &&
				payload.media_details &&
				payload.media_details.sizes &&
				payload.media_details.sizes.medium &&
				payload.media_details.sizes.medium.source_url
					? String(payload.media_details.sizes.medium.source_url)
					: payload && payload.source_url
						? String(payload.source_url)
						: ''
		};

		state.mediaDetailsCache[mediaId] = details;
		return details;
	}

	async function loadUsedCategoryMediaDetails(state) {
		const mediaIds = Object.keys(state.usedImageCategoriesByMediaId || {}).filter(function (mediaId) {
			const normalizedMediaId = String(mediaId || '');
			return normalizedMediaId && !state.mediaDetailsCache[normalizedMediaId];
		});

		for (const mediaId of mediaIds) {
			try {
				await fetchMediaDetails(state, mediaId);
			} catch (error) {
				// Ignore per-item fetch failures so one missing media item does not block the admin.
			}
		}
	}

	async function updateMediaSeo(state, mediaId, values) {
		const endpoint = state.wpRestRoot + '/media/' + encodeURIComponent(String(mediaId));
		const payload = await fetchJson(endpoint, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': state.nonce
			},
			body: JSON.stringify({
				alt_text: values.alt || '',
				title: values.title || '',
				caption: values.caption || '',
				description: values.description || ''
			})
		});

		const updatedTitle =
			payload && payload.title && payload.title.rendered
				? stripRenderedText(String(payload.title.rendered))
				: '';
		const updatedCaption =
			payload && payload.caption && payload.caption.raw
				? String(payload.caption.raw)
				: payload && payload.caption && payload.caption.rendered
					? stripRenderedText(String(payload.caption.rendered))
					: '';
		const updatedDescription =
			payload && payload.description && payload.description.raw
				? String(payload.description.raw)
				: payload && payload.description && payload.description.rendered
					? stripRenderedText(String(payload.description.rendered))
					: '';
		const updatedAlt = payload && typeof payload.alt_text === 'string' ? payload.alt_text.trim() : '';
		const updatedUrl = payload && payload.source_url ? String(payload.source_url) : '';
		const updatedFileName = updatedUrl ? updatedUrl.split('/').pop() : '';
		const previous = state.mediaDetailsCache[String(mediaId)] || {};
		const details = {
			id: payload && payload.id ? String(payload.id) : String(mediaId),
			title: updatedTitle,
			alt: updatedAlt,
			caption: updatedCaption,
			description: updatedDescription,
			url: updatedUrl,
			fileName: updatedFileName,
			thumb: previous.thumb || '',
			width: previous.width || 0,
			height: previous.height || 0,
			fileSize: previous.fileSize || 0,
			approved: typeof previous.approved === 'boolean' ? previous.approved : false
		};

		applyMediaStateUpdate(state, details);
	}

	function applyMediaStateUpdate(state, details) {
		const mediaId = details && details.id ? String(details.id) : '';
		if (!mediaId) {
			return;
		}

		const previous = state.mediaDetailsCache[mediaId] || {};
		const normalizedDetails = {
			id: mediaId,
			title: details.title || '',
			alt: details.alt || '',
			caption: details.caption || '',
			description: details.description || '',
			manualTheme: typeof details.manualTheme === 'string' ? details.manualTheme : getPersistedSeoTopic(state, mediaId) || previous.manualTheme || '',
			url: details.url || '',
			fileName: details.fileName || '',
			thumb: details.thumb || previous.thumb || details.url || '',
			width: details.width || previous.width || 0,
			height: details.height || previous.height || 0,
			fileSize: details.fileSize || previous.fileSize || 0,
			approved: typeof details.approved === 'boolean' ? details.approved : !!previous.approved
		};

		state.mediaDetailsCache[mediaId] = normalizedDetails;
		state.mediaItems = state.mediaItems.map(function (item) {
			if (item.id !== mediaId) {
				return item;
			}
			return Object.assign({}, item, {
				title: normalizedDetails.title || normalizedDetails.fileName || item.fileName || '-',
				titleRaw: normalizedDetails.title || '',
				alt: normalizedDetails.alt,
				caption: normalizedDetails.caption,
				description: normalizedDetails.description,
				manualTheme: normalizedDetails.manualTheme,
				url: normalizedDetails.url || item.url,
				thumb: normalizedDetails.thumb || item.thumb,
				fileName: normalizedDetails.fileName || item.fileName,
				width: normalizedDetails.width || item.width || 0,
				height: normalizedDetails.height || item.height || 0,
				fileSize: normalizedDetails.fileSize || item.fileSize || 0,
				approved: normalizedDetails.approved
			});
		});
		state.galleryItems = state.galleryItems.map(function (item) {
			if (item.id !== mediaId) {
				return item;
			}
			return Object.assign({}, item, {
				url: normalizedDetails.url || item.url
			});
		});
		Object.keys(state.apartmentGalleryByApartment).forEach(function (apartmentKey) {
			const items = state.apartmentGalleryByApartment[apartmentKey];
			if (!Array.isArray(items)) {
				return;
			}
			state.apartmentGalleryByApartment[apartmentKey] = items.map(function (item) {
				if (item.id !== mediaId) {
					return item;
				}
				return Object.assign({}, item, {
					url: normalizedDetails.url || item.url
				});
			});
		});

		if (state.modal.mediaId === mediaId) {
			state.modal.details = normalizedDetails;
		}
	}

	async function renameMediaFile(state, mediaId, newSlug) {
		const payload = await fetchJson(state.restRoot + '/' + state.endpoints.mediaRename, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': state.nonce
			},
			body: JSON.stringify({
				mediaId: mediaId,
				newSlug: newSlug
			})
		});

		const media = payload && payload.media ? payload.media : null;
		if (!media || !media.id) {
			throw new Error('A fajlnev-atnevezes valasza hianyos.');
		}

		applyMediaStateUpdate(state, {
			id: String(media.id),
			title: typeof media.title === 'string' ? media.title : '',
			alt: typeof media.alt === 'string' ? media.alt : '',
			caption: typeof media.caption === 'string' ? media.caption : '',
			description: typeof media.description === 'string' ? media.description : '',
			url: typeof media.url === 'string' ? media.url : '',
			fileName: typeof media.fileName === 'string' ? media.fileName : '',
			thumb: typeof media.thumb === 'string' ? media.thumb : '',
			approved: !!media.approved
		});

		return payload;
	}

	async function approveMediaSeo(state, mediaId, approved) {
		const payload = await fetchJson(state.restRoot + '/' + state.endpoints.seoApprove, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': state.nonce
			},
			body: JSON.stringify({
				id: mediaId,
				approved: !!approved
			})
		});

		const media = payload && payload.media ? payload.media : null;
		if (!media || !media.id) {
			throw new Error('A SEO elfogadási válasz hiányos.');
		}

		applyMediaStateUpdate(state, {
			id: String(media.id),
			title: typeof media.title === 'string' ? media.title : '',
			alt: typeof media.alt === 'string' ? media.alt : '',
			caption: typeof media.caption === 'string' ? media.caption : '',
			description: typeof media.description === 'string' ? media.description : '',
			url: typeof media.url === 'string' ? media.url : '',
			fileName: typeof media.fileName === 'string' ? media.fileName : '',
			thumb: typeof media.thumb === 'string' ? media.thumb : '',
			approved: !!media.approved
		});

		return payload;
	}

	async function loadApartments(state) {
		const payload = await fetchJson(state.restRoot + '/' + state.endpoints.apartments, {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'X-WP-Nonce': state.nonce
			}
		});

		state.apartments = Array.isArray(payload) ? payload : [];
		if (
			!state.selectedApartmentKey ||
			!getApartmentGroupOptions(state).some(function (item) { return item && item.value === state.selectedApartmentKey; })
		) {
			state.selectedApartmentKey = chooseDefaultApartmentKey(state);
		}
	}

	function chooseDefaultApartmentKey(state) {
		const apartmentOptions = getApartmentGroupOptions(state);
		if (apartmentOptions.some(function (item) { return item && item.value === 'd2'; })) {
			return 'd2';
		}
		return apartmentOptions[0] && apartmentOptions[0].value ? String(apartmentOptions[0].value) : '';
	}

	function getApartmentName(state, key) {
		const found = state.apartments.find(function (item) {
			return item && item.key === key;
		});
		if (found && found.name) {
			return found.name;
		}
		const option = getApartmentGroupOptions(state).find(function (item) {
			return item && item.value === String(key || '');
		});
		return option && option.label ? option.label : key;
	}

	function getApartmentBadgeLabel(state, key) {
		const name = getApartmentName(state, key);
		return /^dandelion\s+/i.test(name) ? name.replace(/^dandelion\s+/i, '').toUpperCase() : name;
	}

	async function loadGalleryForApartment(state, apartmentKey) {
		const endpoint = state.restRoot + '/' + state.endpoints.apartmentImageConfig + '/' + encodeURIComponent(apartmentKey);
		const payload = await fetchJson(endpoint, {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'X-WP-Nonce': state.nonce
			}
		});

		const items = Array.isArray(payload && payload.gallery)
			? payload.gallery.map(function (item) {
				return {
					id: item && item.id ? String(item.id) : '',
					sortOrder: item && item.sortOrder ? Number(item.sortOrder) : 0,
					url: item && item.url ? String(item.url) : ''
				};
			})
			: [];

		return {
			items: items,
			meta: {
				apartmentKey: payload && payload.apartmentKey ? String(payload.apartmentKey) : apartmentKey,
				apartmentName: payload && payload.apartmentName ? String(payload.apartmentName) : getApartmentName(state, apartmentKey),
				message: items.length ? 'A galeria REST adatai betoltottek.' : 'Ehhez a lakáshoz még nincs kép hozzárendelve'
			}
		};
	}

	async function loadSelectedGallery(state) {
		await syncApartmentGroupsWithBackend(state);
		if (!state.selectedApartmentKey) {
			state.galleryItems = [];
			state.galleryMeta = {
				apartmentKey: '',
				apartmentName: '',
				message: 'Nincs kivalasztott apartman.'
			};
			state.galleryInitialIds = [];
			state.galleryDirty = false;
			return;
		}

		const result = await loadGalleryForApartment(state, state.selectedApartmentKey);
		state.galleryItems = result.items;
		state.galleryMeta = result.meta;
		state.galleryInitialIds = state.galleryItems.map(function (item) {
			return item.id;
		});
		state.galleryDirty = false;
	}

	async function loadAllAssignments(state) {
		await syncApartmentGroupsWithBackend(state);
		const assignments = {};
		const galleries = {};
		const apartmentOptions = getApartmentGroupOptions(state);

		for (const apartment of apartmentOptions) {
			try {
				const result = await loadGalleryForApartment(state, apartment.value);
				galleries[apartment.value] = result.items;
				result.items.forEach(function (item) {
					if (!assignments[item.id]) {
						assignments[item.id] = [];
					}
					assignments[item.id].push({
						key: apartment.value,
						name: apartment.label || apartment.value
					});
				});
			} catch (error) {
				galleries[apartment.value] = [];
			}
		}

		state.apartmentAssignments = assignments;
		state.apartmentGalleryByApartment = galleries;
	}

	function arraysEqual(left, right) {
		if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
			return false;
		}
		return left.every(function (item, index) {
			return item === right[index];
		});
	}

	function preserveScroll(refresh) {
		const top = window.scrollY;
		refresh();
		window.requestAnimationFrame(function () {
			window.scrollTo({ top: top, left: 0, behavior: 'auto' });
		});
	}

	function updateButtonLoading(button, isLoading, idleText, busyText) {
		if (!button) {
			return;
		}
		button.disabled = !!isLoading;
		button.classList.toggle('dnd-btn-loading', !!isLoading);
		if (idleText && busyText) {
			button.textContent = isLoading ? busyText : idleText;
		}
	}

	async function saveGalleryOrder(state) {
		const ids = state.galleryItems.map(function (item) {
			return item.id;
		}).filter(Boolean);

		await fetchJson(state.restRoot + '/' + state.endpoints.apartmentGalleryOrder, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': state.nonce
			},
			body: JSON.stringify({
				apartmentKey: state.selectedApartmentKey,
				galleryIds: ids
			})
		});
	}

	async function assignMediaToApartment(state, mediaId, apartmentKey) {
		await syncApartmentGroupsWithBackend(state);
		return fetchJson(state.restRoot + '/' + state.endpoints.apartmentGalleryAdd, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': state.nonce
			},
			body: JSON.stringify({
				apartmentKey: apartmentKey,
				mediaId: mediaId
			})
		});
	}

	async function removeMediaFromApartment(state, mediaId, apartmentKeyOverride) {
		return fetchJson(state.restRoot + '/' + state.endpoints.apartmentGalleryRemove, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': state.nonce
			},
			body: JSON.stringify({
				apartmentKey: apartmentKeyOverride || state.selectedApartmentKey,
				id: mediaId
			})
		});
	}

	async function convertMediaToWebp(state, mediaId) {
		const endpointRoot = String(state.webpRestRoot || '').replace(/\/+$/, '');
		const endpointPath = String((state.endpoints && state.endpoints.webpConvert) || 'convert-webp').replace(/^\/+/, '');
		return fetchJson(endpointRoot + '/' + endpointPath, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': state.nonce
			},
			body: JSON.stringify({
				mediaId: mediaId
			})
		});
	}

	function renderBadges(state, mediaId) {
		const wrap = document.createElement('div');
		wrap.className = 'dnd-badge-row';
		const items = getMediaAssignments(state, mediaId);

		if (!items.length) {
			const badge = document.createElement('span');
			badge.className = 'dnd-badge is-muted';
			badge.textContent = 'Nincs tarsitva';
			wrap.append(badge);
			return wrap;
		}

		items.forEach(function (item) {
			const badge = document.createElement('span');
			badge.className = 'dnd-badge';
			badge.textContent = getApartmentBadgeLabel(state, item.key);
			wrap.append(badge);
		});
		return wrap;
	}

	function renderUsedImageBadges(state, mediaItem) {
		const mediaId = String(mediaItem && mediaItem.id || '');
		const wrap = document.createElement('div');
		wrap.className = 'dnd-badge-row';
		const categoryValue = getMediaCategory(state, mediaItem);
		if (categoryValue) {
			const categoryBadge = document.createElement('span');
			categoryBadge.className = 'dnd-badge';
			categoryBadge.textContent = getDisplayLabel(categoryValue, state);
			wrap.append(categoryBadge);
		}

		const assignments = getMediaAssignments(state, mediaId);
		if (!assignments.length) {
			const emptyBadge = document.createElement('span');
			emptyBadge.className = 'dnd-badge is-muted';
			emptyBadge.textContent = 'Nincs társítva';
			wrap.append(emptyBadge);
			return wrap;
		}

		assignments.forEach(function (item) {
			const badge = document.createElement('span');
			badge.className = 'dnd-badge is-muted';
			badge.textContent = getApartmentBadgeLabel(state, item.key);
			wrap.append(badge);
		});

		return wrap;
	}

	function renderCategoryBadgeRow(state, mediaItem) {
		const wrap = document.createElement('div');
		wrap.className = 'dnd-badge-row';
		const categoryValue = getMediaCategory(state, mediaItem);
		if (!categoryValue) {
			return wrap;
		}
		const badge = document.createElement('span');
		badge.className = 'dnd-badge';
		badge.textContent = getDisplayLabel(categoryValue, state);
		wrap.append(badge);
		return wrap;
	}

	function getUsedMediaItems(state) {
		const byId = {};

		Object.keys(state.apartmentGalleryByApartment).forEach(function (apartmentKey) {
			const items = state.apartmentGalleryByApartment[apartmentKey];
			if (!Array.isArray(items)) {
				return;
			}

			items.forEach(function (item) {
				const mediaId = item && item.id ? String(item.id) : '';
				if (!mediaId || byId[mediaId]) {
					return;
				}

				const mediaItem = state.mediaItems.find(function (entry) {
					return entry.id === mediaId;
				}) || state.mediaDetailsCache[mediaId] || {};

				byId[mediaId] = Object.assign({}, item, mediaItem, {
					id: mediaId,
					url: mediaItem.url || item.url || '',
					thumb: mediaItem.thumb || item.url || '',
					fileName: mediaItem.fileName || item.fileName || getFileNameFromUrl(mediaItem.url || item.url || '')
				});
			});
		});

		Object.keys(state.usedImageCategoriesByMediaId || {}).forEach(function (mediaId) {
			const normalizedMediaId = String(mediaId || '');
			if (!normalizedMediaId || byId[normalizedMediaId]) {
				return;
			}

			const mediaItem = state.mediaItems.find(function (entry) {
				return entry.id === normalizedMediaId;
			}) || state.mediaDetailsCache[normalizedMediaId] || null;

			if (!mediaItem) {
				return;
			}

			byId[normalizedMediaId] = Object.assign({}, mediaItem, {
				id: normalizedMediaId,
				url: mediaItem.url || '',
				thumb: mediaItem.thumb || mediaItem.url || '',
				fileName: mediaItem.fileName || getFileNameFromUrl(mediaItem.url || '')
			});
		});

		return Object.keys(byId).map(function (mediaId) {
			return byId[mediaId];
		});
	}

	function getUsedVisibleItems(state) {
		const items = getUsedMediaItems(state);
		const currentFilter = state.usedImagesFilter || 'all';
		const currentCategoryFilter = normalizeUiValue(state.usedImagesCategoryFilter || 'all');

		return items.filter(function (item) {
			const seoItem = getUsedSeoItem(state, item.id) || item;
			const analysis = getSeoAnalysis(seoItem);
			// [CHANGE 2026-04-30] WebP státusz input egységesítés
			const statusSummary = getMediaStatusSummary(state, item.id, getDetailedMediaSourceItem(state, item.id, item));
			const isWebpReady = !!statusSummary.webpReady;
			const isSeoComplete = !analysis.missingAlt && !!analysis.approved;
			const isSeoIncomplete = analysis.missingAlt || !analysis.approved;
			const category = getMediaCategory(state, item);

			if (currentFilter === 'incomplete-seo' && !isSeoIncomplete) {
				return false;
			}
			if (currentFilter === 'no-webp' && isWebpReady) {
				return false;
			}
			if (currentFilter === 'ready' && !(isSeoComplete && isWebpReady)) {
				return false;
			}

			return currentCategoryFilter === 'all' || category === currentCategoryFilter;
		});
	}

	function getUsedSeoPanelState(state, mediaId) {
		const key = String(mediaId || '');
		if (!state.usedSeoPanelsByMediaId[key]) {
			state.usedSeoPanelsByMediaId[key] = {
				expanded: false,
				isLoading: false,
				isSaving: false,
				isApproving: false,
				saveMessage: '',
				saveType: '',
				approveMessage: '',
				approveType: '',
				suggestionMessage: '',
				suggestionType: ''
			};
		}

		return state.usedSeoPanelsByMediaId[key];
	}

	function getUsedSeoItem(state, mediaId) {
		const key = String(mediaId || '');
		const baseItem =
			state.mediaItems.find(function (item) {
				return item.id === key;
			}) ||
			state.mediaDetailsCache[key] ||
			getUsedMediaItems(state).find(function (item) {
				return item.id === key;
			}) ||
			null;

		if (!baseItem) {
			return null;
		}

		return applySeoDraft(applyPersistedSeoTopic(state, key, Object.assign({}, baseItem)), getSeoDraft(state, key));
	}

	async function toggleUsedSeoPanel(state, mediaId, refresh) {
		const panelState = getUsedSeoPanelState(state, mediaId);
		panelState.expanded = !panelState.expanded;
		if (!panelState.expanded) {
			preserveScroll(refresh);
			return;
		}

		if (!state.mediaDetailsCache[String(mediaId || '')]) {
			panelState.isLoading = true;
			panelState.saveMessage = '';
			panelState.saveType = '';
			preserveScroll(refresh);
			try {
				await fetchMediaDetails(state, mediaId);
			} catch (error) {
				panelState.saveMessage =
					'SEO betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				panelState.saveType = 'error';
			} finally {
				panelState.isLoading = false;
				preserveScroll(refresh);
			}
			return;
		}

		preserveScroll(refresh);
	}

	function getUsedWebpPanelState(state, mediaId) {
		const key = String(mediaId || '');
		if (!state.usedWebpPanelsByMediaId[key]) {
			state.usedWebpPanelsByMediaId[key] = {
				expanded: false,
				isPreparing: false,
				saveMessage: '',
				saveType: ''
			};
		}

		return state.usedWebpPanelsByMediaId[key];
	}

	function toggleUsedWebpPanel(state, mediaId, refresh) {
		const panelState = getUsedWebpPanelState(state, mediaId);
		panelState.expanded = !panelState.expanded;
		preserveScroll(refresh);
	}

	function createBadge(label, kind) {
		const badge = document.createElement('span');
		badge.className = 'dnd-badge';
		if (kind === 'muted') {
			badge.classList.add('is-muted');
		} else if (kind === 'success') {
			badge.classList.add('is-success');
		} else if (kind === 'warning') {
			badge.classList.add('is-warning');
		} else if (kind === 'error') {
			badge.classList.add('is-error');
		}
		badge.textContent = label;
		return badge;
	}

	function hasEncodingIssue(value) {
		const text = typeof value === 'string' ? value.trim() : '';
		if (!text) {
			return false;
		}

		if (
			text.indexOf('\uFFFD') !== -1 ||
			text.indexOf('Ă') !== -1 ||
			text.indexOf('Ä‚') !== -1 ||
			text.indexOf('Ă˘â‚¬') !== -1
		) {
			return true;
		}

		return /[A-Za-zĂĂ‰ĂŤĂ“Ă–ĹĂšĂśĹ°ĂˇĂ©Ă­ĂłĂ¶Ĺ‘ĂşĂĽĹ±]\?[A-Za-zĂĂ‰ĂŤĂ“Ă–ĹĂšĂśĹ°ĂˇĂ©Ă­ĂłĂ¶Ĺ‘ĂşĂĽĹ±]/.test(text);
	}

	function getSeoAnalysis(item) {
		const alt = item && typeof item.alt === 'string' ? item.alt.trim() : '';
		const title =
			item && typeof item.titleRaw === 'string'
				? item.titleRaw.trim()
				: item && typeof item.title === 'string' && item.title !== '-'
					? item.title.trim()
					: '';
		const caption = item && typeof item.caption === 'string' ? item.caption.trim() : '';
		const description = item && typeof item.description === 'string' ? item.description.trim() : '';
		const approved = !!(item && item.approved);
		const imageType = item && typeof item.imageType === 'string' ? item.imageType.trim() : '';
		const missingAlt = !alt;
		const missingTitle = !title || title === '-';
		const missingCaption = !caption;
		const incomplete = missingAlt || missingTitle || missingCaption;
		const warningMessages = [];
		const encodingIssue =
			hasEncodingIssue(alt) ||
			hasEncodingIssue(title) ||
			hasEncodingIssue(caption) ||
			hasEncodingIssue(description);
		const normalizedAlt = normalizeSuggestionText(alt);
		const genericAltTerms = ['kep', 'foto', 'fotoĚ', 'szallas', 'vendeghaz'];
		const altTooShort = !missingAlt && alt.length < 25;
		const altTooLong = !missingAlt && alt.length > 125;
		const altTooGeneric = !missingAlt && genericAltTerms.indexOf(normalizedAlt) !== -1;
		const titleTooShort = !missingTitle && title.length < 5;

		if (encodingIssue) {
			warningMessages.push('⚠ Encoding hiba gyanús – kézi ellenőrzés szükséges');
		}
		if (missingAlt) {
			warningMessages.push('ALT üres');
		} else {
			if (altTooShort) {
				warningMessages.push('ALT túl rövid');
			}
			if (altTooLong) {
				warningMessages.push('ALT túl hosszú');
			}
			if (altTooGeneric) {
				warningMessages.push('ALT túl általános');
			}
		}
		if (missingTitle) {
			warningMessages.push('Title hiányzik');
		} else if (titleTooShort) {
			warningMessages.push('Title túl rövid');
		}
		if (missingCaption) {
			warningMessages.push('Caption hiányzik');
		}
		if (imageType === 'marketing') {
			warningMessages.push('Marketing kép – kézi ellenőrzés javasolt');
		}
		if (imageType === 'accommodation') {
			if (normalizeSuggestionText(alt).indexOf('dandelion') === -1 && normalizeSuggestionText(title).indexOf('dandelion') === -1) {
				warningMessages.push('Lakás kép – hiányzik a lakásnév');
			}
			if (!item || !item.manualTheme) {
				warningMessages.push('Lakás kép – pontos téma megadása javasolt');
			}
		}
		if (imageType === 'landscape') {
			const normalizedSource = normalizeSuggestionText([alt, title, caption, description].join(' '));
			const hasLocation = /(kisapati|badacsony|balaton|felvidek|szent gyorgy hegy|koveskal)/.test(normalizedSource);
			const hasLandscapeTerm = /(kilatas|panorama|hegy|taj|kert|terasz|szolo)/.test(normalizedSource);
			if (!hasLocation || !hasLandscapeTerm) {
				warningMessages.push('Táj kép – hiányzik helyszín vagy tájelem');
			}
		}

		const needsReview = encodingIssue || titleTooShort || altTooShort || altTooLong || altTooGeneric || incomplete || warningMessages.length > 0;
		const seoOk = !incomplete && !needsReview;

		return {
			approved: approved,
			imageType: imageType,
			missingAlt: missingAlt,
			missingTitle: missingTitle,
			missingCaption: missingCaption,
			incomplete: incomplete,
			encodingIssue: encodingIssue,
			altTooShort: altTooShort,
			altTooLong: altTooLong,
			altTooGeneric: altTooGeneric,
			warningMessages: warningMessages,
			needsReview: needsReview,
			seoOk: seoOk
		};
	}

	function getSeoBadges(item) {
		const analysis = getSeoAnalysis(item);
		const badges = [];

		if (analysis.incomplete) {
			badges.push({ label: 'SEO hianyos', kind: 'warning' });
		}
		if (analysis.encodingIssue) {
			badges.push({ label: 'Encoding gyanús', kind: 'error' });
		}
		if (!analysis.approved) {
			badges.push({ label: 'Nincs elfogadva', kind: 'muted' });
		}
		if (analysis.seoOk) {
			badges.push({ label: 'SEO OK', kind: 'success' });
		}
		if (analysis.missingAlt) {
			badges.push({ label: 'Alt hianyzik', kind: 'warning' });
		}
		if (analysis.missingCaption) {
			badges.push({ label: 'Caption hianyzik', kind: 'warning' });
		}
		if (analysis.needsReview) {
			badges.push({ label: 'Hibas / ellenorizendo', kind: 'error' });
		}

		return badges;
	}

	function renderSeoBadgeRow(item) {
		const wrap = document.createElement('div');
		wrap.className = 'dnd-badge-row';
		getSeoBadges(item).forEach(function (badge) {
			wrap.append(createBadge(badge.label, badge.kind));
		});
		return wrap;
	}

	function renderSeoGridBadgeRow(item) {
		const wrap = document.createElement('div');
		wrap.className = 'dnd-badge-row';
		const analysis = getSeoAnalysis(item);

		if (analysis.encodingIssue) {
			wrap.append(createBadge('Encoding gyanús', 'error'));
		} else if (analysis.seoOk) {
			wrap.append(createBadge('SEO OK', 'success'));
		} else if (analysis.needsReview) {
			wrap.append(createBadge('SEO ellenőrizendő', 'error'));
		} else if (analysis.incomplete) {
			wrap.append(createBadge('SEO hiányos', 'warning'));
		} else {
			wrap.append(createBadge('Nincs elfogadva', 'muted'));
		}

		if (analysis.missingAlt) {
			wrap.append(createBadge('Alt hiányzik', 'warning'));
		} else if (analysis.missingCaption) {
			wrap.append(createBadge('Caption hiányzik', 'warning'));
		}

		return wrap;
	}

	function getSeoDetailText(state, item) {
		const analysis = getSeoAnalysis(item);
		const parts = [];
		const assignments = state.apartmentAssignments[item.id] || [];

		if (analysis.missingAlt) {
			parts.push('Alt hiányzik');
		}
		if (analysis.missingCaption) {
			parts.push('Caption hiányzik');
		}
		if (analysis.missingTitle) {
			parts.push('Title hiányzik');
		}
		if (!analysis.approved) {
			parts.push('Nincs elfogadva');
		}
		if (analysis.encodingIssue) {
			parts.push('Encoding gyanús');
		}
		if (assignments.length) {
			parts.push(
				'Társítva: ' +
				assignments.map(function (entry) { return getApartmentBadgeLabel(state, entry.key); }).join(', ')
			);
		} else {
			parts.push('Nincs társítva');
		}

		return parts.join(' • ');
	}

	function getSeoStatusLabel(item) {
		const analysis = getSeoAnalysis(item);
		if (analysis.seoOk) {
			return 'Elfogadott';
		}
		if (analysis.needsReview) {
			return 'Hibas / ellenorizendo';
		}
		if (analysis.incomplete) {
			return 'Hianyos';
		}
		return 'Nincs elfogadva';
	}

	function getSeoWorkbenchOptions() {
		return [
			{ value: 'all', label: 'Összes kép' },
			{ value: 'incomplete', label: 'Hiányos SEO' },
			{ value: 'unapproved', label: 'Nincs elfogadva' },
			{ value: 'approved', label: 'Elfogadott' },
			{ value: 'missing-alt', label: 'Alt hiányzik' },
			{ value: 'missing-caption', label: 'Caption hiányzik' },
			{ value: 'review', label: 'Hibás / ellenőrizendő' }
		];
	}

	function mediaMatchesSeoWorkbench(filterValue, analysis) {
		if (filterValue === 'incomplete') {
			return analysis.incomplete;
		}
		if (filterValue === 'unapproved') {
			return !analysis.approved;
		}
		if (filterValue === 'approved') {
			return analysis.seoOk;
		}
		if (filterValue === 'missing-alt') {
			return analysis.missingAlt;
		}
		if (filterValue === 'missing-caption') {
			return analysis.missingCaption;
		}
		if (filterValue === 'review') {
			return analysis.needsReview;
		}
		return true;
	}

	function getSeoPrimaryIssueLabel(item) {
		const analysis = getSeoAnalysis(item);
		if (analysis.encodingIssue) {
			return 'Encoding gyanús';
		}
		if (analysis.needsReview) {
			return 'Hibás / ellenőrizendő';
		}
		if (analysis.missingAlt) {
			return 'Alt hiányzik';
		}
		if (analysis.missingCaption) {
			return 'Caption hiányzik';
		}
		if (analysis.missingTitle) {
			return 'Title hiányzik';
		}
		if (!analysis.approved) {
			return 'Nincs elfogadva';
		}
		if (analysis.seoOk) {
			return 'SEO elfogadva';
		}
		return 'SEO ellenőrzés szükséges';
	}

	function mediaMatchesSeoFilters(state, item) {
		const sourceItem = getDetailedMediaSourceItem(state, item.id, item);
		const search = (state.seoSearch || '').trim().toLowerCase();
		const apartmentFilter = state.seoApartmentFilter || 'all';
		const statusFilter = state.seoStatusFilter || 'all';
		const workbenchFilter = state.seoWorkbenchFilter || 'all';
		const analysis = getSeoAnalysis(sourceItem);
		const assignments = state.apartmentAssignments[sourceItem.id] || [];

		if (apartmentFilter !== 'all' && !assignments.some(function (entry) { return entry.key === apartmentFilter; })) {
			return false;
		}
		if (!mediaMatchesSeoWorkbench(workbenchFilter, analysis)) {
			return false;
		}

		if (statusFilter === 'incomplete' && !analysis.incomplete) {
			return false;
		}
		if (statusFilter === 'unapproved' && analysis.approved) {
			return false;
		}
		if (statusFilter === 'approved' && !analysis.approved) {
			return false;
		}
		if (statusFilter === 'review' && !analysis.needsReview) {
			return false;
		}

		if (search) {
			const haystack = [
				sourceItem.id || '',
				sourceItem.title || '',
				sourceItem.fileName || '',
				sourceItem.manualTheme || ''
			].join(' ').toLowerCase();
			if (haystack.indexOf(search) === -1) {
				return false;
			}
		}

		return true;
	}

	function getSeoStatusSummary(item) {
		const analysis = getSeoAnalysis(item);
		const labels = [];
		if (analysis.incomplete) {
			labels.push('Hianyos');
		}
		if (analysis.missingAlt) {
			labels.push('Alt hianyzik');
		}
		if (analysis.missingCaption) {
			labels.push('Caption hianyzik');
		}
		if (analysis.needsReview) {
			labels.push('Hibas / ellenorizendo');
		}
		if (!analysis.approved) {
			labels.push('Nincs elfogadva');
		}
		if (analysis.seoOk) {
			labels.push('Elfogadott');
		}
		return labels.length ? labels.join(', ') : 'SEO OK';
	}

	function createSeoWarningsBlock(analysis) {
		if (!analysis || !Array.isArray(analysis.warningMessages) || !analysis.warningMessages.length) {
			return null;
		}

		const wrap = document.createElement('div');
		wrap.className = 'dnd-seo-warning-list';
		const title = document.createElement('strong');
		title.textContent = 'SEO quality check';
		const list = document.createElement('ul');
		analysis.warningMessages.forEach(function (message) {
			const item = document.createElement('li');
			item.textContent = message;
			list.append(item);
		});
		wrap.append(title, list);
		return wrap;
	}

	function getSeoDraft(state, mediaId) {
		return state.seoDraftsByMediaId[String(mediaId || '')] || null;
	}

	function applySeoDraft(item, draft) {
		if (!draft) {
			return item;
		}
		return Object.assign({}, item, {
			alt: typeof draft.alt === 'string' ? draft.alt : item.alt,
			title: typeof draft.title === 'string' && draft.title.trim() ? draft.title : item.title,
			titleRaw: typeof draft.title === 'string' ? draft.title : item.titleRaw,
			caption: typeof draft.caption === 'string' ? draft.caption : item.caption,
			description: typeof draft.description === 'string' ? draft.description : item.description,
			fileName: typeof draft.fileName === 'string' && draft.fileName.trim() ? draft.fileName : item.fileName,
			url: typeof draft.url === 'string' && draft.url.trim() ? draft.url : item.url,
			thumb: typeof draft.thumb === 'string' && draft.thumb.trim() ? draft.thumb : item.thumb,
			manualTheme: typeof draft.manualTheme === 'string' ? draft.manualTheme : item.manualTheme,
			imageType: typeof draft.imageType === 'string' && draft.imageType.trim() ? draft.imageType : item.imageType
		});
	}

	function getPersistedSeoTopic(state, mediaId) {
		const key = String(mediaId || '');
		return state.seoTopicsByMediaId && typeof state.seoTopicsByMediaId[key] === 'string'
			? state.seoTopicsByMediaId[key]
			: '';
	}

	function setPersistedSeoTopic(state, mediaId, value) {
		const key = String(mediaId || '');
		if (!key) {
			return;
		}
		if (!state.seoTopicsByMediaId) {
			state.seoTopicsByMediaId = {};
		}
		state.seoTopicsByMediaId[key] = String(value || '').trim();
		saveSeoTopics(state);
	}

	// [CHANGE 2026-04-30] SEO téma mező lifecycle stabilizálás
	function applyPersistedSeoTopic(state, mediaId, item) {
		const key = String(mediaId || item && item.id || '');
		if (!item || !key) {
			return item;
		}

		return Object.assign({}, item, {
			id: key,
			manualTheme: getPersistedSeoTopic(state, key) || item.manualTheme || ''
		});
	}

	function getSeoEffectiveMediaItem(state, mediaId) {
		const raw = state.mediaItems.find(function (item) {
			return item.id === String(mediaId || '');
		});

		if (!raw) {
			return null;
		}

		const withPersistedTheme = applyPersistedSeoTopic(state, raw.id, raw);
		return applySeoDraft(withPersistedTheme, getSeoDraft(state, raw.id));
	}

	function getSeoStatusSourceItem(state, mediaId, fallbackDetails) {
		const mediaKey = String(mediaId || fallbackDetails && fallbackDetails.id || '');
		const effectiveItem = getSeoEffectiveMediaItem(state, mediaKey);
		const cachedDetails = mediaKey ? state.mediaDetailsCache[mediaKey] || null : null;
		const source = effectiveItem || cachedDetails || fallbackDetails || null;
		if (!source || !mediaKey) {
			return null;
		}
		const merged = Object.assign({}, cachedDetails || {}, fallbackDetails || {}, effectiveItem || {}, source);
		return Object.assign({}, merged, {
			id: mediaKey,
			manualTheme: getPersistedSeoTopic(state, mediaKey) || merged.manualTheme || '',
			imageType: merged.imageType || inferImageType(state, merged)
		});
	}

	function getMediaStatusSummary(state, mediaId, fallbackDetails) {
		const statusSource = getSeoStatusSourceItem(state, mediaId, fallbackDetails) || fallbackDetails || {};
		const seoAnalysis = getSeoAnalysis(statusSource);
		const webpPreparedState = state.webpPreparationByMediaId[String(mediaId || statusSource.id || '')] || null;
		const webpInfo = prepareWebpSuggestion(Object.assign({}, statusSource, fallbackDetails || {}));
		const webpReady = !!(webpPreparedState || (webpInfo && webpInfo.currentType === 'webp'));
		return {
			seoAnalysis: seoAnalysis,
			seoLabel: seoAnalysis.seoOk ? 'SEO OK' : seoAnalysis.incomplete ? 'SEO Hiányos' : 'SEO Ellenőrizendő',
			seoKind: seoAnalysis.seoOk ? 'success' : seoAnalysis.incomplete ? 'warning' : 'error',
			webpLabel: webpReady ? 'WebP OK' : 'WebP Hiányos',
			webpKind: webpReady ? 'success' : 'warning',
			webpReady: webpReady,
			webpPreparedState: webpPreparedState,
			statusSource: statusSource
		};
	}

	// [CHANGE 2026-04-30] modal és kártya státuszforrás egységesítése
	function getDetailedMediaSourceItem(state, mediaId, fallbackDetails) {
		return getSeoStatusSourceItem(state, mediaId, fallbackDetails) || fallbackDetails || {};
	}

	function getSeoVisibleItems(state) {
		return state.mediaItems
			.map(function (item) {
				return applySeoDraft(applyPersistedSeoTopic(state, item.id, item), getSeoDraft(state, item.id));
			})
			.filter(function (item) {
				return mediaMatchesSeoFilters(state, item);
			});
	}

	function getSeoWorkbenchCounts(state) {
		const apartmentFilter = state.seoApartmentFilter || 'all';
		const visibleItems = state.mediaItems.filter(function (item) {
			if (apartmentFilter === 'all') {
				return true;
			}

			const assignments = state.apartmentAssignments[item.id] || [];
			return assignments.some(function (entry) { return entry.key === apartmentFilter; });
		});
		const counts = {};

		getSeoWorkbenchOptions().forEach(function (option) {
			counts[option.value] = visibleItems.filter(function (item) {
				return mediaMatchesSeoWorkbench(option.value, getSeoAnalysis(getDetailedMediaSourceItem(state, item.id, item)));
			}).length;
		});

		return counts;
	}

	function getLibraryPageItems(currentPage, totalPages) {
		const pages = [];
		if (totalPages <= 1) {
			return [1];
		}

		const start = Math.max(2, currentPage - 2);
		const end = Math.min(totalPages - 1, currentPage + 2);

		pages.push(1);
		if (start > 2) {
			pages.push('ellipsis-left');
		}

		for (let page = start; page <= end; page += 1) {
			pages.push(page);
		}

		if (end < totalPages - 1) {
			pages.push('ellipsis-right');
		}

		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	}

	async function goToLibraryPage(state, refresh, targetPage) {
		const totalPages = hasActiveLibraryFilters(state)
			? (state.libraryFilteredTotalPages || 1)
			: (state.libraryTotalPages || 1);
		const nextPage = Math.min(Math.max(1, targetPage), totalPages);
		if (nextPage === state.libraryPage) {
			return;
		}

		state.libraryPage = nextPage;
		state.selectedMediaIds = [];
		state.selectedSeoMediaIds = [];
		state.seoBulkMessage = '';
		state.seoBulkType = '';
		if (hasActiveLibraryFilters(state)) {
			preserveScroll(refresh);
			return;
		}
		state.isLibraryLoading = true;
		preserveScroll(refresh);
		try {
			await fetchMediaPage(state);
		} catch (error) {
			state.libraryStatusMessage =
				'✕ Keptar lapozasi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
			state.libraryStatusType = 'error';
		} finally {
			state.isLibraryLoading = false;
			preserveScroll(refresh);
		}
	}

	function renderLibraryPaginator(state, refresh, totalOverride) {
		const wrapper = document.createElement('div');
		wrapper.className = 'dnd-actions-row dnd-paging-bar';

		const total = typeof totalOverride === 'number' ? totalOverride : (state.libraryTotal || 0);
		const page = state.libraryPage || 1;
		const totalPages = Math.max(1, Math.ceil(total / 50)) || 1;
		const start = total ? (page - 1) * 50 + 1 : 0;
		const end = total ? Math.min(page * 50, total) : 0;

		const info = document.createElement('span');
		info.className = 'dandelion-image-admin-bundle__status';
		info.style.margin = '0';
		info.textContent =
			'Osszes kep: ' +
			total +
			' | Megjelenítve: ' +
			start +
			'–' +
			end +
			' | Oldal: ' +
			page +
			' / ' +
			totalPages;

		const controls = document.createElement('div');
		controls.className = 'dnd-paginator-controls';

		[
			{ label: 'Elso', target: 1, disabled: page <= 1 },
			{ label: 'Elozo', target: page - 1, disabled: page <= 1 }
		].forEach(function (item) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button';
			button.textContent = item.label;
			button.disabled = item.disabled;
			button.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				goToLibraryPage(state, refresh, item.target);
			});
			controls.append(button);
		});

		getLibraryPageItems(page, totalPages).forEach(function (item) {
			if (typeof item !== 'number') {
				const dots = document.createElement('span');
				dots.className = 'dnd-page-ellipsis';
				dots.textContent = '...';
				controls.append(dots);
				return;
			}

			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button dnd-page-button' + (item === page ? ' is-active' : '');
			button.textContent = String(item);
			button.disabled = item === page;
			button.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				goToLibraryPage(state, refresh, item);
			});
			controls.append(button);
		});

		[
			{ label: 'Kovetkezo', target: page + 1, disabled: page >= totalPages },
			{ label: 'Utolso', target: totalPages, disabled: page >= totalPages }
		].forEach(function (item) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button';
			button.textContent = item.label;
			button.disabled = item.disabled;
			button.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				goToLibraryPage(state, refresh, item.target);
			});
			controls.append(button);
		});

		wrapper.append(info, controls);
		return wrapper;
	}

	function openModal(state, mediaId, refresh, options) {
		const modalSource = options && options.source ? String(options.source) : '';
		const mediaKey = String(mediaId || '');
		const initialRawDetails = state.mediaDetailsCache[mediaKey] || null;
		const initialEffectiveItem = getSeoEffectiveMediaItem(state, mediaKey);
		const initialDetails = initialRawDetails
			? Object.assign({}, initialRawDetails, initialEffectiveItem ? {
				title: initialEffectiveItem.titleRaw || initialEffectiveItem.title || initialRawDetails.title,
				alt: initialEffectiveItem.alt,
				caption: initialEffectiveItem.caption,
				description: initialEffectiveItem.description,
				manualTheme: initialEffectiveItem.manualTheme || initialRawDetails.manualTheme || '',
				url: initialEffectiveItem.url || initialRawDetails.url,
				fileName: initialEffectiveItem.fileName || initialRawDetails.fileName,
				thumb: initialEffectiveItem.thumb || initialRawDetails.thumb
			} : {})
			: initialEffectiveItem
				? {
					id: mediaKey,
					title: initialEffectiveItem.titleRaw || initialEffectiveItem.title || '',
					alt: initialEffectiveItem.alt || '',
					caption: initialEffectiveItem.caption || '',
					description: initialEffectiveItem.description || '',
					manualTheme: initialEffectiveItem.manualTheme || '',
					url: initialEffectiveItem.url || '',
					fileName: initialEffectiveItem.fileName || '',
					thumb: initialEffectiveItem.thumb || '',
					approved: !!initialEffectiveItem.approved
				}
				: null;
		state.modal = {
			open: true,
			source: modalSource,
			mediaId: mediaKey,
			status: 'Betoltes...',
			details: initialDetails,
			saveMessage: '',
			saveType: '',
			isSaving: false,
			renameMessage: '',
			renameType: '',
			renameSaving: false,
			renameDraft: getFileStem(initialDetails && initialDetails.fileName ? initialDetails.fileName : ''),
			approveMessage: '',
			approveType: '',
			isApproving: false,
			webpPrepared: !!state.webpPreparationByMediaId[mediaKey],
			webpPreparing: false,
			themeDraft: initialEffectiveItem && initialEffectiveItem.manualTheme ? initialEffectiveItem.manualTheme : initialDetails && initialDetails.manualTheme ? initialDetails.manualTheme : '',
			imageTypeDraft: inferImageType(state, initialEffectiveItem || initialDetails || { id: mediaKey }),
			suggestionData: null,
			suggestionMessage: '',
			suggestionType: '',
			onlyMissingFields: true
		};
		preserveScroll(refresh);

		fetchMediaDetails(state, mediaId)
			.then(function (details) {
				if (!state.modal.open || state.modal.mediaId !== String(mediaId)) {
					return;
				}
				const draft = getSeoDraft(state, mediaId);
				state.modal.details = draft ? Object.assign({}, details, {
					title: typeof draft.title === 'string' ? draft.title : details.title,
					alt: typeof draft.alt === 'string' ? draft.alt : details.alt,
					caption: typeof draft.caption === 'string' ? draft.caption : details.caption,
					description: typeof draft.description === 'string' ? draft.description : details.description,
					manualTheme: typeof draft.manualTheme === 'string' ? draft.manualTheme : getPersistedSeoTopic(state, mediaId) || details.manualTheme || ''
				}) : details;
				state.modal.themeDraft = getPersistedSeoTopic(state, mediaId) || (draft && typeof draft.manualTheme === 'string' ? draft.manualTheme : details.manualTheme || '');
				state.modal.renameDraft = getFileStem(details && details.fileName ? details.fileName : '');
				state.modal.status = '';
				preserveScroll(refresh);
			})
			.catch(function (error) {
				if (!state.modal.open || state.modal.mediaId !== String(mediaId)) {
					return;
				}
				state.modal.status = error instanceof Error ? error.message : 'ismeretlen hiba';
				preserveScroll(refresh);
			});
	}

	function openUsedWebpModal(state, mediaId, refresh) {
		const mediaKey = String(mediaId || '');
		const visibleItems = getUsedVisibleItems(state);
		const visibleIndex = visibleItems.findIndex(function (item) {
			return String(item.id) === mediaKey;
		});
		const selectedItem = visibleIndex !== -1 ? visibleItems[visibleIndex] : null;
		const sourceItem = getUsedSeoItem(state, mediaKey) || selectedItem || state.mediaDetailsCache[mediaKey] || null;

		state.webpModal = {
			open: true,
			mediaId: mediaKey,
			visibleIds: visibleItems.map(function (item) { return String(item.id); }),
			visibleIndex: visibleIndex,
			isPreparing: false,
			saveMessage: '',
			saveType: '',
			details: sourceItem
				? {
					id: mediaKey,
					title: sourceItem.titleRaw || sourceItem.title || '',
					fileName: sourceItem.fileName || '',
					url: sourceItem.url || '',
					thumb: sourceItem.thumb || sourceItem.url || ''
				}
				: null
		};
		preserveScroll(refresh);
	}

	function closeModal(state, refresh) {
		state.modal = {
			open: false,
			source: '',
			mediaId: '',
			status: '',
			details: null,
			saveMessage: '',
			saveType: '',
			isSaving: false,
			renameMessage: '',
			renameType: '',
			renameSaving: false,
			renameDraft: '',
			approveMessage: '',
			approveType: '',
			isApproving: false,
			webpPrepared: false,
			webpPreparing: false,
			themeDraft: '',
			imageTypeDraft: '',
			suggestionData: null,
			suggestionMessage: '',
			suggestionType: '',
			onlyMissingFields: true
		};
		preserveScroll(refresh);
	}

	function closeUsedWebpModal(state, refresh) {
		state.webpModal = {
			open: false,
			mediaId: '',
			visibleIds: [],
			visibleIndex: -1,
			isPreparing: false,
			saveMessage: '',
			saveType: '',
			details: null
		};
		preserveScroll(refresh);
	}

	function openUsedPreviewModal(state, mediaId, refresh) {
		const mediaKey = String(mediaId || '');
		const sourceItem = getUsedSeoItem(state, mediaKey) || state.mediaDetailsCache[mediaKey] || null;
		state.usedPreviewModal = {
			open: true,
			mediaId: mediaKey,
			details: sourceItem
				? {
					id: mediaKey,
					title: sourceItem.titleRaw || sourceItem.title || '',
					fileName: sourceItem.fileName || '',
					url: sourceItem.url || '',
					thumb: sourceItem.thumb || sourceItem.url || ''
				}
				: null
		};
		preserveScroll(refresh);
	}

	function closeUsedPreviewModal(state, refresh) {
		state.usedPreviewModal = {
			open: false,
			mediaId: '',
			details: null
		};
		preserveScroll(refresh);
	}

	function bindEscapeForModal(state, refresh) {
		if (state.escapeBound) {
			return;
		}
		state.escapeBound = true;
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				if (state.usedPreviewModal && state.usedPreviewModal.open) {
					closeUsedPreviewModal(state, refresh);
					return;
				}
				if (state.webpModal && state.webpModal.open) {
					closeUsedWebpModal(state, refresh);
					return;
				}
				if (state.modal.open) {
					closeModal(state, refresh);
				}
			}
		});
	}

	function enableGalleryGridDrag(grid, state, refresh) {
		let draggedId = '';

		Array.from(grid.querySelectorAll('.dnd-gallery-card')).forEach(function (card) {
			card.addEventListener('dragstart', function (event) {
				draggedId = card.getAttribute('data-gallery-id') || '';
				card.classList.add('dnd-dragging');
				if (event.dataTransfer) {
					event.dataTransfer.effectAllowed = 'move';
					event.dataTransfer.setData('text/plain', draggedId);
				}
			});

			card.addEventListener('dragover', function (event) {
				if (!draggedId || draggedId === (card.getAttribute('data-gallery-id') || '')) {
					return;
				}
				event.preventDefault();
				const rect = card.getBoundingClientRect();
				const before = event.clientY < rect.top + rect.height / 2;
				const dragged = grid.querySelector('.dnd-gallery-card[data-gallery-id="' + draggedId + '"]');
				if (dragged) {
					grid.insertBefore(dragged, before ? card : card.nextSibling);
				}
			});

			card.addEventListener('drop', function (event) {
				event.preventDefault();
				const orderedIds = Array.from(grid.querySelectorAll('.dnd-gallery-card')).map(function (node) {
					return node.getAttribute('data-gallery-id') || '';
				});

				state.galleryItems = orderedIds.map(function (id, index) {
					const existing = state.galleryItems.find(function (item) {
						return item.id === id;
					});
					return {
						id: id,
						sortOrder: (index + 1) * 10,
						url: existing ? existing.url : ''
					};
				});

				state.galleryDirty = !arraysEqual(
					state.galleryInitialIds,
					state.galleryItems.map(function (item) { return item.id; })
				);
				preserveScroll(refresh);
			});

			card.addEventListener('dragend', function () {
				card.classList.remove('dnd-dragging');
				draggedId = '';
			});
		});
	}

	function createGalleryCard(state, item, index, refresh) {
		const card = document.createElement('article');
		card.className = 'dnd-gallery-card';
		card.setAttribute('draggable', 'true');
		card.setAttribute('data-gallery-id', item.id || '');

		const imageWrap = document.createElement('div');
		imageWrap.className = 'dnd-gallery-card__image';
		const img = createThumb(item.url, item.id || 'gallery image', 'dnd-gallery-thumb');
		img.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			openModal(state, item.id, refresh);
		});
		imageWrap.append(img);

		const statusBadge = document.createElement('div');
		statusBadge.className = 'dnd-gallery-card__status';
		statusBadge.textContent = index < 12 ? 'Oldalon latszik' : 'Galeria tovabbi kep';

		const orderBadge = document.createElement('div');
		orderBadge.className = 'dnd-gallery-card__order';
		orderBadge.textContent = String((index + 1) * 10);

		const meta = document.createElement('div');
		meta.className = 'dnd-gallery-card__meta';
		meta.append(createRow('ID', item.id || '-'));
		// [CHANGE 2026-04-30] Add mini SEO and WebP status badges to gallery cards
		const detailedSourceItem = getDetailedMediaSourceItem(state, item.id, item);
		const statusSummary = getMediaStatusSummary(state, item.id, detailedSourceItem);
		const miniStatusRow = document.createElement('div');
		miniStatusRow.className = 'dnd-badge-row dnd-gallery-card__mini-status';
		miniStatusRow.append(
			createBadge(statusSummary.seoKind === 'success' ? 'SEO ✓' : 'SEO !', statusSummary.seoKind),
			createBadge(statusSummary.webpReady ? 'WebP ✓' : 'WebP !', statusSummary.webpKind)
		);
		meta.append(miniStatusRow);

		const removeButton = document.createElement('button');
		removeButton.type = 'button';
		removeButton.className = 'button button-link-delete';
		removeButton.textContent = 'Eltavolitas';
		removeButton.addEventListener('click', async function (event) {
			event.preventDefault();
			event.stopPropagation();

			if (!window.confirm('Biztosan eltavolitod ezt a kepet ebbol a lakasgaleriabol?')) {
				return;
			}

			updateButtonLoading(removeButton, true, 'Eltavolitas', 'Eltavolitas...');
			try {
				await removeMediaFromApartment(state, item.id);
				state.galleryStatusMessage = '✓ Kep eltavolitva a lakasgaleriabol.';
				state.galleryStatusType = 'success';
				await loadSelectedGallery(state);
				await loadAllAssignments(state);
				preserveScroll(refresh);
			} catch (error) {
				state.galleryStatusMessage =
					'✕ Eltavolitasi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.galleryStatusType = 'error';
				preserveScroll(refresh);
			}
		});

		card.append(imageWrap, statusBadge, orderBadge, meta, removeButton);
		return card;
	}

	function renderApartmentManager(container, state, refresh) {
		const module = document.createElement('section');
		module.className = 'dnd-module';

		const title = document.createElement('h3');
		title.className = 'dandelion-image-admin-bundle__title';
		title.style.fontSize = '18px';
		title.textContent = 'Apartman kezeles';
		module.append(title);

		const grid = document.createElement('div');
		grid.className = 'dnd-controls-grid';
		const apartmentField = createSelectField('Apartman');
		const keyField = createInputField('Uj apartman kulcs', '', 'peldaul: zsalya');
		const nameField = createInputField('Uj apartman neve', '', 'Peldaul: Zsalya Vendeghaz');
		const apartmentOptions = getApartmentGroupOptions(state);

		if (!apartmentOptions.length) {
			const option = document.createElement('option');
			option.value = '';
			option.textContent = 'Nincs apartman';
			apartmentField.select.append(option);
		} else {
			apartmentOptions.forEach(function (item) {
				const option = document.createElement('option');
				option.value = item.value || '';
				option.textContent = item.label || getDisplayLabel(item.value || '', state);
				option.selected = item.value === state.selectedApartmentKey;
				apartmentField.select.append(option);
			});
		}

		grid.append(apartmentField.wrapper, keyField.wrapper, nameField.wrapper);
		module.append(grid);

		const actions = document.createElement('div');
		actions.className = 'dnd-actions-row';
		const addButton = document.createElement('button');
		addButton.type = 'button';
		addButton.className = 'button';
		addButton.textContent = 'Apartman hozzaadasa';
		const deleteButton = document.createElement('button');
		deleteButton.type = 'button';
		deleteButton.className = 'button';
		deleteButton.textContent = 'Apartman torlese';
		deleteButton.disabled = !state.selectedApartmentKey || state.coreApartmentKeys.indexOf(state.selectedApartmentKey) !== -1;
		const status = createStatus(state.apartmentStatusMessage || '', state.apartmentStatusType || '');
		status.style.margin = '0';
		actions.append(addButton, deleteButton, status);
		module.append(actions);

		apartmentField.select.addEventListener('change', async function () {
			state.selectedApartmentKey = apartmentField.select.value || '';
			state.apartmentStatusMessage = '';
			state.apartmentStatusType = '';
			await loadSelectedGallery(state);
			preserveScroll(refresh);
		});

		addButton.addEventListener('click', async function () {
			const key = keyField.input.value.trim();
			const name = nameField.input.value.trim();
			if (!key || !name) {
				state.apartmentStatusMessage = 'Kulcs es nev is szukseges.';
				state.apartmentStatusType = 'error';
				preserveScroll(refresh);
				return;
			}

			updateButtonLoading(addButton, true, 'Apartman hozzaadasa', 'Apartman mentese...');
			try {
				const payload = await fetchJson(state.restRoot + '/' + state.endpoints.apartments, {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': state.nonce
					},
					body: JSON.stringify({ key: key, name: name })
				});
				state.apartments = Array.isArray(payload && payload.apartments) ? payload.apartments : state.apartments;
				state.selectedApartmentKey =
					payload && payload.apartment && payload.apartment.key ? String(payload.apartment.key) : state.selectedApartmentKey;
				state.apartmentStatusMessage = '✓ Apartman felveve.';
				state.apartmentStatusType = 'success';
				await loadSelectedGallery(state);
				await loadAllAssignments(state);
				preserveScroll(refresh);
			} catch (error) {
				state.apartmentStatusMessage =
					'✕ Apartman hozzaadasi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.apartmentStatusType = 'error';
				preserveScroll(refresh);
			}
		});

		deleteButton.addEventListener('click', async function () {
			if (!state.selectedApartmentKey || state.coreApartmentKeys.indexOf(state.selectedApartmentKey) !== -1) {
				return;
			}
			if (!window.confirm('Biztosan torlod ezt az apartmant?')) {
				return;
			}

			updateButtonLoading(deleteButton, true, 'Apartman torlese', 'Apartman torlese...');
			try {
				const payload = await fetchJson(state.restRoot + '/' + state.endpoints.apartmentsDelete, {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': state.nonce
					},
					body: JSON.stringify({ key: state.selectedApartmentKey })
				});
				state.apartments = Array.isArray(payload && payload.apartments) ? payload.apartments : [];
				state.selectedApartmentKey = chooseDefaultApartmentKey(state);
				state.apartmentStatusMessage = '✓ Apartman torolve.';
				state.apartmentStatusType = 'success';
				await loadSelectedGallery(state);
				await loadAllAssignments(state);
				preserveScroll(refresh);
			} catch (error) {
				state.apartmentStatusMessage =
					'✕ Apartman torlesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.apartmentStatusType = 'error';
				preserveScroll(refresh);
			}
		});

		container.append(module);
	}

	function renderGalleryModule(container, state, refresh) {
		const module = document.createElement('section');
		module.className = 'dnd-module';

		const title = document.createElement('h3');
		title.className = 'dandelion-image-admin-bundle__title';
		title.style.fontSize = '18px';
		title.textContent = (state.galleryMeta.apartmentName || state.selectedApartmentKey || 'Apartman') + ' galeria kepek';
		module.append(title);

		const viewBar = document.createElement('div');
		viewBar.className = 'dnd-actions-row';
		const gridButton = document.createElement('button');
		gridButton.type = 'button';
		gridButton.className = 'button dnd-tab-button' + (state.galleryView === 'grid' ? ' is-active' : '');
		gridButton.textContent = 'Racs nezet';
		const listButton = document.createElement('button');
		listButton.type = 'button';
		listButton.className = 'button dnd-tab-button' + (state.galleryView === 'list' ? ' is-active' : '');
		listButton.textContent = 'Lista nezet';
		gridButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.galleryView = 'grid';
			preserveScroll(refresh);
		});
		listButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.galleryView = 'list';
			preserveScroll(refresh);
		});
		viewBar.append(gridButton, listButton);
		module.append(viewBar);

		module.append(createStatus(state.galleryMeta.message || '', ''));

		const filterGrid = document.createElement('div');
		filterGrid.className = 'dnd-controls-grid';
		const searchField = createInputField('Keresés', state.gallerySearch || '', 'Fájlnév vagy cím');
		searchField.input.addEventListener('input', function () {
			state.gallerySearch = searchField.input.value || '';
			preserveScroll(refresh);
		});
		filterGrid.append(searchField.wrapper);

		const categoryField = createSelectField('Kategória');
		const allCategoryOption = document.createElement('option');
		allCategoryOption.value = 'all';
		allCategoryOption.textContent = 'Összes kategória';
		categoryField.select.append(allCategoryOption);
		getCategoryOptions(state).forEach(function (option) {
			const node = document.createElement('option');
			node.value = normalizeUiValue(option.value || '');
			node.textContent = getDisplayLabel(option.value || '', state);
			categoryField.select.append(node);
		});
		categoryField.select.value = normalizeUiValue(state.galleryFilterCategory || 'all');
		categoryField.select.addEventListener('change', function () {
			state.galleryFilterCategory = normalizeUiValue(categoryField.select.value || 'all');
			preserveScroll(refresh);
		});
		filterGrid.append(categoryField.wrapper);
		module.append(filterGrid);

		const checkboxRow = document.createElement('div');
		checkboxRow.className = 'dnd-actions-row';
		// [CHANGE 2026-04-30] Oldalak/képhasználat szűrőrendszer
		function createGalleryFilterCheckbox(labelText, checked, onChange) {
			const label = document.createElement('label');
			label.className = 'dnd-filter-checkbox';
			const input = document.createElement('input');
			input.type = 'checkbox';
			input.checked = !!checked;
			input.addEventListener('change', onChange);
			const text = document.createElement('span');
			text.textContent = labelText;
			label.append(input, text);
			return label;
		}

		checkboxRow.append(
			createGalleryFilterCheckbox('Csak nincs hozzárendelve', state.galleryFilterUnassignedOnly, function () {
				state.galleryFilterUnassignedOnly = !!this.checked;
				preserveScroll(refresh);
			}),
			createGalleryFilterCheckbox('SEO hiányos', state.galleryFilterSeoIncompleteOnly, function () {
				state.galleryFilterSeoIncompleteOnly = !!this.checked;
				preserveScroll(refresh);
			}),
			createGalleryFilterCheckbox('WebP hiányzik', state.galleryFilterWebpMissingOnly, function () {
				state.galleryFilterWebpMissingOnly = !!this.checked;
				preserveScroll(refresh);
			})
		);
		module.append(checkboxRow);

		const saveBar = document.createElement('div');
		saveBar.className = 'dnd-actions-row';
		const saveButton = document.createElement('button');
		saveButton.type = 'button';
		saveButton.className = state.galleryDirty ? 'button button-primary' : 'button';
		saveButton.textContent = 'Sorrend mentese';
		const saveStatus = createStatus(state.galleryStatusMessage || '', state.galleryStatusType || '');
		saveStatus.style.margin = '0';
		saveBar.append(saveButton, saveStatus);
		module.append(saveBar);

		saveButton.addEventListener('click', async function () {
			updateButtonLoading(saveButton, true, 'Sorrend mentese', 'Mentes folyamatban...');
			try {
				await saveGalleryOrder(state);
				state.galleryStatusMessage = '✓ Mentve.';
				state.galleryStatusType = 'success';
				await loadSelectedGallery(state);
				await loadAllAssignments(state);
				preserveScroll(refresh);
			} catch (error) {
				state.galleryStatusMessage =
					'✕ Hiba a menteskor: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.galleryStatusType = 'error';
				preserveScroll(refresh);
			}
		});

		if (!state.galleryItems.length) {
			container.append(module);
			return;
		}

		const visibleGalleryItems = state.galleryItems.filter(function (item) {
			const detailedSourceItem = getDetailedMediaSourceItem(state, item.id, item);
			const statusSummary = getMediaStatusSummary(state, item.id, detailedSourceItem);
			const analysis = getSeoAnalysis(detailedSourceItem);
			const assignments = state.apartmentAssignments[item.id] || [];
			const category = normalizeUiValue(getMediaCategory(state, item));
			const search = String(state.gallerySearch || '').trim().toLowerCase();
			const categoryFilter = normalizeUiValue(state.galleryFilterCategory || 'all');

			if (search) {
				const haystack = [
					item.fileName || '',
					item.title || '',
					item.id || ''
				].join(' ').toLowerCase();
				if (haystack.indexOf(search) === -1) {
					return false;
				}
			}

			if (categoryFilter !== 'all' && category !== categoryFilter) {
				return false;
			}

			if (state.galleryFilterUnassignedOnly && assignments.length) {
				return false;
			}

			if (state.galleryFilterSeoIncompleteOnly && !analysis.incomplete) {
				return false;
			}

			if (state.galleryFilterWebpMissingOnly && statusSummary.webpReady) {
				return false;
			}

			return true;
		});

		if (!visibleGalleryItems.length) {
			module.append(createStatus('Nincs találat a szűrőkre.', ''));
			container.append(module);
			return;
		}

		if (state.galleryView === 'grid') {
			const grid = document.createElement('div');
			grid.className = 'dnd-gallery-grid';

			const primaryHeader = document.createElement('div');
			primaryHeader.className = 'dnd-gallery-section-title';
			primaryHeader.textContent = 'Oldalon megjeleno 12 kep';
			grid.append(primaryHeader);

			visibleGalleryItems.forEach(function (item, index) {
				if (index === 12) {
					const extraHeader = document.createElement('div');
					extraHeader.className = 'dnd-gallery-section-title';
					extraHeader.textContent = 'Tovabbi galeria kepek';
					grid.append(extraHeader);
				}
				grid.append(createGalleryCard(state, item, index, refresh));
			});

			enableGalleryGridDrag(grid, state, refresh);
			container.append(module);
			module.append(grid);
			return;
		}

		const table = document.createElement('table');
		table.className = 'widefat striped';
		const thead = document.createElement('thead');
		const headerRow = document.createElement('tr');
		headerRow.append(
			createTableCell('th', 'Kep'),
			createTableCell('th', 'Kep ID'),
			createTableCell('th', 'Sorrend'),
			createTableCell('th', 'Allapot'),
			createTableCell('th', 'URL'),
			createTableCell('th', 'Muvelet')
		);
		thead.append(headerRow);
		const tbody = document.createElement('tbody');
		visibleGalleryItems.forEach(function (item, index) {
			const row = document.createElement('tr');
			const thumbCell = document.createElement('td');
			const img = createThumb(item.url, item.id || 'gallery image');
			img.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				openModal(state, item.id, refresh);
			});
			thumbCell.append(img);

			const actionCell = document.createElement('td');
			const removeButton = document.createElement('button');
			removeButton.type = 'button';
			removeButton.className = 'button button-link-delete';
			removeButton.textContent = 'Eltavolitas';
			removeButton.addEventListener('click', async function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (!window.confirm('Biztosan eltavolitod ezt a kepet ebbol a lakasgaleriabol?')) {
					return;
				}
				updateButtonLoading(removeButton, true, 'Eltavolitas', 'Eltavolitas...');
				try {
					await removeMediaFromApartment(state, item.id);
					state.galleryStatusMessage = '✓ Kep eltavolitva a lakasgaleriabol.';
					state.galleryStatusType = 'success';
					await loadSelectedGallery(state);
					await loadAllAssignments(state);
					preserveScroll(refresh);
				} catch (error) {
					state.galleryStatusMessage =
						'✕ Eltavolitasi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
					state.galleryStatusType = 'error';
					preserveScroll(refresh);
				}
			});
			actionCell.append(removeButton);

			row.append(
				thumbCell,
				createTableCell('td', item.id || '-'),
				createTableCell('td', String((index + 1) * 10)),
				createTableCell('td', index < 12 ? 'Oldalon latszik' : 'Galeria tovabbi kep'),
				createUrlTableCell(item.url),
				actionCell
			);
			tbody.append(row);
		});
		table.append(thead, tbody);
		module.append(table);
		container.append(module);
	}

	function renderLibraryCard(state, item, refresh) {
		const card = document.createElement('article');
		card.className = 'dnd-library-card';
		const isSelected = state.selectedMediaIds.indexOf(item.id) !== -1;
		if (isSelected) {
			card.classList.add('is-selected');
		}
		card.setAttribute('role', 'button');
		card.setAttribute('tabindex', '0');

		const imageWrap = document.createElement('div');
		imageWrap.className = 'dnd-library-card__image';
		const img = createThumb(item.thumb || item.url, item.title || item.fileName || 'preview', 'dnd-library-thumb');
		imageWrap.append(img);

		const previewButton = document.createElement('button');
		previewButton.type = 'button';
		previewButton.className = 'dnd-library-card__preview-button';
		previewButton.textContent = 'Megnezes';
		previewButton.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			openModal(state, item.id, refresh);
		});

		const check = document.createElement('div');
		check.className = 'dnd-library-card__check';
		check.textContent = '✓';

		function toggleSelection(event) {
			event.preventDefault();
			event.stopPropagation();
			const index = state.selectedMediaIds.indexOf(item.id);
			if (index === -1) {
				state.selectedMediaIds.push(item.id);
			} else {
				state.selectedMediaIds.splice(index, 1);
			}
			preserveScroll(refresh);
		}

		card.addEventListener('click', toggleSelection);
		card.addEventListener('keydown', function (event) {
			if (event.key === 'Enter' || event.key === ' ') {
				toggleSelection(event);
			}
		});

		const meta = document.createElement('div');
		meta.className = 'dnd-seo-card__meta';
		const name = document.createElement('strong');
		name.textContent = item.title || item.fileName || item.id || '-';
		name.title = item.title || item.fileName || item.id || '-';
		const assignmentText = document.createElement('p');
		assignmentText.className = 'dnd-seo-card__details';
		assignmentText.textContent = 'Lakás / társítás: ' + getAssignmentSummary(state, item);
		const categoryValue = getMediaCategory(state, item);
		meta.append(name, assignmentText);
		if (categoryValue) {
			const categoryText = document.createElement('p');
			categoryText.className = 'dnd-seo-card__details';
			categoryText.textContent = 'Kategória: ' + getDisplayLabel(categoryValue, state);
			meta.append(categoryText);
		}

		card.append(imageWrap, meta, check, previewButton);
		return card;
	}

	function renderLibraryModule(container, state, refresh) {
		const module = document.createElement('section');
		module.className = 'dnd-module';

		const title = document.createElement('h3');
		title.className = 'dandelion-image-admin-bundle__title';
		title.style.fontSize = '18px';
		title.textContent = 'Keptar';
		module.append(title);

		const controls = document.createElement('div');
		controls.className = 'dnd-controls-grid';
		const apartmentField = createSelectField('Hozzarendeles ehhez');
		const categoryOptions = getCategoryOptions(state);
		if (!categoryOptions.length) {
			const option = document.createElement('option');
			option.value = '';
			option.textContent = 'Nincs kategória';
			apartmentField.select.append(option);
		} else {
			categoryOptions.forEach(function (item) {
				const option = document.createElement('option');
				option.value = normalizeUiValue(item.value || '');
				option.textContent = getDisplayLabel(item.value || '', state);
				apartmentField.select.append(option);
			});
		}
		state.libraryTargetKey = normalizeUiValue(state.libraryTargetKey || state.selectedApartmentKey || '');
		if (state.libraryTargetKey) {
			apartmentField.select.value = state.libraryTargetKey;
		}
		apartmentField.select.addEventListener('change', function () {
			state.libraryTargetKey = normalizeUiValue(apartmentField.select.value || '');
			preserveScroll(refresh);
		});
		controls.append(apartmentField.wrapper);
		module.append(controls);

		const viewBar = document.createElement('div');
		viewBar.className = 'dnd-actions-row';
		const gridButton = document.createElement('button');
		gridButton.type = 'button';
		gridButton.className = 'button dnd-tab-button' + (state.libraryView === 'grid' ? ' is-active' : '');
		gridButton.textContent = 'Racs nezet';
		const listButton = document.createElement('button');
		listButton.type = 'button';
		listButton.className = 'button dnd-tab-button' + (state.libraryView === 'list' ? ' is-active' : '');
		listButton.textContent = 'Lista nezet';
		gridButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.libraryView = 'grid';
			preserveScroll(refresh);
		});
		listButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.libraryView = 'list';
			preserveScroll(refresh);
		});
		viewBar.append(gridButton, listButton);
		module.append(viewBar);

		const filterGrid = document.createElement('div');
		filterGrid.className = 'dnd-controls-grid';
		// [CHANGE 2026-04-30] Keptar szűrőrendszer
		const searchField = createInputField('Kereses', state.librarySearch || '', 'Fajlnev vagy cim');
		searchField.input.addEventListener('input', async function () {
			state.librarySearch = searchField.input.value || '';
			state.libraryPage = 1;
			if (hasActiveLibraryFilters(state)) {
				state.isLibraryLoading = true;
				preserveScroll(refresh);
				try {
					await ensureAllLibraryMediaLoaded(state);
				} catch (error) {
					state.libraryStatusMessage =
						'✕ Keptar betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
					state.libraryStatusType = 'error';
				} finally {
					state.isLibraryLoading = false;
				}
			}
			preserveScroll(refresh);
		});
		filterGrid.append(searchField.wrapper);

		const targetFilterField = createSelectField('Hozzárendelés szerint');
		const allTargetOption = document.createElement('option');
		allTargetOption.value = 'all';
		allTargetOption.textContent = 'Összes hozzárendelés';
		targetFilterField.select.append(allTargetOption);
		getApartmentGroupOptions(state).forEach(function (option) {
			const node = document.createElement('option');
			node.value = normalizeUiValue(option.value || '');
			node.textContent = option.label || getDisplayLabel(option.value || '', state);
			targetFilterField.select.append(node);
		});
		targetFilterField.select.value = normalizeUiValue(state.libraryFilterTarget || 'all');
		targetFilterField.select.addEventListener('change', async function () {
			state.libraryFilterTarget = normalizeUiValue(targetFilterField.select.value || 'all');
			state.libraryPage = 1;
			if (hasActiveLibraryFilters(state)) {
				state.isLibraryLoading = true;
				preserveScroll(refresh);
				try {
					await ensureAllLibraryMediaLoaded(state);
				} catch (error) {
					state.libraryStatusMessage =
						'✕ Keptar betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
					state.libraryStatusType = 'error';
				} finally {
					state.isLibraryLoading = false;
				}
			}
			preserveScroll(refresh);
		});
		filterGrid.append(targetFilterField.wrapper);

		const categoryField = createSelectField('Kategoria');
		const allCategoryOption = document.createElement('option');
		allCategoryOption.value = 'all';
		allCategoryOption.textContent = 'Osszes kategoria';
		categoryField.select.append(allCategoryOption);
		getLibraryCategoryOptions(state).forEach(function (option) {
			const node = document.createElement('option');
			node.value = normalizeUiValue(option.value || '');
			node.textContent = getDisplayLabel(option.value || '', state);
			categoryField.select.append(node);
		});
		categoryField.select.value = normalizeUiValue(state.libraryFilterCategory || 'all');
		categoryField.select.addEventListener('change', async function () {
			state.libraryFilterCategory = normalizeUiValue(categoryField.select.value || 'all');
			state.libraryPage = 1;
			if (hasActiveLibraryFilters(state)) {
				state.isLibraryLoading = true;
				preserveScroll(refresh);
				try {
					await ensureAllLibraryMediaLoaded(state);
				} catch (error) {
					state.libraryStatusMessage =
						'✕ Keptar betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
					state.libraryStatusType = 'error';
				} finally {
					state.isLibraryLoading = false;
				}
			}
			preserveScroll(refresh);
		});
		filterGrid.append(categoryField.wrapper);
		module.append(filterGrid);

		const checkboxRow = document.createElement('div');
		checkboxRow.className = 'dnd-actions-row';
		function createLibraryFilterCheckbox(labelText, checked, onChange) {
			const label = document.createElement('label');
			label.className = 'dnd-filter-checkbox';
			const input = document.createElement('input');
			input.type = 'checkbox';
			input.checked = !!checked;
			input.addEventListener('change', onChange);
			const text = document.createElement('span');
			text.textContent = labelText;
			label.append(input, text);
			return label;
		}
		checkboxRow.append(
			createLibraryFilterCheckbox('Csak nincs lakáshoz/oldalhoz rendelve', state.libraryFilterUnassignedOnly, async function () {
				state.libraryFilterUnassignedOnly = !!this.checked;
				state.libraryPage = 1;
				if (hasActiveLibraryFilters(state)) {
					state.isLibraryLoading = true;
					preserveScroll(refresh);
					try {
						await ensureAllLibraryMediaLoaded(state);
					} catch (error) {
						state.libraryStatusMessage =
							'✕ Keptar betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
						state.libraryStatusType = 'error';
					} finally {
						state.isLibraryLoading = false;
					}
				}
				preserveScroll(refresh);
			}),
			createLibraryFilterCheckbox('SEO hianyos', state.libraryFilterSeoIncompleteOnly, async function () {
				state.libraryFilterSeoIncompleteOnly = !!this.checked;
				state.libraryPage = 1;
				if (hasActiveLibraryFilters(state)) {
					state.isLibraryLoading = true;
					preserveScroll(refresh);
					try {
						await ensureAllLibraryMediaLoaded(state);
					} catch (error) {
						state.libraryStatusMessage =
							'✕ Keptar betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
						state.libraryStatusType = 'error';
					} finally {
						state.isLibraryLoading = false;
					}
				}
				preserveScroll(refresh);
			}),
			createLibraryFilterCheckbox('WebP hianyzik', state.libraryFilterWebpMissingOnly, async function () {
				state.libraryFilterWebpMissingOnly = !!this.checked;
				state.libraryPage = 1;
				if (hasActiveLibraryFilters(state)) {
					state.isLibraryLoading = true;
					preserveScroll(refresh);
					try {
						await ensureAllLibraryMediaLoaded(state);
					} catch (error) {
						state.libraryStatusMessage =
							'✕ Keptar betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
						state.libraryStatusType = 'error';
					} finally {
						state.isLibraryLoading = false;
					}
				}
				preserveScroll(refresh);
			})
		);
		module.append(checkboxRow);

		module.append(createStatus(state.libraryStatusMessage || '', state.libraryStatusType || ''));
		if (state.isLibraryLoading) {
			module.append(createStatus('Kepek betoltese...', ''));
			container.append(module);
			return;
		}

		if (!state.mediaItems.length) {
			module.append(createStatus('A keptar lista ures vagy nem erheto el.', ''));
			container.append(module);
			return;
		}

		const librarySourceItems = hasActiveLibraryFilters(state) && state.libraryAllMediaLoaded
			? state.libraryAllMediaItems
			: state.mediaItems;
		const filteredMediaItems = librarySourceItems.filter(function (item) {
			const detailedSourceItem = getDetailedMediaSourceItem(state, item.id, item);
			const statusSummary = getMediaStatusSummary(state, item.id, detailedSourceItem);
			const analysis = getSeoAnalysis(detailedSourceItem);
			const assignments = getMediaAssignments(state, item.id);
			const category = normalizeUiValue(getMediaCategory(state, item));
			const search = String(state.librarySearch || '').trim().toLowerCase();
			const targetFilter = normalizeUiValue(state.libraryFilterTarget || 'all');
			const categoryFilter = normalizeUiValue(state.libraryFilterCategory || 'all');

			if (search) {
				const haystack = [
					item.fileName || '',
					item.title || '',
					item.id || ''
				].join(' ').toLowerCase();
				if (haystack.indexOf(search) === -1) {
					return false;
				}
			}

			if (targetFilter !== 'all') {
				const normalizeAssignmentFilterValue = function (value) {
					return String(value || '')
						.toLowerCase()
						.replace('dandelion ', '')
						.trim();
				};
				const normalizedAssignments = assignments.map(function (entry) {
					return normalizeAssignmentFilterValue(entry && entry.key || '');
				});
				const normalizedFilter = normalizeAssignmentFilterValue(targetFilter);
				if (!normalizedAssignments.includes(normalizedFilter)) {
					return false;
				}
			}

			if (categoryFilter !== 'all' && category !== categoryFilter) {
				return false;
			}

			if (state.libraryFilterUnassignedOnly && assignments.length) {
				return false;
			}

			if (state.libraryFilterSeoIncompleteOnly && !analysis.incomplete) {
				return false;
			}

			if (state.libraryFilterWebpMissingOnly && statusSummary.webpReady) {
				return false;
			}

			return true;
		});

		const activeLibraryFilters = hasActiveLibraryFilters(state);
		const filteredTotalPages = activeLibraryFilters ? Math.max(1, Math.ceil(filteredMediaItems.length / 50)) : (state.libraryTotalPages || 1);
		if (state.libraryPage > filteredTotalPages) {
			state.libraryPage = 1;
		}
		state.libraryFilteredTotalPages = filteredTotalPages;
		const visibleMediaItems = activeLibraryFilters
			? filteredMediaItems.slice((state.libraryPage - 1) * 50, state.libraryPage * 50)
			: filteredMediaItems;
		module.append(renderLibraryPaginator(state, refresh, activeLibraryFilters ? filteredMediaItems.length : undefined));

		if (!visibleMediaItems.length) {
			module.append(createStatus('Nincs talalat a szurokre.', ''));
			container.append(module);
			return;
		}

		if (state.libraryView === 'grid') {
			const bulkBar = document.createElement('div');
			bulkBar.className = 'dnd-actions-row';
			const count = document.createElement('span');
			count.className = 'dandelion-image-admin-bundle__status';
			count.style.margin = '0';
			count.textContent = 'Kijelolve: ' + state.selectedMediaIds.length + ' kep';
			const bulkButton = document.createElement('button');
			bulkButton.type = 'button';
			bulkButton.className = 'button button-primary';
			bulkButton.textContent = 'Kijelolt kepek hozzarendelese';
			bulkButton.disabled = !state.libraryTargetKey || !state.selectedMediaIds.length;
			bulkButton.addEventListener('click', async function (event) {
				event.preventDefault();
				event.stopPropagation();
				const selectedMediaIds = state.selectedMediaIds.map(function (mediaId) {
					return String(mediaId);
				});
				const targetValue = normalizeCategoryValue(state, apartmentField.select.value || '');
				const apartmentKey = resolveApartmentKey(state, targetValue);
				const targetLabel = getDisplayLabel(targetValue, state);
				const storageKey = getUsedImageCategoriesStorageKey();
				const localStorageBefore =
					typeof window !== 'undefined' && window.localStorage
						? String(window.localStorage.getItem(storageKey) || '')
						: '';
				const stateBefore = Object.assign({}, state.usedImageCategoriesByMediaId || {});
				state.libraryDiagnostic = createLibraryDiagnosticSnapshot(state, {
					selectedMediaIds: selectedMediaIds,
					selectedTargetValue: targetValue,
					selectedTargetLabel: targetLabel,
					isBackendApartment: !!apartmentKey,
					branch: apartmentKey ? 'backend-apartment' : 'local-category',
					localStorageBefore: localStorageBefore,
					localStorageAfter: localStorageBefore,
					stateBefore: stateBefore,
					stateAfter: stateBefore,
					note: 'Kattintas rogzitve.'
				});
				if (!targetValue) {
					state.libraryStatusMessage = 'Valassz kategoriat a hozzarendeleshez.';
					state.libraryStatusType = 'error';
					state.libraryDiagnostic = createLibraryDiagnosticSnapshot(state, {
						selectedMediaIds: selectedMediaIds,
						selectedTargetValue: targetValue,
						selectedTargetLabel: targetLabel,
						isBackendApartment: false,
						branch: 'no-target',
						localStorageBefore: localStorageBefore,
						localStorageAfter: localStorageBefore,
						stateBefore: stateBefore,
						stateAfter: stateBefore,
						note: 'A dropdown erteke ures.'
					});
					preserveScroll(refresh);
					return;
				}
				if (!selectedMediaIds.length) {
					state.libraryStatusMessage = 'Nincs kivalasztott kep.';
					state.libraryStatusType = 'error';
					state.libraryDiagnostic = createLibraryDiagnosticSnapshot(state, {
						selectedMediaIds: selectedMediaIds,
						selectedTargetValue: targetValue,
						selectedTargetLabel: targetLabel,
						isBackendApartment: !!apartmentKey,
						branch: apartmentKey ? 'backend-apartment' : 'local-category',
						localStorageBefore: localStorageBefore,
						localStorageAfter: localStorageBefore,
						stateBefore: stateBefore,
						stateAfter: stateBefore,
						note: 'A kijeloles ures volt a handler futasakor.'
					});
					preserveScroll(refresh);
					return;
				}
				updateButtonLoading(bulkButton, true, 'Kijelolt kepek hozzarendelese', 'Hozzarendeles...');
				if (!apartmentKey) {
					selectedMediaIds.forEach(function (mediaId) {
						setMediaCategory(state, mediaId, targetValue);
					});
					await loadAllAssignments(state);
					await loadUsedCategoryMediaDetails(state);
					const localStorageAfter =
						typeof window !== 'undefined' && window.localStorage
							? String(window.localStorage.getItem(storageKey) || '')
							: '';
					const stateAfter = Object.assign({}, state.usedImageCategoriesByMediaId || {});
					state.libraryDiagnostic = createLibraryDiagnosticSnapshot(state, {
						selectedMediaIds: selectedMediaIds,
						selectedTargetValue: targetValue,
						selectedTargetLabel: targetLabel,
						isBackendApartment: false,
						branch: 'local-category',
						localStorageBefore: localStorageBefore,
						localStorageAfter: localStorageAfter,
						stateBefore: stateBefore,
						stateAfter: stateAfter,
						note: 'Nem-apartman kategoria-ag lefutott.'
					});
					state.selectedMediaIds = [];
					state.libraryStatusMessage = 'Kategóriák beállítva a kijelölt képeken.';
					state.libraryStatusType = 'success';
					preserveScroll(refresh);
					return;
				}

				let successCount = 0;
				let duplicateCount = 0;
				let errorCount = 0;
				for (const mediaId of selectedMediaIds) {
					try {
						await assignMediaToApartment(state, mediaId, apartmentKey);
						successCount += 1;
					} catch (error) {
						const message = error instanceof Error ? error.message.toLowerCase() : '';
						if (message.indexOf('already assigned') !== -1 || message.indexOf('duplicate') !== -1) {
							duplicateCount += 1;
						} else {
							errorCount += 1;
						}
					}
				}
				state.selectedApartmentKey = apartmentKey;
				state.libraryTargetKey = normalizeUiValue(apartmentKey);
				state.selectedMediaIds = [];
				await loadSelectedGallery(state);
				await loadAllAssignments(state);
				await loadUsedCategoryMediaDetails(state);
				const localStorageAfter =
					typeof window !== 'undefined' && window.localStorage
						? String(window.localStorage.getItem(storageKey) || '')
						: '';
				const stateAfter = Object.assign({}, state.usedImageCategoriesByMediaId || {});
				state.libraryDiagnostic = createLibraryDiagnosticSnapshot(state, {
					selectedMediaIds: selectedMediaIds,
					selectedTargetValue: targetValue,
					selectedTargetLabel: targetLabel,
					isBackendApartment: true,
					branch: 'backend-apartment',
					localStorageBefore: localStorageBefore,
					localStorageAfter: localStorageAfter,
					stateBefore: stateBefore,
					stateAfter: stateAfter,
					note: 'Backend apartman-ag lefutott.'
				});
				if (errorCount > 0) {
					state.libraryStatusMessage =
						'✕ Hozzarendeles reszben hibas. Sikeres: ' +
						successCount +
						', duplikalt: ' +
						duplicateCount +
						', hibas: ' +
						errorCount;
					state.libraryStatusType = 'error';
				} else {
					state.libraryStatusMessage =
						'✓ Hozzarendeles kesz. Sikeres: ' +
						successCount +
						', duplikalt: ' +
						duplicateCount;
					state.libraryStatusType = 'success';
				}
				preserveScroll(refresh);
			});
			bulkBar.append(count, bulkButton);
			module.append(bulkBar);

			const grid = document.createElement('div');
			grid.className = 'dnd-library-grid';
			visibleMediaItems.forEach(function (item) {
				grid.append(renderLibraryCard(state, item, refresh));
			});
			module.append(grid);
			module.append(renderLibraryPaginator(state, refresh));
			container.append(module);
			return;
		}

		const table = document.createElement('table');
		table.className = 'widefat striped';
		const thead = document.createElement('thead');
		const headerRow = document.createElement('tr');
		headerRow.append(
			createTableCell('th', 'Kep'),
			createTableCell('th', 'ID'),
			createTableCell('th', 'Cim / fajl'),
			createTableCell('th', 'URL'),
			createTableCell('th', 'Tarsitasok'),
			createTableCell('th', 'Muvelet')
		);
		thead.append(headerRow);
		const tbody = document.createElement('tbody');
		visibleMediaItems.forEach(function (item) {
			const row = document.createElement('tr');
			const thumbCell = document.createElement('td');
			const img = createThumb(item.thumb || item.url, item.title || item.fileName || 'preview');
			img.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				openModal(state, item.id, refresh);
			});
			thumbCell.append(img);

			const badgeCell = document.createElement('td');
			badgeCell.append(renderBadges(state, item.id));

			const actionCell = document.createElement('td');
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button';
			button.textContent = 'Hozzarendeles lakashoz';
			button.disabled = !state.libraryTargetKey;
			button.addEventListener('click', async function (event) {
				event.preventDefault();
				event.stopPropagation();
				const targetValue = normalizeUiValue(apartmentField.select.value || '');
				const apartmentKey = resolveApartmentKey(state, targetValue);
				if (!targetValue) {
					state.libraryStatusMessage = 'Valassz kategoriat a hozzarendeleshez.';
					state.libraryStatusType = 'error';
					preserveScroll(refresh);
					return;
				}
				if (!apartmentKey) {
					setMediaCategory(state, item.id, targetValue);
					await loadAllAssignments(state);
					state.libraryStatusMessage = 'Kategória beállítva: ' + (item.title || item.fileName || item.id);
					state.libraryStatusType = 'success';
					preserveScroll(refresh);
					return;
				}
				updateButtonLoading(button, true, 'Hozzarendeles lakashoz', 'Hozzarendeles...');
				try {
					await assignMediaToApartment(state, item.id, apartmentKey);
					state.selectedApartmentKey = apartmentKey;
					state.libraryTargetKey = normalizeUiValue(apartmentKey);
					state.libraryStatusMessage = '✓ Kep hozzarendelve: ' + (item.title || item.fileName || item.id);
					state.libraryStatusType = 'success';
					await loadSelectedGallery(state);
					await loadAllAssignments(state);
					preserveScroll(refresh);
				} catch (error) {
					state.libraryStatusMessage =
						'✕ Hozzarendelesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
					state.libraryStatusType = 'error';
					preserveScroll(refresh);
				}
			});
			actionCell.append(button);

			row.append(
				thumbCell,
				createTableCell('td', item.id || '-'),
				createTableCell('td', item.title || item.fileName || '-'),
				createUrlTableCell(item.url),
				badgeCell,
				actionCell
			);
			tbody.append(row);
		});
		table.append(thead, tbody);
		module.append(table);
		module.append(renderLibraryPaginator(state, refresh));
		container.append(module);
	}

	function renderUsedImagesModule(container, state, refresh) {
		const module = document.createElement('section');
		module.className = 'dnd-module';

		const title = document.createElement('h3');
		title.className = 'dandelion-image-admin-bundle__title';
		title.style.fontSize = '18px';
		title.textContent = 'Használt képek';
		title.textContent = 'Használt képek';
		module.append(title);
		title.textContent = 'Használt képek';

		const items = getUsedMediaItems(state);
		const currentFilter = state.usedImagesFilter || 'all';
		const currentCategoryFilter = normalizeUiValue(state.usedImagesCategoryFilter || 'all');

		function matchesUsedImagesFilter(item) {
			const seoItem = getDetailedMediaSourceItem(state, item.id, item);
			const analysis = getSeoAnalysis(seoItem);
			const statusSummary = getMediaStatusSummary(state, item.id, seoItem);
			const isWebpReady = !!statusSummary.webpReady;
			const isSeoComplete = !analysis.missingAlt && !!analysis.approved;
			const isSeoIncomplete = analysis.missingAlt || !analysis.approved;
			const category = getMediaCategory(state, item);

			if (currentFilter === 'incomplete-seo') {
				return isSeoIncomplete && (currentCategoryFilter === 'all' || category === currentCategoryFilter);
			}
			if (currentFilter === 'no-webp') {
				return !isWebpReady && (currentCategoryFilter === 'all' || category === currentCategoryFilter);
			}
			if (currentFilter === 'ready') {
				return isSeoComplete && isWebpReady && (currentCategoryFilter === 'all' || category === currentCategoryFilter);
			}

			return currentCategoryFilter === 'all' || category === currentCategoryFilter;
		}

		const visibleItems = items.filter(matchesUsedImagesFilter);
		const filterRow = document.createElement('div');
		filterRow.className = 'dnd-actions-row';
		[
			{ value: 'all', label: 'Összes' },
			{ value: 'incomplete-seo', label: 'Hiányos SEO' },
			{ value: 'no-webp', label: 'Nincs WebP' },
			{ value: 'ready', label: 'Kész' }
		].forEach(function (filter) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button dnd-tab-button' + (currentFilter === filter.value ? ' is-active' : '');
			button.textContent = filter.label;
			button.addEventListener('click', function (event) {
				event.preventDefault();
				state.usedImagesFilter = filter.value;
				preserveScroll(refresh);
			});
			filterRow.append(button);
		});
		module.append(filterRow);

		const categoryFilterRow = document.createElement('div');
		categoryFilterRow.className = 'dnd-actions-row';
		const categoryFilter = createSelectField('Kategória szűrő');
		const allOption = document.createElement('option');
		allOption.value = 'all';
		allOption.textContent = 'Összes kategória';
		categoryFilter.select.append(allOption);
		getCategoryOptions(state).forEach(function (option) {
			const node = document.createElement('option');
			node.value = option.value;
			node.textContent = option.label;
			categoryFilter.select.append(node);
		});
		categoryFilter.select.value = currentCategoryFilter;
		categoryFilter.select.addEventListener('change', function () {
			state.usedImagesCategoryFilter = normalizeUiValue(categoryFilter.select.value || 'all');
			preserveScroll(refresh);
		});
		categoryFilterRow.append(categoryFilter.wrapper);
		module.append(categoryFilterRow);

		if (!items.length) {
			module.append(createStatus('Még nincs használatba vett kép.', ''));
			module.lastChild.textContent = 'Még nincs használatba vett kép.';
			container.append(module);
			return;
		}

		if (!visibleItems.length) {
			module.append(createStatus('Nincs találat a szűrőre.', ''));
			container.append(module);
			return;
		}

		const table = document.createElement('table');
		table.className = 'widefat striped';
		const thead = document.createElement('thead');
		const headerRow = document.createElement('tr');
		headerRow.append(
			createTableCell('th', 'Kép'),
			createTableCell('th', 'Fájlnév / cím'),
			createTableCell('th', 'Hozzárendelve'),
			createTableCell('th', 'Kategória')
		);
		thead.append(headerRow);

		const tbody = document.createElement('tbody');
		visibleItems.forEach(function (item) {
			const detailedSourceItem = getDetailedMediaSourceItem(state, item.id, item);
			const statusSummary = getMediaStatusSummary(state, item.id, detailedSourceItem);
			const row = document.createElement('tr');
			const thumbCell = document.createElement('td');
			const img = createThumb(item.thumb || item.url, item.title || item.fileName || 'preview');
			img.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				openModal(state, item.id, refresh);
			});
			thumbCell.append(img);

			const assignedCell = document.createElement('td');
			assignedCell.append(renderUsedImageBadges(state, item));
			const categoryCell = document.createElement('td');
			const categorySelect = document.createElement('select');
			categorySelect.className = 'regular-text';
			const emptyCategoryOption = document.createElement('option');
			emptyCategoryOption.value = '';
			emptyCategoryOption.textContent = 'Nincs kategória';
			categorySelect.append(emptyCategoryOption);
			getCategoryOptions(state).forEach(function (option) {
				const node = document.createElement('option');
				node.value = option.value;
				node.textContent = getDisplayLabel(option.value, state);
				categorySelect.append(node);
			});
			const currentCategory = getMediaCategory(state, item);
			categorySelect.value = currentCategory;
			if (categorySelect.value !== currentCategory) {
				const fallbackOption = document.createElement('option');
				fallbackOption.value = currentCategory;
				fallbackOption.textContent = getDisplayLabel(currentCategory, state);
				categorySelect.prepend(fallbackOption);
				categorySelect.value = currentCategory;
			}
			categorySelect.addEventListener('change', function () {
				setMediaCategory(state, item.id, categorySelect.value || '');
				preserveScroll(refresh);
			});
			categoryCell.append(categorySelect);

			row.append(
				thumbCell,
				createTableCell('td', item.fileName || item.title || item.url || item.id || '-'),
				assignedCell,
				categoryCell
			);
			tbody.append(row);
		});
		table.append(thead, tbody);
		module.append(table);
		container.append(module);
	}

	function renderUsedImagesModuleV2(container, state, refresh) {
		const module = document.createElement('section');
		const viewMode = state.usedImagesViewMode === 'grid' ? 'grid' : 'list';
		module.className = 'dnd-module ' + (viewMode === 'grid' ? 'view-grid' : 'view-list');

		const title = document.createElement('h3');
		title.className = 'dandelion-image-admin-bundle__title';
		title.style.fontSize = '18px';
		title.textContent = 'Használt képek';
		module.append(title);

		const viewRow = document.createElement('div');
		viewRow.className = 'dnd-actions-row';
		const listButton = document.createElement('button');
		listButton.type = 'button';
		listButton.className = 'button dnd-tab-button' + (viewMode === 'list' ? ' is-active' : '');
		listButton.textContent = 'Lista';
		listButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.usedImagesViewMode = 'list';
			saveUsedImagesViewMode('list');
			preserveScroll(refresh);
		});
		const gridButton = document.createElement('button');
		gridButton.type = 'button';
		gridButton.className = 'button dnd-tab-button' + (viewMode === 'grid' ? ' is-active' : '');
		gridButton.textContent = 'Rács';
		gridButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.usedImagesViewMode = 'grid';
			saveUsedImagesViewMode('grid');
			preserveScroll(refresh);
		});
		viewRow.append(listButton, gridButton);
		module.append(viewRow);

		const items = getUsedMediaItems(state);
		const currentFilter = state.usedImagesFilter || 'all';
		const currentCategoryFilter = normalizeUiValue(state.usedImagesCategoryFilter || 'all');
		const categoryOptions = getCategoryOptions(state);
		const visibleItems = getUsedVisibleItems(state);

		const filterRow = document.createElement('div');
		filterRow.className = 'dnd-actions-row';
		[
			{ value: 'all', label: 'Összes' },
			{ value: 'incomplete-seo', label: 'Hiányos SEO' },
			{ value: 'no-webp', label: 'Nincs WebP' },
			{ value: 'ready', label: 'Kész' }
		].forEach(function (filter) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button dnd-tab-button' + (currentFilter === filter.value ? ' is-active' : '');
			button.textContent = filter.label;
			button.addEventListener('click', function (event) {
				event.preventDefault();
				state.usedImagesFilter = filter.value;
				preserveScroll(refresh);
			});
			filterRow.append(button);
		});
		module.append(filterRow);

		const categoryFilterRow = document.createElement('div');
		categoryFilterRow.className = 'dnd-actions-row';
		const categoryFilter = createSelectField('Kategória szűrő');
		const allOption = document.createElement('option');
		allOption.value = 'all';
		allOption.textContent = 'Összes kategória';
		categoryFilter.select.append(allOption);
		categoryOptions.forEach(function (option) {
			const node = document.createElement('option');
			node.value = option.value;
			node.textContent = getDisplayLabel(option.value, state);
			categoryFilter.select.append(node);
		});
		categoryFilter.select.value = currentCategoryFilter;
		categoryFilter.select.addEventListener('change', function () {
			state.usedImagesCategoryFilter = normalizeUiValue(categoryFilter.select.value || 'all');
			preserveScroll(refresh);
		});
		categoryFilterRow.append(categoryFilter.wrapper);
		module.append(categoryFilterRow);

		if (!items.length) {
			module.append(createStatus('Még nincs használatba vett kép.', ''));
			module.lastChild.textContent = 'Még nincs használatba vett kép.';
			container.append(module);
			return;
		}

		if (!visibleItems.length) {
			module.append(createStatus('Nincs találat a szűrőre.', ''));
			container.append(module);
			return;
		}

		const table = document.createElement('table');
		table.className = 'widefat striped dnd-used-images-table';
		const thead = document.createElement('thead');
		const headerRow = document.createElement('tr');
		headerRow.append(
			createTableCell('th', 'Kép'),
			createTableCell('th', 'Fájlnév / cím'),
			createTableCell('th', 'Hozzárendelve'),
			createTableCell('th', 'Kategória'),
			createTableCell('th', 'SEO'),
			createTableCell('th', 'Művelet')
		);
		headerRow.children[0].textContent = 'Kép';
		headerRow.children[1].textContent = 'Fájlnév / cím';
		headerRow.children[2].textContent = 'Hozzárendelve';
		const webpHeaderCell = createTableCell('th', 'WebP');
		headerRow.append(webpHeaderCell);
		headerRow.children[0].textContent = 'Kép';
		headerRow.children[1].textContent = 'Fájlnév / cím';
		headerRow.children[2].textContent = 'Hozzárendelve';
		thead.append(headerRow);

		const tbody = document.createElement('tbody');
		visibleItems.forEach(function (item) {
			const detailedSourceItem = getDetailedMediaSourceItem(state, item.id, item);
			const statusSummary = getMediaStatusSummary(state, item.id, detailedSourceItem);
			const row = document.createElement('tr');
			row.className = 'dnd-used-image-row';
			const thumbCell = document.createElement('td');
			const img = createThumb(item.thumb || item.url, item.title || item.fileName || 'preview');
			img.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				openUsedPreviewModal(state, item.id, refresh);
			});
			thumbCell.append(img);

			const assignedCell = document.createElement('td');
			assignedCell.append(renderUsedImageBadges(state, item));

			const categoryCell = document.createElement('td');
			const categorySelect = document.createElement('select');
			categorySelect.className = 'regular-text';
			const emptyCategoryOption = document.createElement('option');
			emptyCategoryOption.value = '';
			emptyCategoryOption.textContent = 'Nincs kategória';
			categorySelect.append(emptyCategoryOption);
			categoryOptions.forEach(function (option) {
				const node = document.createElement('option');
				node.value = option.value;
				node.textContent = getDisplayLabel(option.value, state);
				categorySelect.append(node);
			});
			const currentCategory = getMediaCategory(state, item);
			categorySelect.value = currentCategory;
			if (categorySelect.value !== currentCategory) {
				const fallbackOption = document.createElement('option');
				fallbackOption.value = currentCategory;
				fallbackOption.textContent = getDisplayLabel(currentCategory, state);
				categorySelect.prepend(fallbackOption);
				categorySelect.value = currentCategory;
			}
			categorySelect.addEventListener('change', function () {
				setMediaCategory(state, item.id, categorySelect.value || '');
				preserveScroll(refresh);
			});
			categoryCell.append(categorySelect);

			const actionCell = document.createElement('td');
			const toggleButton = document.createElement('button');
			toggleButton.type = 'button';
			toggleButton.className = 'button dnd-used-seo-toggle';
			toggleButton.textContent = 'SEO beállítások';
			toggleButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				openModal(state, item.id, refresh, { source: 'used-seo' });
			});
			actionCell.append(toggleButton);
			const seoStatus = document.createElement('div');
			seoStatus.className = 'dnd-used-status';
			seoStatus.textContent = statusSummary.seoLabel;
			actionCell.append(seoStatus);

			const webpActionCell = document.createElement('td');
			const webpToggleButton = document.createElement('button');
			webpToggleButton.type = 'button';
			webpToggleButton.className = 'button dnd-used-seo-toggle';
			webpToggleButton.textContent = 'WebP beállítások';
			webpToggleButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				openUsedWebpModal(state, item.id, refresh);
			});
			webpActionCell.append(webpToggleButton);
			const webpStatus = document.createElement('div');
			webpStatus.className = 'dnd-used-status';
			webpStatus.textContent = statusSummary.webpLabel;
			webpActionCell.append(webpStatus);

			const removeCell = document.createElement('td');
			const removeAssignments = state.apartmentAssignments[item.id] || [];
			if (removeAssignments.length) {
				const removeSelect = document.createElement('select');
				removeSelect.className = 'regular-text';
				removeAssignments.forEach(function (entry) {
					const option = document.createElement('option');
					option.value = entry.key || '';
					option.textContent = getDisplayLabel(entry.key || '', state);
					removeSelect.append(option);
				});
				const removeButton = document.createElement('button');
				removeButton.type = 'button';
				removeButton.className = 'button';
				removeButton.style.marginTop = '6px';
				removeButton.textContent = 'Eltávolítás a lakástól';
				removeButton.addEventListener('click', async function (event) {
					event.preventDefault();
					event.stopPropagation();
					const targetApartmentKey = removeSelect.value || '';
					if (!targetApartmentKey) {
						return;
					}
				if (!window.confirm('Eltávolítod ezt a képet az adott lakástól? A médiatárból nem törlődik.')) {
						return;
					}

					updateButtonLoading(removeButton, true, 'Eltávolítás a lakástól', 'Eltávolítás...');
					try {
						await removeMediaFromApartment(state, item.id, targetApartmentKey);
						state.libraryStatusMessage = '✓ Kép eltávolítva a kiválasztott lakásból.';
						state.libraryStatusType = 'success';
						await loadAllAssignments(state);
						if (state.selectedApartmentKey === targetApartmentKey) {
							await loadSelectedGallery(state);
						}
						preserveScroll(refresh);
					} catch (error) {
						state.libraryStatusMessage =
							'✕ Eltávolítási hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
						state.libraryStatusType = 'error';
						preserveScroll(refresh);
					}
				});
				removeCell.append(removeSelect, removeButton);
			} else {
				removeCell.textContent = '-';
			}

			row.append(
				thumbCell,
				createTableCell('td', item.fileName || item.title || item.url || item.id || '-'),
				assignedCell,
				categoryCell,
				actionCell,
				webpActionCell,
				removeCell
			);
			tbody.append(row);
		});
		table.append(thead, tbody);
		module.append(table);
		container.append(module);
	}

	function renderSeoCard(state, item, refresh) {
		const detailedSourceItem = getDetailedMediaSourceItem(state, item.id, item);
		const card = document.createElement('article');
		card.className = 'dnd-library-card dnd-seo-card';
		const isSelected = state.selectedSeoMediaIds.indexOf(item.id) !== -1;
		if (isSelected) {
			card.classList.add('is-selected');
		}
		card.setAttribute('role', 'button');
		card.setAttribute('tabindex', '0');

		const imageWrap = document.createElement('div');
		imageWrap.className = 'dnd-library-card__image';
		const img = createThumb(item.thumb || item.url, item.title || item.fileName || 'preview', 'dnd-library-thumb');
		imageWrap.append(img);

		function openSeoModal(event) {
			event.preventDefault();
			event.stopPropagation();
			openModal(state, item.id, refresh);
		}

		card.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			const index = state.selectedSeoMediaIds.indexOf(item.id);
			if (index === -1) {
				state.selectedSeoMediaIds.push(item.id);
			} else {
				state.selectedSeoMediaIds.splice(index, 1);
			}
			preserveScroll(refresh);
		});
		card.addEventListener('keydown', function (event) {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				event.stopPropagation();
				const index = state.selectedSeoMediaIds.indexOf(item.id);
				if (index === -1) {
					state.selectedSeoMediaIds.push(item.id);
				} else {
					state.selectedSeoMediaIds.splice(index, 1);
				}
				preserveScroll(refresh);
			}
		});

		const previewButton = document.createElement('button');
		previewButton.type = 'button';
		previewButton.className = 'dnd-library-card__preview-button';
		previewButton.textContent = 'Megnezes';
		previewButton.addEventListener('click', openSeoModal);
		imageWrap.append(previewButton);

		const check = document.createElement('div');
		check.className = 'dnd-library-card__check';
		check.textContent = '✓';
		imageWrap.append(check);

		const footer = document.createElement('div');
		footer.className = 'dnd-seo-card__meta';
		const title = document.createElement('strong');
		title.textContent = item.title || item.fileName || item.id || '-';
		title.title = item.title || item.fileName || item.id || '-';

		const badgeRow = document.createElement('div');
		badgeRow.className = 'dnd-seo-card__badges';
		badgeRow.append(createBadge(getImageTypeBadgeLabel(inferImageType(state, detailedSourceItem)), 'muted'));
		Array.from(renderSeoGridBadgeRow(detailedSourceItem).children).slice(0, 3).forEach(function (badge) {
			badgeRow.append(badge);
		});

		const details = document.createElement('p');
		details.className = 'dnd-seo-card__details';
		details.textContent = getSeoDetailText(state, detailedSourceItem);

		const primaryIssue = document.createElement('p');
		primaryIssue.className = 'dnd-seo-card__primary-issue';
		primaryIssue.textContent = getSeoPrimaryIssueLabel(detailedSourceItem);

		footer.append(title, badgeRow, primaryIssue, details);

		card.append(imageWrap, footer);
		return card;
	}

	function renderSeoModule(container, state, refresh) {
		const module = document.createElement('section');
		module.className = 'dnd-module';

		const title = document.createElement('h3');
		title.className = 'dandelion-image-admin-bundle__title';
		title.style.fontSize = '18px';
		title.textContent = 'SEO eszkozok';
		module.append(title);

		const controls = document.createElement('div');
		controls.className = 'dnd-controls-grid';

		const apartmentField = createSelectField('Lakas szerint');
		// [CHANGE 2026-04-30] lakás és kategória select források szétválasztása
		[
			{ key: 'all', name: 'Osszes' }
		].concat(
			getApartmentGroupOptions(state).map(function (item) {
				return {
					key: item.value || '',
					name: item.label || getDisplayLabel(item.value || '', state)
				};
			})
		).forEach(function (item) {
			const option = document.createElement('option');
			option.value = item.key || '';
			option.textContent = (item.key || '') === 'all' ? 'Osszes' : getDisplayLabel(item.key || '', state);
			option.selected = (item.key || '') === state.seoApartmentFilter;
			apartmentField.select.append(option);
		});

		const statusField = createSelectField('SEO allapot');
		[
			{ value: 'all', label: 'Osszes' },
			{ value: 'incomplete', label: 'Hianyos' },
			{ value: 'unapproved', label: 'Nincs elfogadva' },
			{ value: 'approved', label: 'Elfogadott' },
			{ value: 'review', label: 'Hibas / ellenorizendo' }
		].forEach(function (item) {
			const option = document.createElement('option');
			option.value = item.value;
			option.textContent = item.label;
			option.selected = item.value === state.seoStatusFilter;
			statusField.select.append(option);
		});

		const searchField = createInputField('Kereso', state.seoSearch || '', 'ID / cim / fajlnev');
		controls.append(apartmentField.wrapper, statusField.wrapper, searchField.wrapper);
		module.append(controls);

		apartmentField.select.addEventListener('change', function () {
			state.seoApartmentFilter = apartmentField.select.value || 'all';
			state.selectedSeoMediaIds = [];
			preserveScroll(refresh);
		});
		statusField.select.addEventListener('change', function () {
			state.seoStatusFilter = statusField.select.value || 'all';
			state.selectedSeoMediaIds = [];
			preserveScroll(refresh);
		});
		searchField.input.addEventListener('input', function () {
			state.seoSearch = searchField.input.value || '';
			state.selectedSeoMediaIds = [];
			preserveScroll(refresh);
		});

		const workbench = document.createElement('div');
		workbench.className = 'dnd-seo-workbench';
		const workbenchTitle = document.createElement('div');
		workbenchTitle.className = 'dnd-seo-workbench__title';
		workbenchTitle.textContent = 'Munkanézet';
		workbench.append(workbenchTitle);

		const workbenchActions = document.createElement('div');
		workbenchActions.className = 'dnd-seo-workbench__actions';
		const workbenchCounts = getSeoWorkbenchCounts(state);

		getSeoWorkbenchOptions().forEach(function (option) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button dnd-workbench-button' + (state.seoWorkbenchFilter === option.value ? ' is-active' : '');
			button.textContent = option.label + ' (' + (workbenchCounts[option.value] || 0) + ')';
			button.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				state.seoWorkbenchFilter = option.value;
				state.selectedSeoMediaIds = [];
				preserveScroll(refresh);
			});
			workbenchActions.append(button);
		});

		workbench.append(workbenchActions);
		module.append(workbench);

		const viewBar = document.createElement('div');
		viewBar.className = 'dnd-actions-row';
		const gridButton = document.createElement('button');
		gridButton.type = 'button';
		gridButton.className = 'button dnd-tab-button' + (state.seoView === 'grid' ? ' is-active' : '');
		gridButton.textContent = 'Racs nezet';
		const listButton = document.createElement('button');
		listButton.type = 'button';
		listButton.className = 'button dnd-tab-button' + (state.seoView === 'list' ? ' is-active' : '');
		listButton.textContent = 'Lista nezet';
		gridButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.seoView = 'grid';
			preserveScroll(refresh);
		});
		listButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.seoView = 'list';
			preserveScroll(refresh);
		});
		viewBar.append(gridButton, listButton);
		module.append(viewBar);

		const items = getSeoVisibleItems(state);

		const summary = createStatus(
			'SEO elemek ezen a lapon: ' + items.length + ' (a munkanézet a jelenleg betöltött képekből számol)',
			''
		);
		module.append(summary);
		module.append(renderLibraryPaginator(state, refresh));

		const bulkBar = document.createElement('div');
		bulkBar.className = 'dnd-actions-row';
		const bulkCount = createStatus('Kijelolve: ' + state.selectedSeoMediaIds.length + ' kep', '');
		bulkCount.style.margin = '0';
		const generateButton = document.createElement('button');
		generateButton.type = 'button';
		generateButton.className = 'button';
		generateButton.textContent = 'Kijelolt kepek SEO javaslat generalasa';
		generateButton.disabled = !state.selectedSeoMediaIds.length;
		const saveSelectedButton = document.createElement('button');
		saveSelectedButton.type = 'button';
		saveSelectedButton.className = 'button button-primary';
		saveSelectedButton.textContent = 'Kitoltott SEO mezok mentese';
		saveSelectedButton.disabled = !state.selectedSeoMediaIds.length;
		const bulkStatus = createStatus(state.seoBulkMessage || '', state.seoBulkType || '');
		bulkStatus.style.margin = '0';

		generateButton.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			if (!state.selectedSeoMediaIds.length) {
				state.seoBulkMessage = 'Nincs kijelolt SEO kep.';
				state.seoBulkType = 'error';
				preserveScroll(refresh);
				return;
			}

			let changedImages = 0;
			let filledFields = 0;
			let unchangedImages = 0;

			state.selectedSeoMediaIds.forEach(function (mediaId) {
				const item = getSeoEffectiveMediaItem(state, mediaId);
				if (!item) {
					return;
				}

				const suggestion = buildSeoSuggestions(state, item);
				const currentDraft = Object.assign({}, getSeoDraft(state, mediaId) || {});
				let changed = false;

				[
					['alt', suggestion.alt],
					['title', suggestion.title],
					['caption', suggestion.caption],
					['description', suggestion.description]
				].forEach(function (entry) {
					const field = entry[0];
					const value = entry[1] || '';
					const currentValue = typeof item[field] === 'string' ? item[field].trim() : '';
					if (!currentValue && value && !hasEncodingIssue(value)) {
						currentDraft[field] = value;
						filledFields += 1;
						changed = true;
					}
				});

				if (changed) {
					state.seoDraftsByMediaId[String(mediaId)] = currentDraft;
					changedImages += 1;
				} else {
					unchangedImages += 1;
				}
			});

			state.seoBulkMessage =
				'Javaslat kész. Érintett képek: ' +
				changedImages +
				', kitöltött mezők: ' +
				filledFields +
				', változatlan képek: ' +
				unchangedImages +
				'.';
			state.seoBulkType = changedImages ? 'success' : 'error';
			preserveScroll(refresh);
		});

		saveSelectedButton.addEventListener('click', async function (event) {
			event.preventDefault();
			event.stopPropagation();
			if (!state.selectedSeoMediaIds.length) {
				state.seoBulkMessage = 'Nincs kijelolt SEO kep.';
				state.seoBulkType = 'error';
				preserveScroll(refresh);
				return;
			}

			updateButtonLoading(saveSelectedButton, true, 'Kitoltott SEO mezok mentese', 'Mentés...');
			let savedCount = 0;
			let unchangedCount = 0;
			let errorCount = 0;

			for (const mediaId of state.selectedSeoMediaIds) {
				const item = getSeoEffectiveMediaItem(state, mediaId);
				const draft = getSeoDraft(state, mediaId);
				if (!item || !draft) {
					unchangedCount += 1;
					continue;
				}

				try {
					await updateMediaSeo(state, mediaId, {
						alt: typeof draft.alt === 'string' ? draft.alt : item.alt,
						title: typeof draft.title === 'string' ? draft.title : item.titleRaw || item.title,
						caption: typeof draft.caption === 'string' ? draft.caption : item.caption,
						description: typeof draft.description === 'string' ? draft.description : item.description
					});
					delete state.seoDraftsByMediaId[String(mediaId)];
					savedCount += 1;
				} catch (error) {
					errorCount += 1;
				}
			}

			if (errorCount > 0) {
				state.seoBulkMessage =
					'Tömeges SEO mentés részben hibás. Mentve: ' +
					savedCount +
					', változatlan: ' +
					unchangedCount +
					', hibás: ' +
					errorCount +
					'.';
				state.seoBulkType = 'error';
			} else {
				state.seoBulkMessage =
					'Tömeges SEO mentés kész. Mentve: ' +
					savedCount +
					', változatlan: ' +
					unchangedCount +
					'.';
				state.seoBulkType = 'success';
			}

			preserveScroll(refresh);
		});

		bulkBar.append(bulkCount, generateButton, saveSelectedButton, bulkStatus);
		module.append(bulkBar);

		if (!items.length) {
			module.append(createStatus('Nincs a szuroknek megfelelo kep ezen az oldalon.', ''));
			container.append(module);
			return;
		}

		const cards = document.createElement('div');
		cards.className = 'dnd-library-grid dnd-seo-inline-grid';
		items.forEach(function (item) {
			const card = document.createElement('article');
			card.className = 'dnd-library-card dnd-seo-inline-card';

			const imageWrap = document.createElement('div');
			imageWrap.className = 'dnd-library-card__image';
			const img = createThumb(item.thumb || item.url, item.title || item.fileName || 'preview', 'dnd-library-thumb');
			imageWrap.append(img);

			const body = document.createElement('div');
			body.className = 'dnd-seo-card__meta';
			const name = document.createElement('strong');
			name.textContent = item.title || item.fileName || item.id || '-';
			const assignWrap = document.createElement('p');
			assignWrap.className = 'dnd-seo-card__details';
			const assignments = state.apartmentAssignments[item.id] || [];
			assignWrap.textContent = assignments.length
				? assignments.map(function (entry) { return getDisplayLabel(entry.key, state); }).join(', ')
				: getDisplayLabel(getMediaCategory(state, item), state);
			const statusText = document.createElement('p');
			statusText.className = 'dnd-seo-card__primary-issue';
			statusText.textContent = getSeoStatusSummary(item);
			const toggle = document.createElement('button');
			toggle.type = 'button';
			toggle.className = 'button';
			toggle.textContent = 'SEO szerkesztés';
			toggle.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				openModal(state, item.id, refresh);
			});
			body.append(name, assignWrap, statusText, toggle);
			card.append(imageWrap, body);
			cards.append(card);
		});

		module.append(cards);
		module.append(renderLibraryPaginator(state, refresh));
		container.append(module);
	}

	// [CHANGE 2026-04-30] Media detail modal compact accordion layout
	function renderModal(container, state, refresh) {
		if (!state.modal.open) {
			return;
		}

		const overlay = document.createElement('div');
		overlay.className = 'dnd-modal-overlay';
		overlay.addEventListener('click', function () {
			closeModal(state, refresh);
		});

		const dialog = document.createElement('div');
		dialog.className = 'dnd-modal';
		dialog.addEventListener('click', function (event) {
			event.stopPropagation();
		});
		const topRow = document.createElement('div');
		topRow.className = 'dnd-modal__top-row';
		const bottomAccordion = document.createElement('div');
		bottomAccordion.className = 'dnd-modal__bottom-accordion';

		const closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.className = 'dnd-modal__close';
		closeButton.textContent = 'X';
		closeButton.addEventListener('click', function (event) {
			event.preventDefault();
			closeModal(state, refresh);
		});

		dialog.append(closeButton);

		if (state.modal.status && !state.modal.details) {
			dialog.append(createStatus(state.modal.status, state.modal.status === 'Betoltes...' ? '' : 'error'));
			overlay.append(dialog);
			container.append(overlay);
			return;
		}

		const details = state.modal.details || {};
		const currentMedia = getSeoEffectiveMediaItem(state, details.id || state.modal.mediaId) || null;
		const seoVisibleItems = state.activeTab === 'seo' ? getSeoVisibleItems(state) : [];
		const currentSeoIndex = seoVisibleItems.findIndex(function (item) {
			return item.id === (details.id || state.modal.mediaId);
		});
		const image = createThumb(details.url || details.thumb || '', details.title || 'preview', 'dnd-modal__image');
		const imageWrap = document.createElement('div');
		imageWrap.className = 'dnd-modal__image-wrap';
		imageWrap.append(image);

		const info = document.createElement('div');
		info.className = 'dnd-modal__info';
		const seoSourceItem = getSeoStatusSourceItem(state, details.id || state.modal.mediaId, {
			id: details.id || state.modal.mediaId,
			title: details.title || '',
			titleRaw: details.title || '',
			fileName: details.fileName || '',
			alt: details.alt || '',
			caption: details.caption || '',
			description: details.description || '',
			approved: !!details.approved,
			manualTheme: state.modal.themeDraft || '',
			imageType: state.modal.imageTypeDraft || ''
		}) || {
			id: details.id || state.modal.mediaId,
			title: details.title || '',
			titleRaw: details.title || '',
			fileName: details.fileName || '',
			alt: details.alt || '',
			caption: details.caption || '',
			description: details.description || '',
			approved: !!details.approved,
			manualTheme: state.modal.themeDraft || '',
			imageType: state.modal.imageTypeDraft || ''
		};
		const modalAssignmentText = getAssignmentSummary(state, seoSourceItem);
		const modalCategoryText = getDisplayLabel(getMediaCategory(state, seoSourceItem), state);
		const modalStatusSummary = getMediaStatusSummary(state, details.id || state.modal.mediaId, seoSourceItem);
		const preparedState = modalStatusSummary.webpPreparedState;
		const fields = document.createElement('div');
		fields.className = 'dnd-modal__fields';
		const altField = document.createElement('label');
		altField.className = 'dnd-modal__field';
		const altLabel = document.createElement('span');
		altLabel.className = 'dnd-control__label';
		altLabel.textContent = 'Alt text';
		const altInput = document.createElement('textarea');
		altInput.className = 'regular-text';
		altInput.value = (state.modal.details && state.modal.details.alt) || details.alt || '';
		altInput.rows = 2;
		altField.append(altLabel, altInput);

		const titleField = document.createElement('label');
		titleField.className = 'dnd-modal__field';
		const titleLabel = document.createElement('span');
		titleLabel.className = 'dnd-control__label';
		titleLabel.textContent = 'Title';
		const titleInput = document.createElement('input');
		titleInput.type = 'text';
		titleInput.className = 'regular-text';
		titleInput.value = (state.modal.details && state.modal.details.title) || details.title || '';
		titleField.append(titleLabel, titleInput);

		const captionField = document.createElement('label');
		captionField.className = 'dnd-modal__field';
		const captionLabel = document.createElement('span');
		captionLabel.className = 'dnd-control__label';
		captionLabel.textContent = 'Caption';
		const captionInput = document.createElement('textarea');
		captionInput.className = 'regular-text';
		captionInput.value = (state.modal.details && state.modal.details.caption) || details.caption || '';
		captionInput.rows = 3;
		captionField.append(captionLabel, captionInput);

		const descriptionField = document.createElement('label');
		descriptionField.className = 'dnd-modal__field';
		const descriptionLabel = document.createElement('span');
		descriptionLabel.className = 'dnd-control__label';
		descriptionLabel.textContent = 'Description';
		const descriptionInput = document.createElement('textarea');
		descriptionInput.className = 'regular-text';
		descriptionInput.value = (state.modal.details && state.modal.details.description) || details.description || '';
		descriptionInput.rows = 4;
		descriptionField.append(descriptionLabel, descriptionInput);

		const themeField = document.createElement('label');
		themeField.className = 'dnd-modal__field';
		const themeLabel = document.createElement('span');
		themeLabel.className = 'dnd-control__label';
		themeLabel.textContent = 'Képen látható / téma';
		// [CHANGE 2026-04-30] Persist SEO topic field and compact SEO panel
		const themeInput = document.createElement('textarea');
		themeInput.className = 'regular-text';
		themeInput.value = state.modal.themeDraft || details.manualTheme || getPersistedSeoTopic(state, details.id || state.modal.mediaId) || '';
		themeInput.rows = 2;
		themeInput.placeholder = 'pl. emeleti hálószoba tetőablakkal, kilátással a Badacsonyra';
		themeInput.addEventListener('input', function () {
			state.modal.themeDraft = themeInput.value;
			setPersistedSeoTopic(state, details.id || state.modal.mediaId, themeInput.value);
		});
		themeField.append(themeLabel, themeInput);
		const imageTypeField = document.createElement('label');
		imageTypeField.className = 'dnd-modal__field';
		const imageTypeLabel = document.createElement('span');
		imageTypeLabel.className = 'dnd-control__label';
		imageTypeLabel.textContent = 'Kép típusa';
		const imageTypeSelect = document.createElement('select');
		imageTypeSelect.className = 'regular-text';
		getImageTypeOptions().forEach(function (optionItem) {
			const option = document.createElement('option');
			option.value = optionItem.value;
			option.textContent = optionItem.label;
			option.selected = optionItem.value === (state.modal.imageTypeDraft || inferImageType(state, seoSourceItem));
			imageTypeSelect.append(option);
		});
		imageTypeSelect.addEventListener('change', function () {
			state.modal.imageTypeDraft = imageTypeSelect.value;
			syncModalDetailsFromInputs();
			updateSeoQualityState();
		});
		imageTypeField.append(imageTypeLabel, imageTypeSelect);

		fields.append(
			createRow('Media ID', details.id || 'Nincs kitoltve'),
			createRow('Fajlnev / cim', details.fileName || currentMedia && currentMedia.fileName || details.title || 'Nincs kitoltve'),
			createRow('URL', details.url || 'Nincs kitoltve'),
			createRow('Lakás / társítás', modalAssignmentText),
			createRow('Kategória', modalCategoryText),
			altField,
			titleField,
			captionField,
			descriptionField,
			themeField,
			imageTypeField
		);

		let approveButton = null;

		function syncModalDetailsFromInputs() {
			const mediaKey = String(details.id || state.modal.mediaId || '');
			state.modal.details = Object.assign({}, state.modal.details || details, {
				id: mediaKey,
				title: titleInput.value.trim(),
				alt: altInput.value.trim(),
				caption: captionInput.value.trim(),
				description: descriptionInput.value.trim(),
				manualTheme: themeInput.value.trim(),
				url: details.url || '',
				fileName: details.fileName || '',
				thumb: details.thumb || '',
				approved: !!((state.modal.details && state.modal.details.approved) || details.approved)
			});
			if (mediaKey) {
				state.seoDraftsByMediaId[mediaKey] = Object.assign({}, state.seoDraftsByMediaId[mediaKey] || {}, {
					alt: altInput.value.trim(),
					title: titleInput.value.trim(),
					caption: captionInput.value.trim(),
					description: descriptionInput.value.trim(),
					manualTheme: themeInput.value.trim(),
					imageType: imageTypeSelect.value
				});
			}
		}

		function getModalSeoPreviewItem() {
			return Object.assign({}, seoSourceItem, {
				id: details.id || state.modal.mediaId,
				alt: altInput.value.trim(),
				title: titleInput.value.trim(),
				titleRaw: titleInput.value.trim(),
				caption: captionInput.value.trim(),
				description: descriptionInput.value.trim(),
				manualTheme: themeInput.value.trim(),
				imageType: imageTypeSelect.value
			});
		}

		function isSeoApprovalReady() {
			return !!altInput.value.trim() && !!titleInput.value.trim() && !!captionInput.value.trim();
		}

		function updateApproveButtonState() {
			if (!approveButton) {
				return;
			}

			approveButton.disabled = !!state.modal.isApproving || !isSeoApprovalReady();
		}

		if (state.activeTab === 'seo' && currentSeoIndex !== -1) {
			const navRow = document.createElement('div');
			navRow.className = 'dnd-actions-row';
			const prevButton = document.createElement('button');
			prevButton.type = 'button';
			prevButton.className = 'button';
			prevButton.textContent = 'Előző kép';
			prevButton.disabled = currentSeoIndex <= 0;
			prevButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (currentSeoIndex > 0) {
					openModal(state, seoVisibleItems[currentSeoIndex - 1].id, refresh);
				}
			});
			const nextButton = document.createElement('button');
			nextButton.type = 'button';
			nextButton.className = 'button';
			nextButton.textContent = 'Következő kép';
			nextButton.disabled = currentSeoIndex === -1 || currentSeoIndex >= seoVisibleItems.length - 1;
			nextButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (currentSeoIndex !== -1 && currentSeoIndex < seoVisibleItems.length - 1) {
					openModal(state, seoVisibleItems[currentSeoIndex + 1].id, refresh);
				}
			});
			navRow.append(prevButton, nextButton);
			info.append(navRow);
		}
		info.append(fields);
		const summaryRows = document.createElement('div');
		summaryRows.className = 'dnd-modal__fields dnd-modal__summary';
		for (let movedIndex = 0; movedIndex < 5; movedIndex += 1) {
			if (!fields.firstChild) {
				break;
			}
			summaryRows.append(fields.firstChild);
		}
		summaryRows.append(
			createRow('Kép típusa', getImageTypeBadgeLabel(state.modal.imageTypeDraft || inferImageType(state, seoSourceItem))),
			createRow('Képméret', formatPixelSize(details.width, details.height)),
			createRow('Fájlméret', formatFileSize(details.fileSize))
		);
		const summaryStatusValue = document.createElement('div');
		summaryStatusValue.className = 'dnd-badge-row';
		summaryStatusValue.append(
			createStatusBadge(modalStatusSummary.seoLabel, modalStatusSummary.seoKind),
			createStatusBadge(modalStatusSummary.webpLabel, modalStatusSummary.webpKind)
		);
		summaryRows.append(createRichRow('Állapotok', summaryStatusValue));
		summaryRows.append(
			createRichRow('URL', createCopyableValue(details.url || '')),
			createRichRow('WebP URL', createCopyableValue(preparedState && preparedState.webpUrl ? preparedState.webpUrl : ''))
		);
		info.insertBefore(summaryRows, fields);

		const renameSection = document.createElement('div');
		renameSection.className = 'dnd-modal__rename';
		const renameTitle = document.createElement('div');
		renameTitle.className = 'dnd-modal__badge-title';
		renameTitle.textContent = 'Fájlnév átnevezése';
		const currentFileRow = createRow('Jelenlegi fájlnév', details.fileName || 'Nincs kitöltve');
		const renameField = document.createElement('label');
		renameField.className = 'dnd-modal__field';
		const renameLabel = document.createElement('span');
		renameLabel.className = 'dnd-control__label';
		renameLabel.textContent = 'Új fájlnév (.webp marad)';
		const renameInput = document.createElement('input');
		renameInput.type = 'text';
		renameInput.className = 'regular-text';
		renameInput.value = state.modal.renameDraft || getFileStem(details.fileName || '');
		renameInput.placeholder = 'slug-forma-fajlnev';
		renameInput.disabled = !details.fileName || !!state.modal.renameSaving;
		renameInput.addEventListener('input', function () {
			state.modal.renameDraft = renameInput.value;
		});
		[altInput, titleInput, captionInput, descriptionInput, themeInput].forEach(function (input) {
			input.addEventListener('input', function () {
				syncModalDetailsFromInputs();
				updateApproveButtonState();
				updateSeoQualityState();
			});
		});
		renameField.append(renameLabel, renameInput);

		const renameButton = document.createElement('button');
		renameButton.type = 'button';
		renameButton.className = 'button';
		renameButton.textContent = 'Fájlnév átnevezése';
		renameButton.disabled = true;
		renameButton.title = 'Ehhez külön, biztonságos plugin REST endpoint kell a fájl és a kapcsolódó metadata átírásához.';

		const renameHelp = document.createElement('p');
		renameHelp.className = 'dnd-modal__details-note';
		renameHelp.textContent =
			'Előkészített állapot. A tényleges fájlnév átíráshoz külön WordPress plugin endpoint kell, hogy a fájl, az attachment meta és a kapcsolódó méretek együtt frissüljenek.';

		renameSection.append(renameTitle, currentFileRow, renameField, renameButton, renameHelp);
		renameButton.textContent = 'Fájlnév átnevezése';
		updateButtonLoading(renameButton, !!state.modal.renameSaving, 'Fájlnév átnevezése', 'Átnevezés...');
		renameButton.disabled = !details.fileName || !!state.modal.renameSaving || !renameInput.value.trim();
		renameButton.title = details.fileName
			? 'A rendszer a fájlt és a WordPress attachment metadata adatait együtt frissíti.'
			: 'Ehhez a médiához jelenleg nincs elérhető fájlnév.';
		renameHelp.textContent =
			'Csak slug-formátumú nevet adj meg. A .webp kiterjesztés megmarad, és az ütköző célfájlneveket a rendszer nem írja felül.';
		const renameStatus = createStatus(state.modal.renameMessage || '', state.modal.renameType || '');
		renameStatus.style.margin = '0';
		renameSection.append(renameStatus);
		renameButton.addEventListener('click', async function (event) {
			event.preventDefault();
			event.stopPropagation();
			const nextSlug = renameInput.value.trim();
			if (!nextSlug) {
				state.modal.renameMessage = 'Adj meg egy új slug formátumú fájlnevet.';
				state.modal.renameType = 'error';
				preserveScroll(refresh);
				return;
			}

			state.modal.renameSaving = true;
			state.modal.renameMessage = '';
			state.modal.renameType = '';
			preserveScroll(refresh);
			try {
				const payload = await renameMediaFile(state, details.id || state.modal.mediaId, nextSlug);
				const updatedFileName =
					payload && payload.media && typeof payload.media.fileName === 'string'
						? payload.media.fileName
						: '';
				state.modal.renameDraft = getFileStem(updatedFileName);
				state.modal.renameMessage = 'Fájlnév sikeresen átnevezve.';
				state.modal.renameType = 'success';
			} catch (error) {
				state.modal.renameMessage =
					'Fájlnév átnevezési hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.modal.renameType = 'error';
			} finally {
				state.modal.renameSaving = false;
				preserveScroll(refresh);
			}
		});

		let webpSection = null;
		let webpActionButton = null;
		let webpActionStatus = null;
		let webpGeneratedList = null;
		if (state.activeTab !== 'seo' && state.modal.source !== 'used-seo') {
			webpSection = document.createElement('div');
			webpSection.className = 'dnd-modal__rename';
			const webpTitle = document.createElement('div');
			webpTitle.className = 'dnd-modal__badge-title';
			webpTitle.textContent = 'WebP előkészítés';
			const webpInfo = prepareWebpSuggestion(Object.assign({}, seoSourceItem, details));
			const preparedState = state.webpPreparationByMediaId[String(details.id || state.modal.mediaId)] || null;
			const webpStatusText = preparedState || state.modal.webpPrepared || webpInfo.currentType === 'webp' ? 'WebP kész' : 'Még nincs WebP feldolgozás';
			const webpButton = document.createElement('button');
			webpButton.type = 'button';
			webpButton.className = 'button';
			updateButtonLoading(webpButton, !!state.modal.webpPreparing, 'WebP előkészítés', 'Előkészítés...');
			const webpStatus = createStatus(state.modal.status || '', state.modal.status && state.modal.status.indexOf('WebP hiba:') === 0 ? 'error' : '');
			webpButton.addEventListener('click', async function (event) {
				event.preventDefault();
				event.stopPropagation();
				state.modal.webpPreparing = true;
				state.modal.status = '';
				preserveScroll(refresh);
				try {
					const response = await convertMediaToWebp(state, details.id || state.modal.mediaId);
					state.webpPreparationByMediaId[String(details.id || state.modal.mediaId)] = {
						suggestedWebpFileName: webpInfo.suggestedWebpFileName,
						status: response && response.status ? response.status : 'ready',
						webpUrl: response && response.webpUrl ? response.webpUrl : '',
						webpPath: response && response.webpPath ? response.webpPath : '',
						width: response && response.width ? Number(response.width) : 0,
						height: response && response.height ? Number(response.height) : 0,
						fileSize: response && response.fileSize ? Number(response.fileSize) : 0
					};
					saveWebpPreparationState(state);
					state.modal.webpPrepared = true;
					state.modal.status = 'WebP elkészült.';
				} catch (error) {
					state.modal.status = 'WebP hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				} finally {
					state.modal.webpPreparing = false;
					preserveScroll(refresh);
				}
			});
			webpActionButton = webpButton;
			webpActionStatus = webpStatus;
			// [TODO WEBP CONVERSION] ide köthető később a tényleges szerveroldali WebP feldolgozás.
			webpSection.append(
				webpTitle,
				createRow('Jelenlegi fájltípus', webpInfo.currentType || 'ismeretlen'),
				createRichRow('F\u00e1jl URL', createCopyableValue(webpInfo.url || '')),
				createRow('Javasolt WebP fájlnév', webpInfo.suggestedWebpFileName || 'Nincs kitöltve'),
				createRow('Státusz', webpStatusText),
				createRichRow('WebP URL', createCopyableValue(preparedState && preparedState.webpUrl ? preparedState.webpUrl : '')),
				createRow(
					'Méret',
					preparedState && preparedState.width && preparedState.height
						? String(preparedState.width) + '×' + String(preparedState.height) + ' px'
						: 'Nincs kitöltve'
				),
				createRow(
				'F\u00e1jlm\u00e9ret',
				preparedState && preparedState.fileSize ? formatFileSize(preparedState.fileSize) : 'Nincs kit\u00f6ltve'
				),
				webpButton,
				webpStatus
			);
			if (preparedState && preparedState.webpUrl) {
				const generatedList = document.createElement('div');
				generatedList.className = 'dnd-modal__fields';
				generatedList.append(
					createRow('Generált fájl neve', preparedState.suggestedWebpFileName || preparedState.webpUrl.split('/').pop() || 'Nincs kitöltve'),
					createRow('Generált méret', formatPixelSize(preparedState.width, preparedState.height)),
					createRow('Generált fájlméret', formatFileSize(preparedState.fileSize)),
					createRichRow('Generált URL', createCopyableValue(preparedState.webpUrl || ''))
				);
				webpGeneratedList = generatedList;
				webpSection.append(generatedList);
			}
		}

		const badgeTitle = document.createElement('div');
		badgeTitle.className = 'dnd-modal__badge-title';
		badgeTitle.textContent = 'T\u00e1rs\u00edtott lak\u00e1sok';
		const seoTitle = document.createElement('div');
		seoTitle.className = 'dnd-modal__badge-title';
		seoTitle.textContent = 'SEO \u00e1llapot';
		const seoSummary = document.createElement('p');
		seoSummary.className = 'dandelion-image-admin-bundle__status';
		seoSummary.style.margin = '0';
		seoSummary.textContent = getSeoStatusSummary(getModalSeoPreviewItem());
		let seoWarningsBlock = createSeoWarningsBlock(getSeoAnalysis(getModalSeoPreviewItem()));
		if (!seoWarningsBlock) {
			seoWarningsBlock = document.createElement('div');
		}
		function updateSeoQualityState() {
			const previewItem = getModalSeoPreviewItem();
			seoSummary.textContent = getSeoStatusSummary(previewItem);
			const nextWarnings = createSeoWarningsBlock(getSeoAnalysis(previewItem));
			seoWarningsBlock.replaceWith(nextWarnings || document.createElement('div'));
			seoWarningsBlock = nextWarnings || document.createElement('div');
		}
		const seoPlaceholderButton = document.createElement('button');
		seoPlaceholderButton.type = 'button';
		seoPlaceholderButton.className = 'button';
		// [TODO SEO GENERATOR] ide jön később az automatikus SEO javaslat generálás
		seoPlaceholderButton.textContent = 'SEO javaslat generálása';
		seoPlaceholderButton.disabled = false;
		seoPlaceholderButton.title = 'Szabályalapú SEO javaslatot készít a jelenlegi adatokból.';
		const suggestionStatus = createStatus(state.modal.suggestionMessage || '', state.modal.suggestionType || '');
		suggestionStatus.style.margin = '0';
		const suggestionSection = document.createElement('div');
		suggestionSection.className = 'dnd-suggestion-panel' + (state.modal.suggestionData ? ' is-visible' : '');
		const suggestionToggle = document.createElement('label');
		suggestionToggle.className = 'dnd-suggestion-panel__toggle';
		const suggestionCheckbox = document.createElement('input');
		suggestionCheckbox.type = 'checkbox';
		suggestionCheckbox.checked = !!state.modal.onlyMissingFields;
		suggestionCheckbox.addEventListener('change', function () {
			state.modal.onlyMissingFields = suggestionCheckbox.checked;
		});
		const suggestionCheckboxText = document.createElement('span');
		suggestionCheckboxText.textContent = 'Csak hiányzó mezők kitöltése';
		suggestionToggle.append(suggestionCheckbox, suggestionCheckboxText);
		suggestionSection.append(suggestionToggle);

		if (state.modal.suggestionData) {
			[
				{ label: 'Alt javaslat', value: state.modal.suggestionData.alt },
				{ label: 'Title javaslat', value: state.modal.suggestionData.title },
				{ label: 'Caption javaslat', value: state.modal.suggestionData.caption },
				{ label: 'Description javaslat', value: state.modal.suggestionData.description },
				{ label: 'Fájlnév slug javaslat', value: state.modal.suggestionData.slug }
			].forEach(function (entry) {
				const row = document.createElement('div');
				row.className = 'dnd-suggestion-panel__row';
				const label = document.createElement('strong');
				label.textContent = entry.label;
				const text = document.createElement('p');
				text.textContent = entry.value || '-';
				row.append(label, text);
				suggestionSection.append(row);
			});

			const suggestionActions = document.createElement('div');
			suggestionActions.className = 'dnd-actions-row';
			const applySuggestionButton = document.createElement('button');
			applySuggestionButton.type = 'button';
			applySuggestionButton.className = 'button button-secondary';
			applySuggestionButton.textContent = 'Alkalmazás mezőkbe';
			const cancelSuggestionButton = document.createElement('button');
			cancelSuggestionButton.type = 'button';
			cancelSuggestionButton.className = 'button';
			cancelSuggestionButton.textContent = 'Mégse';

			applySuggestionButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				const suggestion = state.modal.suggestionData;
				const onlyMissing = !!state.modal.onlyMissingFields;

				if (!onlyMissing || !altInput.value.trim()) {
					altInput.value = suggestion.alt || '';
				}
				if (!onlyMissing || !titleInput.value.trim()) {
					titleInput.value = suggestion.title || '';
				}
				if (!onlyMissing || !captionInput.value.trim()) {
					captionInput.value = suggestion.caption || '';
				}
				if (!onlyMissing || !descriptionInput.value.trim()) {
					descriptionInput.value = suggestion.description || '';
				}
				if (!onlyMissing || !renameInput.value.trim()) {
					renameInput.value = suggestion.slug || '';
					state.modal.renameDraft = renameInput.value;
				}

				syncModalDetailsFromInputs();
				state.modal.suggestionMessage = 'Javaslatok mezőkbe töltve. Mentéshez kattints a SEO adatok mentése gombra.';
				state.modal.suggestionType = 'success';
				preserveScroll(refresh);
			});

			cancelSuggestionButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				state.modal.suggestionData = null;
				state.modal.suggestionMessage = '';
				state.modal.suggestionType = '';
				preserveScroll(refresh);
			});

			suggestionActions.append(applySuggestionButton, cancelSuggestionButton);
			suggestionSection.append(suggestionActions);
		}

		seoPlaceholderButton.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			const suggestionSource = Object.assign({}, seoSourceItem, {
				fileName: details.fileName || seoSourceItem.fileName || '',
				manualTheme: themeInput.value.trim(),
				title: titleInput.value.trim() || seoSourceItem.title || '',
				titleRaw: titleInput.value.trim() || seoSourceItem.titleRaw || '',
				alt: altInput.value.trim() || seoSourceItem.alt || '',
				caption: captionInput.value.trim() || seoSourceItem.caption || '',
				description: descriptionInput.value.trim() || seoSourceItem.description || '',
				url: details.url || seoSourceItem.url || ''
			});
			state.modal.suggestionData = buildSeoSuggestions(state, suggestionSource);
			state.modal.suggestionMessage = 'Javaslatok betöltve, Mentéshez kattints a SEO adatok mentése gombra.';
			state.modal.suggestionType = 'success';
			preserveScroll(refresh);
		});
		approveButton = document.createElement('button');
		approveButton.type = 'button';
		approveButton.className = 'button button-secondary';
		approveButton.textContent = 'SEO elfogadása';
		updateButtonLoading(approveButton, !!state.modal.isApproving, 'SEO elfogadása', 'Elfogadás...');
		updateApproveButtonState();
		const approveStatus = createStatus(state.modal.approveMessage || '', state.modal.approveType || '');
		approveStatus.style.margin = '0';

		approveButton.addEventListener('click', async function (event) {
			event.preventDefault();
			event.stopPropagation();
			if (!isSeoApprovalReady()) {
				state.modal.approveMessage = 'Az elfogadáshoz az Alt, Title és Caption mező kitöltése kötelező.';
				state.modal.approveType = 'error';
				preserveScroll(refresh);
				return;
			}

			state.modal.isApproving = true;
			state.modal.approveMessage = '';
			state.modal.approveType = '';
			preserveScroll(refresh);
			try {
				setPersistedSeoTopic(state, details.id || state.modal.mediaId, themeInput.value.trim());
				await updateMediaSeo(state, details.id || state.modal.mediaId, {
					alt: altInput.value.trim(),
					title: titleInput.value.trim(),
					caption: captionInput.value.trim(),
					description: descriptionInput.value.trim()
				});
				delete state.seoDraftsByMediaId[String(details.id || state.modal.mediaId)];
				await approveMediaSeo(state, details.id || state.modal.mediaId, true);
				state.modal.approveMessage = 'SEO elfogadva.';
				state.modal.approveType = 'success';
			} catch (error) {
				state.modal.approveMessage =
					'SEO elfogadási hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.modal.approveType = 'error';
			} finally {
				state.modal.isApproving = false;
				preserveScroll(refresh);
			}
		});
		const saveButton = document.createElement('button');
		saveButton.type = 'button';
		saveButton.className = 'button button-primary';
		saveButton.textContent = 'SEO adatok mentése';
		updateButtonLoading(saveButton, !!state.modal.isSaving, 'SEO adatok mentése', 'Mentés folyamatban...');
		const saveStatus = createStatus(state.modal.saveMessage || '', state.modal.saveType || '');
		saveStatus.style.margin = '0';

		saveButton.addEventListener('click', async function (event) {
			event.preventDefault();
			event.stopPropagation();
			state.modal.isSaving = true;
			state.modal.saveMessage = '';
			state.modal.saveType = '';
			preserveScroll(refresh);
			try {
				setPersistedSeoTopic(state, details.id || state.modal.mediaId, themeInput.value.trim());
				await updateMediaSeo(state, details.id || state.modal.mediaId, {
					alt: altInput.value.trim(),
					title: titleInput.value.trim(),
					caption: captionInput.value.trim(),
					description: descriptionInput.value.trim()
				});
				delete state.seoDraftsByMediaId[String(details.id || state.modal.mediaId)];
				state.modal.saveMessage = 'SEO adatok mentve.';
				state.modal.saveType = 'success';
			} catch (error) {
				state.modal.saveMessage =
					'SEO mentési hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.modal.saveType = 'error';
			} finally {
				state.modal.isSaving = false;
				preserveScroll(refresh);
			}
		});
		// [CHANGE 2026-04-30] Modal accordion bottom menu with two-column panels
		// [CHANGE 2026-04-30] Move modal accordion below top layout
		const seoButtonRow = document.createElement('div');
		seoButtonRow.className = 'dnd-actions-row dnd-modal__seo-actions';
		seoButtonRow.append(seoPlaceholderButton, approveButton, saveButton);

		const seoStatusStack = document.createElement('div');
		seoStatusStack.className = 'dnd-modal__fields dnd-modal__seo-sidebar';
		seoStatusStack.append(renderSeoBadgeRow(seoSourceItem), seoSummary, seoWarningsBlock, suggestionStatus, approveStatus, saveStatus);

		const seoPanel = createTwoColumnPanel(
			[altField, titleField, themeField, imageTypeField],
			[captionField, descriptionField, seoTitle, seoStatusStack, seoButtonRow, suggestionSection]
		);

		let webpPanel = null;
		if (webpSection) {
			const webpInfo = prepareWebpSuggestion(Object.assign({}, seoSourceItem, details));
			const webpLeftNodes = [
				createRow('Jelenlegi fájltípus', webpInfo.currentType || 'ismeretlen'),
				createRichRow('Fájl URL', createCopyableValue(webpInfo.url || '')),
				createRow('Javasolt WebP fájlnév', webpInfo.suggestedWebpFileName || 'Nincs kitöltve')
			];
			const webpRightNodes = [
				createRow('Státusz', preparedState || state.modal.webpPrepared || webpInfo.currentType === 'webp' ? 'WebP kész' : 'Még nincs WebP feldolgozás'),
				createRichRow('WebP URL', createCopyableValue(preparedState && preparedState.webpUrl ? preparedState.webpUrl : '')),
				createRow('Méret', formatPixelSize(preparedState && preparedState.width, preparedState && preparedState.height)),
				createRow('Fájlméret', preparedState && preparedState.fileSize ? formatFileSize(preparedState.fileSize) : 'Nincs kitöltve'),
				webpActionButton,
				webpActionStatus
			];
			webpPanel = createTwoColumnPanel(webpLeftNodes, webpRightNodes, webpGeneratedList ? [webpGeneratedList] : []);
		}

		const renamePanel = createTwoColumnPanel(
			[currentFileRow, renameField],
			[renameButton, renameStatus, renameHelp]
		);

		const technicalPanel = createTwoColumnPanel(
			[
				createRow('Társított lakások', modalAssignmentText),
				badgeTitle,
				renderBadges(state, details.id || state.modal.mediaId)
			],
			[
				createRow('Belső WebP állapot', preparedState ? 'ready' : 'missing'),
				createRow('Kategória value', getMediaCategory(state, seoSourceItem))
			]
		);

		const panelConfigs = [
			{ key: 'seo', label: 'SEO adatok', content: seoPanel },
			{ key: 'webp', label: 'WebP részletek', content: webpPanel },
			{ key: 'rename', label: 'Fájlnév átnevezése', content: renamePanel },
			{ key: 'technical', label: 'Technikai részletek', content: technicalPanel }
		].filter(function (panel) {
			return !!panel.content;
		});

		const bottomMenu = document.createElement('div');
		bottomMenu.className = 'dnd-modal__bottom-menu';
		const activeBottomPanel = state.modal.bottomPanel || '';
		panelConfigs.forEach(function (panel) {
			const menuButton = document.createElement('button');
			menuButton.type = 'button';
			menuButton.className = 'button dnd-modal__bottom-button' + (activeBottomPanel === panel.key ? ' is-active' : '');
			menuButton.textContent = panel.label;
			menuButton.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				state.modal.bottomPanel = state.modal.bottomPanel === panel.key ? '' : panel.key;
				preserveScroll(refresh);
			});
			bottomMenu.append(menuButton);
		});
		bottomAccordion.append(bottomMenu);

		const activePanelConfig = panelConfigs.find(function (panel) {
			return panel.key === activeBottomPanel;
		});
		if (activePanelConfig) {
			const bottomPanel = document.createElement('div');
			bottomPanel.className = 'dnd-modal__bottom-panel';
			bottomPanel.append(activePanelConfig.content);
			bottomAccordion.append(bottomPanel);
		}

		topRow.append(imageWrap, info);
		dialog.append(topRow, bottomAccordion);
		overlay.append(dialog);
		container.append(overlay);
	}

	function renderUsedWebpModal(container, state, refresh) {
		if (!state.webpModal || !state.webpModal.open) {
			return;
		}

		const mediaId = String(state.webpModal.mediaId || '');
		const visibleItems = getUsedVisibleItems(state);
		const visibleIds = visibleItems.map(function (item) {
			return String(item.id);
		});
		let visibleIndex = visibleIds.indexOf(mediaId);
		if (visibleIndex === -1) {
			visibleIndex = state.webpModal.visibleIndex;
		}
		if (visibleIndex < 0) {
			visibleIndex = 0;
		}
		const currentItem = visibleItems[visibleIndex] || getUsedSeoItem(state, mediaId) || null;
		if (!currentItem) {
			closeUsedWebpModal(state, refresh);
			return;
		}
		state.webpModal.mediaId = String(currentItem.id);
		state.webpModal.visibleIds = visibleIds;
		state.webpModal.visibleIndex = visibleIndex;

		const overlay = document.createElement('div');
		overlay.className = 'dnd-modal-overlay';
		overlay.addEventListener('click', function () {
			closeUsedWebpModal(state, refresh);
		});

		const dialog = document.createElement('div');
		dialog.className = 'dnd-modal';
		dialog.addEventListener('click', function (event) {
			event.stopPropagation();
		});

		const closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.className = 'dnd-modal__close';
		closeButton.textContent = 'X';
		closeButton.addEventListener('click', function (event) {
			event.preventDefault();
			closeUsedWebpModal(state, refresh);
		});
		dialog.append(closeButton);

		const navRow = document.createElement('div');
		navRow.className = 'dnd-actions-row dnd-modal__nav';
		const prevButton = document.createElement('button');
		prevButton.type = 'button';
		prevButton.className = 'button';
		prevButton.textContent = 'Előző kép';
		prevButton.disabled = visibleIndex <= 0;
		prevButton.addEventListener('click', function (event) {
			event.preventDefault();
			if (visibleIndex > 0) {
				openUsedWebpModal(state, visibleItems[visibleIndex - 1].id, refresh);
			}
		});
		const nextButton = document.createElement('button');
		nextButton.type = 'button';
		nextButton.className = 'button';
		nextButton.textContent = 'Következő kép';
		nextButton.disabled = visibleIndex >= visibleItems.length - 1;
		nextButton.addEventListener('click', function (event) {
			event.preventDefault();
			if (visibleIndex < visibleItems.length - 1) {
				openUsedWebpModal(state, visibleItems[visibleIndex + 1].id, refresh);
			}
		});
		navRow.append(prevButton, nextButton);

		const imageWrap = document.createElement('div');
		imageWrap.className = 'dnd-modal__image-wrap';
		imageWrap.append(createThumb(currentItem.thumb || currentItem.url, currentItem.title || currentItem.fileName || 'preview', 'dnd-modal__image'));

		const info = document.createElement('div');
		info.className = 'dnd-modal__info';
		info.append(navRow);

		const detailedSourceItem = getDetailedMediaSourceItem(state, currentItem.id, currentItem);
		const statusSummary = getMediaStatusSummary(state, currentItem.id, detailedSourceItem);
		const webpInfo = prepareWebpSuggestion(statusSummary.statusSource || detailedSourceItem || currentItem);
		const preparedState = statusSummary.webpPreparedState;
		info.append(
			createRow('Fájlnév / cím', currentItem.fileName || currentItem.title || currentItem.id || 'Nincs kitöltve'),
			createRow('Lakás / társítás', getAssignmentSummary(state, currentItem)),
			createRow('Kategória', getDisplayLabel(getMediaCategory(state, currentItem), state)),
			createRow('Jelenlegi fájltípus', webpInfo.currentType || 'ismeretlen'),
			createRow('Fájl URL', webpInfo.url || 'Nincs kitöltve'),
			createRow('Javasolt WebP fájlnév', webpInfo.suggestedWebpFileName || 'Nincs kitöltve'),
			createRow('Státusz', statusSummary.webpLabel),
			createRow('WebP URL', preparedState && preparedState.webpUrl ? preparedState.webpUrl : 'Nincs kitöltve'),
			createRow(
				'Méret',
				preparedState && preparedState.width && preparedState.height
					? String(preparedState.width) + '×' + String(preparedState.height) + ' px'
					: 'Nincs kitöltve'
			),
			createRow('Fájlméret', preparedState && preparedState.fileSize ? String(preparedState.fileSize) + ' B' : 'Nincs kitöltve')
		);

		const webpButton = document.createElement('button');
		webpButton.type = 'button';
		webpButton.className = 'button';
		updateButtonLoading(webpButton, !!state.webpModal.isPreparing, 'WebP előkészítés', 'Előkészítés...');
		webpButton.addEventListener('click', async function (event) {
			event.preventDefault();
			state.webpModal.isPreparing = true;
			state.webpModal.saveMessage = '';
			state.webpModal.saveType = '';
			preserveScroll(refresh);
			try {
				const response = await convertMediaToWebp(state, currentItem.id);
				state.webpPreparationByMediaId[String(currentItem.id)] = {
					suggestedWebpFileName: webpInfo.suggestedWebpFileName,
					status: response && response.status ? response.status : 'ready',
					webpUrl: response && response.webpUrl ? response.webpUrl : '',
					webpPath: response && response.webpPath ? response.webpPath : '',
					width: response && response.width ? Number(response.width) : 0,
					height: response && response.height ? Number(response.height) : 0,
					fileSize: response && response.fileSize ? Number(response.fileSize) : 0
				};
				saveWebpPreparationState(state);
				state.webpModal.saveMessage = 'WebP elkészült.';
				state.webpModal.saveType = 'success';
			} catch (error) {
				state.webpModal.saveMessage = 'WebP hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.webpModal.saveType = 'error';
			} finally {
				state.webpModal.isPreparing = false;
				preserveScroll(refresh);
			}
		});

		info.append(webpButton, createStatus(state.webpModal.saveMessage || '', state.webpModal.saveType || ''));
		dialog.append(imageWrap, info);
		overlay.append(dialog);
		container.append(overlay);
	}

	function renderUsedPreviewModal(container, state, refresh) {
		if (!state.usedPreviewModal || !state.usedPreviewModal.open) {
			return;
		}

		const mediaId = String(state.usedPreviewModal.mediaId || '');
		const item = getUsedSeoItem(state, mediaId) || state.usedPreviewModal.details;
		if (!item) {
			closeUsedPreviewModal(state, refresh);
			return;
		}

		const overlay = document.createElement('div');
		overlay.className = 'dnd-modal-overlay';
		overlay.addEventListener('click', function () {
			closeUsedPreviewModal(state, refresh);
		});

		const dialog = document.createElement('div');
		dialog.className = 'dnd-modal';
		dialog.addEventListener('click', function (event) {
			event.stopPropagation();
		});

		const closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.className = 'dnd-modal__close';
		closeButton.textContent = 'X';
		closeButton.addEventListener('click', function (event) {
			event.preventDefault();
			closeUsedPreviewModal(state, refresh);
		});

		const imageWrap = document.createElement('div');
		imageWrap.className = 'dnd-modal__image-wrap';
		imageWrap.append(createThumb(item.url || item.thumb || '', item.title || item.fileName || 'preview', 'dnd-modal__image'));

		const info = document.createElement('div');
		info.className = 'dnd-modal__info';
		info.append(
			createRow('Media ID', item.id || 'Nincs kitöltve'),
			createRow('Fájlnév / cím', item.fileName || item.title || 'Nincs kitöltve'),
			createRow('URL', item.url || 'Nincs kitöltve'),
			createRow('Lakás / társítás', getAssignmentSummary(state, item)),
			createRow('Kategória', getDisplayLabel(getMediaCategory(state, item), state))
		);

		dialog.append(closeButton, imageWrap, info);
		overlay.append(dialog);
		container.append(overlay);
	}
	function renderSettingsModule(container, state, refresh) {
		const module = document.createElement('section');
		module.className = 'dnd-module';

		const title = document.createElement('h3');
		title.className = 'dandelion-image-admin-bundle__title';
		title.style.fontSize = '18px';
		title.textContent = 'Beállítások';
		module.append(title);

		const settingsState = state.adminSettings || getDefaultAdminSettings();
		state.adminSettings = settingsState;

		if (state.settingsStatusMessage) {
			module.append(createStatus(state.settingsStatusMessage, state.settingsStatusType || ''));
		}

		function renderSettingsSection(sectionTitle, inputLabel, draftKey, listKey) {
			const section = document.createElement('div');
			section.className = 'dnd-settings-section';

			const sectionTitleElement = document.createElement('h4');
			sectionTitleElement.className = 'dandelion-image-admin-bundle__title';
			sectionTitleElement.style.fontSize = '15px';
			sectionTitleElement.textContent = sectionTitle;

			const list = document.createElement('ul');
			list.className = 'dnd-settings-list';
			list.style.margin = '0';
			list.style.paddingLeft = '20px';
			list.style.display = 'grid';
			list.style.gap = '4px';

			(settingsState[listKey] || []).forEach(function (item) {
				const li = document.createElement('li');
				const label = document.createElement('span');
				label.textContent = item;
				const deleteButton = document.createElement('button');
				deleteButton.type = 'button';
				deleteButton.className = 'button button-small';
				deleteButton.style.marginLeft = '8px';
				deleteButton.textContent = 'Törlés';
				deleteButton.addEventListener('click', async function (event) {
					event.preventDefault();
					const deleteValue = getCategoryValueFromSettingsItem(state, listKey, item);
					const usedItems = getUsedMediaItems(state);
					const usedMediaIds = usedItems
						.filter(function (mediaItem) {
							return getMediaCategory(state, mediaItem) === deleteValue;
						})
						.map(function (mediaItem) {
							return String(mediaItem.id || '');
						})
						.filter(Boolean);

					if (usedMediaIds.length) {
						const proceed = window.confirm(
							'Ezt a kategóriát képek használják. Törlés esetén ezek Marketing képek kategóriába kerülnek. Folytatod?'
						);
						if (!proceed) {
							return;
						}
						usedMediaIds.forEach(function (mediaId) {
							state.usedImageCategoriesByMediaId[mediaId] = 'marketing';
						});
						saveUsedImageCategories(state);
					}

					settingsState[listKey] = (settingsState[listKey] || []).filter(function (entry) {
						return entry !== item;
					});
					const saved = saveAdminSettings(settingsState);
					if (saved && listKey === 'apartmentGroups') {
						try {
							await fetchJson(state.restRoot + '/' + state.endpoints.apartmentsDelete, {
								method: 'POST',
								credentials: 'same-origin',
								headers: {
									'Content-Type': 'application/json',
									'X-WP-Nonce': state.nonce
								},
								body: JSON.stringify({ key: deleteValue })
							});
							await loadApartments(state);
						} catch (error) {
							state.settingsStatusMessage =
								'A helyi törlés megtörtént, de a backend apartment törlés nem sikerült: ' +
								(error instanceof Error ? error.message : 'ismeretlen hiba');
							state.settingsStatusType = 'error';
							preserveScroll(refresh);
							return;
						}
					}
					state.settingsStatusMessage = saved ? 'Elem törölve.' : 'A mentés nem sikerült.';
					state.settingsStatusType = saved ? 'success' : 'error';
					preserveScroll(refresh);
				});
				li.append(label, deleteButton);
				list.append(li);
			});

			const inputField = createInputField(inputLabel, state[draftKey] || '', '');
			inputField.input.addEventListener('input', function () {
				state[draftKey] = inputField.input.value;
			});

			const actions = document.createElement('div');
			actions.className = 'dnd-actions-row';

			const addButton = document.createElement('button');
			addButton.type = 'button';
			addButton.className = 'button';
			addButton.textContent = 'Hozzáadás';
			addButton.addEventListener('click', function (event) {
				event.preventDefault();
				const value = inputField.input.value.trim();
				if (!value) {
					state.settingsStatusMessage = 'Adj meg egy nevet.';
					state.settingsStatusType = 'error';
					preserveScroll(refresh);
					return;
				}

				if ((settingsState[listKey] || []).indexOf(value) !== -1) {
					state.settingsStatusMessage = 'Már szerepel a listában.';
					state.settingsStatusType = 'error';
					preserveScroll(refresh);
					return;
				}

				settingsState[listKey] = (settingsState[listKey] || []).concat(value);
				state[draftKey] = '';
				state.settingsStatusMessage = sectionTitle + ' frissítve.';
				state.settingsStatusType = 'success';
				preserveScroll(refresh);
			});

			const saveButton = document.createElement('button');
			saveButton.type = 'button';
			saveButton.className = 'button button-primary';
			saveButton.textContent = 'Mentés';
			saveButton.addEventListener('click', async function (event) {
				event.preventDefault();
				const saved = saveAdminSettings(settingsState);
				if (saved && listKey === 'apartmentGroups') {
					await syncApartmentGroupsWithBackend(state);
				}
				state.settingsStatusMessage = saved ? 'Beállítások mentve.' : 'A mentés nem sikerült.';
				state.settingsStatusType = saved ? 'success' : 'error';
				preserveScroll(refresh);
			});

			actions.append(addButton, saveButton);
			section.append(sectionTitleElement, list, inputField.wrapper, actions);
			return section;
		}

		module.append(renderSettingsSection('Megjelenési célok', 'Új megjelenési cél neve', 'settingsApartmentGroupDraft', 'apartmentGroups'));
		module.append(renderSettingsSection('Kategóriák', 'Új kategória neve', 'settingsCategoryDraft', 'otherCategories'));

		container.append(module);
	}

	function renderTabs(container, state, refresh) {
		const tabs = document.createElement('div');
		tabs.className = 'dnd-tabs';

		async function ensureSeoLibraryDataLoaded() {
			if ((state.mediaItems.length && Object.keys(state.apartmentAssignments).length) || state.isLibraryLoading) {
				return false;
			}

			state.isLibraryLoading = true;
			preserveScroll(refresh);
			try {
				await fetchMediaPage(state);
				await loadAllAssignments(state);
			} catch (error) {
				state.libraryStatusMessage =
					'✕ Keptar betoltesi hiba: ' + (error instanceof Error ? error.message : 'ismeretlen hiba');
				state.libraryStatusType = 'error';
			} finally {
				state.isLibraryLoading = false;
				preserveScroll(refresh);
			}
			return true;
		}

		[
			{ key: 'used', label: 'Használt képek' },
			{ key: 'apartments', label: 'Oldalak / képhasználat' },
			{ key: 'library', label: 'Keptar' }
		].forEach(function (tab) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'button dnd-tab-button' + (state.activeTab === tab.key ? ' is-active' : '');
			button.textContent = tab.label;
			button.addEventListener('click', async function (event) {
				event.preventDefault();
				state.activeTab = tab.key;

				if (tab.key === 'library' || tab.key === 'seo') {
					const loaded = await ensureSeoLibraryDataLoaded();
					if (loaded) {
						return;
					}
				}
				preserveScroll(refresh);
			});
			tabs.append(button);
		});
		container.append(tabs);

		const advanced = document.createElement('div');
		advanced.className = 'dnd-actions-row dnd-advanced-row';
		const advancedButton = document.createElement('button');
		advancedButton.type = 'button';
		advancedButton.className = 'button' + (state.advancedOpen ? ' is-active' : '');
		advancedButton.textContent = 'Haladó';
		advancedButton.addEventListener('click', function (event) {
			event.preventDefault();
			state.advancedOpen = !state.advancedOpen;
			preserveScroll(refresh);
		});
		advanced.append(advancedButton);

		if (state.advancedOpen) {
			const seoButton = document.createElement('button');
			seoButton.type = 'button';
			seoButton.className = 'button dnd-tab-button' + (state.activeTab === 'seo' ? ' is-active' : '');
			seoButton.textContent = 'SEO eszközök';
			seoButton.addEventListener('click', async function (event) {
				event.preventDefault();
				state.activeTab = 'seo';
				const loaded = await ensureSeoLibraryDataLoaded();
				if (loaded) {
					return;
				}
				preserveScroll(refresh);
			});
			advanced.append(seoButton);

			const settingsButton = document.createElement('button');
			settingsButton.type = 'button';
			settingsButton.className = 'button dnd-tab-button' + (state.activeTab === 'settings' ? ' is-active' : '');
			settingsButton.textContent = 'Beállítások';
			settingsButton.addEventListener('click', function (event) {
				event.preventDefault();
				state.activeTab = 'settings';
				preserveScroll(refresh);
			});
			advanced.append(settingsButton);
		}

		container.append(advanced);
	}

	function renderDebugModule(container, state) {
		const debug = document.createElement('div');
		debug.className = 'dandelion-image-admin-bundle__details';
		debug.append(
			createRow('REST root', state.restRoot || ''),
			createRow('WP REST root', state.wpRestRoot || ''),
			createRow('canManage', state.canManage ? 'true' : 'false'),
			createRow('JS verzio', '2026-04-28-02'),
			createRow('Aktiv tab', state.activeTab)
		);
		container.append(debug);
	}

	function buildAppState(bridge) {
		return {
			restRoot: String(bridge.restRoot || '').replace(/\/+$/, ''),
			webpRestRoot: String(bridge.webpRestRoot || '').replace(/\/+$/, ''),
			wpRestRoot: String(bridge.wpRestRoot || '').replace(/\/+$/, ''),
			nonce: bridge.nonce ? String(bridge.nonce) : '',
			canManage: !!bridge.canManage,
			endpoints: {
				apartmentGalleryOrder: bridge.endpoints && bridge.endpoints.apartmentGalleryOrder ? String(bridge.endpoints.apartmentGalleryOrder) : 'v2-apartment-gallery-order',
				apartmentImageConfig: bridge.endpoints && bridge.endpoints.apartmentImageConfig ? String(bridge.endpoints.apartmentImageConfig) : 'apartment-image-config',
				apartments: bridge.endpoints && bridge.endpoints.apartments ? String(bridge.endpoints.apartments) : 'v2-apartments',
				apartmentsDelete: bridge.endpoints && bridge.endpoints.apartmentsDelete ? String(bridge.endpoints.apartmentsDelete) : 'v2-apartments-delete',
				apartmentGalleryAdd: bridge.endpoints && bridge.endpoints.apartmentGalleryAdd ? String(bridge.endpoints.apartmentGalleryAdd) : 'v2-apartment-gallery-add',
				apartmentGalleryRemove: bridge.endpoints && bridge.endpoints.apartmentGalleryRemove ? String(bridge.endpoints.apartmentGalleryRemove) : 'v2-apartment-gallery-remove',
				mediaRename: bridge.endpoints && bridge.endpoints.mediaRename ? String(bridge.endpoints.mediaRename) : 'v2-media-rename',
				seoApprove: bridge.endpoints && bridge.endpoints.seoApprove ? String(bridge.endpoints.seoApprove) : 'v2-media-seo-approve',
				webpConvert: bridge.endpoints && bridge.endpoints.webpConvert ? String(bridge.endpoints.webpConvert) : 'convert-webp'
			},
			coreApartmentKeys: ['d1', 'd2', 'fugehaz', 'zsalya', 'szololiget', 'szepvolgyi', 'royal_homes', 'vintage'],
			activeTab: 'used',
			advancedOpen: false,
			libraryView: 'grid',
			librarySearch: '',
			libraryFilterTarget: 'all',
			libraryFilterCategory: 'all',
			libraryFilterUnassignedOnly: false,
			libraryFilterSeoIncompleteOnly: false,
			libraryFilterWebpMissingOnly: false,
			galleryView: 'grid',
			seoView: 'grid',
			seoApartmentFilter: 'all',
			seoStatusFilter: 'all',
			seoWorkbenchFilter: 'all',
			seoSearch: '',
			selectedSeoMediaIds: [],
			seoBulkMessage: '',
			seoBulkType: '',
			seoDraftsByMediaId: {},
			seoTopicsByMediaId: loadSeoTopics(),
			seoInlinePanelsByMediaId: {},
			usedSeoPanelsByMediaId: {},
			usedWebpPanelsByMediaId: {},
			usedImagesFilter: 'all',
			usedImagesCategoryFilter: 'all',
			usedImagesViewMode: loadUsedImagesViewMode(),
			usedImageCategoriesByMediaId: loadUsedImageCategories(),
			gallerySearch: '',
			galleryFilterTarget: 'all',
			galleryFilterCategory: 'all',
			galleryFilterUnassignedOnly: false,
			galleryFilterSeoIncompleteOnly: false,
			galleryFilterWebpMissingOnly: false,
			settingsApartmentGroupDraft: '',
			settingsCategoryDraft: '',
			settingsStatusMessage: '',
			settingsStatusType: '',
			adminSettings: loadAdminSettings(),
			webpPreparationByMediaId: loadWebpPreparationState(),
			selectedApartmentKey: '',
			libraryTargetKey: '',
			libraryAllMediaItems: [],
			libraryAllMediaLoaded: false,
			libraryFilteredTotalPages: 1,
			apartments: [],
			galleryItems: [],
			galleryInitialIds: [],
			galleryDirty: false,
			galleryMeta: {
				apartmentKey: '',
				apartmentName: '',
				message: ''
			},
			galleryStatusMessage: '',
			galleryStatusType: '',
			apartmentGalleryByApartment: {},
			apartmentAssignments: {},
			mediaItems: [],
			mediaDetailsCache: {},
			selectedMediaIds: [],
			isLibraryLoading: false,
			libraryPage: 1,
			libraryTotal: 0,
			libraryTotalPages: 1,
			apartmentStatusMessage: '',
			apartmentStatusType: '',
			libraryStatusMessage: '',
			libraryStatusType: '',
			libraryDiagnostic: null,
			initializationError: '',
			modal: {
				open: false,
				source: '',
				mediaId: '',
				status: '',
				details: null,
				saveMessage: '',
				saveType: '',
				isSaving: false,
				renameMessage: '',
				renameType: '',
				renameSaving: false,
				renameDraft: '',
				approveMessage: '',
				approveType: '',
				isApproving: false,
				webpPrepared: false,
				webpPreparing: false,
				themeDraft: '',
				imageTypeDraft: '',
				suggestionData: null,
				suggestionMessage: '',
				suggestionType: '',
				onlyMissingFields: true
			},
			usedPreviewModal: {
				open: false,
				mediaId: '',
				details: null
			},
			webpModal: {
				open: false,
				mediaId: '',
				visibleIds: [],
				visibleIndex: -1,
				isPreparing: false,
				saveMessage: '',
				saveType: '',
				details: null
			},
			escapeBound: false
		};
	}

	async function renderAdminShell() {
		const root = document.getElementById('dandelion-image-admin-v2-root');
		if (!root) {
			return;
		}

		const state = buildAppState(window.dandelionImageAdminBridgeV2 || {});
		const shell = document.createElement('section');
		shell.className = 'dandelion-image-admin-bundle';
		root.replaceChildren(shell);

		const eyebrow = document.createElement('p');
		eyebrow.className = 'dandelion-image-admin-bundle__eyebrow';
		eyebrow.textContent = 'WordPress admin bundle';

		const title = document.createElement('h2');
		title.className = 'dandelion-image-admin-bundle__title';
		title.textContent = 'Dandelion Image Admin V2';

		const status = createStatus(
			state.restRoot ? 'WordPress admin bridge aktiv.' : 'WordPress admin bridge nem erheto el.',
			''
		);

		const content = document.createElement('div');
		content.className = 'dnd-admin-content';
		shell.append(eyebrow, title, status, content);

		function refresh() {
			content.replaceChildren();
			renderTabs(content, state, refresh);
			renderDebugModule(content, state);

			if (state.initializationError) {
				content.append(createStatus(state.initializationError, 'error'));
				renderModal(content, state, refresh);
				return;
			}

			if (state.activeTab === 'apartments') {
				renderApartmentManager(content, state, refresh);
				renderGalleryModule(content, state, refresh);
			} else if (state.activeTab === 'used') {
				renderUsedImagesModuleV2(content, state, refresh);
			} else if (state.activeTab === 'seo') {
				renderSeoModule(content, state, refresh);
			} else if (state.activeTab === 'settings') {
				renderSettingsModule(content, state, refresh);
			} else {
				renderLibraryModule(content, state, refresh);
			}

			renderModal(content, state, refresh);
			renderUsedPreviewModal(content, state, refresh);
			renderUsedWebpModal(content, state, refresh);
		}

		bindEscapeForModal(state, refresh);

		if (!state.restRoot) {
			state.initializationError = 'A bridge.restRoot hianyzik.';
			refresh();
			return;
		}

		try {
			await loadApartments(state);
			await syncApartmentGroupsWithBackend(state);
			persistUsedImageCategories(state);
			await loadSelectedGallery(state);
			await loadAllAssignments(state);
		} catch (error) {
			state.initializationError = error instanceof Error ? error.message : 'ismeretlen inicializalasi hiba';
		}

		refresh();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderAdminShell);
	} else {
		renderAdminShell();
	}
}());
