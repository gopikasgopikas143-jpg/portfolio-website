/* =========================================================
   CERTIFICATES — one archive, 8 categories
   Category names below mirror the examples given in the brief
   ("may include... but use my actual folder structure when
   available"). Swap `name` and `docs` per category once the
   real folders are provided — structure stays the same.
   ========================================================= */
(function () {
  const categories = [
    { key: 'workshops',      name: 'Workshops',      docs: [] },
    { key: 'internships',    name: 'Internships',     docs: [] },
    { key: 'offer-letters',  name: 'Offer Letters',   docs: [] },
    { key: 'badges',         name: 'Badges',          docs: [] },
    { key: 'training',       name: 'Training',        docs: [] },
    { key: 'certifications', name: 'Certifications',  docs: [] },
    { key: 'events',         name: 'Events',          docs: [] },
    { key: 'other',          name: 'Other',           docs: [] },
  ];
  // Each doc: { title, org, date, description, src }
  // Left empty above on purpose — see cert-empty state below —
  // so nothing is invented. Populate a category's `docs` array
  // to see the full grid + viewer light up automatically.

  const grid = document.querySelector('.cert-grid');
  const categoryView = document.querySelector('.cert-category');
  const categoryInner = document.querySelector('.cert-category__inner');
  const categoryClose = document.querySelector('.cert-category__close');
  if (!grid || !categoryView) return;

  grid.innerHTML = categories.map((c, i) => `
    <button class="cert-card" data-key="${c.key}" data-cursor="EXPLORE">
      <div class="cert-card__inner">
        <span class="cert-card__index">${String(i + 1).padStart(2, '0')}</span>
        <span class="cert-card__title type-display">${c.name}</span>
        <span class="cert-card__foot">
          <span>${c.docs.length ? String(c.docs.length).padStart(2, '0') + ' DOCUMENTS' : 'ADD DOCUMENTS'}</span>
          <span class="arrow">→</span>
        </span>
      </div>
    </button>
  `).join('');

  function openCategory(key) {
    const cat = categories.find((c) => c.key === key);
    if (!cat) return;

    categoryInner.innerHTML = `
      <span class="eyebrow">CERTIFICATES</span>
      <h2 class="cert-category__title">${cat.name}</h2>
      <p class="cert-category__count">${cat.docs.length ? String(cat.docs.length).padStart(2, '0') + ' documents' : 'No documents added yet'}</p>
      <div class="cert-category__panel">
        ${cat.docs.length ? `
          <div class="cert-doc-grid">
            ${cat.docs.map((d, i) => `
              <article class="cert-doc" data-index="${i}" data-cursor="VIEW">
                <div class="cert-doc__thumb">${d.src ? '' : (d.title || 'Untitled')}</div>
                <div class="cert-doc__body">
                  <h4 class="cert-doc__title">${d.title || 'Untitled'}</h4>
                  ${d.org ? `<p class="cert-doc__org">${d.org}</p>` : ''}
                  ${d.date ? `<p class="cert-doc__date">${d.date}</p>` : ''}
                </div>
              </article>
            `).join('')}
          </div>
        ` : `
          <div class="cert-empty">// no documents in this category yet — drop files into /assets/certificates/${cat.key}/ and list them in js/certificates.js</div>
        `}
      </div>
    `;

    categoryView.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    window.PORTFOLIO?.lenis?.stop?.();

    categoryInner.querySelectorAll('.cert-doc').forEach((docEl) => {
      docEl.addEventListener('click', () => {
        const idx = Number(docEl.dataset.index);
        window.PORTFOLIO?.lightbox?.open(
          cat.docs.map((d) => ({ title: d.title, sub: [d.org, d.date].filter(Boolean).join(' · '), src: d.src })),
          idx
        );
      });
    });
  }

  function closeCategory() {
    categoryView.classList.remove('is-open');
    document.body.style.overflow = '';
    window.PORTFOLIO?.lenis?.start?.();
  }

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.cert-card');
    if (card) openCategory(card.dataset.key);
  });
  categoryClose?.addEventListener('click', closeCategory);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && categoryView.classList.contains('is-open')) closeCategory();
  });
})();
