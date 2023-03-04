function getEventIdFromURL() {
	const params = new URLSearchParams(window.location.search)

	if (params.get("id") === null) {
    window.location.href = "index.html";
  } else {
    return params.get("id");
  }
}

function getEventDetails(data, eventID) {
	if (data.events.find((event) => event._id == eventID)) 
	{
		return data.events.find((event) => event._id == eventID);
	}
	window.location.href = "index.html"
}

function getCard(eventDetails) {
  
	// Set Premiere Events
	if(eventDetails.date > data.currentDate)
	{
		eventDetails.premiere = "¡COMING SOON!"
		
		let days = new Date(eventDetails.date).getTime() - new Date(data.currentDate).getTime() 
		days = days / (1000 * 60 * 60 * 24)
		
		eventDetails.premiereDate = "PREMIERE ON " + new Date(eventDetails.date).toLocaleDateString("en-US") + " • " + days + (days > 1 ? " DAYS" : " DAY") + " LEFT"
  }
	else
	{
		eventDetails.premiereDate = "SINCE " + new Date(eventDetails.date).toLocaleDateString("en-US")
	}

  
  return defineCardDetails(eventDetails)
}

function insertCardDetailsInDOM(containerID, eventDetails) {
	let container = document.getElementById(containerID);
  container.innerHTML = getCard(eventDetails);

	// Configure Back button
  document.getElementById("go-back").addEventListener("click", () => { history.back() });
}

function insertBackgroundContainer(containerID, eventDetails) {
  let container = document.getElementById(containerID);
  container.src = `${eventDetails.image}`;
}

// Executs when DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {

	// Get the event ID or redirect to index page if null
	let eventID = getEventIdFromURL()

	// Get the event details
	let eventDetails = getEventDetails(data, eventID)

	// Insert Card Details object in DOM
	insertCardDetailsInDOM("event-details-card-container", eventDetails);

	// Insert background image for card details
	insertBackgroundContainer("bg-event-details-card", eventDetails);
})
