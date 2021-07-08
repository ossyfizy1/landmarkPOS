// dbConnection
const sql_query = require("../dbConnection");
// var send_mail_now = require("../../mail_service/send_mail");
// var emailbody = require("../../mail_service/emailbody");


var table_name = "cashier";

// dbOperations()
var dbOperations = {

    // login_member
    login_member : async function get_params(email){
        // queryAction will be defined here
        var query_to_run = `SELECT * FROM ${table_name} WHERE email = ? and verified = ? and approved = ?`;
        // construct the query & parameters into parameter
        var parameter = {
                            "params" : [email, 1, 1],
                            "query" : query_to_run
                    };

        // await sql_query()
        try {
            var the_response = await sql_query(parameter);
            return the_response;
        } catch (error) {
            return error.sqlMessage;
        }
    },
    // end

} // end of dbOperations



module.exports = dbOperations;