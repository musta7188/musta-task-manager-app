// CRUD create read update delete

///npm library we get back an object 
// const mongodb = require("mongodb") //short cut used below

// // initialize the connection it give us access to the function we need to connect the database 
// const MongoClient = mongodb.MongoClient //short cut used below
 
// const ObjectID = mongodb.ObjectID //short cut used below

const {MongoClient, ObjectID} = require('mongodb')

// const id = new ObjectID()

 console.log(id.id) 
// ///print out an object id 
// //5f478f218996d932673a67b1
// // getTimestamp() show the first 4 byte that are the time and date when this was generated
// // id.id generate the binary option of the id  <Buffer 5f 47 92 3c 0a d9 2e 33 5d 82 f9 9c>
 console.log(id.toHexString()) //this convert the binary object back to a string 


//// choose the URL you want to connect to
////used ip of the localhost 127.0.0.1 / followed by the port 27017
const connectionURL = 'mongodb://127.0.0.1:27017'

///name of the data base that can be anything you want 
const databaseName = 'task-manager'

///connect method 
///function connect take the url and a callback function with error and client
////option object "{ useNewUrlParser: true}" to be parse correctly to be passed to the server 
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {

if(error){
 return console.log("enable to connect to the database")
}

///db method to get the connection for a specific database
////give back a db reference 
const db = client.db(databaseName)

/insert new data, with call back function 
db.collection('users').insertOne({
  _id: id,
  name: "Rachid",
  age: 42
    }, (error, result) => {
      if(error) {
        return console.log("unable to insert user")
      }

      console.log(result.ops)


    })

db.collection('users').insertMany([
  {
    name: "jen",
    age: 28
  },
  {
    name: "Dan",
    age: 24
  }
], (error, result) => {

  if(error){
    return console.log('unable to insert the data')
  }

  console.log(result.insertedCount)
  console.log(result.ops)

})

db.collection('task').insertMany([
  {
    duty: "use the washing machine",
    completed: false
  },
  {
    duty: 'take the trash out',
    completed: true
  },
  {
    duty: 'Call the doctor',
    completed: true
  }
], (error, result) => {
  if(error){
    return console.log('unable to create collection')
  }
  
  console.log(result)
})
 
})




/// run the mongodb server on the console
// cd ~ 
// pwd 
// Users/musta88
/// /Users/musta88/mongodb/bin/mongod --dbpath=/Users/musta88/mongodb-data