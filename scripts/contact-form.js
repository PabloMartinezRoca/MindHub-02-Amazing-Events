function captureData() {
	let name = document.getElementById("name")
	let email = document.getElementById("email")
	let message = document.getElementById("message")
	
	let data = {
		[name.name]: name.value,
		[email.name]: email.value,
		[message.name]: message.value
	}

	console.log(data)
}

const handleForm = (event) => {
	event.preventDefault()
	captureData()
}

// Executs when DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
  let formButton = document.getElementById("form-button");
  formButton.addEventListener("click", handleForm);
})