const CACHE_NAME = 'cache-v1';
const urlsToCache = [
    '/catalog',
    '/catalog/books',
    '/stylesheets/style.css',
    '/stylesheets/bulma.css',
    'https://unpkg.com/ionicons@4.5.0/dist/ionicons.js'
];

self.addEventListener('install', event => {
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache);
    })
})

self.addEventListener('fetch', event => {
    const {request} = event;
    const findResponsePromise = caches.open(CACHE_NAME)
        .then(cache => cache.match(request))
        .then(response => {
            if (response) return response;
            return fetch(request);
        })
    event.respondWith(findResponsePromise);
})

self.addEventListener('push', function(e) {
    var body;
    var data = JSON.parse(e.data.text());
  
    if (e.data) {
      body = data.message;
    } else {
      body = 'Push message no payload';
    }
  
    var options = {
      body: body,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'Explore this new world',
          icon: 'images/checkmark.png'},
        {action: 'close', title: 'I don\'t want any of this',
          icon: 'images/xmark.png'},
      ],
      data: {
          url: data.url
      }
    };
    e.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

self.addEventListener('notificationclick', event => {
    let url = event.notification.data.url;
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function(clientList) {
            console.log('ClientList: ',clientList);
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if ("focus" in client) {
                    return client.focus();
                }
            }

            if (clientList.length === 0) {
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            }
        })
    );
})

self.addEventListener('notificationclose', event => {
    return null;
})