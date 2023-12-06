// api request to generate movie/tv list on keydown

async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1${api_key}${resultType}`;
    const res = await fetch(`${URL}`);
    const results = await res.json();
    console.log(results)
    if (results.Response == "True") displayMovieList(results.Search);
 
}

// add searchlist items
function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A") { moviePoster = movies[i].Poster }
        else { moviePoster = "image_not_found.png" };
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
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item')
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id)
            fade(searchList, 0, 'none')
            searchInput.value = '';
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}${api_key}${resultType}&plot=full`)
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        })
    })
}

// make api list disapear when click off input
window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        fade(searchList, 0, 'none')
    }
})