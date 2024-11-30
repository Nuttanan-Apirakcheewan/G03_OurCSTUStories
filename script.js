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

//----------------------------Journey page-----------------------------

const profileImgs = document.querySelectorAll('.profile-img');
const profileCard = document.getElementById('profile-card');
const closeBtn = document.getElementById('close-btn');
const backgroundOverlay = document.createElement('div');
backgroundOverlay.classList.add('background-overlay');
document.body.appendChild(backgroundOverlay);

// ข้อมูลตัวอย่าง (โปรไฟล์)
const profiles = [
  {
    image: 'recources/shai_pic-circle.png',
    name: 'Shai',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะที่สำคัญต่อการทำงานในสายงานคอมพิวเตอร์ รวมไปถึงเป็นภาษาหลักที่ใข้ในการสื่อสาร<br><b>แนวทางการพัฒนา:</b> เรียนรู้และพัฒนาอยู่ตลอดเวลา อ่านหนังสือภาษาอังกฤษ หรือลองสื่อสารกับเจ้าของภาษา'
  },
  {
    image: 'recources/chin_pic-circle.png',
    name: 'Chin',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะจำเป็นทำให้มีแหล่งหาความรู้กว้างขึ้น<br><b>แนวทางการพัฒนา:</b> พยายามนำมาใช้ในชีวิตประจำวัน เขียนตอบการบ้านเป็นภาษาอังกฤษ'
  },
  {
    image: 'recources/mint_pic-circle.png',
    name: 'Mint',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะที่สำคัญมาก เพราะส่วนใหญ่การอ่านหรือเขียนโค้ดจะใช้ภาษาอังกฤษ<br><b>แนวทางการพัฒนา:</b> อ่านบทความ หรือฝึกเขียนบ่อย ๆ'
  },
  {
    image: 'recources/shai_pic-circle.png',
    name: 'Shai',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะที่สำคัญในการทำงานและการใช้ชีวิต โดยเรียนรู้สิ่งต่างๆ จากประสบการณ์ ที่สั่งสมมา <br><b>แนวทางการพัฒนา:</b> การลงมือทำเรียนรู้ด้วยตัวเอง หาจุดที่ผิดพลาดและแก้ไข โดยใช้เทคโนโลยีเป็นตัวช่วย'
  },
  {
    image: 'recources/nick_pic-circle.png',
    name: 'Nick',
    description: '<b>ความคิดเห็น:</b> จำเป็นมาก เพราะ ต่อให้เราจำเรียนรู้ศึกษามาจากในเวลาเรียนแล้ว พอเราต้องทำงานจริง บางทีการใช้ความรู้ในห้องอาจไม่เพียงพอต่อการทำงาน <br> <b>แนวทางการพัฒนา:</b> แบ่งเวลาศึกษาหาความรู้ในด้านที่สนใจ และหาข้อมูล'
  },
  {
    image: 'recources/geb_pic-circle.png',
    name: 'Keb',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะที่ทำให้เราสามารถทำให้ตัวเองพัฒนาขึ้นได้เรื่อยๆ ยิ่งอยากเรียนรู้ก็ยิ่งทำให้เราเติบโตได้เยอะมากขึ้น <br> <b>แนวทางการพัฒนา:</b> ควรจะหาความรู้ทักษะใหม่ๆตลอด เพื่อที่จะได้ทำให้ตัวเองเกิดการเรียนรู้ตลอดเวลา '
  },
];

// ฟังก์ชันแสดงการ์ดโปรไฟล์
const showProfileCard = (index) => {
  profileCard.style.display = 'block';
  profileCard.style.zIndex = '1001'; // ให้การ์ดอยู่ข้างหน้า
  profileCard.querySelector('.profile-img-card').src = profiles[index].image;
  profileCard.querySelector('#profile-name').textContent = profiles[index].name;
  profileCard.querySelector('#profile-description').innerHTML = profiles[index].description;

  // แสดงพื้นหลังที่มืดลง
  profileCard.classList.add('show');
  backgroundOverlay.style.display = 'block';
};

// ฟังก์ชันซ่อนการ์ด
const hideProfileCard = () => {
  profileCard.style.display = 'none';
  backgroundOverlay.style.display = 'none';
};

// เมื่อคลิกรูปภาพ
profileImgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    showProfileCard(index);
  });
});

// เมื่อคลิกที่ปุ่มปิดการ์ด
closeBtn.addEventListener('click', () => {
  hideProfileCard();
});

// เมื่อคลิกที่พื้นหลัง
backgroundOverlay.addEventListener('click', () => {
  hideProfileCard();
});

//------------------------------Journey page----------------------------------------