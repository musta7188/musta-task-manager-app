const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')


const userOne = {
  name: 'Mike',
  email: 'mike@email.com',
  password: 'testLogin'
}

///function that runs before each test and make sure that the user database is clear
beforeEach( async() =>{

await User.deleteMany()
await new User(userOne).save()

})


test('Should sign up a new user', async () =>{

  await request(app).post('/users').send({
    name: 'Andrew',
    email: 'andrew@email.com',
    password: 'number123'
  }).expect(201)

})


test('Should login existing user', async () =>{
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password

  }).expect(200)
})



test('Should fail with bad credential are provided', async () =>{

  await request(app).post('/users/login').send({
    email: userOne.email,
    password: "wrongPassword"
  }).expect(400)

})


// afterEach(() =>{
//   console.log('afterEach')
// })

