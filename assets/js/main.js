/**
 * Theme switcher (Bootstrap 5.3 con persistencia)
 * - Tema por defecto: oscuro
 * - Cambia icono dinámicamente
 */
(() => {
  const storageKey = 'theme';
  const themeIcon = document.querySelector('.d-theme-icon');

  const getStoredTheme = () => localStorage.getItem(storageKey);

  const getPreferredTheme = () => {
    const stored = getStoredTheme();
    if (stored) return stored;
    // 👇 por defecto "dark" en vez de seguir el sistema
    return 'dark';
  };

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute(
        'data-bs-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      );
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
    updateIcon(theme);
  };

  const updateIcon = theme => {
    if (!themeIcon) return;
    let iconClass = 'bi-circle-half'; // auto
    if (theme === 'light') iconClass = 'bi-sun-fill';
    if (theme === 'dark') iconClass = 'bi-moon-stars-fill';
    themeIcon.className = `bi me-1 d-theme-icon ${iconClass}`;
  };

  // Inicializa el tema
  setTheme(getPreferredTheme());

  // Reacciona a cambios del SO si está en auto
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const stored = getStoredTheme();
    if (!stored || stored === 'auto') setTheme(getPreferredTheme());
  });

  window.addEventListener('DOMContentLoaded', () => {

    const activeTheme = getPreferredTheme();
    document.querySelectorAll('[data-bs-theme-value]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-bs-theme-value') === activeTheme);
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-bs-theme-value');
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
        document.querySelectorAll('[data-bs-theme-value]')
          .forEach(el => el.classList.toggle('active', el === btn));
      });
    });
  });
})();
