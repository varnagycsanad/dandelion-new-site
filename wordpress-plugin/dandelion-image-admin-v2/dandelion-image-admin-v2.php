<?php
/**
 * Plugin Name: Dandelion Image Admin V2
 * Description: Minimal REST endpoint for saving apartment gallery order into a WordPress option.
 * Version: 0.2.0
 * Author: Dandelion
 */

if (!defined('ABSPATH')) {
	exit;
}

// [CHANGE 2026-04-24 23:28] Add a minimal authenticated REST endpoint for apartment gallery order storage.
const DANDELION_IMAGE_ADMIN_V2_OPTION = 'dandelion_v2_apartment_image_assignments';
const DANDELION_IMAGE_ADMIN_LEGACY_OPTION = 'dandelion_apartment_image_assignments';
const DANDELION_IMAGE_ADMIN_V2_APARTMENTS_OPTION = 'dandelion_image_admin_v2_apartments';
const DANDELION_IMAGE_ADMIN_V2_SEO_APPROVED_OPTION = 'dandelion_image_admin_v2_seo_approved';
// [CHANGE 2026-04-25 12:06] Add temporary debug fields for live REST save diagnostics.
const DANDELION_IMAGE_ADMIN_V2_DEBUG_VERSION = '2026-04-25-1206';

function dandelion_image_admin_v2_default_apartments() {
	return array(
		array(
			'key' => 'd1',
			'name' => 'Dandelion D1',
		),
		array(
			'key' => 'd2',
			'name' => 'Dandelion D2',
		),
		array(
			'key' => 'fugehaz',
			'name' => 'Fugehaz',
		),
		array(
			'key' => 'zsalya',
			'name' => 'Zsalya',
		),
		array(
			'key' => 'szololiget',
			'name' => 'Szololiget',
		),
		array(
			'key' => 'szepvolgyi',
			'name' => 'Szepvolgyi',
		),
		array(
			'key' => 'royal_homes',
			'name' => 'Royal Homes',
		),
		array(
			'key' => 'vintage',
			'name' => 'Vintage',
		),
	);
}

function dandelion_image_admin_v2_normalize_apartment_key($key) {
	if (!is_string($key)) {
		return '';
	}

	$key = remove_accents($key);
	$key = sanitize_title($key);

	return is_string($key) ? str_replace('-', '_', $key) : '';
}

function dandelion_image_admin_v2_normalize_media_slug($slug) {
	if (!is_string($slug)) {
		return '';
	}

	$slug = remove_accents($slug);
	$slug = strtolower($slug);
	$slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
	$slug = trim((string) $slug, '-');

	return is_string($slug) ? $slug : '';
}

function dandelion_image_admin_v2_get_apartments() {
	$defaults = dandelion_image_admin_v2_default_apartments();
	$stored = get_option(DANDELION_IMAGE_ADMIN_V2_APARTMENTS_OPTION, array());
	$stored = is_array($stored) ? $stored : array();
	$by_key = array();

	foreach ($defaults as $item) {
		if (!is_array($item) || empty($item['key'])) {
			continue;
		}

		$normalized_key = dandelion_image_admin_v2_normalize_apartment_key($item['key']);

		if (!$normalized_key) {
			continue;
		}

		$by_key[$normalized_key] = array(
			'key' => $normalized_key,
			'name' => isset($item['name']) && is_string($item['name']) && '' !== trim($item['name'])
				? trim($item['name'])
				: strtoupper($normalized_key),
		);
	}

	foreach ($stored as $item) {
		if (!is_array($item)) {
			continue;
		}

		$normalized_key = dandelion_image_admin_v2_normalize_apartment_key(isset($item['key']) ? $item['key'] : '');

		if (!$normalized_key) {
			continue;
		}

		$name = isset($item['name']) && is_string($item['name']) && '' !== trim($item['name'])
			? trim($item['name'])
			: strtoupper($normalized_key);

		$by_key[$normalized_key] = array(
			'key' => $normalized_key,
			'name' => $name,
		);
	}

	return array_values($by_key);
}

function dandelion_image_admin_v2_allowed_apartment_keys() {
	return array_values(
		array_map(
			static function ($item) {
				return $item['key'];
			},
			dandelion_image_admin_v2_get_apartments()
		)
	);
}

function dandelion_image_admin_v2_get_apartment_label($apartment_key) {
	foreach (dandelion_image_admin_v2_get_apartments() as $item) {
		if (isset($item['key']) && $item['key'] === $apartment_key) {
			return isset($item['name']) ? $item['name'] : $apartment_key;
		}
	}

	return $apartment_key;
}

function dandelion_image_admin_v2_get_core_apartment_keys() {
	return array_values(
		array_map(
			static function ($item) {
				return isset($item['key']) ? $item['key'] : '';
			},
			dandelion_image_admin_v2_default_apartments()
		)
	);
}

function dandelion_image_admin_v2_can_manage() {
	return is_user_logged_in() && current_user_can('manage_options');
}

function dandelion_image_admin_v2_get_seo_approved_map() {
	$value = get_option(DANDELION_IMAGE_ADMIN_V2_SEO_APPROVED_OPTION, array());

	return is_array($value) ? $value : array();
}

