<?php
/**
 * archive.php — kategori/tag/yazar arşiv sayfası
 * @package __PRESET_ID___child
 */
if (!defined('ABSPATH')) { exit; }
get_header(); ?>

<section class="container section">
    <header class="entry-header" style="margin-bottom: 48px; text-align: center;">
        <?php if (is_category()) : ?>
            <h1 data-wab-blur-reveal><?php single_cat_title(); ?></h1>
        <?php elseif (is_tag()) : ?>
            <h1 data-wab-blur-reveal>#<?php single_tag_title(); ?></h1>
        <?php elseif (is_author()) : ?>
            <h1 data-wab-blur-reveal><?php the_archive_title(); ?></h1>
        <?php else : ?>
            <h1 data-wab-blur-reveal><?php the_archive_title(); ?></h1>
        <?php endif; ?>
        <p style="opacity: 0.7; max-width: 60ch; margin: 0 auto;"><?php the_archive_description(); ?></p>
    </header>

    <?php if (have_posts()) : ?>
        <div class="archive-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:32px;">
            <?php while (have_posts()) : the_post(); ?>
                <article class="card">
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>" style="display:block;margin:-24px -24px 16px;border-radius:var(--radius-md) var(--radius-md) 0 0;overflow:hidden;">
                            <?php the_post_thumbnail('medium_large', ['loading' => 'lazy', 'style' => 'width:100%;height:auto;display:block;']); ?>
                        </a>
                    <?php endif; ?>
                    <p class="card__meta"><?php echo esc_html(get_the_date('d F Y')); ?></p>
                    <h2 class="card__title"><a href="<?php the_permalink(); ?>" style="color:inherit;"><?php the_title(); ?></a></h2>
                    <p style="font-size:14px;line-height:1.55;margin:8px 0 0;"><?php echo esc_html(wp_trim_words(get_the_excerpt(), 18)); ?></p>
                </article>
            <?php endwhile; ?>
        </div>
        <nav class="pagination" style="display:flex;justify-content:center;gap:8px;margin-top:48px;">
            <?php echo paginate_links(); ?>
        </nav>
    <?php else : ?>
        <p style="text-align:center;opacity:0.7;"><?php esc_html_e('Bu bölümde henüz içerik yok.', '__PRESET_ID___child'); ?></p>
    <?php endif; ?>
</section>

<?php get_footer();
