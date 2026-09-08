
/* Scroll-scrubbing background canvas engine (ported from worker.js) */
(() => {
  'use strict';
  const TOTAL_FRAMES = 300;
  const canvas = document.getElementById('animation-canvas');
  let ctx = null;
  if (canvas) ctx = canvas.getContext('2d', { alpha: false });

  const images = new Array(TOTAL_FRAMES);
  let isInitialFrameRendered = false;
  let targetFrame = 0;
  let currentFrame = 0;
  const LERP_FACTOR = 0.09;

  function getFramePath(index) {
    if (window.__OWNER_FRAMES__ && window.__OWNER_FRAMES__[index - 1]) {
      return window.__OWNER_FRAMES__[index - 1];
    }
    const frameNum = String(index).padStart(3, '0');
    return `public/frames_worker/ezgif-frame-${frameNum}.jpg`;
  }

  function preloadFrames() {
    if (!canvas || !ctx) return;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        images[i - 1] = img;
        if (i === 1 && !isInitialFrameRendered) {
          isInitialFrameRendered = true;
          renderCanvas(true);
        }
      };
    }
  }

  function getViewportSize() {
    // Prefer visualViewport so mobile browsers (address bar show/hide,
    // on-screen keyboard, pinch-zoom) report the actual visible area
    // instead of the layout viewport.
    if (window.visualViewport) {
      return {
        w: window.visualViewport.width,
        h: window.visualViewport.height
      };
    }
    return { w: window.innerWidth, h: window.innerHeight };
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const { w, h } = getViewportSize();
    // Cap the device pixel ratio on smaller/mobile-class viewports so we
    // don't allocate an oversized canvas (and tank scroll performance)
    // on high-DPI phones, while still rendering crisp on laptops/desktops.
    const isCompact = Math.min(w, h) <= 768;
    const maxDpr = isCompact ? 2 : 2.5;
    const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), maxDpr);
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      renderCanvas(true);
    }
  }

  let resizeRAF = null;
  function scheduleResize() {
    if (resizeRAF) cancelAnimationFrame(resizeRAF);
    resizeRAF = requestAnimationFrame(() => {
      resizeRAF = null;
      resizeCanvas();
    });
  }

  let lastDrawnIndex = -1;
  function drawImageProp(img) {
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const ratio = Math.min(cw / iw, ch / ih);
    const drawWidth = Math.round(iw * ratio);
    const drawHeight = Math.round(ih * ratio);
    const offsetX = Math.round((cw - drawWidth) / 2);
    const offsetY = Math.round((ch - drawHeight) / 2);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  function updateScrollTarget() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const scrollFraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
  }

  function renderCanvas(force = false) {
    const roundedIndex = Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES - 1);
    if (force || roundedIndex !== lastDrawnIndex) {
      const img = images[roundedIndex];
      if (img && img.complete) {
        drawImageProp(img);
        lastDrawnIndex = roundedIndex;
      }
    }
  }

  function animateCanvas() {
    updateScrollTarget();
    currentFrame += (targetFrame - currentFrame) * LERP_FACTOR;
    if (Math.abs(targetFrame - currentFrame) > 0.01) renderCanvas();
    requestAnimationFrame(animateCanvas);
  }

  function initCanvasAnimation() {
    if (!canvas || !ctx) return;
    resizeCanvas();
    preloadFrames();
    window.addEventListener('resize', scheduleResize);
    window.addEventListener('orientationchange', scheduleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', scheduleResize);
    }
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    requestAnimationFrame(animateCanvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCanvasAnimation);
  } else {
    initCanvasAnimation();
  }
})();

