var rp = require('request-promise');
var Promise = require("bluebird");


// object consumeAPIs
var consumeAPIs = {

    api_call : async function(options){
        // Return a promise 
        return await  rp(options);

        // return new Promise(function(resolve, reject) {
        //             // Do async job
        //             rp(options).then(
        //                 (result) => {resolve(result);},
        //                 (error) => {reject(error);},
        //             );
        // }); // end of Return new promise 
    },
    // seperate each function by ","

}


module.exports = consumeAPIs;