function dandelion_image_admin_v2_is_media_seo_approved($media_id) {
	$media_id = (int) $media_id;

	if ($media_id <= 0) {
		return false;
	}

	$approved_map = dandelion_image_admin_v2_get_seo_approved_map();

	return !empty($approved_map[(string) $media_id]);
}

function dandelion_image_admin_v2_set_media_seo_approved($media_id, $approved) {
	$media_id = (int) $media_id;

	if ($media_id <= 0) {
		return new WP_Error(
			'dandelion_invalid_media_id',
			'Invalid media id.',
			array('status' => 400)
		);
	}

	$approved_map = dandelion_image_admin_v2_get_seo_approved_map();
	$media_key = (string) $media_id;

	if ($approved) {
		$approved_map[$media_key] = true;
	} else {
		unset($approved_map[$media_key]);
	}

	$updated = update_option(DANDELION_IMAGE_ADMIN_V2_SEO_APPROVED_OPTION, $approved_map, false);

	if (!$updated && get_option(DANDELION_IMAGE_ADMIN_V2_SEO_APPROVED_OPTION, null) !== $approved_map) {
		return new WP_Error(
			'dandelion_option_update_failed',
			'Failed to update SEO approval status.',
			array('status' => 500)
		);
	}

	return true;
}

function dandelion_image_admin_v2_render_admin_page() {
	if (!dandelion_image_admin_v2_can_manage()) {
		wp_die(esc_html__('You do not have permission to access this page.', 'dandelion-image-admin-v2'));
	}

	// [CHANGE 2026-04-28 20:08] Replace public iframe entry with a protected wp-admin shell placeholder.
	$bridge_payload = array(
		'restRoot' => esc_url_raw(rest_url('dandelion/v1/')),
		'webpRestRoot' => esc_url_raw(rest_url('dandelion-image-admin/v2/')),
		'wpRestRoot' => esc_url_raw(rest_url('wp/v2/')),
		'nonce' => wp_create_nonce('wp_rest'),
		'endpoint' => 'v2-apartment-gallery-order',
		'endpoints' => array(
			'apartmentGalleryOrder' => 'v2-apartment-gallery-order',
			'apartmentHeroImage' => 'v2-apartment-hero-image',
			'apartmentImageConfig' => 'apartment-image-config',
			'apartments' => 'v2-apartments',
			'apartmentsDelete' => 'v2-apartments-delete',
			'apartmentGalleryAdd' => 'v2-apartment-gallery-add',
			'apartmentGalleryRemove' => 'v2-apartment-gallery-remove',
			'mediaRename' => 'v2-media-rename',
			'seoApprove' => 'v2-media-seo-approve',
			'webpConvert' => 'convert-webp',
		),
		'canManage' => true,
	);
	?>
	<div class="wrap">
		<h1><?php echo esc_html__('Dandelion Image Admin V2', 'dandelion-image-admin-v2'); ?></h1>
		<div
			id="dandelion-image-admin-v2-shell"
			style="padding:24px;border:1px solid #ccd0d4;border-radius:6px;background:#fff;"
		>
			<h2><?php echo esc_html__('Dandelion Image Admin V2 - WordPress shell mukodik', 'dandelion-image-admin-v2'); ?></h2>
			<p><?php echo esc_html__('A vedett WordPress admin belepesi pont elkeszult. A teljes image-admin UI bundle bekotese a kovetkezo lepes.', 'dandelion-image-admin-v2'); ?></p>
			<table class="widefat striped">
				<tbody>
					<tr>
						<th scope="row"><?php echo esc_html__('REST root', 'dandelion-image-admin-v2'); ?></th>
						<td><code><?php echo esc_html($bridge_payload['restRoot']); ?></code></td>
					</tr>
					<tr>
						<th scope="row"><?php echo esc_html__('Bridge allapot', 'dandelion-image-admin-v2'); ?></th>
						<td><?php echo esc_html__('Elokeszitve', 'dandelion-image-admin-v2'); ?></td>
					</tr>
					<tr>
						<th scope="row"><?php echo esc_html__('Nonce atadas', 'dandelion-image-admin-v2'); ?></th>
						<td><?php echo esc_html__('JS konfiguracioban elerheto', 'dandelion-image-admin-v2'); ?></td>
					</tr>
					<tr>
						<th scope="row"><?php echo esc_html__('Kovetkezo lepes', 'dandelion-image-admin-v2'); ?></th>
						<td><?php echo esc_html__('Admin UI bundle bekotese vedett wp-admin shellbe.', 'dandelion-image-admin-v2'); ?></td>
					</tr>
				</tbody>
			</table>
			<div id="dandelion-image-admin-v2-root"></div>
		</div>
	</div>
	<script>
		window.dandelionImageAdminBridgeV2 = <?php echo wp_json_encode($bridge_payload); ?>;
	</script>
	<?php
}

function dandelion_image_admin_v2_register_admin_page() {
	add_menu_page(
		'Dandelion Image Admin V2',
		'Dandelion kepek V2',
		'manage_options',
		'dandelion-image-admin-v2',
		'dandelion_image_admin_v2_render_admin_page',
		'dashicons-format-gallery',
		59
	);
}

