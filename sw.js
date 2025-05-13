// Service Worker untuk Pengingat Obat
self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
    console.log('Service Worker: Activated');
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://farmasistikesadila.github.io')
    );
});