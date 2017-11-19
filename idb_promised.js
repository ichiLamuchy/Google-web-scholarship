// https://github.com/jakearchibald/idb for more details and update




// some random notes

/*
idb.open is only place to create and remove db - store to var dbPromise for later as use db
      createObjectStore to create Store
      upgrateDb.oldVersion for swich version of db (ungradeDb is param of fn - 3rd param of open fn)
      assigned objectStore to var so you can later use objectStore method such as add, put, delete and etc
      transaction is to specify only the object stores that you need to access.
openCursor 


Useful --------------------------------------------------------

Array.prototype.includes()          boolean
caches.open ('nameofCache')         - return promise .then typically some method or condition after
objectStore.getAll()                - all data to access each key in calue use . - i.e. wittr.photo
cache.keys()
cursor.advance(30)                  - get all keys on the cache

*/
      


//------------It's all returns a promise indtead of request +++ Basic Eample -----------------------------------------------


      var dbPromise = idb.open('test-db', 4, function(upgradeDb) {   // idb.open is only place you can create and remove db (inc; index)                    
        switch(upgradeDb.oldVersion) {                               // upgradeDb has property oldVersion
        case 0:
          var keyValStore = upgradeDb.createObjectStore('keyval');    // creating object store called keyValStore
          keyValStore.put("world", "hello");                          // this object store has many mehods and props see below
        case 1:
          upgradeDb.createObjectStore('people', { keyPath: 'name' }); // creating another store called people
        case 2:
          var peopleStore = upgradeDb.transaction.objectStore('people');  // you have to hold a people object store
          peopleStore.createIndex('animal', 'favoriteAnimal');            // create new index on peopleStore
        
        // add people to "people"
        dbPromise.then(function(db) {
          var tx = db.transaction('people', 'readwrite');     // create transaction (specify object stores) for people store, this case - readwrite
          var peopleStore = tx.objectStore('people');         // then acess to people Object Store here

          peopleStore.put({
            name: 'Sam Munoz',
            age: 25,
            favoriteAnimal: 'dog'
          });    
            return tx.complete;
            }).then(function() {
              console.log('People added');
           });

/*
***************  ObjectStore  ******************

        Properties:
            name
            keyPath
            indexNames
            autoIncrement
        Methods:    (returns promise)
            put
            add
            delete
            clear
            get
            getAll
            getAllKeys
            count
            ... & some more
            
                    
**************     db       ******************

        Properties:
              name
              version
              objectStoreNames
        Methods:
              close 
              transaction - as idbDatabase.transaction, but returns a Transaction
              
**************   UpgradeDB   ******************
                As DB, except:

        Properties:
              transaction - this is a property rather than a method. It's a Transaction representing the upgrade transaction
              oldVersion - the previous version of the DB seen by the browser, or 0 if it's new
        Methods:
              createObjectStore - as idbDatabase.createObjectStore, but returns an ObjectStore
              deleteObjectStore
              /// defining the primal key - you need to do when you createObjectStore
              upgrade.createObjectStore ('people', {keyPath: 'email'});                 //email addres as key (need to be unique)
              upgrade.createObjectStore ('note', {autoIncrement: true});                // key generater to assign a serial number to each object
              upgrade.createObjectStore ('logs', {keyPAth: 'id', autoIncrement: true)   // onto ide property
              

****************  Transaction  *******************

      it's specifying the objectstore

      1.Get data from ide.open
      2.Open transaction on database
      3.Open object store on transaction 
      4.Optioonally open index on object store
      5.Perform operation on object store or index
      
      Properties:
          complete - a promise. Resolves when transaction completes, rejects if transaction aborts or errors
          Same as equivalent properties on an instance of IDBTransaction:
                  objectStoreNames
                  mode
      Methods:
          abort - as idbTransaction.abort
          objectStore - as idbTransaction.objectStore, but returns an ObjectStore

*/

//   using open & transaction ----------------------------------------------------------------             

// i.e 1                    
db.Promise.then(function (db){ var tx = db.transaction ('keyval')};
var keyValStore = tx.objectStore ('keyVal');

//i.e. 2
idb.open('keyval-store', 1, upgradeDB => {
switch (upgradeDB.oldVersion) {
  case 0:
    upgradeDB.createObjectStore('keyval');
}
}).then(db => {
const tx = db.transaction('keyval', 'readwrite');
tx.objectStore('keyval').put('hello', 'world');
return tx.complete;
}).then(() => console.log("Done!"));

// when you need to read databese you need to create a transaction passing Object Store
// then call object passing in the name of Object Store You want
// it's possible to have transaction that uses multiple stores.

                    
//  Using cursors ----------------------------------------------------------------------
                    

 IndexController.prototype._onSocketMessage = function(data) {
  var messages = JSON.parse(data);

  this._dbPromise.then(function(db) {
    if (!db) return;

    var tx = db.transaction('wittrs', 'readwrite');
    var store = tx.objectStore('wittrs');
    messages.forEach(function(message) {
      store.put(message);
    });

    // TODO: keep the newest 30 entries in 'wittrs',
    // but delete the rest.

    store.index('by-date').openCursor(null, 'prev') // this goes backword
    .then (function (cursor){
     return cursor.advance(30);                     // keep first 30
  }).then (function deleteCursor(cursor){
    if (!cursor) return;
    cursor.delete();

    return cursor.continue().then(deleteCursor);    // then call deleteCurser again till !cursor
  })
});


//  Using idbindex ----------------------------------------------------------------------
      
...
case 2: // under open method where you can create idb  
var peopleStore = upgradeDb.transaction.objectStore('people');
peopleStore.createIndex('animal', 'favoriteAnimal');
  // creating new index called animal using favourite animal value
...
dbPromise.then(function(db) {                               // pass the database of dbPromise
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var animalIndex = peopleStore.index('animal');
  // index method - set an index instead of using the primary key

  return animalIndex.getAll('cat');  // it shows only favoriteAnimal : cat
}).then(function(people) {
  console.log('Cat people:', people);
      });

// using objectStore -----------------------------------------------------------------

idb.delete(name)
  //Behaves like indexedDB.deleteDatabase, but returns a promise.
  idb.delete('keyval-store').then(() => console.log('done!'));
  
// adding email index to the store  --------------------------------------------------
       
var dbPromise = ide.open ('test-db', 1, function (ungradeDb){
  if (!updateDb.objectStoreNames.contains('ppl')){
    var store = upgradeDb.createObjectStore ('ppl')
    store.createIndex('email', 'email', {unique: true});
  }
})
       
 // code for  cache img ----------------------------------------------------------------


function servePhoto(request) {
  var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
  
  return caches.open(contentImgsCache).then(function(cache) {                   // chaches.open to read the specific cache return promise
      return cache.match (storageUrl).then(function(response){                  // look for storageUrl key
        if (response) return response;                                          // if the val presented return that
      
        return fetch (request).then(function(networkresponse){                  // use fetch to work with the respond and back the respond to browser
        cache.put(storageUrl, networkresponse.clone());                         // make clone pf respont then put it onto the cache
        return networkresponse;                                                 // return to the respnse to browser
      });
    }); 
  });
  
}

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
      
// code for clean img-cache -----------------------------------------------------
      
      
  IndexController.prototype._cleanImageCache = function() {
  return this._dbPromise.then(function(db) {                      // _dbPromise is open wittr
    if (!db) return;
        
    var imageKept = [];                                           // array to hold 
    var tx = db.transaction('wittrs');                            // specyfy wittrs to deal with
    return tx.objectStore('wittrs').getAll()                      // get all messages using getAll 
         .then (function (messages){      
      messages.forEach(function(message){
        if (message.photo ){                                      // if there is photo name access it by dot notation
            imageKept.push(message.photo);                        // put it into array
        }
      });
       return caches.open('wittr-content-imgs');
       
    }).then (function (cache){
        return cache.keys().then (function (requests){
          requests.forEach(function(request){
            var url = new URL(request.url);
            if (!imageKept.includes(url.pathname)){
              cache.delete(request);
            }          
        });
      });
    });
  });
};
