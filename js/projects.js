/* =========================================================
   PROJECTS — data + card→detail cinematic transition
   Uses GSAP Flip for a true shared-element expansion:
   the clicked card's visual grows into the detail hero,
   rather than a modal simply fading in.
   ========================================================= */

(function () {
  const PLACEHOLDER = '[CONTENT NEEDED]';

  const projectsData = [
    {
      id: 'jsquare',
      tag: 'FEATURED PROJECT',
      name: 'J-Square',
      category: 'Real Estate Platform',
      summary: 'A full-stack real estate platform for browsing, listing, and managing property. ' + PLACEHOLDER + ' (one-line summary).',
      tech: [PLACEHOLDER],
      role: PLACEHOLDER,
      liveUrl: '', // add the live project URL here — leave empty to hide the button
      visualClass: 'project-card__visual--grid',
      overview: PLACEHOLDER + ' — a short paragraph on what J-Square is and who it is for.',
      problem: PLACEHOLDER + ' — what problem J-Square set out to solve.',
      solution: PLACEHOLDER + ' — how the platform solves it.',
      features: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    },
    {
      id: 'aiqpg',
      tag: 'AI SYSTEM',
      name: 'Automatic AI Question Paper Generator',
      category: 'AI-Powered Education System',
      summary: 'An AI-powered system that generates question papers automatically. ' + PLACEHOLDER + ' (one-line summary).',
      tech: ['AI APIs', 'Prompt Engineering'],
      role: PLACEHOLDER,
      liveUrl: '',
      visualClass: 'project-card__visual--ai',
      overview: PLACEHOLDER + ' — a short paragraph on what the generator does and who uses it.',
      problem: PLACEHOLDER + ' — the manual process this replaces.',
      solution: PLACEHOLDER + ' — how AI is used to generate question papers.',
      features: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    },
  ];

  const listEl = document.querySelector('.work__list');
  const detailEl = document.querySelector('.project-detail');
  const detailInner = document.querySelector('.project-detail__inner');
  const detailHero = document.querySelector('.project-detail__hero');
  const closeBtn = document.querySelector('.project-detail__close');
  if (!listEl || !detailEl) return;

  /* ---------- Render project cards ---------- */
  listEl.innerHTML = projectsData.map((p) => `
    <article class="project-card" data-project-id="${p.id}" data-cursor="VIEW" tabindex="0" role="button"
      aria-label="View ${p.name} case study">
      <div class="project-card__visual ${p.visualClass}">
        <span class="project-card__mark">${p.name.split(' ').map(w => w[0]).join('').slice(0,2)}</span>
        <span class="project-card__visual-tag">${p.category}</span>
      </div>
      <div class="project-card__body">
        <span class="project-card__tag">${p.tag}</span>
        <h3 class="project-card__title type-display">${p.name}</h3>
        <p class="project-card__summary">${p.summary}</p>
        <div class="project-card__tech">
          ${p.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        <span class="project-card__cta">View case study <span class="arrow">↗</span></span>
      </div>
    </article>
  `).join('');

  /* ---------- Build detail markup ---------- */
  function renderDetail(p) {
    detailHero.className = `project-detail__hero ${p.visualClass}`;
    detailHero.innerHTML = `<span class="project-card__mark" style="font-size:clamp(3rem,10vw,7rem)">${p.name.split(' ').map(w => w[0]).join('').slice(0,2)}</span>`;

    detailInner.innerHTML = `
      <span class="eyebrow project-detail__eyebrow">${p.tag}</span>
      <h2 class="project-detail__title">${p.name}</h2>
      <p class="project-detail__subtitle">${p.category}</p>

      <dl class="project-detail__meta">
        <div><dt>My Role</dt><dd>${p.role}</dd></div>
        <div><dt>Technology</dt><dd>${p.tech.join(', ')}</dd></div>
        <div><dt>Status</dt><dd>${p.liveUrl ? 'Live' : PLACEHOLDER}</dd></div>
      </dl>

      <div class="project-detail__section">
        <h3>Overview</h3>
        <p>${p.overview}</p>
      </div>
      <div class="project-detail__section">
        <h3>Problem</h3>
        <p>${p.problem}</p>
      </div>
      <div class="project-detail__section">
        <h3>Solution</h3>
        <p>${p.solution}</p>
      </div>
      <div class="project-detail__section">
        <h3>Features</h3>
        <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>

      ${p.liveUrl ? `
        <div class="project-detail__live">
          <a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn--primary" data-cursor="OPEN">
            <span class="btn__fill"></span><span>View Live Project</span><span class="btn__arrow">↗</span>
          </a>
        </div>` : ''}
    `;
  }

  /* ---------- Open / close with Flip ---------- */
  const hasFlip = !!(window.gsap && window.Flip);
  let lastCard = null;

  function openProject(id, cardEl) {
    const p = projectsData.find((x) => x.id === id);
    if (!p) return;
    lastCard = cardEl;
    renderDetail(p);

    document.body.style.overflow = 'hidden';
    window.PORTFOLIO?.lenis?.stop?.();

    if (hasFlip) {
      const visual = cardEl.querySelector('.project-card__visual');
      const state = Flip.getState(visual);

      detailEl.classList.add('is-open');
      detailHero.appendChild(visual);

      Flip.from(state, {
        duration: 0.8,
        ease: 'power4.inOut',
        absolute: true,
        onComplete: () => {
          gsap.fromTo(detailInner, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        },
      });
      gsap.fromTo(detailEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    } else {
      detailEl.classList.add('is-open');
    }
  }

  function closeProject() {
    document.body.style.overflow = '';
    window.PORTFOLIO?.lenis?.start?.();

    if (hasFlip && lastCard) {
      const visual = detailHero.querySelector('.project-card__visual');
      const originalSlot = lastCard.querySelector('.project-card__body');
      const state = Flip.getState(visual);
      lastCard.insertBefore(visual, originalSlot);

      Flip.from(state, {
        duration: 0.7,
        ease: 'power4.inOut',
        absolute: true,
        onComplete: () => detailEl.classList.remove('is-open'),
      });
    } else {
      detailEl.classList.remove('is-open');
    }
  }

  listEl.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (card) openProject(card.dataset.projectId, card);
  });
  listEl.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.project-card');
    if (card) { e.preventDefault(); openProject(card.dataset.projectId, card); }
  });

  closeBtn?.addEventListener('click', closeProject);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailEl.classList.contains('is-open')) closeProject();
  });
})();
