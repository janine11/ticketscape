
document.addEventListener("DOMContentLoaded", function () {
  // code here will execute after the document is loaded
  let favListJSON = localStorage.getItem('favList');
  let favList = JSON.parse(favListJSON)
  console.log(favList)
  // document.getElementById('event-container').innerHTML = renderEvents(favList);

  // const parsedData = JSON.parse(localStorage.getItem("event"));
  // const eventsContainer = document.querySelector(".event-container");
  // const renderEventsData = renderEvents(parsedData); 
  // console.log(renderEventsData)
  // eventsContainer.innerHTML = renderEventsData;
  // document.addEventListener("click", function (e) {
    // code for document click listener goes here
    // if (e.target.classList.contains("remove-button")) {
    //   e.preventDefault()
    //   const eventID = e.target.dataset.eventId;

    //   removeFromFavorites(eventID);
    // }
  // });
});
const lastUpdated = document.lastModified;
function renderEvents(eventArray) {
  const eventHtmlArray = eventArray.map(currentResult => {
    
     if (currentResult != null) {
      
    
    return `
    <div class="col-12 col-md-6">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${currentResult.images[1].url}
                        class="img-fluid rounded-start" alt="...">
                </div>  

                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${currentResult.name}</h5>
                            <h6 class="card-date-time">${currentResult.dates.start.localDate}<br> Time: ${currentResult.dates.start.localTime}</h6>
                            <h6 class="card-location-venue">${currentResult._embedded.venues[0].city.name} @ ${currentResult._embedded.venues[0].name}</h6>
                            <p class="card-last-update"><small class="text-muted">Last updated:<br>${lastUpdated}</small></p>
                            

                    <div class="row">
                        <div class="col mb-2 ml-2 buttons-event-heart">
                            <button type="button" class="remove-button btn btn-primary" data-event-id="${currentResult.id}">Remove</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
   }
  });
  return eventHtmlArray.join("");
}


function removeFromFavorites(id) {
  
  const favorite = eventDataObject._embedded.events.find((currentEvent) => {
    return currentEvent == id

  });
  let favListJSON = localStorage.getItem('event');
  let favList = JSON.parse(favListJSON);
  if (favList == null) {
    favList = [];
  }
  favList.splice(favList.indexOf(favorite))

  favListJSON = JSON.stringify(favList);
  localStorage.setItem('event', favListJSON);
}

