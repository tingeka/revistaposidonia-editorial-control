<?php
/**
 * Global helpers for Editorial Control plugin.
 */

// namespace RevistaPosidonia\EditorialControl\Inc;

use TenupFramework\ModuleInitialization;
use RevistaPosidonia\EditorialControl\Admin\AdminSettings;

/**
 * Internal: fetch AdminSettings instance.
 *
 * @return AdminSettings|null
 */
function _revistaposidonia_editorial_control_admin_settings(): ?AdminSettings {
    return ModuleInitialization::get_module(AdminSettings::class) ?: null;
}

/**
 * This helper is to deal with Oxygen shenanigans,
 * because it expects the value to be an string.
 */
function _revistaposidonia_editorial_control_format_id( $id, $format = 'array' ) {
    switch ( $format ) {
        case 'string':
            return (string) $id;
        case 'int':
            return (int) $id;
        case 'array':
        default:
            return [$id];
    }
}
/**
 * Get full settings array.
 *
 * @return array|null
 */
function revistaposidonia_editorial_control_settings(): ?array {
    $admin_settings = _revistaposidonia_editorial_control_admin_settings();
    return $admin_settings ? $admin_settings->get_settings() : null;
}

/**
 * Does the cover have a primary article?
 */
function revistaposidonia_editorial_control_has_primary_article(): bool {
    $settings = revistaposidonia_editorial_control_settings();
    return ! empty( $settings['cover']['articles']['article_primary'] );
}

/**
 * Get the primary article ID.
 *
 * @param string $format Return format: 'array' (default), 'string', or 'int'
 * @return array|string|int|null
 */
function revistaposidonia_editorial_control_get_primary_article_id(string $format = 'array'): array|string|int|null {
    $settings = revistaposidonia_editorial_control_settings();
    $id = $settings['cover']['articles']['article_primary'][0]['id'] ?? null;
    return _revistaposidonia_editorial_control_format_id( $id, $format );
}

/**
 * Get all secondary article IDs as array (for post__in).
 *
 * @return array|string|int|null
 */
function revistaposidonia_editorial_control_get_secondary_article_id( string $format = 'array' ): array|string|int|null {
    $settings = revistaposidonia_editorial_control_settings();
    $id = $settings['cover']['articles']['article_secondary'][0]['id'] ?? null;
    return _revistaposidonia_editorial_control_format_id( $id, $format );
}

/**
 * Get all tertiary article IDs as array (for post__in).
 *
 * @return array|string|int|null
 */
function revistaposidonia_editorial_control_get_tertiary_article_id( string $format = 'array' ): array|string|int|null {
    $settings = revistaposidonia_editorial_control_settings();
    $id = $settings['cover']['articles']['article_tertiary'][0]['id'] ?? null;
    return _revistaposidonia_editorial_control_format_id( $id, $format );
}


/**
 * Retrieve a part of the cover's audiovisual content.
 *
 * @param string $part One of 'title', 'url', or 'desc'.
 * @return string|null The requested content, or null if not set.
 */
function revistaposidonia_editorial_control_get_audiovisual_content( string $part ): ?string {
    $settings = revistaposidonia_editorial_control_settings();
    $audiovisual_part = $settings['cover']['audiovisual'][$part] ?? null;
    return $audiovisual_part;
}