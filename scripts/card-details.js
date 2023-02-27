function getEventDetails(data, eventID = null) {
  if (eventID === null) {
    window.location.href = "index.html";
  } else {
    return data.events.filter((event) => event._id == eventID)[0];
  }
}

function getCard(eventDetails) {
  
	// Set Premiere Events
	let premiere = ""
  let premiereDate = ""
	
	if(eventDetails.date > data.currentDate)
	{
		premiere = "¡COMING SOON!"
		
		let days = new Date(eventDetails.date).getTime() - new Date(data.currentDate).getTime() 
		days = days / (1000 * 60 * 60 * 24)
		
		premiereDate = "PREMIERE ON " + new Date(eventDetails.date).toLocaleDateString("en-US") + " • " + days + (days > 1 ? " DAYS" : " DAY") + " LEFT"
  }
	else
	{
		premiereDate = "SINCE " + new Date(eventDetails.date).toLocaleDateString("en-US")
	}

  // Card Templates
  cardTemplate = `
		<!-- Card -->
		<div class="event-details-card card shadow my-4">

			<div class="card-header text-center">${premiere}</div>

			<div class="card-body d-flex flex-column flex-sm-row flex-wrap flex-sm-nowrap">

				<div class="card-image-container d-flex col-sm-5">
					<img src="${eventDetails.image}" alt="Event Image">
				</div>
				
				<div class="card-info-container d-flex flex-column flex-wrap col-sm-7">

					<h5 class="event-title">${eventDetails.name}</h5>

					<div class="event-info">

						<div class="card-body d-flex flex-column justify-content-between">					
							<p class="event-description mb-4">${eventDetails.description}</p>
						</div>

						<small class="event-price">Price $ ${eventDetails.price}</small>

						
					</div>
				
					<h6 class="event-category"><span class="text-muted">Category : </span><span class="strong">${eventDetails.category}</span></h6>
				</div>
			
			</div>

			<div class="card-footer d-flex flex-column-reverse flex-sm-row justify-content-around align-items-center">
				<div>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group my-3 m-sm-0">
							<a id="go-back" class="btn btn-sm btn-outline-amazing"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#cc0066" viewBox="0 0 16 16"> <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" /></svg><span class="ps-2">Back</span></a>							
						</div>
					</div>
				</div>
				<p class="event-premiere">${premiereDate}</p>
			</div>			
		</div>
		<!-- end card -->
		`;
  return cardTemplate;
}

function insertCardDetailsInDOM(containerID, data, eventID) {
  let container = document.getElementById(containerID);

  let eventDetails = getEventDetails(data, eventID);
  container.innerHTML = getCard(eventDetails);

	document.getElementById("go-back").addEventListener("click", () => {
    history.back();
  });
}

function insertBackgroundContainer(containerID, data, eventID) {
  let container = document.getElementById(containerID);

  let eventDetails = getEventDetails(data, eventID);
  container.src = `${eventDetails.image}`;
}
