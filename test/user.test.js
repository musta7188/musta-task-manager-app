const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const { replaceOne } = require('../src/models/user')


const userOneID = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneID,
  name: 'Mike',
  email: 'mike@email.com',
  password: 'testLogin',
  tokens: [{
    token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
  }]
}

///function that runs before each test and make sure that the user database is clear and add a new user to test the login in test
beforeEach(async() =>{

await User.deleteMany()
await new User(userOne).save()

})


test('Should sign up a new user', async () =>{

 const response =  await request(app).post('/users').send({
    name: 'Andrew',
    email: 'andrew@email.com',
    password: 'number123'
  }).expect(201)


  ///Assert that the database was changed correctly
  const user = await User.findOne({_id: response.body.user._id,"tokens.token": response.body.token});

  expect(user).not.toBeNull()
  
  ///Assertion about the response body containing the name 

  // expect(response.body.user.name).toBe('Andrew')
  expect(response.body).toMatchObject({
    user: {
      name: "Andrew",
      email: 'andrew@email.com',
    },
    token: user.tokens[0].token
  })

  expect(user.password).not.toBe('number123')
})


test('Should login existing user', async () =>{
 const response =  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password

  }).expect(200)

  const user = await User.findOne({_id: response.body.user._id,"tokens.token": response.body.token});

  expect(response.body.token).toBe(user.tokens[1].token)


})



test('Should fail with bad credential are provided', async () =>{

  await request(app).post('/users/login').send({
    email: userOne.email,
    password: "wrongPassword"
  }).expect(400)

})

const AuthToken = `Bearer ${userOne.tokens[0].token}`

test('Should get profile for user', async () =>{
  await request(app)
  .get('/users/me')
  .set('Authorization', AuthToken)
  .send()
  .expect(200)
})


test('Should delete account for user', async () =>{

  await request(app)
  .delete('/users/me')
  .set('Authorization',AuthToken)
  .send()
  .expect(200)

})

test('Should not delete the account for unauthorized users', async () =>{

  await request(app)
  .delete('/users/me')
  .send()
  .expect(401)
})