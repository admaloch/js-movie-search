// tmbd api key = 025781367a111a39acbfd9121bed34f28
// ex.requst = https://api.themoviedb.org/3/movie/550?api_key=025781367a111a39abfd9121bed34f28

// variables for api request
const api_key = '&apikey=84200d7a'
let resultType = '&type=movie'

// determine if the results are movies or shows
const movieBtn = document.querySelector('.movie-results')
const tvBtn = document.querySelector('.tv-results')
const allBtn = document.querySelector('.all-results')

// dropdown list api result
const searchForm = document.querySelector('#searchForm');
const searchList = document.getElementById('search-list');
const searchInput = document.getElementById('search-input');

// slider fill variables
let slider = document.querySelector('.slider');
let changingTitle = document.querySelector('.title-change');
let changingSubTitle = document.querySelector('.sub-title-change');
const changingText = document.querySelector('.changing-word');
const errorChange = document.getElementById('error-change');
const headerInfo = document.querySelector('.header-info');
const sliderContainer = document.querySelector('.slider-container');
const arrow = document.querySelectorAll('.handle');

const searchQueryText = document.querySelector('.changing-word');

const searchElement = document.querySelector('.search-element');
// searchElement.style.margin = '8rem 0 0 0'

const btns = document.querySelectorAll('.result-btn')

window.onload = function () {
    searchElement.style.margin = '8rem 0 0 0'
};

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        // change active class on button clickl
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        // fade out items

        fade(sliderContainer, 0, 'none')
        fade(headerInfo, 0)
        fade(arrow, 0)
        searchElement.style.margin = '8rem 0 0 0'
        // change result type variable
        changeResults(btns[i])
    });
}

function changeResults(input) {
    if (input.innerText === 'Movies') {
        resultType = '&type=movie'
        fade(noResults, 0, 'none')
        changingTitle.innerText = 'Movie'
        changingSubTitle.innerText = 'Movies'
        errorChange.innerText = ' or movie'
    }
    if (input.innerText === 'Tv') {
        resultType = '&type=series'
        fade(noResults, 0, 'none')
        changingTitle.innerText = 'TV Show'
        changingSubTitle.innerText = 'Tv shows'
        errorChange.innerText = ' or tv show'
    }
    if (input.innerText === 'Both') {
        resultType = '&type='
        fade(noResults, 0, 'none')
        changingTitle.innerText = 'Movie + TV Show'
        changingSubTitle.innerText = 'Movies and Tv shows'
        errorChange.innerText = ', movie or tv show'
    }
}



// submit handler.. capture input and send request to api and add images
// load movies from api
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1${api_key}${resultType}`;
    const res = await fetch(`${URL}`);
    const results = await res.json();
    if (results.Response == "True") displayMovieList(results.Search);
}

// captures value and determines if movielist shows up
function findMovies() {
    let searchTerm = (searchInput.value).trim();

    if (searchTerm.length > 0) {
        fade(searchList, 1, 'flex')
        searchList.scrollTop = 0
        loadMovies(searchTerm);
    } else {
        fade(searchList, 0, 'none')
    }
}

// add searchlist items
function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else
            moviePoster = "image_not_found.png";
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails()
    loadSliderDetails()
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item')
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id)
            fade(searchList, 0, 'none')
            searchInput.value = '';
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}${api_key}${resultType}&plot=full`)
            const movieDetails = await result.json();

            displayMovieDetails(movieDetails);
        })
    })
}

const modal = document.getElementById('modal');
function displayMovieDetails(details) {
    fade(modal, 1, 'flex')
    modal.innerHTML = `
<div class="overlay">
    <div class="result-container">
        <div class="movie-info-container">
            <div class="movie-poster">
                <img src="${(details.Poster != " N/A") ? details.Poster : "image_not_found.png"}"
                    alt="movie poster">
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${details.Title}</h3>
                <ul class="movie-misc-info">
                    <li class="year"> <span>Runtime:</span> ${details.Runtime}-</li>
                    <li class="rated"> <span>Rated:</span> ${details.Rated}-</li>
                    <li class="released"> <span>Released:</span> ${details.Released.split(' ').pop()}</li>
                </ul>
                <p class="genre"><span>Genre:</span> ${details.Genre}</p>
                <p class="writer"><span>Director:</span> ${details.Director}</p>
                <p class="actors"><span>Actors: </span>${details.Actors}</p>
                <p class="plot"><span>Plot:</span> ${details.Plot}</p>
                <p class="language"><span>Language:</span> ${details.Language}</p>
                <div class="modal-buttons">
                    <button class="modal-btn" id="btn-close">Close</button>
                    <a class="modal-btn" href="https://www.google.com/search?q=${details.Title}" target="_blank">
                    <div>Search</div>
                </a>

                </div>

            </div>
        </div>
    </div>
</div>       
    `;

    const btnClose = document.getElementById('btn-close');
    btnClose.addEventListener('click', () => {
        fade(modal, 0, 'none')
    })
}

