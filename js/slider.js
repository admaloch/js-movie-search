//create slider of images with info on request -- ombd requires two seperate searches to get more than 10 results
searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    let inputValue = searchForm.elements.query.value;
    const URL = `https://omdbapi.com/?s=${inputValue}&page=1${api_key}${resultType}`;
    const res = await fetch(`${URL}`);
    const mainResults = await res.json();
    const URL2 = `https://omdbapi.com/?s=${inputValue}&page=2${api_key}${resultType}`;
    const res2 = await fetch(`${URL2}`);
    const page2Results = await res2.json();
    onSubmit(mainResults, page2Results)
    formHandler(inputValue)
});

const formHandler = (inputValue) => {
    const searchForm = document.querySelector('#searchForm');
    const changingText = document.querySelector('.changing-word');
    searchForm.elements.query.value = '';
    changingText.innerText = ' ' + inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    changingText.style.color = randomColorGen();
}


function onSubmit(mainResults, page2Results) {
    const noResultsText = document.querySelector('.no-results-text');
    if (mainResults.Response == "True") {
        if (page2Results.Response === "True") {
            Array.prototype.push.apply(mainResults.Search, page2Results.Search);
        }
        fade(searchList, 0, 'none')
        searchElement.style.margin = '0 0 0 0'
        fade(noResults, 0, 'none')
        fade(headerInfo, 1)
        arrow.forEach(arr => fade(arr, 1))
        fade(sliderContainer, 1, 'flex')
        const apiResults = mainResults.Search
        displaySliderItems(apiResults);
    } else {
        mainResults.length === 0
            ? noResultsText.innerHTML = `It looks like you forgot to enter a search term. Try searching for a specific topic${errorChange.innerText}`
            : noResultsText.innerHTML = `We couldn't find anything for that. Try searching for a specific topic${errorChange.innerText} to get better results.`
        fade(headerInfo, 0)
        arrow.forEach(arr => fade(arr, 0))
        fade(sliderContainer, 0, 'none')
        fade(noResults, 1, 'flex')
    }
}

// add search results to page as slider on submit
const displaySliderItems = (apiResults) => {
    slider.innerHTML = ''
    for (let i = 0; i < apiResults.length; i++) {
        let movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')
        apiResults[i].Poster != "N/A" ? imageMovie = apiResults[i].Poster
            : imageMovie = "image_not_found.png"
        movieContainer.innerHTML = `<img src="${imageMovie}" alt="movie image">`
        movieContainer.dataset.id = apiResults[i].imdbID;
        slider.appendChild(movieContainer)
        loadSliderDetails(movieContainer)
    }
}

// grab imbd ID of each movie and send another request for more info
function loadSliderDetails(movieContainer) {
    movieContainer.addEventListener('mouseenter', async (e) => {
        e.stopPropagation()
        arrow.forEach(arr => fade(arr, 0))
        const movieId = movieContainer.dataset.id;
        const result = await fetch(`https://www.omdbapi.com/?i=${movieId}${api_key}${resultType}&plot=full`)
        const movieInfo = await result.json();
        displaySliderDetails(movieInfo, movieContainer)
    });
    movieContainer.addEventListener('mouseleave', () => {
        arrow.forEach(arr => fade(arr, 1))
        removeItems()
    })
}



// display details for each slider
const displaySliderDetails = (input, item) => {
    // add movie container items that appear on hover
    const infoContainer = document.createElement('div')
    appendItem(infoContainer, '', item, 'info-container')
    const title = document.createElement('h3')
    appendItem(title, input.Title, infoContainer, 'movie-title')
    titleLengthTest(title)
    const directed = document.createElement('h4')
    appendItem(directed, `Directed by: ${input.Director}`, infoContainer)
    const released = document.createElement('h4')
    appendItem(released, `Released: ${input.Released.split(' ').pop()}`, infoContainer)
    const rating = document.createElement('h4')
    appendItem(rating, `Rated: ${input.Rated}`, infoContainer)
    const media = document.createElement('h4')
    const mediaText = `Type: ${input.Type.charAt(0).toUpperCase() + input.Type.slice(1)} `
    appendItem(media, mediaText, infoContainer)
    const score = document.createElement('h4')
    let scores = '';
    !input.Ratings[1] ? scores = `Imdb score: ${input.imdbRating}`
        : scores = `Rotten Tomatoes Score: ${input.Ratings[1].Value}`;
    appendItem(score, scores, infoContainer)
    //overview btn-- reveal movie synopsus
    const bioOpen = document.createElement('div')
    appendItem(bioOpen, 'Overview', infoContainer, 'hover-btn')
    //more btn click for modal info
    const moreBtn = document.createElement('div')
    appendItem(moreBtn, 'More Information', infoContainer, 'hover-btn')
    // movie synopsus create overlay with text
    const bioOverlay = document.createElement('div')
    appendItem(bioOverlay, '', item, 'bio-overlay')
    const bioTitle = document.createElement('h4')
    appendItem(bioTitle, 'Overview', bioOverlay)
    const bioText = document.createElement('p')
    appendItem(bioText, input.Plot, bioOverlay)
    // close synopsus overlay
    const bioClose = document.createElement('div')
    appendItem(bioClose, '', bioOverlay, 'close-bio-text')
    bioListeners(bioOverlay, bioOpen, bioClose, item)
    bioClick(input, moreBtn)
}

// delete previous results when new search is submitted
const deleteImg = button.addEventListener('click', () => {
    while (slider.firstChild) slider.removeChild(slider.lastChild)
})

// slider arrow  click listener.. 
document.addEventListener('click', e => {
    let handle
    if (e.target.matches('.handle')) {
        handle = e.target;
    } else {
        handle = e.target.closest('.handle');
    } if (handle != null) {
        onHandleClick(handle)
    }
})

// handler function.. capture slider index and change value to determine movement
function onHandleClick(handle) {
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
    if (handle.classList.contains('left-handle')) {
        slider.style.setProperty('--slider-index', sliderIndex - 1)
    } if (handle.classList.contains('right-handle')) {
        slider.style.setProperty('--slider-index', sliderIndex + 1)
    }
}


//alt inner html can't get to work
// const displaySliderDetails = (input, item) => {

//     let scores = '';
//     !input.Ratings[1]
//         ? scores = `Imdb score: ${input.imdbRating}`
//         : scores = `Rotten Tomatoes Score: ${input.Ratings[1].Value}`;

//     item.innerHTML = `
//         <div class="info-container">
//             <h3 class="movie-title">${input.Title}</h3>
//             <h4>Directed by: ${input.Director}</h4>
//             <h4>Released: ${input.Released.split(' ').pop()}</h4>
//             <h4>Rated: ${input.Rated}</h4>
//             <h4>Type:  ${input.Type.charAt(0).toUpperCase() + input.Type.slice(1)} </h4>
//             <h4>Rotten Tomatoes Score: ${scores}</h4>
//             <div class="hover-btn">Overview</div>
//             <div class="hover-btn">More Information</div>
//         </div>
//         <div class="bio-overlay">
//             <h4>Overview</h4>
//             <p>${input.Plot}</p>
//             <div class="close-bio-text">
//             </div>
//         </div>
//     `
//     const bioOpen = document.createElement('div')
//     const bioOverlay = document.createElement('div')
//     const bioClose = document.createElement('div')
//     const moreBtn = document.createElement('div')
//     bioListeners(bioOverlay, bioOpen, bioClose, item)
//     bioClick(input, moreBtn)

// }