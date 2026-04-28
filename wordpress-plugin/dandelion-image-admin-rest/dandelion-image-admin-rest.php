<?php
/**
 * Plugin Name: Dandelion Image Admin REST
 * Description: Minimal REST endpoint for saving apartment gallery order into a WordPress option.
 * Version: 0.1.3
 * Author: Dandelion
 */

if (!defined('ABSPATH')) {
	exit;
}

// [CHANGE 2026-04-24 23:28] Add a minimal authenticated REST endpoint for apartment gallery order storage.
const DANDELION_IMAGE_ADMIN_OPTION = 'dandelion_apartment_image_assignments';
// [CHANGE 2026-04-25 12:06] Add temporary debug fields for live REST save diagnostics.
const DANDELION_IMAGE_ADMIN_DEBUG_VERSION = '2026-04-25-1206';

function dandelion_image_admin_allowed_apartment_keys() {
	return array(
		'd1',
		'd2',
		'fugehaz',
		'zsalya',
		'szololiget',
		'szepvolgyi',
		'royal_homes',
		'vintage',
	);
}

function dandelion_image_admin_can_manage() {
	return is_user_logged_in() && current_user_can('manage_options');
}

function dandelion_image_admin_render_admin_page() {
	if (!dandelion_image_admin_can_manage()) {
		wp_die(esc_html__('You do not have permission to access this page.', 'dandelion-image-admin-rest'));
	}

	// [CHANGE 2026-04-28 20:08] Replace public iframe entry with a protected wp-admin shell placeholder.
	$bridge_payload = array(
		'restRoot' => esc_url_raw(rest_url('dandelion/v1/')),
		'nonce' => wp_create_nonce('wp_rest'),
		'endpoint' => 'apartment-gallery-order',
		'endpoints' => array(
			'apartmentGalleryOrder' => 'apartment-gallery-order',
			'apartmentHeroImage' => 'apartment-hero-image',
			'apartmentImageConfig' => 'apartment-image-config',
		),
		'canManage' => true,
	);
	?>
	<div class="wrap">
		<h1><?php echo esc_html__('Dandelion Image Admin', 'dandelion-image-admin-rest'); ?></h1>
		<div
			id="dandelion-image-admin-shell"
			style="max-width:960px;padding:24px;border:1px solid #ccd0d4;border-radius:6px;background:#fff;"
		>
			<h2><?php echo esc_html__('Dandelion Image Admin - WordPress shell mukodik', 'dandelion-image-admin-rest'); ?></h2>
			<p><?php echo esc_html__('A vedett WordPress admin belepesi pont elkeszult. A teljes image-admin UI bundle bekotese a kovetkezo lepes.', 'dandelion-image-admin-rest'); ?></p>
			<table class="widefat striped" style="max-width:720px;">
				<tbody>
					<tr>
						<th scope="row"><?php echo esc_html__('REST root', 'dandelion-image-admin-rest'); ?></th>
						<td><code><?php echo esc_html($bridge_payload['restRoot']); ?></code></td>
					</tr>
					<tr>
						<th scope="row"><?php echo esc_html__('Bridge allapot', 'dandelion-image-admin-rest'); ?></th>
						<td><?php echo esc_html__('Elokeszitve', 'dandelion-image-admin-rest'); ?></td>
					</tr>
					<tr>
						<th scope="row"><?php echo esc_html__('Nonce atadas', 'dandelion-image-admin-rest'); ?></th>
						<td><?php echo esc_html__('JS konfiguracioban elerheto', 'dandelion-image-admin-rest'); ?></td>
					</tr>
					<tr>
						<th scope="row"><?php echo esc_html__('Kovetkezo lepes', 'dandelion-image-admin-rest'); ?></th>
						<td><?php echo esc_html__('Admin UI bundle bekotese vedett wp-admin shellbe.', 'dandelion-image-admin-rest'); ?></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<script>
		window.dandelionImageAdminBridge = <?php echo wp_json_encode($bridge_payload); ?>;
	</script>
	<?php
}

function dandelion_image_admin_register_admin_page() {
	add_menu_page(
		'Dandelion Image Admin',
		'Dandelion képek',
		'manage_options',
		'dandelion-image-admin',
		'dandelion_image_admin_render_admin_page',
		'dashicons-format-gallery',
		59
	);
}

