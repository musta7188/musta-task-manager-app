const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')

const {userOneID, userOne, setUpDataBase, taskOne, userTwo} = require('./fixtures/db')
const { response } = require('express')

beforeEach(setUpDataBase)

const AuthToken = `Bearer ${userOne.tokens[0].token}`

test('Should create a task', async () =>{

 const response =  await request(app)
  .post('/tasks')
  .set('Authorization', AuthToken)
  .send({
    description: "test create task"
  }).expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(response.body.completed).toEqual(false)
})

test('Should return the tasks from a given user', async () =>{
 const response =  await request(app)
  .get('/tasks')
  .set('Authorization', AuthToken)
  .send()
  .expect(201)


  expect(response.body.length).toEqual(2)


})

test("Should not be able to delete task unauthorized user", async () =>{

  await request(app)
  .delete(`/tasks/${taskOne._id}`)
  .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
  .send()
  .expect(404)


  const task = Task.findById(taskOne._id)

  
  expect(task).not.toBeNull()

})