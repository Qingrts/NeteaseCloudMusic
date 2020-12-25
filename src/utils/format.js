exports.numberFormat = (num) => {
  if (num > 10000) {
    return parseInt(num / 10000) + "万"
  } else {
    return num;
  }
}