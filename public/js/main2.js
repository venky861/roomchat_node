console.log("testing")

const socket = io()

const forminput = document.getElementById("chat")

forminput.addEventListener("submit", e => {
  const errors = []
  const input = document.getElementById("username").value
  if (input.length < 4) {
    errors.push("length should be greater than 4 characters")
  }

  if (input === "" || input == null) {
    errors.push("field should not be empty")
  }

  if (errors.length > 0) {
    event.preventDefault()
    console.log(errors)
  }
})
