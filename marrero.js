const form = document.getElementById('search-form')
form.addEventListener('click', (e) => {
    e.preventDefault()


})

const search = document.getElementById('search-bar')
fetch('https://app.ticketmaster.com/discovery/v2/events.json?&apikey=TB1crWfpFo6usraxXEiFhOrljk8GgugE')
.then(response => response.json())
.then(eventData =>    {
document.getElementById('results-box').innerHTML = renderResults()
console.log(eventData)
    
    
})
function renderResults() {
    return `<div class="col-12 col-md-6">
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">${eventData._embedded.events[0].name}.
                    </p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>`
}