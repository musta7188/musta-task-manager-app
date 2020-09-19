const {
  calculateTips,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add

} = require('../src/math')


test('should calculate total with tips', () =>{

  const total  = calculateTips(10, 0.30) 

  expect(total).toBe(13)
  

})

test('should calculate total with default tips', () =>{
  const total = calculateTips(10)
  expect(total).toBe(12.5)
})


test('convert fahrenheit 32 to celsius 0', () =>{
  const temperature  = fahrenheitToCelsius(32)
  expect(temperature).toBe(0)
})


test('convert Celsius 0 to be Fahrenheit 32 ', () =>{
  const temperature = celsiusToFahrenheit(0)

  expect(temperature).toBe(32)
})

///done will wait the Async operation to run before testing it
test(' Should add  two numbers', (done) =>{

  add(2,3).then((sum) =>{

    expect(sum).toBe(5)
    done()
  })

})

///transforming the function in a async function we dont need to use await
test('Should add two numbers async/await', async () =>{

  const sum = await add(10, 22)
  expect(sum).toBe(32)

})


//  why test?

// --save time 
// --create reliable software
// --gives flexibility to develop
//     -refactoring 
//     -Collaborating
//     -Profiling
// --Peace of mind


