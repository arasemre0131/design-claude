<?php
/**
 * footer.php — __PRESET_ID__ child theme
 * Rendered on every page after main content. Elementor Theme Builder
 * (Pro) can override via Elementor → Templates → Theme Builder → Footer.
 *
 * @package __PRESET_ID___child
 */

if (!defined('ABSPATH')) { exit; }
?>
</main><!-- #main-content -->

<?php
$elementor_footer = function_exists('elementor_theme_do_location')
    ? elementor_theme_do_location('footer')
    : false;

if (!$elementor_footer) : ?>
<footer class="site-footer" role="contentinfo">
    <div class="site-footer__inner">

        <div class="site-footer__grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;">
            <div class="site-footer__col">
                <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:12px;color:var(--bg);"><?php bloginfo('name'); ?></h3>
                <p style="font-size:14px;line-height:1.6;opacity:0.8;"><?php bloginfo('description'); ?></p>
            </div>

            <div class="site-footer__col">
                <h3 style="font-family:var(--font-display);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;color:var(--bg);opacity:0.7;">Menü</h3>
                <?php
                if (has_nav_menu('footer')) {
                    wp_nav_menu([
                        'theme_location' => 'footer',
                        'container'      => false,
                        'fallback_cb'    => false,
                        'depth'          => 1,
                        'items_wrap'     => '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:14px;">%3$s</ul>',
                    ]);
                } else {
                    echo '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:14px;">';
                    echo '<li><a href="' . esc_url(home_url('/')) . '" style="color:inherit;opacity:0.75;">Anasayfa</a></li>';
                    echo '<li><a href="#hakkimizda" style="color:inherit;opacity:0.75;">Hakkımızda</a></li>';
                    echo '<li><a href="#iletisim" style="color:inherit;opacity:0.75;">İletişim</a></li>';
                    echo '</ul>';
                }
                ?>
            </div>

            <div class="site-footer__col">
                <h3 style="font-family:var(--font-display);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;color:var(--bg);opacity:0.7;">Yasal</h3>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:14px;">
                    <li><a href="<?php echo esc_url(home_url('/gizlilik-politikasi/')); ?>" style="color:inherit;opacity:0.75;">Gizlilik Politikası</a></li>
                    <li><a href="<?php echo esc_url(home_url('/kvkk/')); ?>" style="color:inherit;opacity:0.75;">KVKK Aydınlatma Metni</a></li>
                    <li><a href="<?php echo esc_url(home_url('/cerez-politikasi/')); ?>" style="color:inherit;opacity:0.75;">Çerez Politikası</a></li>
                    <li><a href="<?php echo esc_url(home_url('/mesafeli-satis-sozlesmesi/')); ?>" style="color:inherit;opacity:0.75;">Mesafeli Satış Sözleşmesi</a></li>
                </ul>
            </div>

            <div class="site-footer__col">
                <h3 style="font-family:var(--font-display);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;color:var(--bg);opacity:0.7;">İletişim</h3>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;font-size:14px;">
                    <li>
                        <a href="tel:<?php echo esc_attr(get_option('__PRESET_ID___phone', '+905555555555')); ?>"
                           style="color:inherit;opacity:0.85;">
                            <?php echo esc_html(get_option('__PRESET_ID___phone_display', '+90 555 555 55 55')); ?>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:<?php echo esc_attr(get_option('__PRESET_ID___email', 'info@example.com')); ?>"
                           style="color:inherit;opacity:0.85;">
                            <?php echo esc_html(get_option('__PRESET_ID___email', 'info@example.com')); ?>
                        </a>
                    </li>
                    <li style="opacity:0.75;">
                        <?php echo esc_html(get_option('__PRESET_ID___address', 'İstanbul, Türkiye')); ?>
                    </li>
                </ul>
            </div>

        </div>

        <div class="site-footer__bottom">
            <p style="margin:0;">
                &copy; <?php echo esc_html(date('Y')); ?> <?php bloginfo('name'); ?>. Tüm hakları saklıdır.
            </p>
            <p style="margin:0; font-family: var(--font-mono); font-size: 11px; opacity: 0.5;">
                design-claude preset: <?php echo esc_html('__PRESET_ID__'); ?>
            </p>
        </div>
    </div>
</footer>
<?php endif; // elementor footer ?>

<?php wp_footer(); ?>
</body>
</html>