window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        fade(searchList, 0, 'none')
    }
})

const noResults = document.querySelector('.no-results');
const noResultsText = document.querySelector('.no-results-text');

//SLIDER SECTION-------------------------------------------------
//slider results from general search keyword on submit
// submit handler.. capture input and send request to api and add images
searchForm.addEventListener('submit', async function (e) {


    e.preventDefault();
    fade(searchList, 0, 'none')


    let input = searchForm.elements.query.value;

    const URL = `https://omdbapi.com/?s=${input}&page=1${api_key}${resultType}`;
    const res = await fetch(`${URL}`);

    const newResults = await res.json();

    changingText.style.color = brightColorGen();
    changingText.innerText = ' ' + input.charAt(0).toUpperCase() + input.slice(1);
    searchForm.elements.query.value = '';


    if (newResults.Response == "True") {
        searchElement.style.margin = '0 0 0 0'

        fade(noResults, 0, 'none')
        fade(headerInfo, 1)
        arrow.forEach(arr => {
            fade(arr, 1)
        })

        fade(sliderContainer, 1, 'flex')
        displaySliderItems(newResults.Search);

    } else {
        if (input.length === 0) {
            noResultsText.innerHTML = `It looks like you forgot to enter a search term. Try searching for a specific topic${errorChange.innerText}`
        } else {
            noResultsText.innerHTML = `We couldn't find anything for that. Try searching for a specific topic${errorChange.innerText} to get better results.`
        }
        fade(headerInfo, 0)
        arrow.forEach(arr => {
            fade(arr, 0)
        })

        fade(sliderContainer, 0, 'none')

        fade(noResults, 1, 'flex')

    }


});


// add search results to page as slider on submit
const displaySliderItems = (input) => {
    slider.innerHTML = ''
    for (let i = 0; i <= input.length; i++) {

        let movieContainer = document.createElement('div');
        movieContainer.dataset.id = input[i].imdbID;
        movieContainer.classList.add('movie-container')
        if (input[i].Poster != "N/A")
            imageMovie = input[i].Poster;
        else
            imageMovie = "image_not_found.png";

        movieContainer.innerHTML = `
        <img src="${imageMovie}" alt="movie image">
        `
        slider.appendChild(movieContainer)
    }
}

