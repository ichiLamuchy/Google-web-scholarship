/*

Jasmine is an automated testing framework for JavaScript.

1. include SpecRunner.html file for your project

2. make spec folder to store spec js files. 
        i.e.  lib folder - jasmine-2.2.0 folder with all necessary files
              src folder for all src js files
              spec folder for all spec js files
        
3. make spec file
              use - describe
                    it
                    expect, toBe, not.toBe
                    beforeEach
                    done
4. run SpenRunner to see if fails

5. check the error code, then make src js 
                    
*/

// example codes

// a test suite
describe("Address Book", function(){

    var addressBook,
    thisContact;
    
    // this runs before each of test
    beforeEach (function (){
        addressBook = new AddressBook();
        thisContact = new Contact();
    });

    it("should be able to add contact", function(){
        addressBook.addContact(thisContact);

        expect(addressBook.getContact(0)).toBe(thisContact);

    });

    it("should be able to delete contact", function(){
        addressBook.addContact(thisContact);
        addressBook.deleteContact(0);

        expect(addressBook.getContact(0)).not.toBeDefined();
    });
});

// using done() for async problems, possibly writing in ES6 or promise to solve this problems?
describe ("Async Address Book", function (){
    var addressBook = new AddressBook();

    beforeEach (function (done) {
        addressBook.getInitialContacts (function (){
            done();
        });
    });

    it ("should grab initial contacts", function (done){
        expect(addressBook.initialComplete).toBe (true);
        done ();
    });

});
