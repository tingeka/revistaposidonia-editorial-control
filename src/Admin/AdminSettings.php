<?php
/**
 * Demo Post Type
 *
 * @package RevistaPosidonia\ControlEditorial\Admin
 */

declare(strict_types = 1);

namespace RevistaPosidonia\ControlEditorial\Admin;

use TenupFramework\ModuleInterface;
use TenupFramework\Module;

use RevistaPosidonia\ControlEditorial\Inc\LoggerFactory;
use Monolog\Logger;

/**
 * Fotoperiodismo post type.
 */
class AdminSettings implements ModuleInterface {
	use Module;

	/**
	 * Can the class be registered?
	 *
	 * @return bool
	 */
	public function can_register() {
		return false;
	}

	/**
	 * Register the post type.
	 *
	 * @return void
	 */
	public function register() {
		
	}

}
