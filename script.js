document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  let currentIndex = 0;
  const cardWrapper = document.querySelector('.card-wrapper');
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');
  const form = document.querySelector('form');
  const totalCards = () => document.querySelectorAll('.card').length;
  const commentsBuffer = []; 

  const profilePictures = [
    'recources/cat.jpg',
    'recources/chill_guy.png',
    'recources/doge.png',
    'recources/moodeng.png',
    'recources/eva_tiger.png'
  ];

  let lastUsedPictureIndex = -1; 

  function updateSliderPosition() {
    const cardWidth = document.querySelector('.card').offsetWidth + 15;
    cardWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards() - 1) {
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

  participant.addEventListener('click', () => {
    currentIndex = 0;
    updateSliderPosition();
  });

  Guestbook.addEventListener('click', () => {
    currentIndex = 7;
    updateSliderPosition();
  });

  let lastUsedColorIndex = -1;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const name = document.querySelector('#nameTh').value + ' ' + document.querySelector('#surnameTh').value;
    const device = document.querySelector('input[name="userDevice"]:checked').value;
    const comment = document.querySelector('#comment').value;
    const colorVariables = ['--color1', '--color2', '--color3', '--color4', '--color5'];

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * colorVariables.length);
    } while (randomIndex === lastUsedColorIndex);

    lastUsedColorIndex = randomIndex;
    const randomColor = colorVariables[randomIndex];

    let randomPictureIndex;
    do {
      randomPictureIndex = Math.floor(Math.random() * profilePictures.length);
    } while (randomPictureIndex === lastUsedPictureIndex);

    const randomPicture = profilePictures[randomPictureIndex];
    lastUsedPictureIndex = randomPictureIndex; 

    commentsBuffer.push({ name, device, comment });

    if (commentsBuffer.length % 3 === 1) {
      const newCard = document.createElement('div');
      newCard.className = 'card';
      cardWrapper.appendChild(newCard);
    }
    

    const latestCard = document.querySelector('.card-wrapper .card:last-child');

    const userComment = document.createElement('div');
    userComment.className = 'user-comment';
    userComment.style.setProperty('--random-color', `var(${randomColor})`);
    userComment.innerHTML = `
      <div class="comment-header">
        <img src="${randomPicture}" alt="Profile Picture">
        <p id="user_name"><strong>${name}</strong></p>
      </div>
      <p><strong>Device:</strong> ${device}</p>
      <p><strong>Comment:</strong> ${comment}</p>
    `;

    latestCard.appendChild(userComment);

    currentIndex = totalCards() - 1;
    updateSliderPosition();

    form.reset();
  });
});
