<?php
/**
 * 404.php — hata sayfası
 * @package __PRESET_ID___child
 */
if (!defined('ABSPATH')) { exit; }
get_header(); ?>

<section class="container section section--hero" style="text-align: center;">
    <p class="card__meta" style="margin-bottom: 16px;">Error 404</p>
    <h1 data-wab-blur-reveal style="font-size: clamp(3rem, 10vw, 8rem); line-height: 0.95;">
        Sayfa bulunamadı.
    </h1>
    <p style="max-width: 52ch; margin: 24px auto 40px; font-size: 17px; opacity: 0.75;">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Ana sayfaya dönüp aramayı deneyebilirsiniz.
    </p>

    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn--primary" data-wab-magnetic>
            Ana Sayfaya Dön
        </a>
        <a href="<?php echo esc_url(home_url('/#iletisim')); ?>" class="btn btn--outline">
            İletişime Geç
        </a>
    </div>

    <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" style="margin-top: 48px; max-width: 420px; margin-inline: auto;">
        <label for="s-404" class="sr-only">Sitede ara</label>
        <div style="display: flex; gap: 8px;">
            <input type="search" id="s-404" name="s" placeholder="Ne arıyordunuz?" required style="flex: 1; padding: 12px 16px; border: 1px solid var(--line); border-radius: var(--radius-md); background: var(--bg); color: var(--ink); font-family: inherit;">
            <button type="submit" class="btn btn--primary">Ara</button>
        </div>
    </form>
</section>

<?php get_footer();