function dandelion_image_admin_get_storage() {
	$value = get_option(DANDELION_IMAGE_ADMIN_OPTION, array());

	return is_array($value) ? $value : array();
}

function dandelion_image_admin_get_media_payload($media_id) {
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
	);
}

function dandelion_image_admin_validate_gallery_ids($gallery_ids) {
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

function dandelion_image_admin_handle_apartment_gallery_order(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');
	$gallery_ids = $request->get_param('galleryIds');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_allowed_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Invalid apartmentKey.',
			array('status' => 400)
		);
	}

	$gallery_ids = dandelion_image_admin_validate_gallery_ids($gallery_ids);

	if (is_wp_error($gallery_ids)) {
		return $gallery_ids;
	}

	$storage = dandelion_image_admin_get_storage();
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

	$updated = update_option(DANDELION_IMAGE_ADMIN_OPTION, $storage, false);

	if (!$updated && get_option(DANDELION_IMAGE_ADMIN_OPTION, null) !== $storage) {
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

function dandelion_image_admin_handle_apartment_hero_image(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');
	$variant = $request->get_param('variant');
	$media_id = $request->get_param('mediaId');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_allowed_apartment_keys(), true)) {
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
	$storage = dandelion_image_admin_get_storage();
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

	$updated = update_option(DANDELION_IMAGE_ADMIN_OPTION, $storage, false);

	if (!$updated && get_option(DANDELION_IMAGE_ADMIN_OPTION, null) !== $storage) {
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

function dandelion_image_admin_handle_apartment_image_config(WP_REST_Request $request) {
	$apartment_key = $request->get_param('apartmentKey');

	if (!is_string($apartment_key) || !in_array($apartment_key, dandelion_image_admin_allowed_apartment_keys(), true)) {
		return new WP_Error(
			'dandelion_invalid_apartment_key',
			'Invalid apartmentKey.',
			array('status' => 400)
		);
	}

	$raw_option = get_option(DANDELION_IMAGE_ADMIN_OPTION, null);
	$storage = is_array($raw_option) ? $raw_option : array();
	$apartment_config = isset($storage[$apartment_key]) && is_array($storage[$apartment_key]) ? $storage[$apartment_key] : array();
	$gallery = isset($apartment_config['gallery']) && is_array($apartment_config['gallery']) ? $apartment_config['gallery'] : array();
	$hero = isset($apartment_config['hero']) && is_array($apartment_config['hero']) ? $apartment_config['hero'] : array(
		'desktop' => null,
		'mobile' => null,
	);
	$hero_images = array(
		'desktop' => dandelion_image_admin_get_media_payload(isset($hero['desktop']) ? $hero['desktop'] : 0),
		'mobile' => dandelion_image_admin_get_media_payload(isset($hero['mobile']) ? $hero['mobile'] : 0),
	);

	return rest_ensure_response(
		array(
			'apartmentKey' => $apartment_key,
			'hero' => $hero,
			'heroImages' => $hero_images,
			'gallery' => $gallery,
			'debug_version' => DANDELION_IMAGE_ADMIN_DEBUG_VERSION,
			'option_raw_exists' => null !== $raw_option,
			'option_keys' => array_values(array_keys($storage)),
		)
	);
}

add_action(
	'rest_api_init',
	static function () {
		register_rest_route(
			'dandelion/v1',
			'/apartment-gallery-order',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_handle_apartment_gallery_order',
				'permission_callback' => 'dandelion_image_admin_can_manage',
			)
		);

		register_rest_route(
			'dandelion/v1',
			'/apartment-image-config/(?P<apartmentKey>[a-z0-9_-]+)',
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => 'dandelion_image_admin_handle_apartment_image_config',
				'permission_callback' => '__return_true',
			)
		);

		// [CHANGE 2026-04-24] Added apartment hero image REST save endpoint.
		register_rest_route(
			'dandelion/v1',
			'/apartment-hero-image',
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => 'dandelion_image_admin_handle_apartment_hero_image',
				'permission_callback' => 'dandelion_image_admin_can_manage',
			)
		);
	}
);

add_action('admin_menu', 'dandelion_image_admin_register_admin_page');
