// https://github.com/jakearchibald/idb for more details and update

// some random notes




idb.open(name, version, upgradeCallback)

idb.delete(name)
  //Behaves like indexedDB.deleteDatabase, but returns a promise.
  idb.delete('keyval-store').then(() => console.log('done!'));
  
// adding email index to the store   
var dbPromise = ide.open ('test-db', 1, function (ungradeDb){
  if (!updateDb.objectStoreNames.contains('ppl')){
    var store = upgradeDb.createObjectStore ('ppl')
    store.createIndex('email', 'email', {unique: true});
  }
})
 

/*supports CRUD (create, retrieve, update, and delete)

  add
  get
  put
  delete
  getAll
  cursor  - extract values by index or key
  
  you have to wrap the operation in transaction (operations)

*/


 
 
/*
DB ---------------------------------------------------------------------
    Properties:(Same as equivalent properties on an instance of IDBDatabase)
        name
        version
        objectStoreNames

     Methods:
        close - as idbDatabase.close
        transaction - as idbDatabase.transaction, but returns a Transaction
    
UpgradeDB:  As DB, except---------------------------------------------------
    Properties:
        transaction - this is a property rather than a method. It's a Transaction representing the upgrade transaction
        oldVersion - the previous version of the DB seen by the browser, or 0 if it's new

    Methods:
        createObjectStore - as idbDatabase.createObjectStore, but returns an ObjectStore
            /// defining the primal key - you need to do when you createObjectStore
            upgrade.createObjectStore ('people', {keyPath: 'email'});                 //email addres as key (need to be unique)
            upgrade.createObjectStore ('note', {autoIncrement: true});                // key generater to assign a serial number to each object
            upgrade.createObjectStore ('logs', {keyPAth: 'id', autoIncrement: true)   // onto ide property
        
        deleteObjectStore - as idbDatabase.deleteObjectStore
        
 Transaction: ---------------------------------------------------------------
      1.Get data from ide.open
      2.Open transaction on database
      3.Open object store on transaction 
      4.Optioonally open index on object store
      5. Perform operation on object store or index
      
      Properties:
          complete - a promise. Resolves when transaction completes, rejects if transaction aborts or errors
          Same as equivalent properties on an instance of IDBTransaction:
                  objectStoreNames
                  mode
      Methods:
          abort - as idbTransaction.abort
          objectStore - as idbTransaction.objectStore, but returns an ObjectStore
*/

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
