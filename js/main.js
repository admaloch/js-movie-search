
// change margin on initial load to make transition from center to top smooth
window.onload = function () {
    // searchElement.style.margin = '8rem 0 0 0'
};

// result type buttons click change type of requests from movie to tv and change colors
function changeTheme() {
    const btns = document.querySelectorAll('.result-btn')
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
            // searchElement.style.margin = '8rem 0 0 0'
            // change result type variable
            changeMedia(btns[i])
        });
    }
}
changeTheme()

function changeMedia(resultBtn) {
    let changingTitle = document.querySelector('.title-change');
    let changingSubTitle = document.querySelector('.sub-title-change');

    mediaTypes.forEach(media => {
        if (resultBtn.innerText === media.name) {
            changeColorVars(media.scheme)
            resultType = media.type;
            fade(noResults, 0, 'none')
            changingTitle.innerText = media.title
            changingSubTitle.innerText = media.subTitle
            errorChange.innerText = media.errorMSG
        }
    })
}

// function to change color schemes from color schemes object
const root = document.querySelector(':root');
const changeColorVars = vars => Object.entries(vars)
    .forEach(v => root.style.setProperty(v[0], v[1]));

// captures value and determines if movielist shows up
function findMovies() {
    let searchTerm = (searchInput.value).trim();
    if (searchTerm.length > 0) {
        fade(searchList, 1, 'flex')
        searchList.scrollTop = 0
        loadMovies(searchTerm);
    } else { fade(searchList, 0, 'none') }
}