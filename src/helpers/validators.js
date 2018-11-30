const email = email => {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}
const phone = phone => {
  var regex = /^([0-9]{10})$/

  const value = phone.replace(/\s/g, '')
  return regex.test(value)
}
const validators = { email, phone }
export default validators
