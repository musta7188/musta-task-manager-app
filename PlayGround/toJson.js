


const pet = {
  name: "Hal"
}

/// toJSON allow to modify the behaviour when you stringify the object and return whatever you want to be returned even an empty string 

pet.toJSON  = function () {

return {}

}

////if we run console.log we wont get anything bc the toJSON modify the return value 
console.log(JSON.stringify(pet))