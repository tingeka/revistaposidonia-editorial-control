<?php
/**
 * Gutenberg Blocks setup
 *
 * @package RevistaPosidonia\EditorialControl\Admin
 */

namespace RevistaPosidonia\EditorialControl\Admin;

use RevistaPosidonia\EditorialControl\Vendor\TenupFramework\Assets\GetAssetInfo;
use RevistaPosidonia\EditorialControl\Vendor\TenupFramework\Module;
use RevistaPosidonia\EditorialControl\Vendor\TenupFramework\ModuleInterface;

/**
 * AdminPage module.
 *
 * @package RevistaPosidonia\EditorialControl\Admin
 */
class AdminPage implements ModuleInterface {

	use Module;
	use GetAssetInfo;

	/**
	 * Arguments for configuring the admin page.
	 *
	 * @var array
	 */
	protected $args = [];

	public function __construct() {
		$args       = [
			'page_title' => __( 'Editorial Control', 'revistaposidonia-editorial-control' ),
			'menu_title' => __( 'Editorial Control', 'revistaposidonia-editorial-control' ),
			'capability' => 'manage_options',
			'menu_slug'  => 'editorial-control-page',
			'icon'       => 'dashicons-admin-generic',
			'position'   => 2,
		];
		$this->args = array_merge( $args, $this->args );
	}

	/**
	 * Allow registration
	 */
	public function can_register() {
		return true;
	}

	/**
	 * Register hooks
	 */
	public function register() {
		$this->setup_asset_vars(
			dist_path: REVISTAPOSIDONIA_EDITORIAL_CONTROL_DIST_PATH,
			fallback_version: REVISTAPOSIDONIA_EDITORIAL_CONTROL_VERSION
		);

		add_action( 'admin_menu', [ $this, 'register_admin_menu' ], 10 );
	}

	/**
	 * Registers a top-level admin menu page
	 */
	public function register_admin_menu(): void {
		$args = $this->args;

		add_menu_page(
			$args['page_title'],
			$args['menu_title'],
			$args['capability'],
			$args['menu_slug'],
			[ $this, 'render_admin_page' ],
			$args['icon'],
			$args['position']
		);
	}

	/**
	 * Renders the admin page
	 */
	public function render_admin_page() {
		printf(
			'<div id="%s"></div>',
			esc_attr( $this->args['menu_slug'] )
		);
	}
}
