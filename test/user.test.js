const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneID, userOne, setUpDataBase} = require('./fixtures/db')

///function that runs before each test and make sure that the user database is clear and add a new user to test the login in test
beforeEach(setUpDataBase)


test('Should sign up a new user', async () =>{

 const response =  await request(app).post('/users').send({
    name: 'Andrew',
    email: 'andrew@email.com',
    password: 'number123'
  }).expect(201)


  ///Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)

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

  const user = await User.findById(userOneID)

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

  const response  =  await request(app)
  .delete('/users/me')
  .set('Authorization',AuthToken)
  .send()
  .expect(200)


  const user = await User.findById(userOneID)

    expect(user).toBeNull()

})

test('Should not delete the account for unauthorized users', async () =>{

  await request(app)
  .delete('/users/me')
  .send()
  .expect(401)
})


test('Should upload avatar image', async () =>{

  await request(app)
  .post('/users/me/avatar')
  .set('Authorization', AuthToken)
  .attach('avatar','test/fixtures/profile-pic.jpg')

  const user = await User.findById(userOneID)


        ///toEqual is like toBe but can compare object while toBe cannot be used to compare objects
        //////expect.any(Buffer) checks if the image was saved as binary value
  expect(user.avatar).toEqual(expect.any(Buffer))


})

test('Should update valid user filed', async () =>{

 const response =  await request(app)
  .patch('/users/me')
  .set('Authorization', AuthToken)
  .send({
    name: "Change"
  }).expect(200)


  expect(response.body.name).not.toMatch(userOne.name)

  const user = await User.findById(userOneID)

  expect(response.body.name).toEqual(user.name)

})

test('Should not update invalid user filed', async () =>{
  await request(app)
  .patch('/users/me')
  .set('Authorization', AuthToken)
  .send({
    passportNumber: 121233
  }).expect(400)
})