function dandelion_image_admin_v2_enqueue_admin_assets($hook_suffix) {
	if ('toplevel_page_dandelion-image-admin-v2' !== $hook_suffix) {
		return;
	}

	$asset_base_url = plugin_dir_url(__FILE__) . 'assets/';
	$asset_base_path = plugin_dir_path(__FILE__) . 'assets/';
	$script_path = $asset_base_path . 'admin.js';
	$style_path = $asset_base_path . 'admin.css';

	wp_enqueue_style(
		'dandelion-image-admin-v2',
		$asset_base_url . 'admin.css',
		array(),
		file_exists($style_path) ? (string) filemtime($style_path) : '0.1.0'
	);

	wp_enqueue_script(
		'dandelion-image-admin-v2',
		$asset_base_url . 'admin.js',
		array(),
		file_exists($script_path) ? (string) filemtime($script_path) : '0.1.0',
		true
	);
}

function dandelion_image_admin_v2_get_storage() {
	$value = get_option(DANDELION_IMAGE_ADMIN_V2_OPTION, array());

	return is_array($value) ? $value : array();
}

function dandelion_image_admin_v2_get_read_storage() {
	$v2_storage = dandelion_image_admin_v2_get_storage();

	if (!empty($v2_storage)) {
		return array(
			'storage' => $v2_storage,
			'source' => 'v2',
		);
	}

	$legacy_value = get_option(DANDELION_IMAGE_ADMIN_LEGACY_OPTION, array());
	$legacy_storage = is_array($legacy_value) ? $legacy_value : array();

	return array(
		'storage' => $legacy_storage,
		'source' => !empty($legacy_storage) ? 'legacy' : 'empty',
	);
}

function dandelion_image_admin_v2_handle_apartments_read() {
	return rest_ensure_response(dandelion_image_admin_v2_get_apartments());
}

function dandelion_image_admin_v2_handle_apartments_write(WP_REST_Request $request) {
	$key = $request->get_param('key');
	$name = $request->get_param('name');

	$normalized_key = dandelion_image_admin_v2_normalize_apartment_key($key);

	if (!$normalized_key) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Apartment key is required.',
			array('status' => 400)
		);
	}

	if (!is_string($name) || '' === trim($name)) {
		return new WP_Error(
			'dandelion_invalid_apartment_name',
			'Apartment name is required.',
			array('status' => 400)
		);
	}

	$stored = get_option(DANDELION_IMAGE_ADMIN_V2_APARTMENTS_OPTION, array());
	$stored = is_array($stored) ? $stored : array();

	foreach (dandelion_image_admin_v2_get_apartments() as $item) {
		if (isset($item['key']) && $item['key'] === $normalized_key) {
			return new WP_Error(
				'dandelion_duplicate_apartment_key',
				'Apartment key already exists.',
				array('status' => 409)
			);
		}
	}

	$stored[] = array(
		'key' => $normalized_key,
		'name' => trim($name),
	);

	update_option(DANDELION_IMAGE_ADMIN_V2_APARTMENTS_OPTION, array_values($stored), false);

	return rest_ensure_response(
		array(
			'ok' => true,
			'apartment' => array(
				'key' => $normalized_key,
				'name' => trim($name),
			),
			'apartments' => dandelion_image_admin_v2_get_apartments(),
		)
	);
}

function dandelion_image_admin_v2_handle_apartments_delete(WP_REST_Request $request) {
	$key = $request->get_param('key');
	$normalized_key = dandelion_image_admin_v2_normalize_apartment_key($key);

	if (!$normalized_key) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Apartment key is required.',
			array('status' => 400)
		);
	}

	if (in_array($normalized_key, dandelion_image_admin_v2_get_core_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_core_apartment_delete_forbidden',
			'Core apartment cannot be deleted.',
			array('status' => 403)
		);
	}

	$stored = get_option(DANDELION_IMAGE_ADMIN_V2_APARTMENTS_OPTION, array());
	$stored = is_array($stored) ? $stored : array();
	$found = false;
	$filtered = array_values(
		array_filter(
			$stored,
			static function ($item) use ($normalized_key, &$found) {
				$item_key = dandelion_image_admin_v2_normalize_apartment_key(
					is_array($item) && isset($item['key']) ? $item['key'] : ''
				);

				if ($item_key === $normalized_key) {
					$found = true;
					return false;
				}

				return true;
			}
		)
	);

	if (!$found) {
		return new WP_Error(
			'dandelion_apartment_not_found',
			'Apartment key not found in V2 custom apartments.',
			array('status' => 404)
		);
	}

	update_option(DANDELION_IMAGE_ADMIN_V2_APARTMENTS_OPTION, $filtered, false);

	return rest_ensure_response(
		array(
			'ok' => true,
			'deletedKey' => $normalized_key,
			'apartments' => dandelion_image_admin_v2_get_apartments(),
		)
	);
}

