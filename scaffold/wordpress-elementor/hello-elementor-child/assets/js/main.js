/**
 * main.js — __PRESET_ID__ preset initialization
 * ----------------------------------------------------------------
 * Boots Lenis + GSAP bridge, activates wab-safe-animations patterns
 * via data-attributes, and wires up Elementor widget hooks.
 *
 * Load order (see functions.php):
 *   1. gsap + plugins
 *   2. lenis
 *   3. wab-safe-animations.js (defines window.WabAnim)
 *   4. main.js (this file)
 */

(function (root) {
  'use strict';

  var cfg = root.__PRESET_LOCALIZE__ || {};
  var WabAnim = root.WabAnim;
  if (!WabAnim) {
    console.warn('[main.js] WabAnim not found — did wab-safe-animations.js fail to load?');
    return;
  }

  // Shared Lenis reference — other scripts can access via root.__wabLenis
  var bridge = null;

  function boot() {
    // ----------------------------------------------------------
    // 1. Lenis + GSAP bridge (Pattern 1)
    // ----------------------------------------------------------
    if (!WabAnim.prefersReducedMotion) {
      bridge = WabAnim.createLenisBridge({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2
      });
    }

    // ----------------------------------------------------------
    // 2. Auto-init data-attribute driven patterns
    //    (Blur reveal, magnetic hover, mask-y, theme switch)
    // ----------------------------------------------------------
    WabAnim.autoInit(document);

    // ----------------------------------------------------------
    // 3. Global defaults — any <h1>/<h2> inside Elementor hero
    //    gets blur-reveal if author did not mark it.
    // ----------------------------------------------------------
    document
      .querySelectorAll('.elementor-section[data-hero="true"] h1, .elementor-section[data-hero="true"] h2')
      .forEach(function (el) {
        if (el.hasAttribute('data-wab-blur-reveal')) return;
        WabAnim.blurReveal(el, {
          type: 'chars',
          duration: 1.1,
          stagger: 0.04,
          start: 'top 90%'
        });
      });

    // ----------------------------------------------------------
    // 4. Elementor button → magnetic (if class includes 'magnetic')
    // ----------------------------------------------------------
    document.querySelectorAll('.elementor-button-wrapper.magnetic .elementor-button').forEach(function (btn) {
      WabAnim.magneticHover(btn, 0.25);
    });

    // ----------------------------------------------------------
    // 5. Optional: page-load reveal
    // ----------------------------------------------------------
    if (!WabAnim.prefersReducedMotion) {
      root.gsap.from('[data-wab-fade-in]', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.2
      });
    }

    // ----------------------------------------------------------
    // 6. Elementor frontend hook — reinitialize on widget updates
    // ----------------------------------------------------------
    if (root.elementorFrontend && root.elementorFrontend.hooks) {
      root.elementorFrontend.hooks.addAction('frontend/element_ready/global', function () {
        WabAnim.autoInit(document);
      });
    }

    // ----------------------------------------------------------
    // 7. prefers-reduced-motion live toggle
    // ----------------------------------------------------------
    var mq = root.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', function (ev) {
        document.documentElement.classList.toggle('reduce-motion', ev.matches);
        if (ev.matches && bridge) {
          try { bridge.lenis.stop(); } catch (e) { /* no-op */ }
        } else if (!ev.matches && bridge) {
          try { bridge.lenis.start(); } catch (e) { /* no-op */ }
        }
      });
    }

    console.log('[main.js] ' + (cfg.presetId || 'preset') + ' boot complete. Lenis:', !!bridge, 'reducedMotion:', WabAnim.prefersReducedMotion);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})(typeof window !== 'undefined' ? window : this);
