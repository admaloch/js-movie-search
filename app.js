const searchForm = document.querySelector('#searchForm')
const button = document.querySelector('button')
let slider = document.querySelector('.slider')
const input = document.querySelector('#input')
const sliderImages = document.querySelectorAll('img')
const changingWord = document.querySelector('.changing-word')
const arrows = document.querySelector('.img-container')

// delete previous results
const deleteImg = button.addEventListener('click', () => {
    while (slider.firstChild) {
        slider.removeChild(slider.lastChild);
    }
})

// submit handler.. capture input and send request to api then run function to add images
searchForm.addEventListener('submit', async function (event) {
    try {
        event.preventDefault()
        let input = searchForm.elements.query.value
        const config = { params: { q: input } }
        const results = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        const sliderNum = slider.length;
        const changingColor = brightColorGen();
        changingWord.style.color = changingColor;
        changingWord.innerText = ' ' + input.charAt(0).toUpperCase() + input.slice(1);
        searchForm.elements.query.value = '';
        arrows.classList.remove('d-none')
        addImages(results.data)
    }
    catch {
        console.log('image not loaded')
    }
})

const brightColorGen = () => {
    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}

// function to add images to the page
const addImages = (input) => {
    for (let i = 0; i <= input.length; i++) {
        if (input[i].show.image) {
            const showTitle = input[i].show.name;
            const img = document.createElement('img')
            img.src = input[i].show.image.original
            slider.append(img)
        }
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

let imgPerScreen = parseInt(getComputedStyle(slider).getPropertyValue('--images-per-screen'));

function changeResultCount() {
    if (window.innerWidth <= 1000) {
        imgPerScreen = 4;
        console.log('it is now 4')
    } else {
        imgPerScreen = 5;
    }
}
window.addEventListener('resize', changeResultCount);






