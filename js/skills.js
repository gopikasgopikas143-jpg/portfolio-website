/* =========================================================
   SKILLS — grouped, filterable tech stack
   ========================================================= */
(function () {
  const skillsData = [
    { key: 'frontend', label: 'Frontend', items: [
      { name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' },
    ]},
    { key: 'backend', label: 'Backend', items: [
      { name: 'Node.js' }, { name: 'Express' },
    ]},
    { key: 'database', label: 'Database', items: [
      { name: 'Supabase' }, { name: 'MongoDB' }, { name: 'SQL' },
    ]},
    { key: 'programming', label: 'Programming', items: [
      { name: 'C' }, { name: 'C++' }, { name: 'Python' },
    ]},
    { key: 'ai', label: 'AI', items: [
      { name: 'AI APIs', usedIn: 'Automatic AI Question Paper Generator' },
      { name: 'Prompt Engineering', usedIn: 'Automatic AI Question Paper Generator' },
      { name: 'Machine Learning' },
    ]},
  ];

  const tabsEl = document.querySelector('.skills__tabs');
  const panelEl = document.querySelector('.skills__panel');
  if (!tabsEl || !panelEl) return;

  tabsEl.innerHTML = skillsData.map((g, i) => `
    <button class="skills__tab ${i === 0 ? 'is-active' : ''}" data-key="${g.key}" role="tab" aria-selected="${i === 0}">
      ${g.label}
    </button>
  `).join('');

  function renderPanel(key) {
    const group = skillsData.find((g) => g.key === key);
    panelEl.innerHTML = group.items.map((item) => `
      <span class="skill-chip" tabindex="0">
        ${item.name}
        ${item.usedIn ? `<span class="skill-chip__tooltip">Used in → ${item.usedIn}</span>` : ''}
      </span>
    `).join('');

    if (window.gsap) {
      gsap.fromTo('.skill-chip', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' });
    }
  }

  renderPanel(skillsData[0].key);

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.skills__tab');
    if (!btn) return;
    tabsEl.querySelectorAll('.skills__tab').forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    renderPanel(btn.dataset.key);
  });
})();
