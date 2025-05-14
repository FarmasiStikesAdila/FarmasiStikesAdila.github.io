// Perbaikan service worker dengan error handling
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('medtracker-v2').then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                './icon.png',
                './notification.mp3'
            ]).catch(function(error) {
                console.log('Cache addAll error: ', error);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Perbaikan notifikasi dengan fallback
self.addEventListener('push', function(event) {
    let data = {title: 'Pengingat Obat', body: 'Waktunya minum obat'};
    if (event.data) {
        data = event.data.json();
    }
    
    const options = {
        body: data.body,
        icon: './icon.png',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function(clientList) {
            if (clients.openWindow) {
                return clients.openWindow('./');
            }
        })
    );
});