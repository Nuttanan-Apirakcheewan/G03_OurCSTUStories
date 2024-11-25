document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        menu.classList.toggle("active");
    });
});

let currentIndex = 0;
const totalCards = 7; 
const cardWrapper = document.querySelector('.card-wrapper');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');


function updateSliderPosition() {
  const cardWidth = document.querySelector('.card').offsetWidth + 15;  
  cardWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;  
}


nextBtn.addEventListener('click', () => {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
    updateSliderPosition();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
  }
});


window.addEventListener('resize', () => {
  if (window.innerWidth > 500) {
    currentIndex = 0;  
    updateSliderPosition(); 
  }
});
