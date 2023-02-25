function getEventDetails(data, eventID = null) {
	if (eventID === null) {
		window.location.href = "index.html"
	} else {
		return data.events.filter((event) => event._id == eventID)[0]
	}
}

function getCard(eventDetails) {
	// Set Premiere Events
	let premiere =
		eventDetails.date > data.currentDate ? "¡COMING SOON!" : "&nbsp;"
	let premiereDate =
		eventDetails.date > data.currentDate
			? "PREMIERE ON " + new Date(eventDetails.date).toLocaleDateString("en-US")
			: "SINCE " + new Date(eventDetails.date).toLocaleDateString("en-US")

	// Card Templates
	cardTemplate = `
		<!-- Card -->
		<div class="card mb-3">
			<div class="card-header text-center">${premiere}</div>
			<div class="card-body">
				<div class="row g-0">
					<div class="d-flex align-items-center col-md-4">
						<img src="${eventDetails.image}" class="img-fluid rounded m-3" alt="Event Image">
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title text-center">${eventDetails.name}</h5>
							<h6 class="card-subtitle small mb-4"><span class="text-muted">Category : </span><span class="strong">${eventDetails.category}</span></h6>
							<p class="card-text">${eventDetails.description}</p>
						</div>
					</div>
				</div>
				<div class="d-flex m-3 justify-content-center">
				<small class="text-muted">$ ${eventDetails.price}</small>
					<button type="button" class="btn btn-sm btn-outline-secondary" onclick="history.back()">Back</button>
				</div>
			</div>
			<div class="card-footer">
				<small class="text-muted">${premiereDate}</small>
			</div>
		</div>
		<!-- end card -->
		`

	return cardTemplate;
}

function insertCardDetailsInDOM(containerID, data, eventID) {
	let container = document.getElementById(containerID)

	let eventDetails = getEventDetails(data, eventID)
	container.innerHTML = getCard(eventDetails)
}

function insertBackgroundContainer(containerID, data, eventID) {
	let container = document.getElementById(containerID)

	let eventDetails = getEventDetails(data, eventID)
	container.style.backgroundImage = `url("${eventDetails.image}")`
}
