<?php
/**
 * __PRESET_ID__ child theme — functions.php
 * ----------------------------------------------------------------
 * design-claude scaffold-wp.js generated
 *
 * Preset: __PRESET_ID__  (__PRESET_SECTOR__ × __PRESET_STYLE__)
 * Recipe: wordpress-elementor-motion (Budget Tier, 7.5-15K TRY)
 * Atoms:  palette=__PALETTE_ID__ typography=__TYPOGRAPHY_ID__
 *
 * Features:
 *   - GSAP 3.13.0 + ScrollTrigger + SplitText (all free since Webflow acquisition 2024)
 *   - Lenis 1.3.4 smooth scroll
 *   - Custom wab-safe-animations.js (6 MIT-safe patterns, vanilla JS)
 *   - Elementor Pro 3.35+ compatibility
 *   - Google Fonts preload + display=swap
 *   - Schema.org JSON-LD (LocalBusiness / Product)
 *   - KVKK cookie consent banner (Türkiye yasal)
 *   - Wordfence-friendly hardening
 *
 * @package __PRESET_ID___child
 * @since   1.0.0
 */

if (!defined('ABSPATH')) { exit; } // Direct access koruması

/* ================================================================ */
/*  Theme constants                                                  */
/* ================================================================ */

define('__PRESET_CONST_PREFIX___VERSION', '1.0.0');
define('__PRESET_CONST_PREFIX___THEME_DIR', get_stylesheet_directory());
define('__PRESET_CONST_PREFIX___THEME_URI', get_stylesheet_directory_uri());

/* ================================================================ */
/*  Enqueue parent + child styles                                    */
/* ================================================================ */

function __PRESET_FN_PREFIX___enqueue_styles() {
    wp_enqueue_style(
        'hello-elementor',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme()->parent()->get('Version')
    );
    wp_enqueue_style(
        '__PRESET_ID__-child',
        get_stylesheet_uri(),
        ['hello-elementor'],
        __PRESET_CONST_PREFIX___VERSION
    );
    // Custom + Lenis CSS (imported via style.css, enqueue separately for cache busting)
    wp_enqueue_style(
        '__PRESET_ID__-custom',
        __PRESET_CONST_PREFIX___THEME_URI . '/assets/css/custom.css',
        ['__PRESET_ID__-child'],
        @filemtime(__PRESET_CONST_PREFIX___THEME_DIR . '/assets/css/custom.css') ?: __PRESET_CONST_PREFIX___VERSION
    );
    wp_enqueue_style(
        '__PRESET_ID__-lenis',
        __PRESET_CONST_PREFIX___THEME_URI . '/assets/css/lenis.css',
        ['__PRESET_ID__-child'],
        @filemtime(__PRESET_CONST_PREFIX___THEME_DIR . '/assets/css/lenis.css') ?: __PRESET_CONST_PREFIX___VERSION
    );
}
add_action('wp_enqueue_scripts', '__PRESET_FN_PREFIX___enqueue_styles');

/* ================================================================ */
/*  Enqueue motion libraries (GSAP + Lenis + custom)                 */
/* ================================================================ */

