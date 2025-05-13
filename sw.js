// Service Worker untuk Notifikasi
self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
    console.log('Service Worker: Activated');
});

self.addEventListener('push', event => {
    const options = {
        body: event.data?.text() || 'Waktunya minum obat sesuai jadwal',
        vibrate: [200,100,200]
    };
    event.waitUntil(
        self.registration.showNotification('Pengingat Obat', options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/')
    );
});