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
		$this->register_settings();
		$this->register_rest_routes();
	}

    /**
     * Register the single option in wp_options
     */
    private function register_settings() {
        register_setting('REVISTAPOSIDONIA_EDITORIAL_CONTROL', 'REVISTAPOSIDONIA_EDITORIAL_CONTROL', [
            'type'              => 'object',
            'sanitize_callback' => [$this, 'sanitize_settings'],
            'default'           => [
                'portada' => [
                    'articulos_tapa' => [
                        'articulo_primario' => '',
                        'articulo_secundario' => '',
                        'articulo_terciario' => '',
                    ],
                    'audiovisual' => [
                        'titulo' => '',
                        'desc' => '',
                        'url' => '',
                    ],
                ],
            ]
        ]);
    }

    private function get_schema() {
        return [
            'type'       => 'object',
            'properties' => [
                'portada' => [
                    'type'       => 'object',
                    'properties' => [
                        'articulos_tapa' => [
                            'type'       => 'object',
                            'properties' => [
                                'articulo_primario'   => ['type' => 'string'],
                                'articulo_secundario' => ['type' => 'string'],
                                'articulo_terciario'  => ['type' => 'string'],
                            ]
                        ],
                        'audiovisual' => [
                            'type'       => 'object',
                            'properties' => [
                                'titulo' => ['type' => 'string'],
                                'desc'   => ['type' => 'string'],
                                'url'    => ['type' => 'string'],
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }

    /**
     * Sanitize the settings before saving
     */
    public function sanitize_settings($input) {
        $output = [];

        if (isset($input['portada'])) {
            $portada = $input['portada'];

            $output['portada']['articulos_tapa'] = [
                'articulo_primario'   => sanitize_text_field($portada['articulos_tapa']['articulo_primario'] ?? ''),
                'articulo_secundario' => sanitize_text_field($portada['articulos_tapa']['articulo_secundario'] ?? ''),
                'articulo_terciario'  => sanitize_text_field($portada['articulos_tapa']['articulo_terciario'] ?? ''),
            ];

            $output['portada']['audiovisual'] = [
                'titulo' => sanitize_text_field($portada['audiovisual']['titulo'] ?? ''),
                'desc'   => sanitize_text_field($portada['audiovisual']['desc'] ?? ''),
                'url'    => esc_url_raw($portada['audiovisual']['url'] ?? ''),
            ];
        }

        return $output;
    }

    /**
     * Register custom REST route
     */
    private function register_rest_routes() {
        register_rest_route('revista-posidonia/v1', '/settings', [
            [
                'methods'             => 'GET',
                'callback'            => [$this, 'get_settings'],
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                }
            ],
            [
                'methods'             => 'POST',
                'callback'            => [$this, 'update_settings'],
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
                'args'                => [
                    'body' => [
                        'type'       => 'object',
                        'required'   => true,
                        'properties' => $this->get_schema()['properties']
                    ]
                ]
            ]
        ]);
    }

    /**
     * GET: Return all settings
     */
    public function get_settings() {
        return get_option('REVISTAPOSIDONIA_EDITORIAL_CONTROL', []);
    }

    /**
     * POST: Update settings (partial updates allowed)
     */
    public function update_settings(WP_REST_Request $request) {
        $current = get_option('REVISTAPOSIDONIA_EDITORIAL_CONTROL', []);
        $params  = $request->get_json_params();

        $merged = array_replace_recursive($current, $params);
        $sanitized = $this->sanitize_settings($merged);

        update_option('REVISTAPOSIDONIA_EDITORIAL_CONTROL', $sanitized);

        return $sanitized;
    }

}
