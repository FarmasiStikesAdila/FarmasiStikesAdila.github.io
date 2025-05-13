// Versi SUPER SIMPLE untuk pemula
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const options = {
    body: 'Waktunya minum obat sesuai jadwal!',
    icon: 'icon.png' // Ganti dengan nama file gambar Anda
  };
  event.waitUntil(self.registration.showNotification('Pengingat Obat', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/')); // Buka halaman utama saat diklik
});