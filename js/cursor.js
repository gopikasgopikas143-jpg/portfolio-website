/* =========================================================
   CUSTOM CURSOR
   Smooth-follows the pointer, expands on interactive targets,
   and swaps to a text label ("VIEW" / "EXPLORE") on demand.
   Disabled entirely on touch devices via CSS + this early return.
   ========================================================= */

(function initCursor() {
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (isTouch) return;

  const dot = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  const ringLabel = ring?.querySelector('.cursor-ring__label');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function tick() {
    // dot: near-instant follow
    dotX += (mouseX - dotX) * 0.5;
    dotY += (mouseY - dotY) * 0.5;
    // ring: lazier, gives the trailing "weight" feel
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function setLabel(text) {
    if (ringLabel) ringLabel.textContent = text || '';
  }

  function onEnter(el) {
    const label = el.getAttribute('data-cursor');
    if (label) {
      ring.classList.add('is-label');
      ring.classList.remove('is-hover');
      setLabel(label);
    } else {
      ring.classList.add('is-hover');
      ring.classList.remove('is-label');
    }
  }

  function onLeave() {
    ring.classList.remove('is-hover', 'is-label');
    setLabel('');
  }

  // Delegate: works for elements added later (projects, certificates, etc.)
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-cursor], a, button, .btn, [role="button"]');
    if (target) onEnter(target);
  });
  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-cursor], a, button, .btn, [role="button"]');
    const related = e.relatedTarget && e.relatedTarget.closest
      ? e.relatedTarget.closest('[data-cursor], a, button, .btn, [role="button"]')
      : null;
    if (target && target !== related) onLeave();
  });

  // Hide native cursor once JS confirms desktop + pointer support
  document.documentElement.classList.add('has-custom-cursor');
})();
