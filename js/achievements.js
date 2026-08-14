/* =========================================================
   ACHIEVEMENTS — cinematic gallery
   Populate `achievementsData` once real photos are supplied;
   drop files into /assets/achievements/ and add a `src` here.
   ========================================================= */
(function () {
  const achievementsData = [
    { title: '[CONTENT NEEDED — Event/Award Name]', year: '[YEAR]' },
    { title: '[CONTENT NEEDED — Event/Award Name]', year: '[YEAR]' },
    { title: '[CONTENT NEEDED — Event/Award Name]', year: '[YEAR]' },
    { title: '[CONTENT NEEDED — Event/Award Name]', year: '[YEAR]' },
    { title: '[CONTENT NEEDED — Event/Award Name]', year: '[YEAR]' },
    { title: '[CONTENT NEEDED — Event/Award Name]', year: '[YEAR]' },
  ];

  const gallery = document.querySelector('.achievements__gallery');
  if (!gallery) return;

  gallery.innerHTML = achievementsData.map((a, i) => `
    <div class="achievement-tile" data-index="${i}" data-cursor="EXPLORE">
      <div class="achievement-tile__mark">${a.src ? '' : a.title}</div>
      <div class="achievement-tile__info">
        <div class="achievement-tile__title">${a.title}</div>
        <div class="achievement-tile__year">${a.year}</div>
      </div>
    </div>
  `).join('');

  gallery.querySelectorAll('.achievement-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const idx = Number(tile.dataset.index);
      window.PORTFOLIO?.lightbox?.open(
        achievementsData.map((a) => ({ title: a.title, sub: a.description, src: a.src })),
        idx
      );
    });
  });
})();
