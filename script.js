document.addEventListener("DOMContentLoaded", () => {
  /*hamburger*/
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
  /*slider for mobile device*/
  function updateSliderPosition() {
    const cardWidth = document.querySelector('.card').offsetWidth + 0;
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

  /*---------------------------home page form------------------------*/
  document.querySelectorAll('.guestForm').forEach(form => {
    const isDesktopForm = form.id === 'desktopForm';
    const commentSection = isDesktopForm
      ? document.querySelector('.sidebar')
      : document.querySelector('.card-wrapper .card:last-child');

    const showError = (input, message) => {
      let error = input.parentNode.querySelector('.error-message');
      if (!error) {
        error = document.createElement('div');
        error.className = 'error-message';
        input.parentNode.appendChild(error);
      }
      error.textContent = message;
      input.classList.add('invalid');
      input.classList.remove('valid');
    };

    const clearError = (input) => {
      const error = input.parentNode.querySelector('.error-message');
      if (error) error.remove();
      input.classList.remove('invalid');
      input.classList.add('valid');
    };

    const resetClasses = (inputs) => {
      inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
    };

    const validateField = (input) => {
      if (input.id === 'nameTh' || input.id === 'surnameTh') {
        if (!/^[a-zA-Z\s]*$/.test(input.value)) {
          showError(input, "Only letters and spaces are allowed.");
          return false;
        } else {
          clearError(input);
        }
      } else if (input.id === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          showError(input, "Invalid email format.");
          return false;
        } else {
          clearError(input);
        }
      } else if (input.id === 'comment') {
        if (input.value.length > 30 || input.value.trim() === '') {
          showError(input, "Comment must be 1-30 characters.");
          return false;
        } else {
          clearError(input);
        }
      }
      return true;
    };


    form.addEventListener('input', (event) => {
      validateField(event.target);
    });


    form.addEventListener('submit', event => {
      event.preventDefault();
      let isValid = true;

      form.querySelectorAll('input, textarea').forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) return;

      const isDesktopForm = form.id === 'desktopForm';
      const isMobileForm = form.id === 'mobileForm';


      const name = form.querySelector('#nameTh').value + ' ' + form.querySelector('#surnameTh').value;
      const device = form.querySelector('input[name="userDevice"]:checked').value;
      const comment = form.querySelector('#comment').value;
      const email = form.querySelector('#email').value;

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
      const lastestcomment = document.querySelector('.sidebar');

      const userComment = document.createElement('div');
      const userCommentDesktop = document.createElement('div');

      userComment.className = 'user-comment';
      userCommentDesktop.className = 'user-comment-desktop';


      userComment.style.setProperty('--random-color', `var(${randomColor})`);
      userCommentDesktop.style.setProperty('--random-color', `var(${randomColor})`);
      userComment.innerHTML = `
        <div class="comment-header">
          <img src="${randomPicture}" alt="Profile Picture">
          <p id="user_name"><strong>${name}</strong></p>
        </div>
        <p><strong>Device:</strong> ${device}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Comment:</strong> ${comment}</p>
      `;

      userCommentDesktop.innerHTML = `
      <div class="comment-header">
        <img src="${randomPicture}" alt="Profile Picture">
        <p id="user_name"><strong>${name}</strong></p>
      </div>
      <p><strong>Device:</strong> ${device}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Comment:</strong> ${comment}</p>
    `;

      latestCard.appendChild(userComment);
      lastestcomment.appendChild(userCommentDesktop);


      if (isMobileForm) {
        currentIndex = totalCards() - 1;
        updateSliderPosition();
      }

      form.reset();
      resetClasses(form.querySelectorAll('input, textarea'));
    });
  });

  document.getElementById("guestbookButton").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");


    if (sidebar.style.left === "0px") {
      sidebar.style.left = "-350px";
    } else {
      sidebar.style.left = "0px";
    }
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
  {
    image: 'recources/chain_pic-circle.png',
    name: 'Chain',
    description: '<b>ความคิดเห็น:</b> ในการพัฒนาซอฟแวร์จำเป็นต้องทำงานเป็นทีม <br><b>แนวทางการพัฒนา:</b> ฝึกทำงานกับทีมให้บ่อย '
  },
  {
    image: 'recources/mint_pic-circle.png',
    name: 'Mint',
    description: '<b>ความคิดเห็น:</b> เป็นสิ่งสำคัญ เพราะจะช่วยให้การสื่อสารและแบ่งงานได้อย่างมีประสิทธิภาพ <br> <b>แนวทางการพัฒนา:</b> ฝึกการสื่อสาร และเข้าร่วมทำโปรเจกต์กลุ่ม '
  },
  {
    image: 'recources/save_pic-circle.png',
    name: 'Save',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะที่ต้องฝึกเพื่อไปใช้ในการทำงานในอนาคต <br><b>แนวทางการพัฒนา:</b> ปรับตัว รับผิดชอบในหน้าที่ และรับฟังความเห็นคนในทีม '
  },
  {
    image: 'recources/chin_pic-circle.png',
    name: 'Chin',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะสำหรับด้านนี้โดยเฉพาะอยู่แล้ว ขึ้นอยู่กับแต่ละบุคคล ว่าอยากนำไปประยุกต์กับด้านใด<br><b>แนวทางการพัฒนา:</b> ศึกษา / ปฏิบัติ พื้นฐานแต่ละภาษาที่เรียนรู้ให้แน่น และคอยใช้แก้ปัญหาต่าง ๆ ที่พบ'
  },
  {
    image: 'recources/nick_pic-circle.png',
    name: 'Nick',
    description: '<b>ความคิดเห็น:</b>เป็นทักษะที่จำเป็นที่สุดเลย แต่ทักษะนี้ก็ขึ้นอยู่กับแต่ละบุคคลว่าจำเป็นไหม <br> <b>แนวทางการพัฒนา:</b> คอยศึกษาหาความรู้ใหม่ๆ อยู่เสมอและลงมือทำทุกครั้งเพื่อให้สามารถพัฒนาต่อไปได้เรื่อยๆ'
  },
  {
    image: 'recources/shai_pic-circle.png',
    name: 'Shai',
    description: '<b>ความคิดเห็น:</b> เป็นทักษะหลัก ในสายงานเกี่ยวกับคอมพิวเตอร์ เพราะต้องใช้ในการพัฒนาและออกแบบโปรแกรม และเป็นทักษะเฉพาะด้าน <br><b>แนวทางการพัฒนา:</b> เก็บเกี่ยวความรู้ในห้องเรียนให้มาก และหาประสบการณ์ไปพัฒนาทักษะจากการลงมือทำจริง'
  }
];

const showProfileCard = (index) => {
  profileCard.style.display = 'block';
  profileCard.style.zIndex = '1001';
  profileCard.querySelector('.profile-img-card').src = profiles[index].image;
  profileCard.querySelector('#profile-name').textContent = profiles[index].name;
  profileCard.querySelector('#profile-description').innerHTML = profiles[index].description;

  profileCard.classList.add('show');
  backgroundOverlay.style.display = 'block';
};

const hideProfileCard = () => {
  profileCard.style.display = 'none';
  backgroundOverlay.style.display = 'none';
};

profileImgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    showProfileCard(index);
  });
});

closeBtn.addEventListener('click', () => {
  hideProfileCard();
});

backgroundOverlay.addEventListener('click', () => {
  hideProfileCard();
});

//------------------------------Journey page----------------------------------------