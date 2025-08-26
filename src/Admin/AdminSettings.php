<?php
/**
 * Demo Post Type
 *
 * @package RevistaPosidonia\EditorialControl\Admin
 */

declare(strict_types = 1);

namespace RevistaPosidonia\EditorialControl\Admin;

use TenupFramework\ModuleInterface;
use TenupFramework\Module;

use RevistaPosidonia\EditorialControl\Inc\LoggerFactory;
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
		return true;
	}

	/**
	 * Register the post type.
	 *
	 * @return void
	 */
	public function register() {
		
	}

}
