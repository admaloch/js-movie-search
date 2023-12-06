// Add touch event listeners to the slider container
let touchStartX;

sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

sliderContainer.addEventListener('touchmove', (e) => {
    if (touchStartX || touchStartX === 0) {
        const touchEndX = e.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        // Adjust the threshold based on your preference
        if (deltaX > 50) {
            // Swipe right
            slideRight();
        } else if (deltaX < -50) {
            // Swipe left
            slideLeft();
        }

        // Reset touchStartX to prevent continuous sliding
        touchStartX = null;
    }
});

// Function to handle sliding left
function slideLeft() {
    const progressBar = document.querySelector('.progress-bar');
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const progressBarItemCount = Math.ceil(slider.children.length / currItemsPerScreen);

    const newSliderIndex = sliderIndex + 1 >= progressBarItemCount ? 0 : sliderIndex + 1;

    slider.style.setProperty('--slider-index', newSliderIndex);
    progressBar.children[sliderIndex].classList.remove('active');
    progressBar.children[newSliderIndex].classList.add('active');
}

// Function to handle sliding right
function slideRight() {
    const progressBar = document.querySelector('.progress-bar');
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'));
    const progressBarItemCount = Math.ceil(slider.children.length / currItemsPerScreen);

    const newSliderIndex = sliderIndex <= 0 ? progressBarItemCount - 1 : sliderIndex - 1;

    slider.style.setProperty('--slider-index', newSliderIndex);
    progressBar.children[sliderIndex].classList.remove('active');
    progressBar.children[newSliderIndex].classList.add('active');
}
