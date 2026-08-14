/* =========================================================
   MAIN — smooth scroll, nav state, mobile menu, motion-preference gate
   ========================================================= */

window.PORTFOLIO = window.PORTFOLIO || {};

(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.toggle('reduce-motion', prefersReduced);
  window.PORTFOLIO.prefersReduced = prefersReduced;

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (!prefersReduced && window.Lenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Keep GSAP ScrollTrigger in sync with Lenis
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  window.PORTFOLIO.lenis = lenis;

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  const SCROLL_THRESHOLD = 40;
  function updateNav() {
    const y = window.scrollY || window.pageYOffset;
    nav?.classList.toggle('nav--scrolled', y > SCROLL_THRESHOLD);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  toggle?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    lenis?.[isOpen ? 'stop' : 'start']?.();
  });
  mobileMenu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      lenis?.start?.();
    });
  });

  /* ---------- Smooth in-page anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });
})();
