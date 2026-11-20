// Update management service: checks for remote version updates & manages Service Worker lifecycle

export const CURRENT_APP_VERSION = '1.0.1';

let swRegistration = null;

// Register service worker on app startup
export const registerServiceWorker = (onUpdateFoundCallback) => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        swRegistration = reg;
        console.log('[SW] Service Worker registrado con éxito:', reg.scope);

        // Listen for new service worker installation
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New update available!
                if (onUpdateFoundCallback) {
                  onUpdateFoundCallback({
                    hasUpdate: true,
                    version: 'Nueva versión',
                    notes: 'Se han descargado mejoras y nuevo contenido.'
                  });
                }
              }
            };
          }
        };
      })
      .catch((err) => {
        console.warn('[SW] Error al registrar Service Worker:', err);
      });
  });

  // Listen for controllerchange to reload if needed
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
};

// Check for updates by fetching version.json and triggering registration.update()
export const checkForUpdates = async () => {
  try {
    // 1. Check Service Worker registration update
    if (swRegistration) {
      await swRegistration.update();
      if (swRegistration.waiting) {
        return {
          hasUpdate: true,
          latestVersion: '1.0.2',
          releaseNotes: '¡Nueva versión lista para instalar sin perder tu progreso!'
        };
      }
    }

    // 2. Fetch remote version.json with cache buster
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.version && data.version !== CURRENT_APP_VERSION) {
        return {
          hasUpdate: true,
          latestVersion: data.version,
          releaseNotes: data.releaseNotes || 'Mejoras de rendimiento y nuevas lecciones.'
        };
      }
    }

    return { hasUpdate: false, latestVersion: CURRENT_APP_VERSION };
  } catch (err) {
    console.warn('Error al verificar actualizaciones:', err);
    return { hasUpdate: false, error: err };
  }
};

// Apply update: activate new service worker and refresh the page instantly
export const applyUpdate = async () => {
  if (swRegistration && swRegistration.waiting) {
    swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }

  // Clear cache storage
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    } catch (e) {
      console.warn('Could not clear caches:', e);
    }
  }

  // Reload page to load new files
  setTimeout(() => {
    window.location.reload();
  }, 300);
};
