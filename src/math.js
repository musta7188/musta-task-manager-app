const calculateTips = (total, percentageTip) =>{
  const tips = total * percentageTip
  return total + tips
}



module.exports = {
  calculateTips,
}