function dandelion_image_admin_v2_get_media_payload($media_id) {
	$media_id = (int) $media_id;

	if ($media_id <= 0) {
		return null;
	}

	$url = wp_get_attachment_image_url($media_id, 'full');

	if (!$url) {
		return null;
	}

	$alt = get_post_meta($media_id, '_wp_attachment_image_alt', true);
	$title = get_the_title($media_id);

	return array(
		'id' => $media_id,
		'url' => $url,
		'alt' => is_string($alt) ? $alt : '',
		'title' => is_string($title) ? $title : '',
		'caption' => is_string(get_post_field('post_excerpt', $media_id)) ? get_post_field('post_excerpt', $media_id) : '',
		'description' => is_string(get_post_field('post_content', $media_id)) ? get_post_field('post_content', $media_id) : '',
		'fileName' => wp_basename((string) get_attached_file($media_id)),
		'thumb' => wp_get_attachment_image_url($media_id, 'medium') ?: $url,
		'approved' => dandelion_image_admin_v2_is_media_seo_approved($media_id),
	);
}

function dandelion_image_admin_v2_handle_media_seo_approve(WP_REST_Request $request) {
	$media_id = (int) $request->get_param('id');
	$approved = rest_sanitize_boolean($request->get_param('approved'));

	if ($media_id <= 0) {
		return new WP_Error(
			'dandelion_invalid_media_id',
			'Invalid media id.',
			array('status' => 400)
		);
	}

	$attachment = get_post($media_id);

	if (!$attachment || 'attachment' !== $attachment->post_type) {
		return new WP_Error(
			'dandelion_invalid_attachment',
			'The selected media item is not an attachment.',
			array('status' => 404)
		);
	}

	$result = dandelion_image_admin_v2_set_media_seo_approved($media_id, $approved);

	if (is_wp_error($result)) {
		return $result;
	}

	return rest_ensure_response(
		array(
			'ok' => true,
			'approved' => $approved,
			'media' => dandelion_image_admin_v2_get_media_payload($media_id),
		)
	);
}

function dandelion_image_admin_v2_validate_gallery_ids($gallery_ids) {
	if (!is_array($gallery_ids)) {
		return new WP_Error(
			'dandelion_invalid_gallery_ids',
			'galleryIds must be an array.',
			array('status' => 400)
		);
	}

	if (count($gallery_ids) > 200) {
		return new WP_Error(
			'dandelion_gallery_too_large',
			'galleryIds can contain at most 200 items.',
			array('status' => 400)
		);
	}

	$normalized = array();

	foreach ($gallery_ids as $gallery_id) {
		if (!is_numeric($gallery_id)) {
			return new WP_Error(
				'dandelion_invalid_gallery_id',
				'galleryIds must contain only positive integers.',
				array('status' => 400)
			);
		}

		$gallery_id = (int) $gallery_id;

		if ($gallery_id <= 0) {
			return new WP_Error(
				'dandelion_invalid_gallery_id',
				'galleryIds must contain only positive integers.',
				array('status' => 400)
			);
		}

		$normalized[] = $gallery_id;
	}

	return $normalized;
}

function dandelion_image_admin_v2_handle_apartment_gallery_order(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');
	$gallery_ids = $request->get_param('galleryIds');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_v2_allowed_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Invalid apartmentKey.',
			array('status' => 400)
		);
	}

	$gallery_ids = dandelion_image_admin_v2_validate_gallery_ids($gallery_ids);

	if (is_wp_error($gallery_ids)) {
		return $gallery_ids;
	}

	$storage = dandelion_image_admin_v2_get_storage();
	$existing = isset($storage[$apartment_key]) && is_array($storage[$apartment_key]) ? $storage[$apartment_key] : array();

	$storage[$apartment_key] = array_merge(
		$existing,
		array(
			'gallery' => array_map(
				static function ($gallery_id, $index) {
					return array(
						'id' => $gallery_id,
						'sortOrder' => ($index + 1) * 10,
					);
				},
				$gallery_ids,
				array_keys($gallery_ids)
			),
			'updated_at' => current_time('mysql', true),
			'updated_by' => get_current_user_id(),
		)
	);

	$updated = update_option(DANDELION_IMAGE_ADMIN_V2_OPTION, $storage, false);

	if (!$updated && get_option(DANDELION_IMAGE_ADMIN_V2_OPTION, null) !== $storage) {
		return new WP_Error(
			'dandelion_option_update_failed',
			'Failed to update apartment gallery order.',
			array('status' => 500)
		);
	}

	return rest_ensure_response(
		array(
			'ok' => true,
			'apartmentKey' => $apartment_key,
			'count' => count($gallery_ids),
			'receivedGalleryIds' => $gallery_ids,
			'storedGallery' => $storage[$apartment_key]['gallery'],
		)
	);
}

