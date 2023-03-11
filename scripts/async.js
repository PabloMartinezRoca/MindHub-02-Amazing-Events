function fetchApiEvents(time = null) {
	
	let urlApi = "https://mh.up.railway.app/api/amazing-events";

	if (time == "upcoming") {
    urlApi += "?time=upcoming"
  } else if (time == "past") {
    urlApi += "?time=past"
  } 
	return urlApi
}

function fetchApiEventDetails(eventId) {
  let urlApi = "https://mh-h0bh.onrender.com/api/amazing-events/" + eventId;
  
	return urlApi
}

async function fetchApi(urlApi) {
  let fetchResponse, data;
  try {
    fetchResponse = await fetch(urlApi); // await only waits por data. The rest of code continues even without data received
    data = await fetchResponse.json(); // Decode raw data to JSON // DO NOT TRANSFORM

    /*
		Example of key rename 
    data["events"] = data["response"];
    delete data["response"];
		 */
    
    return data;
  } catch (error) {
    console.log(error);
  }
}

// let data = fetchApi().then((response) => response).catch((error) => console.log(error))
