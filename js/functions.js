// add content/classes to api results, test if content is available, and append
function appendItem(item, text, destination, _class) {
    item.innerText = text;
    if (!text.includes('N/A')) { destination.appendChild(item) }
    item.classList.add(_class)
}

// function to open/close the overlay with the movie bio on overview button
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

// function to display modal when more info button is clicked
function bioClick(info, btn) {
    btn.addEventListener('click', () => {
        displayMovieDetails(info)
    })
}

// decrease font size for movies with excessively long titles
function titleLengthTest(input) {
    if (input.innerText.split(' ').length > 6) { input.style.fontSize = '1.2rem' }
    if (input.innerText.split(' ').length > 10) { input.style.fontSize = '.9rem' }
    if (input.innerText.split(' ').length > 13) { input.style.fontSize = '.8rem' }
}

// function to generate light or dark colors based on color scheme
const randomColorGen = () => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * (100 + 1))
    let l = ''
    resultType.includes('movie')
        ? l = Math.floor((1 + Math.random()) * (100 / 2 + 1))
        : l = Math.floor(Math.random() * (100 / 2 + 1))
    return `hsl(${h}, ${s}%, ${l}%)`
}

// general function to fade items in and out
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
    } catch { }
}

// remove api info from container on mouseleave
function removeItems() {
    const infoContainer = document.querySelectorAll('.info-container')
    const bioOverlay = document.querySelectorAll('.bio-overlay')
    setTimeout(() => {
        infoContainer.forEach(info => info.remove())
        bioOverlay.forEach(bio => bio.remove())
    }, "400")
}

function throttle(cb, delay = 1000) {
   
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false
      } else {
        cb(...waitingArgs)
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }
  
    return (...args) => {
      if (shouldWait) {
        waitingArgs = args
        return
      }
  
      cb(...args)
      shouldWait = true
      setTimeout(timeoutFunc, delay)
    }
    
  }