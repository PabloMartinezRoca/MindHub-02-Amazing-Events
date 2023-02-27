function getEvents(data, timeEvents = null) {
  // 'upcoming' , 'past'
  let eventsList = [];

  for (let eventDetails of data.events.filter((event) =>
    timeEvents == "upcoming"
      ? event.date > data.currentDate
      : timeEvents == "past"
      ? event.date < data.currentDate
      : event.date == event.date
  )) {
    eventsList.push(eventDetails);
  }

  sortEvents(eventsList, "desc");

  return eventsList;
}

function sortEvents(eventsList, order = "asc") {
  if (order == "asc") {
    eventsList.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
  } else {
    eventsList.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }
}

function getCategoryList(eventsList) {
  let categoryEventsList = [];

  for (let category of eventsList) {
    if (!categoryEventsList.includes(category.category)) {
      categoryEventsList.push(category.category);
    }
  }

  sortCategories(categoryEventsList, "asc");

  return categoryEventsList;
}

function sortCategories(categoryEventsList, order = "asc") {
  if (order == "asc") {
    categoryEventsList.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  } else {
    categoryEventsList.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  }
  return categoryEventsList;
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
		<div class="event-card card shadow">
				
			<div class="card-header text-center">${premiere}</div>

			<div class="card-image-container">
				<img class="object-fit-cover" src="${eventDetails.image}" alt="">
			</div>

			<h5 class="event-title bg-white bg-opacity-90 mb-0 text-center">${eventDetails.name}</h5>

			<h6 class="event-category small mb-2"><span class="text-muted">Category : </span><span class="strong">${eventDetails.category}</span></h6>

			<div class="card-body d-flex flex-column justify-content-between">					
				<p class="event-description mb-4">${eventDetails.description}</p>
				
				<div>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<a href="#" onclick="location.href='./details.html?id=${eventDetails._id}'" class="btn btn-sm btn-outline-amazing"><span class="pe-2">View event</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#cc0066"  viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></a>							
						</div>
					
						<small class="event-price">Price $ ${eventDetails.price}</small>
					</div>
				</div>
			</div>
			
			<div class="card-footer">
				<p class="event-premiere">${premiereDate}</p>
			</div>
		</div>
		<!-- end card -->
		`;

  return cardTemplate;
}

function insertCardsInDOM(containerID, data, timeEvents = null) {
  let container = document.getElementById(containerID);

  let eventsList = getEvents(data, timeEvents);
  let categoryEventsList = getCategoryList(eventsList);

  for (let eventDetails of eventsList) {
    container.innerHTML += getCard(eventDetails);
  }

  insertFilterBar(categoryEventsList);
}

function insertFilterBar(categoryEventsList) {
  let filterBarContainer = document.getElementById("filter-bar-container");

  for (let category of categoryEventsList) {
    let filterBarTemplate = `
		<label class="filter-bar-item">
			<input name="categoryFilter" class="category-filter form-check-input flex-shrink-0 me-2" type="checkbox" value="${category}">
			<span>${category}</span>
		</label>
		`;

    filterBarContainer.innerHTML += filterBarTemplate;
  }
}

// Filter and Search bar functionality
function captureData() {
  let searchBarInput = document.getElementById("search-bar-input")
  let categoryFilters = document.querySelectorAll('.category-filter:checked')
  
  
  let data = {
    [searchBarInput.name]: searchBarInput.value,
    ['categoryFilters']: []
  };

  
  for(let each of categoryFilters) {
    data['categoryFilters'].push(each.value)
  }

  console.log(data)
}

const handleForm = (event) => {
  event.preventDefault()
  captureData()
};

// Executs when DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
  let searchBarButton = document.getElementById("search-bar-button");
  searchBarButton.addEventListener("click", handleForm);
})