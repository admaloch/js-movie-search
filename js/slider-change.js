

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

const throttleProgressBar = throttle(() => {
    calculateProgressBar(slider)
}, 250)

window.addEventListener("resize", e => {
    if (slider.children.length > 0) {
        throttleProgressBar()
    }
})

function calculateProgressBar(slider) {
    progressBar.innerHTML = ""
    const itemCount = slider.children.length;
    const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue('--images-per-screen'))
    let sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)

    if (sliderIndex >= progressBarItemCount) {
        slider.style.setProperty("--slider-index", progressBarItemCount - 1)
        sliderIndex = progressBarItemCount - 1
    }

    for (let i = 0; i < progressBarItemCount; i++) {
        const barItem = document.createElement('div')
        barItem.classList.add('progress-item')
        if (i === sliderIndex) {
            barItem.classList.add('active')
        }
        progressBar.append(barItem)

    }
}
const currItemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue('--images-per-screen'))
// handler function.. capture slider index and change value to determine movement
function onHandleClick(handle) {
    const progressBar = document.querySelector('.progress-bar')
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));

    const itemCount = slider.children.length;
    const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue('--images-per-screen'))

    const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
    console.log(sliderIndex, '= slider index', progressBarItemCount, '= progress bar count')
    // console.log(itemCount, '= item count')
    // console.log(itemsPerScreen, '= items per screen')

    let newSliderIndex = 0
    if (handle.classList.contains('left-handle')) {
        newSliderIndex = sliderIndex <= 0 ? progressBarItemCount - 1 : sliderIndex - 1
    } else {
        newSliderIndex = sliderIndex + 1 >= progressBarItemCount
            ? 0
            : sliderIndex + 1
    }
    slider.style.setProperty('--slider-index', newSliderIndex)
    progressBar.children[sliderIndex].classList.remove('active')
    progressBar.children[newSliderIndex].classList.add('active')

// code for centering if results don't return even number
    // let updatedIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index')) 
    // if (itemCount / itemsPerScreen % 1 != 0) {
       
    //     console.log(currItemsPerScreen, 'curr item per screen')
    //     if (updatedIndex + 1 === progressBarItemCount) {
    //         console.log('the last slide')
    //         slider.style.setProperty("--images-per-screen", 4)
    //     } else {
    //         console.log('not the last slide')
    //         slider.style.setProperty("--images-per-screen", 5)
    //     }
    // }


}