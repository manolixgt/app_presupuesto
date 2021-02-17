function setQuincena() {
  var value = document.getElementById('quincena').value
  sessionStorage.setItem('user_quincena', value)
}
function getQuincena() {
  if (sessionStorage.getItem('user_quincena') === null) {
    // Check if there is selected date.
    return ''
  }
  return sessionStorage.getItem('user_quincena')
}
