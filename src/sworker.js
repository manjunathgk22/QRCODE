
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();


self.addEventListener('push', (event) => {
    const data = event.data.json();
    event.waitUntil(self.registration.showNotification(data.title, {
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    }));
    
    self.clients.matchAll({
      includeUncontrolled: false,
      type: 'window',
    }).then((clients) => {
      if (clients && clients.length) {
        // Send a response - the clients
        // array is ordered by last focused
        clients[0].postMessage({
          data
        });
      }
    });
});
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  self.clients.matchAll({
    includeUncontrolled: false,
    type: 'window',
  }).then((clients) => {
    if (clients && clients.length) {
      // Send a response - the clients
      // array is ordered by last focused
      clients[0].postMessage({
        data:{action:'pushsubscriptionchange'}
      });
    }
  });
})

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);