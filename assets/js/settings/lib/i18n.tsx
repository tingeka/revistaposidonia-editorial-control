// assets/js/settings/i18n.js
import { __ } from '@wordpress/i18n';

// Export commonly used strings as constants for consistency
export const STRINGS = {
    // Page titles
    EDITORIAL_CONTROL: __('Editorial Control', 'revistaposidonia-editorial-control'),
    COVER: __('Portada', 'revistaposidonia-editorial-control'),
    
    // Article types
    ARTICLE_PRIMARY: __('Artículo Primario', 'revistaposidonia-editorial-control'),
    ARTICLE_SECONDARY: __('Artículo Secundario', 'revistaposidonia-editorial-control'),
    ARTICLE_TERTIARY: __('Artículo Terciario', 'revistaposidonia-editorial-control'),
    COVER_ARTICLES: __('Artículos de tapa', 'revistaposidonia-editorial-control'),
    
    // Audiovisual section
    AUDIOVISUAL_SECTION: __('Sección Audiovisual', 'revistaposidonia-editorial-control'),
    VIDEO_TITLE: __('Título del video', 'revistaposidonia-editorial-control'),
    VIDEO_URL: __('URL del video', 'revistaposidonia-editorial-control'),
    VIDEO_DESCRIPTION: __('Descripción del video', 'revistaposidonia-editorial-control'),
    NO_AUDIOVISUAL_CONTENT: __('No hay contenido audiovisual.', 'revistaposidonia-editorial-control'),
    EMBED_URL_NOT_COMPATIBLE: __('URL no compatible para incrustar', 'revistaposidonia-editorial-control'),
    
    // Form controls
    SEARCH_CONTENT: __('Buscar contenido...', 'revistaposidonia-editorial-control'),
    LOADING: __('Cargando...', 'revistaposidonia-editorial-control'),
    SAVING: __('Guardando...', 'revistaposidonia-editorial-control'),
    SAVE_CHANGES: __('Guardar Cambios', 'revistaposidonia-editorial-control'),
    UNSAVED_CHANGES: __('Cambios sin guardar', 'revistaposidonia-editorial-control'),
    SETTINGS_SAVED_SUCCESS: __('¡Configuración guardada exitosamente!', 'revistaposidonia-editorial-control'),
    
    // Validation messages
    VALID_URL_REQUIRED: __('Por favor ingrese una URL válida con protocolo (http:// o https://).', 'revistaposidonia-editorial-control'),
    
    // Misc
    NO_TITLE: __('(Sin título)', 'revistaposidonia-editorial-control'),
};