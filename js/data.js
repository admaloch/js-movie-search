// variables for keydown searchList
const searchInput = document.getElementById('search-input');
const searchList = document.getElementById('search-list');
// variables for slider on form submit
const slider = document.querySelector('.slider');
const progressBar = document.querySelector('.progress-bar');
const sliderContainer = document.querySelector('.slider-container');
const searchElement = document.querySelector('.search-element');
const headerInfo = document.querySelector('.header-info');
const noResults = document.querySelector('.no-results');
const arrow = document.querySelectorAll('.handle');
//error text that changes based on result type
const errorChange = document.getElementById('error-change');
// variables for api request
const api_key = '&apikey=84200d7a'
let resultType = '&type=movie'
//button for delete img
const button = document.querySelector('button');

// object containing different color scheme css variables
const colorSchemes = {
    movieScheme: {
        '--text': '#f8f7ff', //white
        '--mainBackground': '#022B3A', //dark blue
        '--containertext': '#022B3A', //dark blue
        '--containerBackground': '#f8f7ff',  //white
        '--color1': '#ff99c8', //pink
        '--color2': '#d0f4de', //green
        '--color3': '#fdfcdc', //light yellow
        '--overlay': 'rgba(248, 247, 255, .8)',
        
    },
    tvScheme: {
        '--text': '#022B3A',  //dark blue
        '--mainBackground': '#f7ede2', //cream
        '--containertext': '#f7ede2', //cream
        '--containerBackground': '#022B3A',//dark blue
        '--color1': '#219ebc', //light blue
        '--color2': '#03045e', //purple
        '--color3': '#1F7A8C',  //teal
        '--overlay': 'rgba(2, 43, 58, .8)',
       
    },
    bothScheme: {
        '--text': '#284b63',  //dark blue
        '--mainBackground': '#cbc0d3', //light purple
        '--containertext': '#cbc0d3', //light purple
        '--containerBackground': '#284b63',//dark blue
        '--color1': '#c1121f', //light green
        '--color2': '#023e8a', //dark blue
        '--color3': '#1b4332',  //light yellow
        '--overlay': 'rgba(40, 75, 99, .8)',
     
    },
}
// object for  info to change color scheme titles based on search query
const mediaTypes = [
    Movies = {
        name: 'Movies',
        type: '&type=movie',
        scheme: colorSchemes.movieScheme,
        title: 'Movie',
        subTitle: 'Movies',
        errorMSG: ' or movie'
    },
    Tv = {
        name: 'TV',
        type: '&type=series',
        scheme: colorSchemes.tvScheme,
        title: 'TV Show',
        subTitle: 'TV shows',
        errorMSG: ' or TV show'
    },
    Both = {
        name: 'Both',
        type: '&type=',
        scheme: colorSchemes.bothScheme,
        title: 'Movie + TV Show',
        subTitle: 'Movies and Tv shows',
        errorMSG: ', movie or tv show'
    }
]
