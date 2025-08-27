<?php
/**
 * Admin Assets module.
 *
 * @package RevistaPosidonia\EditorialControl\Admin
 */

namespace RevistaPosidonia\EditorialControl\Admin;

use TenupFramework\Assets\GetAssetInfo;
use TenupFramework\Module;
use TenupFramework\ModuleInterface;

/**
 * Admin Assets module.
 *
 * @package RevistaPosidonia\EditorialControl\Admin
 */
class AdminAssets implements ModuleInterface {

	use Module;
	use GetAssetInfo;

	/**
	 * Can this module be registered?
	 *
	 * @return bool
	 */
	public function can_register() {
		return true;
	}

	/**
	 * Register any hooks and filters.
	 *
	 * @return void
	 */
	public function register() {
		$this->setup_asset_vars(
			dist_path: REVISTAPOSIDONIA_EDITORIAL_CONTROL_PATH . 'dist/',
			fallback_version: REVISTAPOSIDONIA_EDITORIAL_CONTROL_VERSION
		);

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_styles' ] );
	}

	/**
	 * Enqueue scripts for admin.
	 *
	 * @return void
	 */
	public function admin_scripts() {
		$screen = get_current_screen();
		
		if ( $screen && 'toplevel_page_editorial-control-page' === $screen->id ) {
			wp_enqueue_script(
				'revistaposidonia_editorial_control_admin_settings_page',
				REVISTAPOSIDONIA_EDITORIAL_CONTROL_URL . 'dist/js/settings/admin-settings-page.js',
				$this->get_asset_info( 'settings/admin-settings-page', 'dependencies' ),
				$this->get_asset_info( 'settings/admin-settings-page', 'version' ),
				true
			);
		}

	}

	/**
	 * Enqueue styles for admin.
	 *
	 * @return void
	 */
	public function admin_styles() {
		$screen = get_current_screen();

		if ( $screen && 'toplevel_page_editorial-control-page' === $screen->id ) {
			// This is the source of truth for the entire component's dependencies.
			$deps = [];
	
			wp_enqueue_style(
				'REVISTAPOSIDONIA_EDITORIAL_CONTROL_fotoperiodismo_admin_page_styles',
				REVISTAPOSIDONIA_EDITORIAL_CONTROL_URL . 'dist/css/settings/admin-settings-page.css', // Note the corrected file name
				$deps,
				$this->get_asset_info( 'settings/admin-settings-page', 'version' ),
			);
		}
	}
}
