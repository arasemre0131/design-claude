<?php
/**
 * single-post.php — blog yazısı şablonu
 * @package __PRESET_ID___child
 */
if (!defined('ABSPATH')) { exit; }
get_header(); ?>

<article class="container section" style="max-width: 780px;">
    <?php while (have_posts()) : the_post(); ?>
        <header class="entry-header" style="margin-bottom: 48px;">
            <p class="card__meta"><?php echo esc_html(get_the_date('d F Y')); ?> · <?php the_author(); ?></p>
            <h1 data-wab-blur-reveal data-blur-type="words"><?php the_title(); ?></h1>
            <?php if (has_post_thumbnail()) : ?>
                <figure style="margin-top: 32px; border-radius: var(--radius-md); overflow: hidden;">
                    <?php the_post_thumbnail('large', ['loading' => 'eager']); ?>
                </figure>
            <?php endif; ?>
        </header>

        <div class="entry-content" style="font-size: 17px; line-height: 1.7;">
            <?php the_content(); ?>
        </div>

        <?php if (has_tag()) : ?>
            <footer style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--line);">
                <p class="card__meta">Etiketler: <?php the_tags('', ', '); ?></p>
            </footer>
        <?php endif; ?>
    <?php endwhile; ?>
</article>

<?php get_footer();
