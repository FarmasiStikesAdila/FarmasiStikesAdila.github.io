
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
});

self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: data.icon || 'https://cdn-icons-png.flaticon.com/512/3148/3148828.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
