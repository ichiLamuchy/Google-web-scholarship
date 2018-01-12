/*
======================================================================
// https://github.com/jakearchibald/idb 
for more details and update
======================================================================



idb can have multiple objectStore. 


1. <<Promise>> open & upgrade idb

        1-2. open idb by idb.open ()
                // var dbPromise　= idb.open ()
                // idb.open(name, version, upgradeCallback)
    
        1-2. create objectStore by createObjectStore() 
                // var keyValStore = upgradeDb.createObjectStore() 
                // upgradeDb is param name of call back from ide.open
                // the function gets a special upgradeDb param which we use to define the database
        
        1-3. use any method on the object store, i.e. objectStore_1.put()
            1-3-b. createIndex 
                        if you have already called creatObjectStore
                        use upgradeDb.transaction.objectStore() to call the objectStore
                        It is the same way as 2-2 but this transaction is PROPERTY
                        // var peopleStore = upgradeDb.transaction.objectStore('people');
                        // peopleStore.createIndex('animal', 'favoriteAnimal');   

        done});
    
2. <<Promise>> Any transactions on data base (idb)
    
        call promise to have whole data base,
        Then create transaction() of the object store you like,
        call the objectStore() to assign to a value from the transaction
        now you can do whatever you like by using objectStore methods.
        all these just live in promise, just the way of data transaction
    
        2-1. dbPromise.then() to start with

        2-2. create transaction and passing the opjectStore by db.transaction()
                // var tx = db.transaction ('keyval');
                // transaction() is METHOD returns a Transaction          
                // you can pass multiple objectStore here

        2-3. Then call objectStore passing in the name of ObjectStore
                // var keyVAl = tx.objectStore('keyval')

        2-4. returns a promise which resolved to the value you like
                // i.e. return keyValStore.get()

        2-5. then(function(val){// do whatever you like});
        
            2-5-1. if the method is right method, then make sure you use
                    return tx.complete;
                    }).then
                    to carry on what need to be as you never know if it has been completed
                    
            2-5-2. if you use cursor
                    return ageIndex.openCursor();       // openCursor is method of index resolve with cursor
                    }).then(function (cursor){ 
                        if (!cursor) return;
                        console.log('Cursor at:' , cursor.value.name);  
                        return cursor.continue(); });   // to move on to the next item
         done });   
    


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
              
**************   upgradeDB   ******************
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
      4.Optionally open index on object store
      5.Perform operation on object store or index
      
      Properties:
          complete - a promise. Resolves when transaction completes, rejects if transaction aborts or errors
          Same as equivalent properties on an instance of IDBTransaction:
                  objectStoreNames
                  mode
      Methods:
          abort - as idbTransaction.abort
          objectStore - as idbTransaction.objectStore, but returns an ObjectStore


*******************  Index  **********************

        Properties:

        Same as equivalent properties on an instance of IDBIndex:
            name
            keyPath
            multiEntry
            unique

        Methods:
            Same as equivalent methods on an instance of IDBIndex, 
            but returns a promise that resolves/rejects based on operation success/failure:
                get
                getKey
                getAll
                getAllKeys
                count
            Same as equivalent methods on an instance of IDBIndex, 
            but returns a promise that resolves with a Cursor:
                openCursor
                openKeyCursor
                iterateCursor - as objectStore.iterateCursor but over the index
                iterateKeyCursor - as objectStore.iterateKeyCursor but over the index
                
                
*******************  Cursor  **********************
        
        Properties:
            (Same as equivalent properties on an instance of IDBCursor)
            direction
            key
            primaryKey
            value

        Methods:
            Same as equivalent methods on an instance of IDBCursor, 
            but returns a promise that resolves/rejects based on operation success/failure:
                update
                delete
            Same as equivalent methods on an instance of IDBCursor, 
            but returns a promise that resolves with a Cursor:
                advance
                continue
                continuePrimaryKey
                
                
--------------------
some random notes
---------------------
        idb.open is only place to create and remove db - store to var dbPromise for later as use db
              createObjectStore to create Store
              upgrateDb.oldVersion for swich version of db (ungradeDb is param of fn - 3rd param of open fn)
              assigned objectStore to var so you can later use objectStore method such as add, put, delete and etc
              transaction is to specify only the object stores that you need to access.
      

        Array.prototype.includes()          boolean
        caches.open ('nameofCache')         - return promise .then typically some method or condition after
        objectStore.getAll()                - all data to access each key in calue use . - i.e. wittr.photo
        upgradeDb.createObjectStore('storeName')        - create objectStore
        upgradeDb.transaction.objectStore('people');    - ready for transaction if you have created objectStore
        peopleStore.createIndex('animal', 'favoriteAnimal');  - after above code

        var tx = db.transaction('storeName');         - create transaction
        var peopleStore = tx.objectStore('people');            - call the objectStore
        var peopleStore = upgradeDb.transaction.objectStore('people');
        peopleStore.createIndex('animal', 'favoriteAnimal'); .
        
        var index = upGrade.createOpjectStore('people').tramsaction.objectStore('people').
        cache.keys()
        cursor.advance(30)                  - leave first 30

        peopleStore.index('age')            - if age indexCreate has called then you can call index on 
*/



/***************************************************************
        It's all returns a promise indtead of request 
        +++ Eamples
*****************************************************************/
      
// Basic Examples-----------------------------------------------------------

// version start 1, if version 1 is created it starts from case 1, so

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

// using open & transaction ---------------------------------------------------            

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

            return animalIndex.getAll('cat');   // it shows only favoriteAnimal : cat - query
                                                // f no param passed sorted by alphabetical order of animal
        }).then(function(people) {              // param people is the resolve of the promise
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