function dandelion_image_admin_v2_handle_apartment_gallery_add(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');
	$media_id = $request->get_param('mediaId');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_v2_allowed_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Invalid apartmentKey.',
			array('status' => 400)
		);
	}

	if (!is_numeric($media_id) || (int) $media_id <= 0) {
		return new WP_Error(
			'dandelion_invalid_media_id',
			'mediaId must be a positive integer.',
			array('status' => 400)
		);
	}

	$media_id = (int) $media_id;
	$attachment = get_post($media_id);

	if (!$attachment || 'attachment' !== $attachment->post_type) {
		return new WP_Error(
			'dandelion_media_not_found',
			'Attachment not found.',
			array('status' => 404)
		);
	}

	$storage = dandelion_image_admin_v2_get_storage();
	$existing = isset($storage[$apartment_key]) && is_array($storage[$apartment_key]) ? $storage[$apartment_key] : array();
	$gallery = isset($existing['gallery']) && is_array($existing['gallery']) ? $existing['gallery'] : array();

	foreach ($gallery as $item) {
		$gallery_id = isset($item['id']) ? (int) $item['id'] : 0;
		if ($gallery_id === $media_id) {
			return new WP_Error(
				'dandelion_duplicate_gallery_media',
				'This media item is already assigned to the selected apartment gallery.',
				array('status' => 409)
			);
		}
	}

	$next_sort_order = (count($gallery) + 1) * 10;
	$gallery[] = array(
		'id' => $media_id,
		'sortOrder' => $next_sort_order,
	);

	$storage[$apartment_key] = array_merge(
		$existing,
		array(
			'gallery' => $gallery,
			'updated_at' => current_time('mysql', true),
			'updated_by' => get_current_user_id(),
		)
	);

	$updated = update_option(DANDELION_IMAGE_ADMIN_V2_OPTION, $storage, false);

	if (!$updated && get_option(DANDELION_IMAGE_ADMIN_V2_OPTION, null) !== $storage) {
		return new WP_Error(
			'dandelion_option_update_failed',
			'Failed to append media to apartment gallery.',
			array('status' => 500)
		);
	}

	return rest_ensure_response(
		array(
			'ok' => true,
			'apartmentKey' => $apartment_key,
			'mediaId' => $media_id,
			'count' => count($gallery),
			'gallery' => $gallery,
		)
	);
}

function dandelion_image_admin_v2_handle_apartment_gallery_remove(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');
	$media_id = $request->get_param('id');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_v2_allowed_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Invalid apartmentKey.',
			array('status' => 400)
		);
	}

	if (!is_numeric($media_id) || (int) $media_id <= 0) {
		return new WP_Error(
			'dandelion_invalid_media_id',
			'id must be a positive integer.',
			array('status' => 400)
		);
	}

	$media_id = (int) $media_id;
	$storage = dandelion_image_admin_v2_get_storage();
	$existing = isset($storage[$apartment_key]) && is_array($storage[$apartment_key]) ? $storage[$apartment_key] : array();
	$gallery = isset($existing['gallery']) && is_array($existing['gallery']) ? $existing['gallery'] : array();
	$found = false;

	$filtered_gallery = array_values(
		array_filter(
			$gallery,
			static function ($item) use ($media_id, &$found) {
				$gallery_id = isset($item['id']) ? (int) $item['id'] : 0;
				if ($gallery_id === $media_id) {
					$found = true;
					return false;
				}
				return true;
			}
		)
	);

	if (!$found) {
		return new WP_Error(
			'dandelion_gallery_media_not_found',
			'This media item is not assigned to the selected apartment gallery.',
			array('status' => 404)
		);
	}

	$filtered_gallery = array_values(
		array_map(
			static function ($item, $index) {
				return array(
					'id' => isset($item['id']) ? (int) $item['id'] : 0,
					'sortOrder' => ($index + 1) * 10,
				);
			},
			$filtered_gallery,
			array_keys($filtered_gallery)
		)
	);

	$storage[$apartment_key] = array_merge(
		$existing,
		array(
			'gallery' => $filtered_gallery,
			'updated_at' => current_time('mysql', true),
			'updated_by' => get_current_user_id(),
		)
	);

	$updated = update_option(DANDELION_IMAGE_ADMIN_V2_OPTION, $storage, false);

	if (!$updated && get_option(DANDELION_IMAGE_ADMIN_V2_OPTION, null) !== $storage) {
		return new WP_Error(
			'dandelion_option_update_failed',
			'Failed to remove media from apartment gallery.',
			array('status' => 500)
		);
	}

	return rest_ensure_response(
		array(
			'ok' => true,
			'apartmentKey' => $apartment_key,
			'removedId' => $media_id,
			'count' => count($filtered_gallery),
			'gallery' => $filtered_gallery,
		)
	);
}

