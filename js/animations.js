/* =========================================================
   ANIMATIONS — loader → hero handoff, kinetic type, magnetic UI
   Depends on GSAP (core) being loaded before this file.
   ========================================================= */

(function () {
  const prefersReduced = window.PORTFOLIO?.prefersReduced;
  const hasGSAP = !!window.gsap;

  /* =========================================================
     1. SPLIT HERO NAME INTO CHAR SPANS (kinetic reveal target)
     ========================================================= */
  function splitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    const frag = document.createDocumentFragment();
    [...text].forEach((ch) => {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(115%)';
      span.style.willChange = 'transform';
      frag.appendChild(span);
    });
    el.appendChild(frag);
    return [...el.children];
  }

  const heroLines = document.querySelectorAll('.hero__name .line span');

  /* =========================================================
     2. LOADER SEQUENCE
     ========================================================= */
  const loader = document.querySelector('.loader');
  const barFill = document.querySelector('.loader__bar-fill');
  const percentEl = document.querySelector('.loader__percent');
  const loaderNameLines = document.querySelectorAll('.loader__name span');
  const loaderRoles = document.querySelectorAll('.loader__roles span');

  function revealHero() {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');

    if (!hasGSAP) {
      heroLines.forEach((s) => (s.style.transform = 'translateY(0)'));
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero__kicker', { opacity: 1, y: 0, duration: 0.7 }, 0)
      .to(heroLines, { yPercent: 0, duration: 1, stagger: 0.08 }, 0.05)
      .to('.hero__roles li', { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.5)
      .to('.hero__copy', { opacity: 1, y: 0, duration: 0.6 }, 0.65)
      .to('.hero__ctas .btn', { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.72)
      .to('.hero__scroll', { opacity: 1, duration: 0.6 }, 0.9)
      .to('.nav', { opacity: 1, duration: 0.5 }, 0.2);
  }

  function runLoader() {
    if (!loader) { revealHero(); return; }

    if (prefersReduced || !hasGSAP) {
      loader.style.display = 'none';
      revealHero();
      return;
    }

    // Pre-position hero type off-screen so the loader→hero handoff is seamless
    gsap.set('.hero__kicker', { opacity: 0, y: 16 });
    gsap.set('.hero__roles li', { opacity: 0, y: 12 });
    gsap.set('.hero__copy', { opacity: 0, y: 16 });
    gsap.set('.hero__ctas .btn', { opacity: 0, y: 16 });
    gsap.set('.hero__scroll', { opacity: 0 });
    gsap.set('.nav', { opacity: 0 });

    const introTl = gsap.timeline();
    introTl
      .to(loaderNameLines, { y: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' }, 0.15)
      .to(loaderRoles, { opacity: 1, duration: 0.5, stagger: 0.06 }, 0.5);

    const progress = { val: 0 };
    const progressTl = gsap.timeline({
      delay: 0.3,
      onUpdate: () => {
        const pct = Math.round(progress.val);
        if (barFill) barFill.style.width = pct + '%';
        if (percentEl) percentEl.textContent = String(pct).padStart(2, '0') + '%';
      },
      onComplete: exitLoader,
    });
    progressTl.to(progress, { val: 100, duration: 1.9, ease: 'power2.inOut' });
  }

  function exitLoader() {
    const tl = gsap.timeline({ onComplete: () => { loader.style.display = 'none'; } });
    tl.to('.loader__mid, .loader__bottom, .loader__top', { opacity: 0, duration: 0.4, ease: 'power2.in' })
      .to(loader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      }, 0.1);
    revealHero();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loading');
    // small timeout lets fonts/layout settle before measuring
    setTimeout(runLoader, 80);
  });

  /* =========================================================
     3. HERO AMBIENT PARALLAX (mouse-reactive glow + grid)
     ========================================================= */
  const glow = document.querySelector('.hero__glow');
  const heroSection = document.querySelector('.hero');
  if (glow && heroSection && !prefersReduced) {
    let gx = 0, gy = 0, tx = 0, ty = 0;
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    });
    (function loop() {
      gx += (tx - gx) * 0.05;
      gy += (ty - gy) * 0.05;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      requestAnimationFrame(loop);
    })();
  }

  /* =========================================================
     4. SCROLL REVEALS — About, Skills, Projects
     ========================================================= */
  function initScrollReveals() {
    if (!hasGSAP || !window.ScrollTrigger || prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    // About: word-by-word heading reveal + staggered copy/focus list
    const aboutWords = document.querySelectorAll('.about__word span');
    if (aboutWords.length) {
      gsap.to(aboutWords, {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.about', start: 'top 75%' },
      });
      gsap.to('.about__copy', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__body', start: 'top 80%' },
      });
      gsap.to('.about__focus li', {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__focus', start: 'top 85%' },
      });
    }

    // Skills: heading + tabs fade up
    gsap.utils.toArray('.skills__head, .skills__tabs').forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // Project cards: reveal + subtle parallax on the visual as it scrolls
    gsap.utils.toArray('.project-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0, y: 60, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      });
      const visual = card.querySelector('.project-card__visual');
      if (visual) {
        gsap.to(visual, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }
    });

    // Freelance: heading + cards fade up (cards render async, so target the track)
    gsap.from('.freelance__head > *', {
      opacity: 0, y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.freelance', start: 'top 80%' },
    });
    ScrollTrigger.create({
      trigger: '.freelance',
      start: 'top 75%',
      onEnter: () => gsap.from('.freelance-card', {
        opacity: 0, x: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      }),
      once: true,
    });

    // Certificates: category cards stagger in
    gsap.from('.certificates__head > *', {
      opacity: 0, y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.certificates', start: 'top 80%' },
    });
    gsap.from('.cert-card', {
      opacity: 0, y: 30, duration: 0.6, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: '.cert-grid', start: 'top 85%' },
    });

    // Achievements: gallery tiles reveal with a slight scale-in
    gsap.from('.achievements__head > *', {
      opacity: 0, y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.achievements', start: 'top 80%' },
    });
    gsap.from('.achievement-tile', {
      opacity: 0, scale: 0.94, duration: 0.6, stagger: 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: '.achievements__gallery', start: 'top 85%' },
    });

    // Contact: final CTA rises in
    gsap.from('.contact > .container > *', {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact', start: 'top 75%' },
    });

  }

  // Run after the loader hands off so ScrollTrigger measures final layout
  window.addEventListener('load', () => setTimeout(initScrollReveals, 400));

  /* =========================================================
     5. MAGNETIC BUTTONS
     ========================================================= */
  if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn, .nav__links a').forEach((el) => {
      const strength = el.classList.contains('btn') ? 0.35 : 0.5;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }
})();
