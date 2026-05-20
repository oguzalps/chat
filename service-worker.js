// public/service-worker.js

// 1. Arka planda mesaj dinleme kalkanı kanka
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, body, url } = event.data;
        
        const options = {
            body: body,
            icon: '/msn-logo.png', // Kanka public içine attığın msn logosunun adı neyse onu yaz
            badge: '/msn-badge.png', // Bildirim çubuğunda çıkacak minik ikon
            vibrate: [200, 100, 200], // Telefonu MSN gibi iki kere titretme hilesi!
            data: { url: url || '/' },
            tag: 'msn-chat-notification', // Üst üste binen bildirimleri gruplar, ekranı kirletmez
            renotify: true
        };

        // Bildirimi telefona fırlat kanka!
        event.waitUntil(
            self.registration.showNotification(title, options)
        );
    }
});

// 2. Bildirime tıklanınca siteyi açma motoru kanka
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Bildirimi kapat
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Eğer site zaten arkada açıksa odağa al kanka
            for (const client of clientList) {
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            // Kapalıysa sıfırdan pencere aç kanka
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});