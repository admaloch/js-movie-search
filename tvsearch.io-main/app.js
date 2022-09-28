let slider = document.querySelector('.slider');

// delete previous results if any when new search is submitted
const button = document.querySelector('button');
const deleteImg = button.addEventListener('click', () => {
    while (slider.firstChild) {
        slider.removeChild(slider.lastChild);
    }
})

// submit handler.. capture input and send request to api and add images
const searchForm = document.querySelector('#searchForm');
const headerInfo = document.querySelector('.header-info');
const sliderContainer = document.querySelector('.slider-container');
const arrow = document.querySelectorAll('.handle');
const searchQueryText = document.querySelector('.changing-word');
searchForm.addEventListener('submit', async function (event) {
    try {
        event.preventDefault();
        fade(headerInfo, 'flex', 1)
        arrow.forEach(arr => {
            fade(arr, 'flex', 1)
        })
        let input = searchForm.elements.query.value;
        const config = { params: { q: input } };
        const results = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        searchQueryText.style.color = brightColorGen();
        searchQueryText.innerText = ' ' + input.charAt(0).toUpperCase() + input.slice(1);
        searchForm.elements.query.value = '';
        fade(sliderContainer, 'flex', 1)
        addImages(results.data);
    }
    catch {
        console.log('image not loaded');
    };
});

// take input and add images to page
const addImages = (input) => {
    for (let i = 0; i <= input.length; i++) {
        if (input[i].show.image) {
            const showTitle = input[i].show.this;
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container')
            slider.append(movieContainer)
            const movieImg = document.createElement('img')
            movieImg.src = input[i].show.image.original
            // create container and add info items with text on hover
            const infoContainer = document.createElement('div')
            infoContainer.classList.add('info-container')
            const title = document.createElement('h3')
            title.innerText = 'Movie Title'
            const genre = document.createElement('h4')
            genre.innerText = `Genre: `
            const director = document.createElement('h4')
            director.innerText = `Director: `
            const country = document.createElement('h4')
            country.innerText = `Country: `
            const rating = document.createElement('h4')
            rating.innerText = `Rotten Tomatoes score: `


            //overview btn-- reveal movie synopsus
            const bioBtn = document.createElement('div')
            bioBtn.classList.add('open-bio-text')
            bioBtn.innerText = 'Overview'




            // movie synopsus create overlay with text
            const bioOverlay = document.createElement('div')
            bioOverlay.classList.add('bio-overlay')
            const bioTitle = document.createElement('h4')
            bioTitle.innerText = 'Movie Overview'
            bioOverlay.append(bioTitle)
            const bioText = document.createElement('p')
            bioOverlay.append(bioText)
            bioText.innerText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta distinctio debitis commodi accusantium, aliquid itaque nisi necessitatibus, quasi enim, mollitia nobis. Beatae repellendus necessitatibus suscipit aperiam blanditiis deserunt quas eo Debitis molestias fuga ex beatae doloremque nisi fugit, impedit dignissimos accusantium architecto provident voluptatem iure a laborum officiis consectetur atque dolorem iusto! Quia ipsa minus ea accusamus consectetur, veniam rem. Reiciendis modi neque maxime repellat iure commodi deleniti dolorem voluptas ipsa, rerum molestias porro? Numquam sed quae dolores dolorem modi vero, quibusdam quos eius asperiores obcaecati iusto! Ea, veritatis impedit?'

            // close synopsus overlay
            const closeBtn = document.createElement('div')
            closeBtn.classList.add('close-bio-text')
            bioOverlay.append(closeBtn)


            bioBtn.addEventListener('click', () => {
                fade(bioOverlay, 'flex', 1, "100%")
            })
            closeBtn.addEventListener('click', () => {
                fade(bioOverlay, 'none', 0, 0)
                setTimeout(() => {
                    bioOverlay.scrollTop = 0;
                }, "300")
            })
            movieContainer.addEventListener('mouseleave', () => {
                fade(bioOverlay, 'none', 0, 0)
                setTimeout(() => {
                    bioOverlay.scrollTop = 0;
                }, "300")
            })

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
            searchLink.setAttribute('href', 'https://www.google.com/')
            searchLink.setAttribute('target', '_blank')
            const searchSpan = document.createElement('span')
            searchSpan.innerText = 'Search'
            searchLink.append(searchSpan)

            const streamLink = document.createElement('a')
            streamLink.setAttribute('href', 'https://www.google.com/')
            streamLink.setAttribute('target', '_blank')
            const streamSpan = document.createElement('span')
            streamSpan.innerText = 'Stream'
            streamLink.append(streamSpan)


            linkContainer.append(reviewLink, searchLink, streamLink)
            infoContainer.append(title, genre, director, country, rating, bioBtn, linkContainer)
            movieContainer.append(movieImg, infoContainer, bioOverlay)
        }
    }
}

// function to generate light colors for the query term
const brightColorGen = () => {
    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}

// function to handle above event handlers in one
// const buttonHandler = (item, open, close, leave) => {
// open.addEventListener('click', () => {
//         fade(item, 'flex', 1, "100%")
//     })
//     close.addEventListener('click', () => {
//         fade(item, 'none', 0, 0)
//         setTimeout(() => {
//             item.scrollTop = 0;
//         }, "300")
//     })
//     leave.addEventListener('mouseleave', () => {
//         fade(item, 'none', 0, 0)
//         setTimeout(() => {
//             item.scrollTop = 0;
//         }, "300")
//     })
// }

    

// function to fade items in
const fade = (input, display, opacity, height, width) => {
    if (input.style.display === 'none') {
        input.style.display = display;
        setTimeout(() => {
            input.style.opacity = opacity;
            input.style.height = height;
            input.style.width = width;
        }, "100")
    } else {
        input.style.opacity = opacity;
        input.style.height = height;
        input.style.width = width;
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
