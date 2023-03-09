async function fetchApi() {
	let fetchResponse, data
	try{
    let urlApi = "https://mh-h0bh.onrender.com/api/amazing"; // https://mh-h0bh.onrender.com/api/amazing-events

    fetchResponse = await fetch(urlApi); // await only waits por data. The rest of code continues even without data received
    data = await fetchResponse.json(); // Decode raw data to JSON // DO NOT TRANSFORM

    data["events"] = data["response"];
    delete data["response"];

    data["events"].map((event) => {
      event["_id"] = event["id"];
      delete event["id"];
      return event;
    });

    return data;
  } catch (error) {
		console.log(error)
	}
}

// let data = fetchApi().then((response) => response).catch((error) => console.log(error))