
document.addEventListener("DOMContentLoaded", function () {
  // code here will execute after the document is loaded
  const parsedData = JSON.parse(localStorage.getItem("event"));
  const eventsContainer = document.querySelector(".event-container");
  const renderEventsData = renderEvents(parsedData);
  eventsContainer.innerHTML = renderEventsData;
  document.addEventListener("click", function (e) {
    // code for document click listener goes here
    if (e.target.classList.contains("remove-button")) {
      const eventID = e.target.dataset.eventid;
      removeFromWatchlist(eventID);
    }
  });
});
const lastUpdated = document.lastModified;
function renderEvents(eventArray) {
  const eventHtmlArray = eventArray.map(currentResult => {
    return `
    <div>    
    <div class="row">
        <div class="col-12 results">
            <div class="row" id="results-box">
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
                                    <h6 class="card-location-venue">${currentResult._embedded.venues[0].name}</h6>
                                    <p class="card-last-update"><small class="text-muted">Last updated:<br>${lastUpdated}</small></p>
                                </div>
                                <div class="row">
                                    <div class="col mb-2 ml-2 buttons-event-heart">
                                        <button type="button" class="btn btn-primary" href=${currentResult.url}>Buy Tickets</button>
                                        <a  style="border-color: white; background-color: white; outline: none;"><svg data-event-id=${currentResult.id} class="add-event" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                            fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16"
                                            justify-content-right>
                                            <path fill-rule="evenodd"
                                                d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                            <path
                                                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                        </svg></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>`;
  });
  return eventHtmlArray.join("");
}

function removeFromFavorites(id) {
  newList = [];
  parsedData.filter(function (currentEvent) {
    if (currentEvent.eventID != id) {
      newList.push(currentEvent);
    }
  });
  localStorage.setItem("favorites", JSON.stringify(newList));
  location.reload();
}

