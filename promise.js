/*
==========================================
Udacity JavaScript Promises
https://classroom.udacity.com/courses/ud898
==========================================
        
for exoplanet-explorer project ++++++++
		work on app/scripts/app.js

		Serve / watch
			gulp serve
+++++++++++++++++++++++++++++++++++++++


basic promise example code --------------------------------------------
        
		ready() return promise
        make listner checkstate() function
        addEventListener(type of event , listener)
        once resolved returned use .then to check the test function 
*/
        
    function ready() {                                      

        return new Promise (function (resolve){            
            function checkstate (){
                if(document.readyState !== 'loading'){ 
                    resolve();
                }	
            }
            document.addEventListener('readystatechange', checkstate);  
            checkstate();				                   
        });
	};
        
        //test function
		function wrapperResolved() {
			var completion = document.querySelector('.completion');
			completion.innerHTML = "Resolved!";
		};

    ready().then(wrapperResolved;
    
 
//Promise wrap an XMR code example ----------------------------------------------------
				 
	(function(document) {
	  'use strict';

	  var home = null;
		
	  function addSearchHeader(response) {
		try {
		  response = JSON.parse(response).query;  // you'll be moving this line out of here in the next quiz!
		} catch (e) {
		  // it's 'unknown', so leave it alone
		}
		home.innerHTML = '<h2 class="page-title">query: ' + response + '</h2>';
	  }

	  function get(url) {

		return new Promise (function (resolve, reject){

		var req = new XMLHttpRequest();
		req.open('GET', url);
		req.onload = function() {
		  if (req.status === 200) {
			resolve(req.response);
		  } else {
			reject(Error(req.statusText))
		  }
		};
		req.onerror = function() {
		  reject(Error('Network Error'));
		};
		req.send();
	  });
	  };
		// test
	  window.addEventListener('WebComponentsReady', function() {
		home = document.querySelector('section[data-route="home"]');
		get('../data/earth-like-results.json')
		.then(function(response){
		  addSearchHeader(response);
		})
	   .catch(function(error){
		 addSearchHeader(error)
	   })
	  });
	})(document);			 

				 
				 
