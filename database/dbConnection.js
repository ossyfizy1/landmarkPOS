var mysql = require('mysql');


// Datbase Connection
/* using mysql.createPool to create a pool of connection for immediate use instead of create=ing a connection everytime*/
var connectionPool = mysql.createPool({
    connectionLimit : 10,
    multipleStatements: true, // for multiple query support
    host     : process.env.MYSQL_DB_URI || 'localhost',
    user     : process.env.MYSQL_DB_USER || 'root',
    password : process.env.MYSQL_DB_PASSWORD || '',
    database : process.env.MYSQL_DB_DATABASE || 'landmarkpos',
    port: process.env.DB_PORT || 3307,
  });

// The connection pool is created & available
connectionPool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    console.log("database status: ", connection.state);
});

// sql_query
function sql_query(parameter){
    return new Promise(function(resolve, rejected){
        // if the query has parameters
        if (parameter.params) {
            connectionPool.query(parameter.query, parameter.params, function (error, results, fields) {
                if (error) {
                    rejected(error);                    
                }
                else if (results) {
                    resolve(results);
                }
            });
        } 
        // if the query has no parameters
        else {
            connectionPool.query(parameter.query, function (error, results, fields) {    
                if (error) {
                    rejected(error);
                }
                else if (results) {
                    resolve(results);
                }
            });
        }
    });

}



module.exports = sql_query;

