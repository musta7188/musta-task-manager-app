const {
  calculateTips,
  fahrenheitToCelsius,
  celsiusToFahrenheit

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






//  why test?

// --save time 
// --create reliable software
// --gives flexibility to develop
//     -refactoring 
//     -Collaborating
//     -Profiling
// --Peace of mind


