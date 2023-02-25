function getEvents(data, timeEvents = null) { // 'upcoming' , 'past'
	let eventsList = []

	for (let eventDetails of data.events.filter((event) =>
		timeEvents == "upcoming"
			? event.date > data.currentDate
			: timeEvents == "past"
				? event.date < data.currentDate
				: event.date == event.date
	)) {
		eventsList.push(eventDetails)
	}

	sortEvents(eventsList, "desc")

	return eventsList
}

function sortEvents(eventsList, order = "asc") {
	if (order == "asc") {
		eventsList.sort((a, b) => a.date > b.date ? 1 : 0)
	}
	else {
		eventsList.sort((a, b) => (a.date < b.date ? 1 : 0))
	}
	return eventsList
}

function getCard(eventDetails) {

	// Set Premiere Events
	let premiere = eventDetails.date > data.currentDate ? "¡COMING SOON!" : "&nbsp;"
	let premiereDate = eventDetails.date > data.currentDate ? "PREMIERE ON " + new Date(eventDetails.date).toLocaleDateString("en-US") : "SINCE " + new Date(eventDetails.date).toLocaleDateString("en-US")

	// Card Templates
	cardTemplate = `
		<!-- Card -->
		<div class="event-card col h-100">
			<div class="card shadow-sm">
				
				<div class="card-header text-center">${premiere}</div>

				<div class="img-card-container d-flex">
					<img class="object-fit-cover" src="${eventDetails.image}" alt="">
				</div>

				<h5 class="card-title bg-white bg-opacity-75 text-center">${eventDetails.name}</h5>
				<div class="card-body">
					<h6 class="card-subtitle small mb-4"><span class="text-muted">Category : </span><span class="strong">${eventDetails.category}</span></h6>
					<p class="card-text">${eventDetails.description}</p>
				
						<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<button type="button" class="btn btn-sm btn-outline-secondary" onclick="location.href='./details.html?id=${eventDetails._id}'">View event >></button>
						</div>
						<small class="text-muted">$ ${eventDetails.price}</small>
					</div>
				</div>
				
				<div class="card-footer">
					<small class="text-muted">${premiereDate}</small>
				</div>
			</div>
		</div>
		<!-- end card -->
		`

	return cardTemplate
}

function insertCardsInDOM(containerID, data, timeEvents = null) {
	let container = document.getElementById(containerID)

	for (let eventDetails of getEvents(data, timeEvents)) {
		container.innerHTML += getCard(eventDetails)
	}

}