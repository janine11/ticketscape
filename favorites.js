localStorage.getItem('favorites');

const parsedData = JSON.parse(localStorage.getItem("favorites"));
document.addEventListener("DOMContentLoaded", function () {
  // code here will execute after the document is loaded
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

function renderMovies(eventArray) {
  const movieHtmlArray = eventArray.map(function (currentEvent) {
    return `<div class="col-sm">
    <div class="card" style="width: 18rem;">
      <img src="${currentEvent.Poster}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-title">${currentEvent.Title}</hp>
        <p class="card-text">Released: ${currentEvent.Date}</p>
        <a href="#" class="btn btn-primary remove-button" data-imdbid="${currentEvent.eventID}">Remove</a>
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

