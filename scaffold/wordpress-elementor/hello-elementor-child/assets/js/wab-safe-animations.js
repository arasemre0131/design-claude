/**
 * wab-safe-animations.js
 * ----------------------------------------------------------------
 * MIT-safe ORIGINAL rewrite of 6 animation patterns inspired by the
 * commercial wearebrand.io and fraxbit.com WordPress sites.
 *
 * The reference files (wearebrand-animations.js ~30KB minified) are
 * proprietary and CANNOT be copied verbatim. This file is a fresh
 * implementation of the same six conceptual patterns, written from
 * spec, using GSAP + Lenis public APIs + vanilla DOM. Released as
 * part of the design-claude scaffolder under MIT-compatible terms.
 *
 * Patterns:
 *   1. WabAnim.createLenisBridge   — Lenis.raf -> gsap.ticker bridge
 *   2. WabAnim.blurReveal          — Blur-36px text reveal (chars/words/lines)
 *   3. WabAnim.magneticHover       — Pointer-follow with elastic return
 *   4. WabAnim.maskYReveal         — CSS custom-prop --mask-y reveal
 *   5. WabAnim.themeScrollSwitch   — Toggle data-theme on scroll zones
 *   6. WabAnim.wabSplit            — DIY SplitText (chars / words / lines)
 *
 * Global namespace: window.WabAnim
 * Dependencies:     gsap, ScrollTrigger (optional), Lenis (optional for Pattern 1)
 * No build step required — drop in via <script> tag.
 *
 * @file wab-safe-animations.js
 * @version 1.0.0
 * @license MIT
 */

