document.addEventListener('DOMContentLoaded', (e) => {
    console.log('document ready');

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
    .then(eventData =>    {
        document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)      
         })
    }
    // conditional for state only criteria
    else if (searchCity == "" && searchState != "" && searchKeyword == "") {
        const urlEncodedSearchString = encodeURIComponent(searchState)
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?stateCode=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
    .then(response => response.json())
    .then(eventData =>    {
        document.getElementById('results-box').innerHTML = renderResults(eventData._embedded.events)
        console.log(eventData)      
    })
    }
    // conditional for keyword only
    else if (searchCity == "" && searchState == "" && searchKeyword != "") {
        const urlEncodedSearchString = encodeURIComponent(searchKeyword)        
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${urlEncodedSearchString}&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE`)
    .then(response => response.json())
    .then(eventData =>    {
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
    .then(eventData =>    {
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
    .then(eventData =>    {
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
    .then(eventData =>    {
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
    .then(eventData =>    {
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
        return `<div class="col-12 col-md-6">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${currentResult.images[1].url}
                        class="img-fluid rounded-start"  alt="No Image Available">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${currentResult.name}</h5>
                        <p class="card-text">Date: ${currentResult.dates.start.localDate}<br> Time: ${currentResult.dates.start.localTime}</p>
                        <p class="card-text"><small class="text-muted">Last updated:<br>${lastUpdated}</small></p>
                        <a class="btn btn-primary" href=${currentResult.url} role="button">Buy Tickets</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    })
    return resultsHtmlArray.join('');
}