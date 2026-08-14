/* =========================================================
   FREELANCE WORKS — client showcase
   ========================================================= */
(function () {
  const PLACEHOLDER = '[CONTENT NEEDED]';

  const freelanceData = [
    {
      id: 'client-1',
      client: PLACEHOLDER + ' — Client Name',
      industry: PLACEHOLDER,
      built: PLACEHOLDER + ' — short description of what was delivered.',
      role: PLACEHOLDER,
      tech: [PLACEHOLDER],
      liveUrl: '',
      caseStudy: '',
    },
    {
      id: 'client-2',
      client: PLACEHOLDER + ' — Client Name',
      industry: PLACEHOLDER,
      built: PLACEHOLDER + ' — short description of what was delivered.',
      role: PLACEHOLDER,
      tech: [PLACEHOLDER],
      liveUrl: '',
      caseStudy: '',
    },
  ];

  const track = document.querySelector('.freelance__track');
  if (!track) return;

  track.innerHTML = freelanceData.map((c) => `
    <article class="freelance-card" data-cursor="EXPLORE">
      <div class="freelance-card__visual">
        <span class="freelance-card__industry">${c.industry}</span>
        <span class="freelance-card__mark">${c.client.slice(0, 1)}</span>
      </div>
      <div class="freelance-card__body">
        <h3 class="freelance-card__title">${c.client}</h3>
        <p class="freelance-card__built">${c.built}</p>
        <div class="freelance-card__meta">
          <span>${c.role}</span>
          ${c.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        ${(c.liveUrl || c.caseStudy) ? `
          <div class="freelance-card__links">
            ${c.liveUrl ? `<a href="${c.liveUrl}" target="_blank" rel="noopener">Live Project ↗</a>` : ''}
            ${c.caseStudy ? `<a href="${c.caseStudy}" target="_blank" rel="noopener">Case Study ↗</a>` : ''}
          </div>` : ''}
      </div>
    </article>
  `).join('');

  /* ---------- Drag-to-scroll (desktop) ---------- */
  const wrap = document.querySelector('.freelance__track-wrap');
  if (!wrap) return;

  let isDown = false, startX = 0, scrollStart = 0;

  wrap.addEventListener('pointerdown', (e) => {
    isDown = true;
    wrap.classList.add('is-dragging');
    startX = e.clientX;
    scrollStart = track.scrollLeft;
    wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    track.scrollLeft = scrollStart - (e.clientX - startX);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((evt) => {
    wrap.addEventListener(evt, () => {
      isDown = false;
      wrap.classList.remove('is-dragging');
    });
  });
})();
