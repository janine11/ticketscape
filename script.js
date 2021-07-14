document.addEventListener('DOMContentLoaded', (e) => {
    console.log('document ready');

    document.addEventListener('click', (e) => {
        // will need to add a class to each button called add button  
        if (e.target.classList.contains("add-event")) {
            e.preventDefault();
            let eventID = e.target.dataset.eventId
            saveToFavorites(eventID)
        }
    })

})
// store information regarding the last time the results were updated.
const lastUpdated = document.lastModified;



// create a listener for the search bar that will take any combination of
// input and produce the proper results in card format on the page
const myForm = document.getElementById('search-form');
myForm.addEventListener(('submit'), (e) => {

    e.preventDefault();
    // store the values of each search criteria in its own variable
    const searchCity = document.getElementById('search-bar-city').value
    const searchState = document.getElementById('search-bar-state').value
    const searchKeyword = document.getElementById('search-bar-keyword').value
    // conditional for only city criteria

    if (searchCity != "" && searchState == "" && searchKeyword == "") {
        const urlEncodedSearchString = encodeURIComponent(searchCity)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
            .then(response => response.json())
            .then(eventData => {
                document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
            })
    }
    // conditional for state only criteria
    else if (searchCity == "" && searchState != "" && searchKeyword == "") {
        const urlEncodedSearchString = encodeURIComponent(searchState)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?stateCode=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
            .then(response => response.json())
            .then(eventData => {
                document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
                console.log(eventData)
            })
    }
    // conditional for keyword only
    else if (searchCity == "" && searchState == "" && searchKeyword != "") {
        const urlEncodedSearchString = encodeURIComponent(searchKeyword)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
            .then(response => response.json())
            .then(eventData => {
                if (eventData.page.totalPages == 0) {
                    document.getElementById('results-box').innerHTML = "There are no results matching your criteria"
                }
                else {
                    document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
                }
            })
    }
    // conditional for city and state criteria only
    else if (searchCity != "" && searchState != "" && searchKeyword == "") {
        const urlEncodedSearchString = encodeURIComponent(searchState)
        const urlEncodedSearchString2 = encodeURIComponent(searchCity)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${urlEncodedSearchString2}&stateCode=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
            .then(response => response.json())
            .then(eventData => {
                document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
                console.log(eventData)
            })
    }
    // conditional for city and keyword only
    else if (searchCity != "" && searchState == "" && searchKeyword != "") {
        const urlEncodedSearchString = encodeURIComponent(searchCity)
        const urlEncodedSearchString2 = encodeURIComponent(searchKeyword)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${urlEncodedSearchString2}&city=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
            .then(response => response.json())
            .then(eventData => {
                document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
                console.log(eventData)
            })
    }
    // conditional for state and keyword only
    else if (searchCity == "" && searchState != "" && searchKeyword != "") {
        const urlEncodedSearchString = encodeURIComponent(searchState)
        const urlEncodedSearchString2 = encodeURIComponent(searchKeyword)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${urlEncodedSearchString2}&stateCode=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
            .then(response => response.json())
            .then(eventData => {
                document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
                console.log(eventData)
            })
    }
    // conditional for all three criteria
    else if (searchCity != "" && searchState != "" && searchKeyword != "") {
        const urlEncodedSearchString = encodeURIComponent(searchState)
        const urlEncodedSearchString2 = encodeURIComponent(searchCity)
        const urlEncodedSearchString3 = encodeURIComponent(searchKeyword)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${urlEncodedSearchString2}&stateCode=${urlEncodedSearchString}&keyword=${urlEncodedSearchString3}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
            .then(response => response.json())
            .then(eventData => {
                document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
                console.log(eventData)
            })
    }



})



// create a function that will take the array of results and make a new card
// for each result to include certain information about the event
function renderResults(resultsArray) {
    const resultsHtmlArray = resultsArray.map((currentResult) => {
        console.log(currentResult)
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
                                <h6 class="card-location-venue">${currentResult._embedded.venues[0].name}</h6>
                                <p class="card-last-update"><small class="text-muted">Last updated:<br>${lastUpdated}</small></p>
                            </div>
                            <div class="row">
                                <div class="col mb-2 ml-2 buttons-event-heart">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#details-${currentResult.id}">Event Details</button>
                                    <a data-event-id="${currentResult.id}" style="border-color: white; background-color: white; outline: none;"><svg class="add-event" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
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
            <div class="modal fade" id="details-${currentResult.id}" tabindex="-1" aria-labelledby="details-${currentResult.id}-label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="details-${currentResult.id}-label">${currentResult.name}</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16"
                                justify-content-right>
                                <path fill-rule="evenodd"
                                    d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                <path
                                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                            </svg>                      
                        </div>
                        <div class="modal-body">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                                        class="img-fluid rounded-start" alt="...">
                                    <img src="https://images.pexels.com/photos/7009479/pexels-photo-7009479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                                        class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Better Than Ezra</h5>
                                        <h6 class="card-date-time">January 6, 2021 - 7:30pm</h6>
                                        <h6 class="card-location-venue">Atlanta, GA @ State Farm Arena</h6>
                                        <p class="card-ticketprice">$0-360</p>
                                        <p class="card-last-update"><small class="text-muted">Last updated 3 mins
                                                ago</small></p>
                                    </div>
                                    <div class="row">
                                        <div class="col mb-2 ml-2 buttons-event-heart">               
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="map"> 
                            MAP goes here
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="" class="btn btn-primary">Buy Tickets</a>
                        </div>
                    </div>
                </div>
            </div>
            `


    })
    return resultsHtmlArray.join('');
}

const music = document.getElementById('pills-music-tab')
music.addEventListener('click', (e) => {

    e.preventDefault()
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
        .then(response => response.json())
        .then(eventData => {
            document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
        })
})
const sports = document.getElementById('pills-sport-tab')
sports.addEventListener('click', (e) => {

    e.preventDefault()
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sports&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
        .then(response => response.json())
        .then(eventData => {
            document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
        })
})
const artTheatre = document.getElementById('pills-artTheatre-tab')
artTheatre.addEventListener('click', (e) => {

    e.preventDefault()
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=arts&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
        .then(response => response.json())
        .then(eventData => {
            document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
        })
})
const family = document.getElementById('pills-family-tab')
family.addEventListener('click', (e) => {

    e.preventDefault()
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=family&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
        .then(response => response.json())
        .then(eventData => {
            document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
        })
})


function saveToFavorites(eventID) {
    const movie = eventData.find((currentEvent) => {
        return currentevent.imdbID == movieID

    });
    let eventJSON = localStorage.getItem('event');
    let event = JSON.parse(eventJSON);
    if (event == null) {
        event = [];
    }
    event.push(movie)
    eventJSON = JSON.stringify(event);
    localStorage.setItem('event', eventJSON);

}
