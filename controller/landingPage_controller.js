const axios = require('axios');
// require db connection
var dbConn = require("../database/queries/utilityQueries");
// require bcryptjs
var bcryptjs = require('bcryptjs');

var consumeAPIs = require("../consumeAPIs");

// require jsonwebtoken
var JWT = require("jsonwebtoken");
// require secretkeys
var jwtSecretKey = require("../jwt/secretkeys");

require('dotenv').config();


var landingPage_controller = {

    // index
    index: async (req, res) => {
        res.render("index");
    },


    // general_login
    general_login: async (req, res) => {
        
        try {
            var general_login_response = await dbConn.login_member(req.body.email);
            // console.log("general_login_response: ", general_login_response);

            // check if the result object is empty
            if (general_login_response.length === 0) {
                // console.log("empty")
                return res.send({error :"invalid login details or not activated"});
            }
            else {
                var hashed = general_login_response[0].password;
                // validate the password using bcryptjs
                var valid = await bcryptjs.compare(req.body.password, hashed);

                if (valid) {
                    // empty the password 
                    general_login_response[0].password = "";
                    // our payLoad as plain object to be used for JWT
                    var payLoad = {
                        email: general_login_response[0].email,
                    };
                    // expiresIn : "2 days"
                    token = JWT.sign(payLoad, jwtSecretKey.jwtSecretkey, { expiresIn : "2 days" });
                    return res.send({result :"valid login details", token: token, cashierDetails: general_login_response[0]});
                } else {
                    return res.send({error :"Wrong Password."});
                }
            } 
        } catch (error) {
            return res.send({error :"Unable to sign in, contact the admin."});
        }
    },


    // scanner
    scanner: (req, res) => {res.render("scanner");},


    // name_verification
    name_verification: async (req, res) => {
        // console.log(req.query);

        var name_verification = {
            method: 'GET',
            uri: `https://api.paystack.co/bank/resolve?account_number=${req.query.accountNumber}&bank_code=${req.query.bankCode}`,
            headers: 
            { 
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + process.env.PAYSTACK_SECRET_KEY  // PAYSTACK_SECRET_KEY from required("dotenv") above
            },
            json: true // Automatically stringifies the body to JSON likewise parses the result
        }; 
 
        // consumeAPIs
        try 
        {
            var name_verification_status = await consumeAPIs.api_call(name_verification);
            // console.log(name_verification_status.data.account_name);
            var payload_gotten = {
                nameEnquiry: name_verification_status.data.account_name,
                accountNumber: req.query.accountNumber,
                bankCode: req.query.bankCode,
                the_pasystack_public_key: process.env.PAYSTACK_PUBLIC_KEY
            };
            return res.send({result :payload_gotten});
        }catch(error){
            // console.log(error);
            return res.send({error :"Could not resolve account name."});
        };

    },


    // logout
    logout : function(req, res){
        res.redirect("/");
        return;
    },
    // seperate each function by ","
    


};



module.exports = landingPage_controller;