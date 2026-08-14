/* =========================================================
   LIGHTBOX — shared fullscreen viewer
   Any section can open it with: window.PORTFOLIO.lightbox.open(items, startIndex)
   items: [{ title, caption }]  (image support: pass a real <img> src on `src` when available)
   ========================================================= */
(function () {
  const el = document.createElement('div');
  el.className = 'lightbox';
  el.innerHTML = `
    <button class="lightbox__close" aria-label="Close viewer">×</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">‹</button>
    <div class="lightbox__frame"></div>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next">›</button>
    <div class="lightbox__caption"></div>
  `;
  document.body.appendChild(el);

  const frame = el.querySelector('.lightbox__frame');
  const caption = el.querySelector('.lightbox__caption');
  const closeBtn = el.querySelector('.lightbox__close');
  const prevBtn = el.querySelector('.lightbox__nav--prev');
  const nextBtn = el.querySelector('.lightbox__nav--next');

  let items = [];
  let index = 0;

  function render() {
    const item = items[index];
    if (!item) return;
    if (item.src) {
      frame.innerHTML = `<img src="${item.src}" alt="${item.title || ''}" style="width:100%;height:100%;object-fit:contain;border-radius:inherit;">`;
    } else {
      frame.innerHTML = `<span>${item.title || 'Untitled'}<br><br>[CONTENT NEEDED: image]</span>`;
    }
    caption.textContent = [item.title, item.sub].filter(Boolean).join(' — ');
    const multi = items.length > 1;
    prevBtn.style.display = multi ? 'flex' : 'none';
    nextBtn.style.display = multi ? 'flex' : 'none';
  }

  function open(newItems, startIndex) {
    items = newItems || [];
    index = startIndex || 0;
    render();
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    window.PORTFOLIO?.lenis?.stop?.();
  }

  function close() {
    el.classList.remove('is-open');
    document.body.style.overflow = '';
    window.PORTFOLIO?.lenis?.start?.();
  }

  function next() { index = (index + 1) % items.length; render(); }
  function prev() { index = (index - 1 + items.length) % items.length; render(); }

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  el.addEventListener('click', (e) => { if (e.target === el) close(); });

  document.addEventListener('keydown', (e) => {
    if (!el.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  window.PORTFOLIO = window.PORTFOLIO || {};
  window.PORTFOLIO.lightbox = { open, close };
})();
