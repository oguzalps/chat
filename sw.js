// public/sw.js - Arka planda bildirimleri fırlatacak olan bağımsız ajan kanka:
self.addEventListener('push', function(event) {
    // Eğer bir push tetiklenirse burası çalışır, biz şimdilik yerel eventlere bağlayacağız
});

// Arka plandan gelen bildirim gösterme emrini işletim sistemine ileten kalkan:
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const options = {
            body: event.data.body,
            icon: 'favicon.ico',
            badge: 'favicon.ico',
            vibrate: [200, 100, 200], // Telefonu titretme kodu kanka
            data: { url: event.data.url }
        };
        event.waitUntil(
            self.registration.showNotification(event.data.title, options)
        );
    }
});

// Bildirime tıklanınca chat odasını şak diye ekrana açma hilesi:
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});