function dandelion_image_admin_v2_handle_media_rename(WP_REST_Request $request) {
	$media_id = $request->get_param('mediaId');
	$new_slug = $request->get_param('newSlug');
	$normalized_slug = dandelion_image_admin_v2_normalize_media_slug($new_slug);

	if (!is_numeric($media_id) || (int) $media_id <= 0) {
		return new WP_Error(
			'dandelion_invalid_media_id',
			'mediaId must be a positive integer.',
			array('status' => 400)
		);
	}

	if ('' === $normalized_slug) {
		return new WP_Error(
			'dandelion_invalid_media_slug',
			'newSlug must contain at least one valid slug character.',
			array('status' => 400)
		);
	}

	$media_id = (int) $media_id;
	$attachment = get_post($media_id);

	if (!$attachment || 'attachment' !== $attachment->post_type) {
		return new WP_Error(
			'dandelion_media_not_found',
			'Attachment not found.',
			array('status' => 404)
		);
	}

	$attached_file = get_post_meta($media_id, '_wp_attached_file', true);
	$uploads = wp_get_upload_dir();

	if (!is_string($attached_file) || '' === trim($attached_file) || !empty($uploads['error'])) {
		return new WP_Error(
			'dandelion_media_path_unavailable',
			'Attached file path is not available.',
			array('status' => 500)
		);
	}

	$base_dir = wp_normalize_path($uploads['basedir']);
	$relative_file = ltrim(wp_normalize_path($attached_file), '/');
	$current_path = wp_normalize_path(path_join($base_dir, $relative_file));

	if (!file_exists($current_path)) {
		return new WP_Error(
			'dandelion_media_file_missing',
			'The attached file does not exist on disk.',
			array('status' => 404)
		);
	}

	$current_filename = wp_basename($current_path);
	$current_extension = pathinfo($current_filename, PATHINFO_EXTENSION);
	$current_stem = pathinfo($current_filename, PATHINFO_FILENAME);

	if (!$current_extension) {
		return new WP_Error(
			'dandelion_media_extension_missing',
			'The attached file has no extension.',
			array('status' => 500)
		);
	}

	$directory_relative = pathinfo($relative_file, PATHINFO_DIRNAME);
	$directory_relative = '.' === $directory_relative ? '' : trim((string) $directory_relative, '/');
	$new_filename = $normalized_slug . '.' . $current_extension;
	$new_relative_file = ($directory_relative ? $directory_relative . '/' : '') . $new_filename;
	$new_path = wp_normalize_path(path_join($base_dir, $new_relative_file));

	if ($new_filename === $current_filename) {
		return rest_ensure_response(
			array(
				'ok' => true,
				'media' => dandelion_image_admin_v2_get_media_payload($media_id),
				'renamed' => false,
				'normalizedSlug' => $normalized_slug,
				'renamedSizes' => array(),
			)
		);
	}

	if (file_exists($new_path)) {
		return new WP_Error(
			'dandelion_media_target_exists',
			'Target filename already exists.',
			array('status' => 409)
		);
	}

	$metadata = wp_get_attachment_metadata($media_id);
	$metadata = is_array($metadata) ? $metadata : array();
	$rename_operations = array(
		array(
			'type' => 'original',
			'old_path' => $current_path,
			'new_path' => $new_path,
		),
	);
	$renamed_sizes = array();

	if (isset($metadata['sizes']) && is_array($metadata['sizes'])) {
		foreach ($metadata['sizes'] as $size_key => $size_meta) {
			$size_file = isset($size_meta['file']) && is_string($size_meta['file']) ? $size_meta['file'] : '';

			if ('' === $size_file) {
				continue;
			}

			$size_old_path = wp_normalize_path(path_join(dirname($current_path), $size_file));

			if (!file_exists($size_old_path)) {
				continue;
			}

			$size_filename = wp_basename($size_old_path);
			$size_extension = pathinfo($size_filename, PATHINFO_EXTENSION);
			$size_stem = pathinfo($size_filename, PATHINFO_FILENAME);
			$suffix = 0 === strpos($size_stem, $current_stem) ? substr($size_stem, strlen($current_stem)) : '';
			$new_size_filename = $normalized_slug . $suffix . ($size_extension ? '.' . $size_extension : '');
			$size_new_path = wp_normalize_path(path_join(dirname($current_path), $new_size_filename));

			if ($size_new_path !== $size_old_path && file_exists($size_new_path)) {
				return new WP_Error(
					'dandelion_media_size_target_exists',
					'Target filename already exists for one of the generated sizes.',
					array('status' => 409)
				);
			}

			$rename_operations[] = array(
				'type' => 'size',
				'size_key' => $size_key,
				'old_path' => $size_old_path,
				'new_path' => $size_new_path,
				'new_file' => $new_size_filename,
			);
		}
	}

	$completed_operations = array();

	foreach ($rename_operations as $operation) {
		if ($operation['old_path'] === $operation['new_path']) {
			continue;
		}

		if (!@rename($operation['old_path'], $operation['new_path'])) {
			for ($index = count($completed_operations) - 1; $index >= 0; $index--) {
				$rollback = $completed_operations[$index];
				@rename($rollback['new_path'], $rollback['old_path']);
			}

			return new WP_Error(
				'dandelion_media_rename_failed',
				'Failed to rename one of the media files.',
				array('status' => 500)
			);
		}

		$completed_operations[] = $operation;
	}

	update_attached_file($media_id, $new_relative_file);
	$metadata['file'] = $new_relative_file;

	if (isset($metadata['sizes']) && is_array($metadata['sizes'])) {
		foreach ($rename_operations as $operation) {
			if ('size' !== $operation['type']) {
				continue;
			}

			$size_key = isset($operation['size_key']) ? $operation['size_key'] : '';

			if ($size_key && isset($metadata['sizes'][$size_key])) {
				$metadata['sizes'][$size_key]['file'] = $operation['new_file'];
				$renamed_sizes[] = $size_key;
			}
		}
	}

	wp_update_attachment_metadata($media_id, $metadata);
	clean_post_cache($media_id);

	return rest_ensure_response(
		array(
			'ok' => true,
			'media' => dandelion_image_admin_v2_get_media_payload($media_id),
			'renamed' => true,
			'normalizedSlug' => $normalized_slug,
			'renamedSizes' => $renamed_sizes,
		)
	);
}

