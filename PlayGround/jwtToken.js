
const jwt =  require('jsonwebtoken')
const myFunction  = async () =>{

  ////how we create a token and set the expire data
  const token = jwt.sign({ _id: 'abc123'}, 'secretWord', {expiresIn: '7 second'})
  console.log(token)

  ///verify the data 
 const data =  jwt.verify(token, 'secretWord')
 console.log(data)
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1OTkyNDAxNzV9.iP_xuy5cxgYRf5sIZE_jqOPVRpBjx2QdJZOJ29fBOHQ
}

myFunction( )