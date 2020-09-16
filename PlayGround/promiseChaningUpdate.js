
require('../src/db/mongoos')

const User = require('../src/models/user')

// 5f4932afe864740fada182a9

///find the user with that id and update the age to 1
// User.findByIdAndUpdate('5f4932afe864740fada182a9', { age: 1}).then((user) =>{
//   console.log(user)
// ///return the count of all the user with the age of 1
//   return User.countDocuments({age: 1})
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })



////how to implement the same function above but with the async function

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {age})
  const count = await User.countDocuments({age})

  return  count 

}

updateAgeAndCount('5f4932afe864740fada182a9', 100).then((count) => {
  console.log(count)

}).catch((e) => {
  console.log(e)
})