(function (root) {
  'use strict';

  // ============================================================
  // Hard-dependency check
  // ============================================================
  if (typeof root.gsap === 'undefined') {
    console.warn('[WabAnim] GSAP not loaded — animations disabled.');
    return;
  }

  var gsap = root.gsap;
  var ScrollTrigger = root.ScrollTrigger || null;

  if (ScrollTrigger && typeof gsap.registerPlugin === 'function') {
    try { gsap.registerPlugin(ScrollTrigger); } catch (e) { /* no-op */ }
  }

  // Honour prefers-reduced-motion throughout
  var prefersReducedMotion = root.matchMedia
    ? root.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // ============================================================
  // Pattern 1 — Lenis + GSAP ticker bridge
  // ============================================================
  /**
   * Creates a Lenis smooth-scroll instance and bridges its RAF loop
   * into GSAP's ticker so ScrollTrigger updates stay in sync.
   *
   * @param {Object} [opts]
   * @param {number} [opts.duration=1.2]
   * @param {boolean}[opts.smoothWheel=true]
   * @param {number} [opts.touchMultiplier=2]
   * @param {Function}[opts.easing] Custom easing fn t -> number
   * @returns {{lenis:Object, destroy:Function}|null}
   */
  function createLenisBridge(opts) {
    opts = opts || {};
    if (typeof root.Lenis === 'undefined') {
      console.warn('[WabAnim] Lenis not loaded — skipping bridge.');
      return null;
    }

    var lenis = new root.Lenis({
      duration: opts.duration || 1.2,
      smoothWheel: opts.smoothWheel !== false,
      smoothTouch: opts.smoothTouch || false,
      touchMultiplier: opts.touchMultiplier || 2,
      easing: opts.easing || function (t) {
        // MIT-safe cubic-out easing — NOT wearebrand's exponential signature
        return 1 - Math.pow(1 - t, 3);
      }
    });

    if (ScrollTrigger && typeof lenis.on === 'function') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    function rafCallback(time) { lenis.raf(time * 1000); }
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    function destroy() {
      gsap.ticker.remove(rafCallback);
      try { lenis.destroy(); } catch (e) { /* no-op */ }
    }

    // Expose on window for debugging / external control
    root.__wabLenis = lenis;

    return { lenis: lenis, destroy: destroy };
  }

  // ============================================================
  // Pattern 6 (used by 2) — DIY wabSplit (chars / words / lines)
  // ============================================================
  /**
   * Splits element text into inline-block spans without depending on
   * the licensed GSAP SplitText plugin. Preserves whitespace and
   * multi-child structure.
   *
   * @param {HTMLElement} element
   * @param {'chars'|'words'|'lines'|'words,chars'} [type='chars']
   * @returns {{chars:HTMLElement[], words:HTMLElement[], lines:HTMLElement[]}}
   */
  function wabSplit(element, type) {
    type = type || 'chars';
    var result = { chars: [], words: [], lines: [] };
    if (!element) return result;

    // Lines — treat element children as lines, or wrap full content
    if (type === 'lines') {
      var lineKids = [];
      for (var i = 0; i < element.children.length; i++) {
        if (element.children[i].nodeType === 1) lineKids.push(element.children[i]);
      }
      if (lineKids.length > 0) {
        result.lines = lineKids;
        return result;
      }
      // Fallback — wrap everything in one line span
      var wrap = document.createElement('span');
      wrap.className = 'wab-line';
      wrap.style.display = 'block';
      while (element.firstChild) { wrap.appendChild(element.firstChild); }
      element.appendChild(wrap);
      result.lines = [wrap];
      return result;
    }

    // chars / words / words,chars — walk text nodes
    var needChars = (type === 'chars' || type === 'words,chars');

    function walk(node, parent) {
      if (node.nodeType === 3) {
        // Text node
        var text = node.textContent || '';
        if (!text) return;
        var parts = text.split(/(\s+)/);
        for (var p = 0; p < parts.length; p++) {
          var part = parts[p];
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            parent.appendChild(document.createTextNode(part));
            continue;
          }
          var wordSpan = document.createElement('span');
          wordSpan.className = 'wab-word';
          wordSpan.style.display = 'inline-block';
          wordSpan.style.whiteSpace = 'nowrap';
          if (needChars) {
            for (var c = 0; c < part.length; c++) {
              var charSpan = document.createElement('span');
              charSpan.className = 'wab-char';
              charSpan.style.display = 'inline-block';
              charSpan.textContent = part.charAt(c);
              wordSpan.appendChild(charSpan);
              result.chars.push(charSpan);
            }
          } else {
            wordSpan.textContent = part;
          }
          parent.appendChild(wordSpan);
          result.words.push(wordSpan);
        }
      } else if (node.nodeType === 1) {
        // Element node — clone shell, recurse children
        var clone = node.cloneNode(false);
        parent.appendChild(clone);
        var kids = Array.prototype.slice.call(node.childNodes);
        for (var k = 0; k < kids.length; k++) walk(kids[k], clone);
      }
    }

    var originalChildren = Array.prototype.slice.call(element.childNodes);
    element.innerHTML = '';
    for (var i2 = 0; i2 < originalChildren.length; i2++) {
      walk(originalChildren[i2], element);
    }

    return result;
  }

  // ============================================================
  // Pattern 2 — Blur-36px reveal
  // ============================================================
  /**
   * Reveals text by animating blur(36px) -> blur(0) with opacity.
   *
   * @param {HTMLElement} element
   * @param {Object} [opts]
   * @param {'chars'|'words'|'lines'} [opts.type='chars']
   * @param {number} [opts.blurAmount=36]
   * @param {number} [opts.duration=1]
   * @param {number} [opts.stagger=0.08]
   * @param {'scroll'|'immediate'} [opts.trigger='scroll']
   * @param {string} [opts.start='top 85%']
   * @returns {gsap.Tween|null}
   */
  function blurReveal(element, opts) {
    if (!element) return null;
    opts = opts || {};
    var type        = opts.type        || 'chars';
    var blurAmount  = (opts.blurAmount != null) ? opts.blurAmount : 36;
    var duration    = (opts.duration   != null) ? opts.duration   : 1;
    var stagger     = (opts.stagger    != null) ? opts.stagger    : 0.08;
    var trigger     = opts.trigger     || 'scroll';

    if (prefersReducedMotion) {
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      return null;
    }

    var splitResult = wabSplit(element, type);
    var targets = splitResult[type] || [];
    if (!targets.length) { return null; }

    gsap.set(element, { visibility: 'visible' });

    var fromVars = {
      filter:  'blur(' + blurAmount + 'px)',
      opacity: 0
    };
    var toVars = {
      filter:  'blur(0px)',
      opacity: 1,
      duration: duration,
      stagger: stagger,
      ease: 'power2.out'
    };

    if (trigger === 'scroll' && ScrollTrigger) {
      toVars.scrollTrigger = {
        trigger: element,
        start:   opts.start || 'top 85%',
        toggleActions: 'play none none none'
      };
    }

    return gsap.fromTo(targets, fromVars, toVars);
  }

  // ============================================================
  // Pattern 3 — Magnetic elastic hover
  // ============================================================
  /**
   * Attaches pointer-move magnetic effect with elastic return.
   *
   * @param {HTMLElement} element
   * @param {number|Object} [strengthOrOpts=0.3]
   * @returns {Function} unbind
   */
  function magneticHover(element, strengthOrOpts) {
    if (!element) return function () {};

    var strength = 0.3;
    var innerSelector = null;

    if (typeof strengthOrOpts === 'number') {
      strength = strengthOrOpts;
    } else if (strengthOrOpts && typeof strengthOrOpts === 'object') {
      strength = (strengthOrOpts.strength != null) ? strengthOrOpts.strength : 0.3;
      innerSelector = strengthOrOpts.innerSelector || null;
    }

    if (prefersReducedMotion) return function () {};

    // Mobile — skip
    if (root.innerWidth < 992) return function () {};

    var inner = innerSelector ? element.querySelectorAll(innerSelector) : null;

    function onMove(e) {
      var rect = element.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top)  / rect.height - 0.5;
      var dx = relX * rect.width  * strength;
      var dy = relY * rect.height * strength;

      gsap.to(element, {
        x: dx, y: dy, rotate: 0.001,
        duration: 1.6, ease: 'power4.out'
      });
      if (inner && inner.length) {
        gsap.to(inner, {
          x: dx * 1.4, y: dy * 1.4,
          duration: 2, ease: 'power4.out'
        });
      }
    }

    function onLeave() {
      gsap.to(element, {
        x: 0, y: 0, rotate: 0,
        duration: 1.6, ease: 'elastic.out(1, 0.3)',
        clearProps: 'all'
      });
      if (inner && inner.length) {
        gsap.to(inner, {
          x: 0, y: 0,
          duration: 2, ease: 'elastic.out(1, 0.3)',
          clearProps: 'all'
        });
      }
    }

    element.addEventListener('pointerenter', onLeave); // reset position
    element.addEventListener('pointermove',  onMove);
    element.addEventListener('pointerleave', onLeave);

    return function unbind() {
      element.removeEventListener('pointerenter', onLeave);
      element.removeEventListener('pointermove',  onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }

  // ============================================================
  // Pattern 4 — CSS mask-y reveal (custom-prop)
  // ============================================================
  /**
   * Animates a CSS custom property --mask-y (used by a linear-gradient
   * mask) to reveal content.
   *
   * @param {HTMLElement} element
   * @param {Object} [opts]
   * @param {string} [opts.from='0%']
   * @param {string} [opts.to='200%']
   * @param {number} [opts.duration=1.2]
   * @param {boolean}[opts.scrub=false]
   * @returns {gsap.Tween|null}
   */
  function maskYReveal(element, opts) {
    if (!element) return null;
    opts = opts || {};
    var from     = opts.from     || '0%';
    var to       = opts.to       || '200%';
    var duration = (opts.duration != null) ? opts.duration : 1.2;
    var scrub    = !!opts.scrub;

    if (prefersReducedMotion) {
      element.style.setProperty('--mask-y', to);
      return null;
    }

    element.style.setProperty('--mask-y', from);

    var toVars = {
      '--mask-y': to,
      duration: duration,
      ease: 'power2.out'
    };
    if (scrub && ScrollTrigger) {
      toVars.scrollTrigger = {
        trigger: element,
        start:   opts.start || 'top bottom',
        end:     opts.end   || 'bottom top',
        scrub:   scrub
      };
    }
    return gsap.to(element, toVars);
  }

  // ============================================================
  // Pattern 5 — Theme switch on scroll zones
  // ============================================================
  /**
   * Toggles a data-theme attribute (or class) on <body> when scroll
   * enters/leaves a zone element.
   *
   * @param {HTMLElement} zone
   * @param {string} themeName
   * @param {Object} [opts]
   * @param {string} [opts.target='body']
   * @param {'data-theme'|'class'} [opts.mode='data-theme']
   */
  function themeScrollSwitch(zone, themeName, opts) {
    if (!zone || !themeName) return;
    if (!ScrollTrigger) {
      console.warn('[WabAnim] ScrollTrigger missing — themeScrollSwitch skipped');
      return;
    }
    opts = opts || {};
    var targetEl = opts.target === 'body'
      ? document.body
      : (opts.target instanceof HTMLElement ? opts.target : document.body);
    var mode = opts.mode || 'data-theme';
    var previous = null;

    ScrollTrigger.create({
      trigger: zone,
      start:   opts.start || 'top 50%',
      end:     opts.end   || 'bottom 50%',
      onEnter: function () {
        if (mode === 'class') {
          targetEl.classList.add(themeName);
        } else {
          previous = targetEl.getAttribute('data-theme');
          targetEl.setAttribute('data-theme', themeName);
        }
      },
      onLeave: function () {
        if (mode === 'class') {
          targetEl.classList.remove(themeName);
        } else {
          if (previous) targetEl.setAttribute('data-theme', previous);
          else targetEl.removeAttribute('data-theme');
        }
      },
      onEnterBack: function () {
        if (mode === 'class') targetEl.classList.add(themeName);
        else targetEl.setAttribute('data-theme', themeName);
      },
      onLeaveBack: function () {
        if (mode === 'class') targetEl.classList.remove(themeName);
        else {
          if (previous) targetEl.setAttribute('data-theme', previous);
          else targetEl.removeAttribute('data-theme');
        }
      }
    });
  }

  // ============================================================
  // Bonus helper — observe data-attributes & auto-init
  // ============================================================
  /**
   * Scans the document for [data-wab-*] elements and auto-applies
   * the matching pattern. Intended for Elementor-first workflow
   * where HTML is produced in the page builder, JS just activates.
   */
  function autoInit(context) {
    context = context || document;

    context.querySelectorAll('[data-wab-blur-reveal]').forEach(function (el) {
      blurReveal(el, {
        type: el.getAttribute('data-blur-type') || 'chars',
        duration: parseFloat(el.getAttribute('data-blur-duration') || '1'),
        stagger: parseFloat(el.getAttribute('data-blur-stagger') || '0.08'),
        blurAmount: parseInt(el.getAttribute('data-blur-amount') || '36', 10),
        start: el.getAttribute('data-blur-start') || 'top 85%'
      });
    });

    context.querySelectorAll('[data-wab-magnetic]').forEach(function (el) {
      magneticHover(el, parseFloat(el.getAttribute('data-magnetic-strength') || '0.3'));
    });

    context.querySelectorAll('[data-wab-mask-y]').forEach(function (el) {
      maskYReveal(el, {
        from: el.getAttribute('data-mask-from') || '0%',
        to:   el.getAttribute('data-mask-to')   || '200%',
        duration: parseFloat(el.getAttribute('data-mask-duration') || '1.2'),
        scrub: el.getAttribute('data-mask-scrub') === 'true'
      });
    });

    context.querySelectorAll('[data-wab-theme]').forEach(function (el) {
      themeScrollSwitch(el, el.getAttribute('data-wab-theme'));
    });
  }

  // ============================================================
  // Public API
  // ============================================================
  root.WabAnim = {
    version: '1.0.0',
    prefersReducedMotion: prefersReducedMotion,
    createLenisBridge: createLenisBridge,
    wabSplit: wabSplit,
    blurReveal: blurReveal,
    magneticHover: magneticHover,
    maskYReveal: maskYReveal,
    themeScrollSwitch: themeScrollSwitch,
    autoInit: autoInit
  };

})(typeof window !== 'undefined' ? window : this);