// grab imbd ID of each movie and send another request for more info
function loadSliderDetails() {
    let movieContainer = slider.querySelectorAll('.movie-container')
    movieContainer.forEach(movie => {
        movie.addEventListener('mouseenter', async (e) => {
            e.stopPropagation()
            arrow.forEach(arr => fade(arr, 0))
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}${api_key}${resultType}&plot=full`)
            const movieInfo = await result.json();
            displaySliderDetails(movieInfo, movie)

        });
        movie.addEventListener('mouseleave', () => {
            arrow.forEach(arr => fade(arr, 1))
            removeItems()
        })
    })
}

function removeItems() {
    const newInfoContainer = document.querySelectorAll('.info-container')
    const newBioOverlay = document.querySelectorAll('.bio-overlay')
    setTimeout(() => {
        newInfoContainer.forEach(info => info.remove())
        newBioOverlay.forEach(bio => bio.remove())
    }, "400")
}

const displaySliderDetails = (input, item) => {
    // add hover items
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('info-container')
    const title = document.createElement('h3')
    title.innerText = input.Title
    title.classList.add('movie-title')

    title.innerText.split(' ').length > 10
        ? title.style.fontSize = '.8rem'
        : title.style.fontSize = '1.5rem';

    const directed = document.createElement('h4')
    directed.innerText = `Directed by: ${input.Director} `
    const released = document.createElement('h4')
    released.innerText = `Released: ${input.Released.split(' ').pop()} `
    const rating = document.createElement('h4')
    rating.innerText = `Rated: ${input.Rated} `
    const score = document.createElement('h4')
    const media = document.createElement('h4')
    media.innerText = `Type: ${input.Type.charAt(0).toUpperCase() + input.Type.slice(1)} `

    if (!input.Ratings[1]) {
        scores = `Imdb score: ${input.imdbRating}`
    } else {
        scores = `Rotten Tomatoes Score: ${input.Ratings[1].Value}`;
    }

    !input.Ratings[1] ? scores = `Imdb score: ${input.imdbRating}`
        : scores = `Rotten Tomatoes Score: ${input.Ratings[1].Value}`;


    score.innerText = `${scores}`
    //overview btn-- reveal movie synopsus
    const bioOpen = document.createElement('div')
    bioOpen.classList.add('hover-btn')
    bioOpen.innerText = 'Overview'

    //more btn click for modal info
    const moreBtn = document.createElement('div')
    moreBtn.classList.add('hover-btn')
    moreBtn.setAttribute("id", "more-btn");
    moreBtn.innerText = 'More Information'

    // movie synopsus create overlay with text
    const bioOverlay = document.createElement('div')
    bioOverlay.classList.add('bio-overlay')
    const bioTitle = document.createElement('h4')
    bioTitle.innerText = 'Overview'
    bioOverlay.append(bioTitle)
    const bioText = document.createElement('p')
    bioOverlay.append(bioText)
    bioText.innerText = input.Plot

    // close synopsus overlay
    const bioClose = document.createElement('div')
    bioClose.classList.add('close-bio-text')
    bioOverlay.append(bioClose)

    infoContainer.append(title, directed, released, rating, score, media, bioOpen, moreBtn)
    item.append(infoContainer, bioOverlay)


    bioListeners(bioOverlay, bioOpen, bioClose, item)
    bioClick(input, moreBtn)

}

function bioClick(info, btn) {
    btn.addEventListener('click', () => {
        displayMovieDetails(info)
    })
}



function bioListeners(item, open, close, leave) {
    open.addEventListener('click', () => {
        fade(item, 1, 'block', "100%")
    })
    close.addEventListener('click', () => {
        fade(item, 0, 'none', 0)
        setTimeout(() => {
            item.scrollTop = 0;
        }, "300")
    })
    leave.addEventListener('mouseleave', () => {
        fade(item, 0, 'none', 0)
        setTimeout(() => {
            item.scrollTop = 0;
        }, "300")
    })
}

// delete previous results if any when new search is submitted
const button = document.querySelector('button');
const deleteImg = button.addEventListener('click', () => {
    while (slider.firstChild) {
        slider.removeChild(slider.lastChild);
    }
})

// function to generate light colors for the query term
const brightColorGen = () => {
    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}

// function to fade items in
const fade = (input, opacity, display, height) => {
    try {
        if (input.style.opacity === '' || input.style.opacity === '0') {
            input.style.display = display;
            setTimeout(() => {
                input.style.opacity = opacity;
                input.style.height = height;

            }, "100")
        } else {
            input.style.opacity = opacity;
            input.style.height = height;

            setTimeout(() => {
                input.style.display = display;
            }, "300")
        }
    }
    catch {

    }
}

// slider arrow  click listener.. 
document.addEventListener('click', e => {
    let handle
    if (e.target.matches('.handle')) {
        handle = e.target;
    } else {
        handle = e.target.closest('.handle');
    }
    if (handle != null) {
        onHandleClick(handle)
    }
})

// handler function.. capture slider index and change value to determine movement
function onHandleClick(handle) {
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
    if (handle.classList.contains('left-handle')) {
        slider.style.setProperty('--slider-index', sliderIndex - 1)
    }
    if (handle.classList.contains('right-handle')) {
        slider.style.setProperty('--slider-index', sliderIndex + 1)
    }
}







// item.innerHTML = `

    // <img src="${movieInfo.Poster}" alt="movie image">
    // <div class="info-container">
    //     <h3>${movieInfo.Title}</h3>
    //     <h4>Year: ${movieInfo.Year}</h4>
    //     ${bioOpen}
    //     <div class="link-container">
    //         <a href="https://www.rottentomatoes.com/" target="_blank">
    //             <span>Reviews</span>
    //         </a>
    //         <div id="info-btn">
    //             <span>More Info</span>
    //         </div>
    //         <a href="https://www.google.com/search?q=${movieInfo.Title}" target="_blank">
    //             <span>Stream</span>
    //         </a>
    //     </div>
    // </div>
    // <div class="bio-overlay">
    //     <h4>Overview</h4>
    //     <p>${movieInfo.Plot}</p>
    //     <div class="close-bio-text"></div>
    // </div>


    // const reviewLink = document.createElement('a')
    // reviewLink.setAttribute('href', 'https://www.rottentomatoes.com/')
    // reviewLink.setAttribute('target', '_blank')
    // const reviewSpan = document.createElement('span')
    // reviewSpan.innerText = 'Reviews'
    // reviewLink.append(reviewSpan)

    // const searchLink = document.createElement('a')
    // searchLink.setAttribute('href', `https://www.google.com/search?q=${input.Title}`)
    // searchLink.setAttribute('target', '_blank')
    // const searchSpan = document.createElement('span')
    // searchSpan.innerText = 'Search'
    // searchLink.append(searchSpan)

    // // streamlink

    // const streamLink = document.createElement('a')

    // streamLink.setAttribute('href', 'https://www.google.com/search?q=input.Title')
    // streamLink.setAttribute('target', '_blank')
    // const streamSpan = document.createElement('span')
    // streamSpan.innerText = 'Stream'
    // streamLink.append(streamSpan)