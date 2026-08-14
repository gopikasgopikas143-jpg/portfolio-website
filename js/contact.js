/* =========================================================
   CONTACT + FOOTER interactions
   ========================================================= */
(function () {
  const copyBtn = document.querySelector('[data-copy-email]');
  const toast = document.querySelector('.contact__copy-toast');

  copyBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = copyBtn.dataset.copyEmail;
    if (!email || email.includes('CONTENT NEEDED')) return;
    navigator.clipboard?.writeText(email).then(() => {
      if (!toast) return;
      toast.textContent = 'Email copied — ' + email;
      toast.classList.add('is-visible');
      setTimeout(() => toast.classList.remove('is-visible'), 2200);
    });
  });

  const toTop = document.querySelector('.footer__totop');
  toTop?.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.PORTFOLIO?.lenis) {
      window.PORTFOLIO.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();
