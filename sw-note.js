/*
sw notes

window oject has navigator
navigator is an object - with property of the browser info you are using on

1:  register  - return promise 
        navigater.serviceWorker.register('/sw.js').then(function (reg){
        }
               you can add scope 
               scope: // this part you need '/myApp/'
       
       
2: Download, Install, Activate

    Your worker script goes through these three stages when you call .register
    SW receives the events, you can add code below on index.js to see what request being made
        self.addEventListener ('fetch', function (event){
                console.log(event.request);
        });

    Download: 
        The service worker is immediately downloaded 
        when a user first accesses a service worker–controlled site/page.
    
    Install:
        attempted when the downloaded file is found to be new
        if first time, it will be activated straight away
        if it is not first time, the new sw will be on back ground until activate
        
    Activate 
        
                self.addEventListener('activate', function(event) {
                        // You're good to go!
                });

    (force reload : shift plus reload)




*/

// wittr - SW useful codes


// the fetch API is replacement of XMLHttpRequest built on promises
self.addEentlistener ('fetch', function (event) {
  console.log (event.request)
});

// npm run serve on command to start node on this project

// basic registration ------------------------------------------------------------------
// eample 1
IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

// example 2
  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Registration worked!');
  }).catch(function() {
    console.log('Registration failed!');
  });
};
// registration of sw needs to be done on indexController where all contructer lives

// when you register for sw, it returns promise, that promise fulfills with a sw object (which has property and mehod)
// example 3 - when controlling all sw
 navigator.serviceWorker.register('/sw.js').then(function(reg) {
   reg.unregister();
   reg.update();
   
   reg.installing;
   reg.waiting;
   reg.active;
   // these will be point at service worker object or null
   reg.addEventListner('updatefound', function (){
     //reg.installing has changed - becomw a new worker
   })   
 });

// installing -------------------------------------------------------

var sw = reg.installing;
console.log(sw.state); //... log "installing"
/* state can be 
"installing"
"installed"
"activating"
"activated"
"redundant"
*/


// nortification for UX ------------------------------------------------------------------

sw.addEventlistener ('statechange', function(){
  //sw.state has changed
})

navigator.serviceWorker.controller
  // referes to the sw that control this page
  // you wanna tell user when the update ready,

if (! navigator.serviceWorker.controller)
  // it means this page did not load using service worker loaded from network
  
if (reg.waiting)
   // means update ready and waiting
  indexController._updateReady();

if (reg.installing)
  // means update in progress
  if (reg.installing){
      reg.installing.addEventListener ('statechange', function (){
        if (this.state == 'installed'){
          indexController._updateReady();          
        }
      });
      return; // see where return is
    }

    // otherwise listen for the update found event
    // that fires we tack the satate ofinstalling worker and if it reached installed state we wil tell user.
    reg.addEventListener ('updatefound', function (){
      reg.installing.addEventlistener('statechange', function (){
        if (this.state == 'installed'){
          // update ready
          indexController._updateReady();
        }
      })
    });
 
// you could also nake another function on prototype of indexController
 IndexController.prototype._trackInstalling = function (worker){
   var indexController = this;
   worker.addEventListener('statechange', function (){
     if (worker.state == 'installed'){
       indexController._updateReady();
     }
   });
 }
                           

 //-----------------------------------------------------------------------------------------                          

// use of fetch and Response

self.addEentlistener ('fetch', function (event) {       // fetch eventlistner
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


//------------------------------------------------------------------------------------------

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

// more practical way, use var for chache name
//in practice, use version nacme on cache name as well as file name - i.e. css/main-8gd9.css
var staticCacheName = 'wittr-static-v2';

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then (function (cacheNames){
      return Promise.all (
        cacheNames.filter().filter(function(cacheName){
        return cacheName.statusWith('wittr-')&&
          cacheName != staticCacheName;
        }).map(function (cacheName){
          return caches.delete(cacheName);
        })
      )  
    })
  );
});
       

// triggering update notification -----------------------------------------------------------------------
       
self.skipWaiting()
       //sw can call skipWaiting method while it's waiting or installing
       // it shouldn't queue behild another service worker. should take over strainght away
       // you wanna call it when user hit the refresh button in our update notification
       // how do w esend the signal from the page to the waaiting service worker
    
  // your page can send message to any sw using postMessage 
  // from a page
reg.installing.postMessage({foo: 'bar'});

  // in the service worker:
self.addEventlistener ('message', function (event){
      event.data; // {foo: 'bar}                         
  }) 
  // so user clicks the refresh button or send a message to ourservice worker 
  // telling to it to call skipWaiting
    
navigator.serviveWorker.addEventlistener ('controllerchange', function (){
    }
  // the page gets an event when its value changes, meaning a new service worker has taken over.
  // use this as a signal that we should reload the page                                           
                                              
// _updateReady
// _updateReady is being called whenever there's an update ready to show
IndexController.prototype._updateReady = function (worker){
      var toast = this._toastView.show("New version available", {
        buttons: ['refresh', 'dismiss']
      });
      
      toast.answer.then(function (answer){
        if (answer !='refresh') return;
        // to do tell sw to skipWaiting
        //check if reg is there
        reg.installing.postMessage();
        
      });
    };
 
 // on service worker
 self.addEventListener ('message', finction (){
      self.skipWaiting()
 });
     
 // on indexController
  navigator.serviveWorker.addEventlistener ('controllerchange', function (){
    //reroad is it just return or re-load function
    }
  
                                              
 //--------copy of sw/index.js-----


var staticCacheName = 'wittr-static-v2';
//tes  
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
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

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
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

// TODO: listen for the "message" event, and call
// skipWaiting if you get the appropriate message

 var requestUrl = new URL (event.request.url);

  if (requestUrl.origin === location.origin){
      if (requestUrl.pathname === '/'){
        event.respondWith(caches.match('/skeleton'));
        return;
      }
  }

self.addEventListener ('message', function (event){

  if(event.data.action == 'skipwaiting'){
    self.skipWaiting();
  }
});




/*===============================================================

  deeper understanding of 
  
  fetch   --- properties and mothods other than request and response
  respondWith
  URL constructer
  caches - write down each method
  promise --- udacity course
  ehrn does it need to be return on 





*/===============================================================
                                              
                                              
    
 
       
