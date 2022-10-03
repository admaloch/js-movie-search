// tmbd api key = 025781367a111a39abfd9121bed34f28
// ex.requst = https://api.themoviedb.org/3/movie/550?api_key=025781367a111a39abfd9121bed34f28






const baseURL = 'https://api.themoviedb.org/3';
let search = '/search/movie?'
let stream = '/movie/{movie_id}/watch/providers'
const apiKey = 'api_key=025781367a111a39abfd9121bed34f28';
const otherParams = '&language=en-US&include_adult=false&page=1&query='

let slider = document.querySelector('.slider');


// submit handler.. capture input and send request to api and add images
const searchForm = document.querySelector('#searchForm');
const headerInfo = document.querySelector('.header-info');
const sliderContainer = document.querySelector('.slider-container');
const arrow = document.querySelectorAll('.handle');
const searchQueryText = document.querySelector('.changing-word');

searchForm.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        fade(headerInfo, 1, 'auto')
        arrow.forEach(arr => {
            fade(arr, 1, 'auto', 'flex')
        })
        let input = searchForm.elements.query.value;

        const results = await axios.get(`${baseURL}${search}${apiKey}${otherParams}${input}`);

        searchQueryText.style.color = brightColorGen();
        searchQueryText.innerText = ' ' + input.charAt(0).toUpperCase() + input.slice(1);
        searchForm.elements.query.value = '';
        fade(sliderContainer, 1, 'auto')
        addImages(results.data.results);
    }
    catch {
        console.log('image not loaded');
    };
});

// stream link

const streamLink = async function (id) {
    await axios.get(`${baseURL}/movie/${id}/watch/providers?${apiKey}`);
}




// take input and add images to page
const addImages = (input) => {
    for (let i = 0; i <= input.length; i++) {

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')
        slider.append(movieContainer)
        const movieImg = document.createElement('img')
        const imgUrl = input[i].poster_path
        movieImg.src = `https://image.tmdb.org/t/p/w500${imgUrl}`

        // create container and add info items with text on hover
        const infoContainer = document.createElement('div')
        infoContainer.classList.add('info-container')
        const title = document.createElement('h3')
        title.innerText = input[i].original_title


        const genre = document.createElement('h4')
        genre.innerText = `Genre: `


        const rating = document.createElement('h4')
        rating.innerText = `Rating: ${input[i].vote_average} `


        //overview btn-- reveal movie synopsus
        const bioOpen = document.createElement('div')
        bioOpen.classList.add('open-bio-text')
        bioOpen.innerText = 'Overview'

        // movie synopsus create overlay with text
        const bioOverlay = document.createElement('div')
        bioOverlay.classList.add('bio-overlay')
        const bioTitle = document.createElement('h4')
        bioTitle.innerText = 'Overview'
        bioOverlay.append(bioTitle)
        const bioText = document.createElement('p')
        bioOverlay.append(bioText)
        bioText.innerText = input[i].overview

        // close synopsus overlay
        const bioClose = document.createElement('div')
        bioClose.classList.add('close-bio-text')
        bioOverlay.append(bioClose)




        // create bubbles with links at bottom
        const linkContainer = document.createElement('div')
        linkContainer.classList.add('link-container')


        const reviewLink = document.createElement('a')
        reviewLink.setAttribute('href', 'https://www.rottentomatoes.com/')
        reviewLink.setAttribute('target', '_blank')
        const reviewSpan = document.createElement('span')
        reviewSpan.innerText = 'Reviews'
        reviewLink.append(reviewSpan)

        const searchLink = document.createElement('a')
        searchLink.setAttribute('href', `https://www.google.com/search?q=${input[i].original_title}`)
        searchLink.setAttribute('target', '_blank')
        const searchSpan = document.createElement('span')
        searchSpan.innerText = 'Search'
        searchLink.append(searchSpan)

        // streamlink

        

        const streamLink = document.createElement('a')
        console.log(input[i].id)
        streamLink.setAttribute('href', 'https://www.google.com/search?q=input[i].original_title')
        streamLink.setAttribute('target', '_blank')
        const streamSpan = document.createElement('span')
        streamSpan.innerText = 'Stream'
        streamLink.append(streamSpan)


        bioOpen.addEventListener('click', () => {
            fade(bioOverlay, 1, "100%")
        })
        bioClose.addEventListener('click', () => {
            fade(bioOverlay, 0, 0)
            setTimeout(() => {
                bioOverlay.scrollTop = 0;
            }, "300")
        })
        movieContainer.addEventListener('mouseleave', () => {
            fade(bioOverlay, 0, 0)
            setTimeout(() => {
                bioOverlay.scrollTop = 0;
            }, "300")
        })

        linkContainer.append(reviewLink, searchLink, streamLink)
        infoContainer.append(title, genre, rating, bioOpen, linkContainer)
        movieContainer.append(movieImg, infoContainer, bioOverlay)

    }
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

// function to handle above event handlers in one place.. can't get it to work
// const bioHandler = (eventItem, changeItem) => {
//     if (changeItem.style.display === 'none') {
//         eventItem.addEventListener('click', () => {
//             fade(changeItem, 'flex', 1, "100%")
//         })
//     }
//     if (changeItem.style.display !== 'none') {
//         eventItem.addEventListener('click', () => {
//             fade(changeItem, 'none', 0, 0)
//             setTimeout(() => {
//                 changeItem.scrollTop = 0;
//             }, "300")
//         })

//     }
// }



// function to fade items in
const fade = (input, opacity, height, display) => {
    if (input.style.display === 'none') {
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
        }, "400")
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






