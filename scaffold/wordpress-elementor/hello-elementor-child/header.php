<?php
/**
 * header.php — __PRESET_ID__ child theme
 * Rendered on every page. Elementor Theme Builder can override via
 * Elementor → Templates → Theme Builder → Header.
 *
 * @package __PRESET_ID___child
 */

if (!defined('ABSPATH')) { exit; }
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="__COLOR_BG__" />
    <link rel="profile" href="https://gmpg.org/xfn/11" />
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="sr-only" href="#main-content"><?php esc_html_e('İçeriğe geç', '__PRESET_ID___child'); ?></a>

<?php
// Theme Builder (Elementor Pro) header override
$elementor_header = function_exists('elementor_theme_do_location')
    ? elementor_theme_do_location('header')
    : false;

if (!$elementor_header) : ?>
<header class="site-header" data-wab-theme="light">
    <div class="site-header__inner">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-header__brand" aria-label="<?php bloginfo('name'); ?> — Ana sayfa">
            <?php if (function_exists('the_custom_logo') && has_custom_logo()) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <strong style="font-family: var(--font-display); font-size: 1.2rem; letter-spacing: -0.02em;">
                    <?php bloginfo('name'); ?>
                </strong>
            <?php endif; ?>
        </a>

        <nav class="site-nav" aria-label="<?php esc_attr_e('Ana navigasyon', '__PRESET_ID___child'); ?>">
            <?php
            if (has_nav_menu('primary')) {
                wp_nav_menu([
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'site-nav__list',
                    'fallback_cb'    => false,
                    'depth'          => 2,
                    'items_wrap'     => '<ul class="site-nav__list" style="display:flex;gap:24px;margin:0;padding:0;list-style:none;">%3$s</ul>',
                ]);
            } else {
                echo '<ul class="site-nav__list" style="display:flex;gap:24px;margin:0;padding:0;list-style:none;">';
                echo '<li><a class="site-nav__link" href="' . esc_url(home_url('/')) . '">Anasayfa</a></li>';
                echo '<li><a class="site-nav__link" href="#hakkimizda">Hakkımızda</a></li>';
                echo '<li><a class="site-nav__link" href="#hizmetler">Hizmetler</a></li>';
                echo '<li><a class="site-nav__link" href="#iletisim">İletişim</a></li>';
                echo '</ul>';
            }
            ?>
        </nav>

        <a href="#iletisim" class="btn btn--primary" data-wab-magnetic data-magnetic-strength="0.25">
            <?php echo esc_html__('__PRIMARY_CTA__', '__PRESET_ID___child'); ?>
        </a>
    </div>
</header>
<?php endif; // elementor header ?>

<main id="main-content" class="site-main" role="main">
