// Service Worker Sederhana - FarmasiStikesAdila
self.addEventListener('install', (event) => {
  console.log('[SW] Installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('[SW] Push Received');
  const options = {
    body: 'Waktunya minum obat sesuai jadwal!',
    // icon: 'icon.png',  // Sementara di-disable karena file tidak ada
    vibrate: [200, 100, 200]  // Tambahkan getar sebagai alternatif
  };
  event.waitUntil(
    self.registration.showNotification('Pengingat Obat', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://farmasistikesadila.github.io')
  );
});