function __PRESET_FN_PREFIX___enqueue_motion() {
    // GSAP 3.13 core
    wp_enqueue_script(
        'gsap',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
        [],
        '3.13.0',
        true
    );
    // ScrollTrigger
    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
        ['gsap'],
        '3.13.0',
        true
    );
    // SplitText (ücretsiz 2024 sonrası Webflow acquisition)
    wp_enqueue_script(
        'gsap-splittext',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js',
        ['gsap'],
        '3.13.0',
        true
    );
    // Observer (opsiyonel — swipe/scroll detect)
    wp_enqueue_script(
        'gsap-observer',
        'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Observer.min.js',
        ['gsap'],
        '3.13.0',
        true
    );
    // Lenis 1.3.4 smooth scroll
    wp_enqueue_script(
        'lenis',
        'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js',
        [],
        '1.3.4',
        true
    );

    // Custom wab-safe-animations (6 pattern, MIT-safe)
    wp_enqueue_script(
        '__PRESET_ID__-wab-anim',
        __PRESET_CONST_PREFIX___THEME_URI . '/assets/js/wab-safe-animations.js',
        ['gsap', 'gsap-scrolltrigger', 'gsap-splittext', 'lenis'],
        @filemtime(__PRESET_CONST_PREFIX___THEME_DIR . '/assets/js/wab-safe-animations.js') ?: __PRESET_CONST_PREFIX___VERSION,
        true
    );
    // Preset-specific main init
    wp_enqueue_script(
        '__PRESET_ID__-main',
        __PRESET_CONST_PREFIX___THEME_URI . '/assets/js/main.js',
        ['__PRESET_ID__-wab-anim'],
        @filemtime(__PRESET_CONST_PREFIX___THEME_DIR . '/assets/js/main.js') ?: __PRESET_CONST_PREFIX___VERSION,
        true
    );

    // Pass preset config to JS
    wp_localize_script('__PRESET_ID__-main', '__PRESET_LOCALIZE__', [
        'presetId'       => '__PRESET_ID__',
        'sector'         => '__PRESET_SECTOR__',
        'style'          => '__PRESET_STYLE__',
        'reducedMotion'  => false, // client-side match
        'whatsappNumber' => '',    // fill via ACF or wp_options
        'themeDir'       => __PRESET_CONST_PREFIX___THEME_URI,
    ]);
}
add_action('wp_enqueue_scripts', '__PRESET_FN_PREFIX___enqueue_motion');

/* ================================================================ */
/*  Google Fonts preload + display=swap                              */
/* ================================================================ */

function __PRESET_FN_PREFIX___preconnect() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>' . "\n";
}
add_action('wp_head', '__PRESET_FN_PREFIX___preconnect', 0);

function __PRESET_FN_PREFIX___google_fonts() {
    $font_url = '__FONT_GOOGLE_URL__';
    if ($font_url && $font_url !== '(none)') {
        printf(
            '<link rel="stylesheet" href="%s" media="print" onload="this.media=\'all\'" />' . "\n",
            esc_url($font_url)
        );
        // Fallback for no-JS
        printf(
            '<noscript><link rel="stylesheet" href="%s" /></noscript>' . "\n",
            esc_url($font_url)
        );
    }
}
add_action('wp_head', '__PRESET_FN_PREFIX___google_fonts', 1);

/* ================================================================ */
/*  Schema.org JSON-LD (LocalBusiness / Product)                     */
/* ================================================================ */

function __PRESET_FN_PREFIX___schema_jsonld() {
    $site_name = get_bloginfo('name');
    $site_url  = home_url('/');
    $site_desc = get_bloginfo('description');

    $schema_type = '__SCHEMA_TYPE__';
    if (!$schema_type) { $schema_type = 'LocalBusiness'; }

    // Homepage
    if (is_front_page() || is_home()) {
        $data = [
            '@context'    => 'https://schema.org',
            '@type'       => $schema_type,
            'name'        => $site_name,
            'url'         => $site_url,
            'description' => $site_desc,
            'inLanguage'  => 'tr-TR',
            'areaServed'  => 'TR',
        ];
        // Sector-specific extras
        if (strpos($schema_type, 'Salon') !== false || $schema_type === 'HairSalon') {
            $data['priceRange'] = 'TRY';
        }
        echo '<script type="application/ld+json">' . wp_json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }

    // WooCommerce Product (if active)
    if (function_exists('is_product') && is_product()) {
        global $product;
        if ($product instanceof WC_Product) {
            $data = [
                '@context'    => 'https://schema.org',
                '@type'       => 'Product',
                'name'        => $product->get_name(),
                'description' => wp_strip_all_tags($product->get_description()),
                'sku'         => $product->get_sku(),
                'image'       => wp_get_attachment_url($product->get_image_id()),
                'offers'      => [
                    '@type'         => 'Offer',
                    'priceCurrency' => get_woocommerce_currency(),
                    'price'         => $product->get_price(),
                    'availability'  => $product->is_in_stock()
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/OutOfStock',
                ],
            ];
            echo '<script type="application/ld+json">' . wp_json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        }
    }
}
add_action('wp_head', '__PRESET_FN_PREFIX___schema_jsonld', 20);

