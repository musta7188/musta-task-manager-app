// CRUD create read update delete

const { MongoClient, ObjectID, ResumeToken } = require("mongodb");

//// choose the URL you want to connect to
////used ip of the localhost 127.0.0.1 / followed by the port 27017
const connectionURL = process.env.MONGODB_URL;

///name of the data base that can be anything you want
const databaseName = "task-manager";

///connect method
///function connect take the url and a callback function with error and client
////option object "{ useNewUrlParser: true}" to be parse correctly to be passed to the server
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("enable to connect to the database");
    }

    ///db method to get the connection for a specific database
    ////give back a db reference
    const db = client.db(databaseName);

 
  })



/// run the mongodb server on the console
// cd ~
// pwd
// Users/musta88
/// /Users/musta88/mongodb/bin/mongod --dbpath=/Users/musta88/mongodb-data
////how to kill mongodb process 
///////$ pgrep mongo (this will give you a number: 1350 )
/////// $ kill 1350

//////npm run dev