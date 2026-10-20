document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const moonIconPath = `
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  `;
  const sunIconPath = `
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  `;

  function getSavedTheme() {
    return localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      themeIcon.innerHTML = sunIconPath;
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
      themeIcon.innerHTML = moonIconPath;
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Avatar fallback
  const avatarImg = document.getElementById('avatar-img');
  const avatarFallback = document.getElementById('avatar-fallback');

  avatarImg.addEventListener('error', () => {
    avatarImg.classList.add('hidden');
    avatarFallback.classList.remove('hidden');
  });

  // Randomize device positions on canvas
  function randomizeDevices() {
    const canvas = document.querySelector('.devices-canvas');
    if (!canvas) return;

    const items = canvas.querySelectorAll('.device-item');

    // Two distinct diagonal sectors so devices don't completely overlap
    const sectors = [
      { minX: 0.05, maxX: 0.40, minY: 0.08, maxY: 0.45 },
      { minX: 0.42, maxX: 0.70, minY: 0.40, maxY: 0.68 },
    ];

    // Shuffle sectors randomly
    if (Math.random() > 0.5) {
      sectors.reverse();
    }

    items.forEach((item, index) => {
      const s = sectors[index % sectors.length];
      const leftPercent = s.minX + Math.random() * (s.maxX - s.minX);
      const topPercent = s.minY + Math.random() * (s.maxY - s.minY);
      const rot = (Math.random() * 24 - 12).toFixed(1); // -12deg to +12deg

      item.style.left = `${(leftPercent * 100).toFixed(1)}%`;
      item.style.top = `${(topPercent * 100).toFixed(1)}%`;
      item.style.setProperty('--rot', `${rot}deg`);
    });
  }

  randomizeDevices();

  // Device tooltip follower
  const tooltip = document.createElement('div');
  tooltip.className = 'device-tooltip';
  document.body.appendChild(tooltip);

  const deviceItems = document.querySelectorAll('.device-item');

  deviceItems.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      const text = item.getAttribute('data-tooltip');
      if (text) {
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY}px`;
      }
    });

    item.addEventListener('mousemove', (e) => {
      tooltip.style.left = `${e.clientX}px`;
      tooltip.style.top = `${e.clientY}px`;
    });

    item.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
});
