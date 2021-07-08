var JWT = require("jsonwebtoken");
var jwtSecretKey = require("./jwt/secretkeys");

// verify the token
var verifyToken = function(req, res, next){
    
        try {
            var token = req.query.token;
            JWT.verify(token, jwtSecretKey.jwtSecretkey, function(error, validated){
                if(error) {
                    // console.log({"result" : error.message});
                    res.json({"result" : error.message}); 
                }else{
                    next(); // this will pass the request to the next middleware if there is any.
                }
            });
        } catch (error) {
            // console.log({"result" : error.message});
            res.json({"result" : "can not find token in authorization header"}); 
        }

    };  // end of verifyToken


module.exports = verifyToken;