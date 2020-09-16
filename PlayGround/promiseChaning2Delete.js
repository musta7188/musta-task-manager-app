
require('../src/db/mongoos')

const Task = require('../src/models/task')


// Task.findByIdAndDelete("5f492ae24357360dec21f02e").then((task) =>{
//   console.log(task)
//   return Task.countDocuments({completed: false})

// }).then((result) =>{
//   console.log(result)
// }).catch((e) =>{
//   console.log(e)
// })


///same function as the above one implemented using async function
const deleteTaskAndCount = async (id) =>{

  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({completed: false})

  return count

}


deleteTaskAndCount('5f4bc07092415437de32e152').then((result) => {
  console.log(result)
}).catch((e) =>{
  console.log(e)
})