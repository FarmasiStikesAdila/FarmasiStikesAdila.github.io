// Versi final yang sudah di-test
self.addEventListener('install', (e) => {
  console.log('[SW] Installed!');
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.log('[SW] Activated!');
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', (e) => {
  console.log('[SW] Memicu Notifikasi');
  e.waitUntil(
    self.registration.showNotification('Pengingat Obat', {
      body: 'Waktunya minum obat sesuai jadwal!',
      vibrate: [200,100,200]
    })
  );
});
