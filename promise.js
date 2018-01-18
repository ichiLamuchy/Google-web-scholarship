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
    
    
