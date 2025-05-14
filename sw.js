// SW untuk Notifikasi
self.addEventListener('install', e => e.skipWaiting());
self.addEventListener('activate', e => e.clients.claim());

self.addEventListener('push', e => {
    const options = {
        body: e.data?.text() || 'Waktunya minum obat sesuai jadwal',
        vibrate: [200,100,200]
    };
    e.waitUntil(self.registration.showNotification('Pengingat Obat', options));
});

self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(clients.openWindow(e.notification.data?.url || '/'));
});