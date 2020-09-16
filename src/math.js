const calculateTips = (total, percentageTip = .25) =>{ return total + (total * percentageTip)
}

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
  return (temp * 1.8) + 32
}






module.exports = {
  calculateTips,
  fahrenheitToCelsius,
  celsiusToFahrenheit
}