/* ================================================================ */
/*  KVKK cookie consent banner (Türkiye yasal)                       */
/* ================================================================ */

function __PRESET_FN_PREFIX___kvkk_banner() {
    if (isset($_COOKIE['kvkk_accepted'])) { return; }
    if (is_admin()) { return; }
    ?>
    <div id="kvkk-banner" class="kvkk-banner" role="dialog" aria-labelledby="kvkk-banner-title">
        <div class="kvkk-banner__inner">
            <p id="kvkk-banner-title" class="kvkk-banner__text">
                Bu site çerez kullanır. KVKK kapsamında kişisel verilerinizin işlenmesine onay veriyor musunuz?
                <a href="<?php echo esc_url(home_url('/gizlilik-politikasi/')); ?>">Detaylı bilgi</a>
            </p>
            <div class="kvkk-banner__actions">
                <button type="button" class="kvkk-banner__btn kvkk-banner__btn--reject" onclick="document.cookie='kvkk_accepted=0; max-age=31536000; path=/'; this.closest('#kvkk-banner').remove();">Reddet</button>
                <button type="button" class="kvkk-banner__btn kvkk-banner__btn--accept" onclick="document.cookie='kvkk_accepted=1; max-age=31536000; path=/'; this.closest('#kvkk-banner').remove();">Kabul Et</button>
            </div>
        </div>
    </div>
    <style>
        .kvkk-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--ink, #0a0a0a);
            color: var(--bg, #fff);
            padding: 16px 24px;
            z-index: 9999;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.1);
            animation: kvkkSlideUp 0.4s ease-out;
        }
        .kvkk-banner__inner {
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            gap: 16px;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .kvkk-banner__text {
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
            flex: 1 1 420px;
        }
        .kvkk-banner__text a {
            color: var(--accent, #E89B7C);
            text-decoration: underline;
        }
        .kvkk-banner__actions {
            display: flex;
            gap: 8px;
        }
        .kvkk-banner__btn {
            padding: 10px 18px;
            border: 0;
            cursor: pointer;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            border-radius: 4px;
            transition: opacity 0.2s;
        }
        .kvkk-banner__btn--accept {
            background: var(--accent, #E89B7C);
            color: var(--ink, #0a0a0a);
        }
        .kvkk-banner__btn--reject {
            background: transparent;
            color: var(--bg, #fff);
            border: 1px solid rgba(255,255,255,0.3);
        }
        .kvkk-banner__btn:hover { opacity: 0.85; }
        @keyframes kvkkSlideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 640px) {
            .kvkk-banner__inner { flex-direction: column; align-items: flex-start; }
            .kvkk-banner__actions { width: 100%; justify-content: flex-end; }
        }
    </style>
    <?php
}
add_action('wp_footer', '__PRESET_FN_PREFIX___kvkk_banner');

/* ================================================================ */
/*  Elementor Pro requirement check                                  */
/* ================================================================ */

function __PRESET_FN_PREFIX___require_elementor_pro() {
    if (!did_action('elementor/loaded')) {
        add_action('admin_notices', function () {
            echo '<div class="notice notice-error"><p><strong>__PRESET_ID__ child theme:</strong> Elementor eklentisi gerekli. Lütfen yükleyip aktifleştirin.</p></div>';
        });
        return;
    }
    if (!class_exists('ElementorPro\Plugin')) {
        add_action('admin_notices', function () {
            echo '<div class="notice notice-warning"><p><strong>__PRESET_ID__ child theme:</strong> Elementor <em>Pro</em> önerilir (Theme Builder + Forms + Motion için).</p></div>';
        });
    }
}
add_action('init', '__PRESET_FN_PREFIX___require_elementor_pro');

/* ================================================================ */
/*  Disable Gutenberg (Elementor-first workflow)                     */
/* ================================================================ */

add_filter('use_block_editor_for_post', '__return_false', 100);
add_filter('use_block_editor_for_post_type', '__return_false', 100);

/* ================================================================ */
/*  Theme supports                                                   */
/* ================================================================ */

function __PRESET_FN_PREFIX___theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');

    // Menus
    register_nav_menus([
        'primary' => __('Ana Menü', '__PRESET_ID___child'),
        'footer'  => __('Footer Menü', '__PRESET_ID___child'),
        'mobile'  => __('Mobil Menü', '__PRESET_ID___child'),
    ]);

    // Load Turkish translations
    load_theme_textdomain('__PRESET_ID___child', get_stylesheet_directory() . '/languages');
}
add_action('after_setup_theme', '__PRESET_FN_PREFIX___theme_setup');

/* ================================================================ */
/*  Security hardening (Wordfence complement)                        */
/* ================================================================ */

// Remove WP version from head (security through obscurity)
remove_action('wp_head', 'wp_generator');

// Disable XML-RPC (brute force vector)
add_filter('xmlrpc_enabled', '__return_false');

// Remove REST API user enumeration
add_filter('rest_endpoints', function ($endpoints) {
    if (isset($endpoints['/wp/v2/users'])) { unset($endpoints['/wp/v2/users']); }
    if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) { unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']); }
    return $endpoints;
});

// Disable file editing in WP admin
if (!defined('DISALLOW_FILE_EDIT')) { define('DISALLOW_FILE_EDIT', true); }

/* ================================================================ */
/*  Performance — defer non-critical JS                              */
/* ================================================================ */

function __PRESET_FN_PREFIX___defer_scripts($tag, $handle) {
    $defer_handles = ['gsap', 'gsap-scrolltrigger', 'gsap-splittext', 'gsap-observer', 'lenis', '__PRESET_ID__-wab-anim', '__PRESET_ID__-main'];
    if (in_array($handle, $defer_handles, true)) {
        return str_replace(' src', ' defer="defer" src', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', '__PRESET_FN_PREFIX___defer_scripts', 10, 2);

/* ================================================================ */
/*  Register custom Elementor category (preset widgets)              */
/* ================================================================ */

add_action('elementor/elements/categories_registered', function ($elements_manager) {
    $elements_manager->add_category(
        '__PRESET_ID___widgets',
        [
            'title' => __('__PRESET_ID__ Widgets', '__PRESET_ID___child'),
            'icon'  => 'fa fa-plug',
        ]
    );
});

/* ================================================================ */
/*  WhatsApp floating button (helper function)                       */
/* ================================================================ */

function __PRESET_FN_PREFIX___whatsapp_float() {
    $number = get_option('__PRESET_ID___whatsapp_number', '');
    if (!$number) { return; }
    $message = urlencode(get_option('__PRESET_ID___whatsapp_message', 'Merhaba, siteden yazıyorum.'));
    ?>
    <a href="https://wa.me/<?php echo esc_attr($number); ?>?text=<?php echo esc_attr($message); ?>"
       class="whatsapp-float"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="WhatsApp ile iletişime geç">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.08 4.5.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.94 14.5L2 22l5.68-1.49A10 10 0 1 0 12 2z"/>
        </svg>
    </a>
    <style>
        .whatsapp-float {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #25D366;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
            z-index: 998;
            transition: transform 0.2s ease-out;
        }
        .whatsapp-float:hover { transform: scale(1.08); color: #fff; }
    </style>
    <?php
}
add_action('wp_footer', '__PRESET_FN_PREFIX___whatsapp_float');

/* ================================================================ */
/*  Elementor template JSON auto-import on activation                */
/* ================================================================ */

function __PRESET_FN_PREFIX___import_elementor_template() {
    if (!get_option('__PRESET_ID___templates_imported')) {
        // Hook into Elementor template importer (manual for now — see README)
        update_option('__PRESET_ID___templates_imported', true);
    }
}
add_action('after_switch_theme', '__PRESET_FN_PREFIX___import_elementor_template');