function dandelion_image_admin_v2_handle_convert_webp(WP_REST_Request $request) {
	$media_id = $request->get_param('mediaId');

	if (!is_numeric($media_id) || (int) $media_id <= 0) {
		return new WP_Error(
			'dandelion_invalid_media_id',
			'mediaId must be a positive integer.',
			array('status' => 400)
		);
	}

	$media_id = (int) $media_id;
	$attachment = get_post($media_id);

	if (!$attachment || 'attachment' !== $attachment->post_type) {
		return new WP_Error(
			'dandelion_media_not_found',
			'Attachment not found.',
			array('status' => 404)
		);
	}

	$mime_type = get_post_mime_type($media_id);
	if (!is_string($mime_type) || 0 !== strpos($mime_type, 'image/')) {
		return new WP_Error(
			'dandelion_invalid_media_type',
			'Only image attachments can be converted to WebP.',
			array('status' => 400)
		);
	}

	$source_path = get_attached_file($media_id);
	if (!is_string($source_path) || '' === trim($source_path) || !file_exists($source_path)) {
		return new WP_Error(
			'dandelion_media_file_missing',
			'The attached file does not exist on disk.',
			array('status' => 404)
		);
	}

	$uploads = wp_get_upload_dir();
	if (!empty($uploads['error']) || empty($uploads['basedir']) || empty($uploads['baseurl'])) {
		return new WP_Error(
			'dandelion_upload_dir_unavailable',
			'WordPress uploads directory is not available.',
			array('status' => 500)
		);
	}

	$target_dir = wp_normalize_path(path_join($uploads['basedir'], 'dandelion-webp'));
	if (!wp_mkdir_p($target_dir)) {
		return new WP_Error(
			'dandelion_webp_dir_create_failed',
			'Failed to create dandelion-webp directory.',
			array('status' => 500)
		);
	}

	$source_name = pathinfo(wp_basename($source_path), PATHINFO_FILENAME);
	$source_slug = sanitize_title(remove_accents((string) $source_name));
	$source_slug = '' !== $source_slug ? $source_slug : ('media-' . $media_id);

	$target_filename = $source_slug . '.webp';
	$target_path = wp_normalize_path(path_join($target_dir, $target_filename));
	$suffix = 2;
	while (file_exists($target_path)) {
		$target_filename = $source_slug . '-' . $suffix . '.webp';
		$target_path = wp_normalize_path(path_join($target_dir, $target_filename));
		$suffix++;
	}

	$editor = wp_get_image_editor($source_path);
	if (is_wp_error($editor)) {
		return new WP_Error(
			'dandelion_webp_editor_error',
			$editor->get_error_message(),
			array('status' => 500)
		);
	}

	$size = $editor->get_size();
	if (is_array($size) && isset($size['width']) && (int) $size['width'] > 1600) {
		$editor->resize(1600, null, false);
	}

	if (method_exists($editor, 'set_quality')) {
		$editor->set_quality(82);
	}

	$saved = $editor->save($target_path, 'image/webp');
	if (is_wp_error($saved)) {
		return new WP_Error(
			'dandelion_webp_save_not_supported',
			'A szerver nem támogatja a WebP mentést.',
			array('status' => 500)
		);
	}

	if (!is_array($saved) || empty($saved['path']) || !file_exists($saved['path'])) {
		return new WP_Error(
			'dandelion_webp_save_failed',
			'WebP conversion failed.',
			array('status' => 500)
		);
	}

	$final_path = wp_normalize_path($saved['path']);
	$final_size = @getimagesize($final_path);
	$final_width = is_array($final_size) && isset($final_size[0]) ? (int) $final_size[0] : 0;
	$final_height = is_array($final_size) && isset($final_size[1]) ? (int) $final_size[1] : 0;
	$final_bytes = (int) @filesize($final_path);
	$relative = ltrim(str_replace(wp_normalize_path($uploads['basedir']), '', $final_path), '/');
	$webp_url = trailingslashit($uploads['baseurl']) . str_replace('\\', '/', $relative);

	return rest_ensure_response(
		array(
			'success' => true,
			'mediaId' => $media_id,
			'webpUrl' => esc_url_raw($webp_url),
			'webpPath' => $final_path,
			'width' => $final_width,
			'height' => $final_height,
			'fileSize' => $final_bytes,
			'status' => 'ready',
		)
	);
}

