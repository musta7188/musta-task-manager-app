


const fizzBuzz = (number) => {
  for(let i = 1; i<= number; i++){
    if(i%3 == 0 && i%5 == 0){
      console.log('fizzBuzz')
    } if (i%3 == 0){
      console.log('fizz')
    } if (i%5 == 0){
      console.log('buzz')
    } else {
      console.log(i)
    }
  }

}

fizzBuzz(100)


const commonDiv = (x, y) => {
  let min = Math.max(x, y)
  let max = min === x ? y : x;


if(max % min === 0) {
  return min
} else {
  let mid = Math.floor(max / 2)
  let _divisor = []
  for(let i = mid; i > 0; i--){
    if(max%i===0 && min%i ===0){
      return i
    }
  }
  return _divisor
}

}

console.log(commonDiv(15, 5))