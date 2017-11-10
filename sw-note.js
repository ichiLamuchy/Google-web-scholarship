
// wittr - SW useful codes



self.addEentlistener ('fetch', function (event) {
  console.log (event.request)
});


IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Registration worked!');
  }).catch(function() {
    console.log('Registration failed!');
  });
};
// registration of sw needs to be done on indexController where all contructer lives


self.addEentlistener ('fetch', function (event) {       // fetcheventlistner
  event.respondWith(                                    // respondWith takes new Resonse or Promise
    fetch(event.request).then(function(response){       // if fetch succeed return Promise
      if response.status === (404){                     // then the back with respond
        return new Response ('AAAH');                   // must return
      }
      return response;
  }).catch(function(){
    return new Response ("totally failed");
  })
  );
  });
  

new Response ('<b>Hello</b> world', {headers: {'Content-Type': 'text/html'}})
// Response can take data on 2nd param, what can be written is check on dev tool

self.addEventListener('install', function(event) {          //install event create new cache
  event.waitUntil(
    caches.open('wittr-static-v1').then(function(cache) {   // open- if not there then wii create one
      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith( 
  caches.match(event.request).then(function (response){
    if (response){
      return response;
    }
    return fetch(event.request);
  })
  );
});