function dandelion_image_admin_v2_handle_apartment_hero_image(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');
	$variant = $request->get_param('variant');
	$media_id = $request->get_param('mediaId');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_v2_allowed_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Invalid apartmentKey.',
			array('status' => 400)
		);
	}

	if (!is_string($variant) || !in_array($variant, array('desktop', 'mobile'), true)) {
		return new WP_Error(
			'dandelion_invalid_variant',
			'variant must be desktop or mobile.',
			array('status' => 400)
		);
	}

	if (!is_numeric($media_id) || (int) $media_id <= 0) {
		return new WP_Error(
			'dandelion_invalid_media_id',
			'mediaId must be a positive integer.',
			array('status' => 400)
		);
	}

	$media_id = (int) $media_id;
	$storage = dandelion_image_admin_v2_get_storage();
	$existing = isset($storage[$apartment_key]) && is_array($storage[$apartment_key]) ? $storage[$apartment_key] : array();
	$hero = isset($existing['hero']) && is_array($existing['hero']) ? $existing['hero'] : array();
	$hero = array_merge(
		array(
			'desktop' => null,
			'mobile' => null,
		),
		$hero
	);
	$hero[$variant] = $media_id;

	$storage[$apartment_key] = array_merge(
		$existing,
		array(
			'hero' => $hero,
			'updated_at' => current_time('mysql', true),
			'updated_by' => get_current_user_id(),
		)
	);

	$updated = update_option(DANDELION_IMAGE_ADMIN_V2_OPTION, $storage, false);

	if (!$updated && get_option(DANDELION_IMAGE_ADMIN_V2_OPTION, null) !== $storage) {
		return new WP_Error(
			'dandelion_option_update_failed',
			'Failed to update apartment hero image.',
			array('status' => 500)
		);
	}

	return rest_ensure_response(
		array(
			'ok' => true,
			'apartmentKey' => $apartment_key,
			'variant' => $variant,
			'mediaId' => $media_id,
			'hero' => $storage[$apartment_key]['hero'],
		)
	);
}

function dandelion_image_admin_v2_handle_apartment_image_config(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_v2_allowed_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Invalid apartmentKey.',
			array('status' => 400)
		);
	}

	$storage_meta = dandelion_image_admin_v2_get_read_storage();
	$storage = $storage_meta['storage'];
	$apartment_config = isset($storage[$apartment_key]) && is_array($storage[$apartment_key]) ? $storage[$apartment_key] : array();
	$gallery = isset($apartment_config['gallery']) && is_array($apartment_config['gallery']) ? $apartment_config['gallery'] : array();
	$gallery = array_map(
		static function ($item) {
			$gallery_id = isset($item['id']) ? (int) $item['id'] : 0;
			$item['url'] = $gallery_id > 0 ? wp_get_attachment_url($gallery_id) ?: null : null;
			return $item;
		},
		$gallery
	);
	$hero = isset($apartment_config['hero']) && is_array($apartment_config['hero']) ? $apartment_config['hero'] : array(
		'desktop' => null,
		'mobile' => null,
	);
	$hero_images = array(
		'desktop' => dandelion_image_admin_v2_get_media_payload(isset($hero['desktop']) ? $hero['desktop'] : 0),
		'mobile' => dandelion_image_admin_v2_get_media_payload(isset($hero['mobile']) ? $hero['mobile'] : 0),
	);

	return rest_ensure_response(
		array(
			'apartmentKey' => $apartment_key,
			'apartmentName' => dandelion_image_admin_v2_get_apartment_label($apartment_key),
			'hero' => $hero,
			'heroImages' => $hero_images,
			'gallery' => $gallery,
			'debug_version' => DANDELION_IMAGE_ADMIN_V2_DEBUG_VERSION,
			'option_raw_exists' => !empty($storage),
			'option_keys' => array_values(array_keys($storage)),
			'storage_source' => $storage_meta['source'],
		)
	);
}

add_action(
	'rest_api_init',
	static function () {
		register_rest_route(
			'dandelion-image-admin/v2',
			'/convert-webp',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_convert_webp',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		register_rest_field(
			'attachment',
			'approved',
			array(
				'get_callback' => static function ($object) {
					$media_id = isset($object['id']) ? (int) $object['id'] : 0;

					return dandelion_image_admin_v2_is_media_seo_approved($media_id);
				},
				'schema' => array(
					'description' => 'Dandelion SEO approval flag.',
					'type' => 'boolean',
					'context' => array('view', 'edit'),
				),
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/v2-apartments',
			array(
				array(
					'methods' => WP_REST_Server::READABLE,
					'callback' => 'dandelion_image_admin_v2_handle_apartments_read',
					'permission_callback' => 'dandelion_image_admin_v2_can_manage',
				),
				array(
					'methods' => WP_REST_Server::CREATABLE,
					'callback' => 'dandelion_image_admin_v2_handle_apartments_write',
					'permission_callback' => 'dandelion_image_admin_v2_can_manage',
				),
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/v2-apartments-delete',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_apartments_delete',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/v2-apartment-gallery-order',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_apartment_gallery_order',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/v2-apartment-gallery-add',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_apartment_gallery_add',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/v2-apartment-gallery-remove',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_apartment_gallery_remove',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/v2-media-rename',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_media_rename',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/v2-media-seo-approve',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_media_seo_approve',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/apartment-image-config/(?P<apartmentKey>[a-z0-9_-]+)',
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => 'dandelion_image_admin_v2_handle_apartment_image_config',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);

		// [CHANGE 2026-04-24] Added apartment hero image REST save endpoint.
		register_rest_route(
			'dandelion/v1',
			'/v2-apartment-hero-image',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_v2_handle_apartment_hero_image',
				'permission_callback' => 'dandelion_image_admin_v2_can_manage',
			)
		);
	}
);

add_action('admin_menu', 'dandelion_image_admin_v2_register_admin_page');
add_action('admin_enqueue_scripts', 'dandelion_image_admin_v2_enqueue_admin_assets');
