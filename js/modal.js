// create modal with extra info based on imbd id request
function displayMovieDetails(details) {
    const modal = document.getElementById('modal');
    fade(modal, 1, 'flex')
    modal.innerHTML = `
            <div class="overlay">
                <div class="result-container">
                    <div class="movie-info-container">
                        <div class="movie-poster">
                            <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}"
                                alt="movie poster">
                        </div>
                        <div class="movie-info">
                            <h3 class="movie-info-title">${details.Title}</h3>
                            <ul class="movie-misc-info">   
                                <li class="runTime movie-items"> <span>Runtime:</span> ${details.Runtime} </li>
                                <li class="rated movie-items"> <span>Rated:</span> ${details.Rated} </li>
                                <li class="released movie-items"> <span>Released:</span> ${details.Released.split(' ').pop()}</li>
                            </ul>
                            <p class="genre movie-items"><span>Genre:</span> ${details.Genre}</p>
                            <p class="writer movie-items"><span>Director:</span> ${details.Director}</p>
                            <p class="actors movie-items"><span>Actors: </span>${details.Actors}</p>
                            <p class="plot movie-items"><span>Plot:</span> ${details.Plot}</p>
                            <p class="language movie-items"><span>Language:</span> ${details.Language}</p>
                            <div class="modal-buttons">
                                <button class="modal-btn" id="btn-close">Return to Search</button>
                                <a class="modal-btn" href="https://www.google.com/search?q=${details.Title}+${details.Released.split(' ').pop()}" target="_blank">
                                <div>Search</div>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
    `;
    //don't show item if item has n/a
    Array.from(document.querySelectorAll('.movie-items')).forEach(item => {
        if (item.innerText.includes('N/A')) {
            item.classList.add('d-none')
        }
    });
    //close modal when button is clicked
    const btnClose = document.getElementById('btn-close');
    btnClose.addEventListener('click', () => {
        fade(modal, 0, 'none')
    })
}