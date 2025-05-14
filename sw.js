// Service Worker untuk menangani notifikasi
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('medtracker-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                'icon.png',
                'notification.mp3'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});

self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: 'icon.png',
        vibrate: [200, 100, 200],
        sound: 'notification.mp3'
    };
    
    event.waitUntil(
        self.registration.showNotification('Pengingat Obat', options)
    );
});