
const bcrypt = require('bcrypt')

const myFunction  = async () =>{

  const password = 'Mustaa7188'

  /// hash method takes the password and the number of times need to run the logic to hash the string 8 is the perfect number 
  const hashedPassword = await bcrypt.hash(password, 8)

  console.log(password)
  console.log(hashedPassword)

  //////returns a boolean if the password match or not
  const isMatch = await bcrypt.compare('Mstaa7188', hashedPassword)
  console.log(isMatch)

}

myFunction()