//*********************** TABS************************ */

const tabList = document.querySelector('.tabheader__items');
const tabContent = document.querySelectorAll('.tabcontent');
const tabItems = tabList.querySelectorAll('.tabheader__item');

function remooveClass(arr, className) {
  arr.forEach(itm => {
    itm.classList.remove(className);
  })
}

tabList.addEventListener('click', (e) => {
  tabItems.forEach((item, i) => {
    if (e.target == item) {
      remooveClass(tabItems, 'tabheader__item_active');
      tabItems[i].classList.add('tabheader__item_active');

      remooveClass(tabContent, 'active');
      remooveClass(tabContent, 'fade');
      tabContent[i].classList.add('active', 'fade');
    }
  })

})

//*********************** TIMER************************ */

const deadLine = '2021-12-27';

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
    seconds = Math.floor((t % (1000 * 60)) / 1000)

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

function getZiro(num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}


function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds')
  timeInterval = setInterval(updateClock, 1000);

  updateClock()

  function updateClock() {
    const t = getTimeRemaining(endtime)

    days.innerHTML = getZiro(t.days)
    hours.innerHTML = getZiro(t.hours)
    minutes.innerHTML = getZiro(t.minutes)
    seconds.innerHTML = getZiro(t.seconds)

    if (t.total <= 0) {
      clearInterval(timeInterval)
    }
  }
}

setClock('.timer', deadLine)

//*********************** MODAL************************ */

const modal = document.querySelector('.modal')
const openModal = document.querySelectorAll('[data-modal]')
const modalTimerId = setTimeout(openModalFunction, 500000)

openModal.forEach(item => {
  item.addEventListener('click', () => {
    openModalFunction();
  })
})



modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.getAttribute('data-close') == '') {
    closeModalFunction();
  }
})

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modal.style.display) {
    closeModalFunction();
  }
})

window.addEventListener('scroll', showModalByScroll)

function openModalFunction(params) {
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
  removeEventListener('scroll', showModalByScroll)
}

function showModalByScroll(params) {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openModalFunction();
  }
}

function closeModalFunction() {
  modal.style.display = ''
  document.body.style.overflow = ''
  clearTimeout(modalTimerId)
}

//*********************** CARDS************************ */

// fetch('http://localhost:3000/menu')
//     .then((data) => {
//       return data.json()
//     })
//     .then((result) => {
//       console.log(result);
//     })

const cardsContainer = document.querySelector('.menu .container');
cardsContainer.innerHTML = '';

class Cards {
  constructor(img, alt, title, descr, price, parent, ...classes) {
    this.img = img;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.transfer = 60;
    this.parent = parent;
    this.classes = classes;
    this.changeToRub();
  }
  changeToRub() {
    this.price = this.price * this.transfer;
  }
  render() {
    const element = document.createElement('div');
    if (this.classes.length === 0) {
      this.classes = 'menu__item'
      element.classList.add(this.classes)
    } else {
      this.classes.forEach(className => element.classList.add(className));
    }

    element.innerHTML = `
    <img src="${this.img}" alt="${this.alt}">
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>
    `;
    this.parent.append(element);
  }
}

const getResource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`)
  }
  return await res.json()
};

// getResource('http://localhost:3000/menu')
//     .then(data => {
//       console.log(data);
//       data.forEach(({img, altimg, title, descr, price}) => {
//         new Cards(img, altimg, title, descr, price, cardsContainer).render()
//       })
//     })

// getResource('http://localhost:3000/menu')
//     .then(data => createCards(data))

axios.get('http://localhost:3000/menu')
  .then(function (response) {
    createCards(response.data);
  })

function createCards(data) {
  data.forEach(({img, altimg, title, descr, price}) => {
    const newElement = document.createElement('div');
    newElement.classList.add('menu__item');
    newElement.innerHTML = `
    <img src="${img}" alt="${altimg}">
    <h3 class="menu__item-subtitle">${title}</h3>
    <div class="menu__item-descr">${descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${price}</span> грн/день</div>
    </div>
    `;
    cardsContainer.append(newElement);
  })
}



//*********************** FORMS************************ */

const forms = document.querySelectorAll('form');
const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
}

forms.forEach(item => {
  bindPostData(item)
})

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
      },
    body: data
  });
  return await res.json()
}

function bindPostData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    // form.append(statusMessage);
    form.insertAdjacentElement('afterend', statusMessage)

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()))

    postData('http://localhost:3000/requests', json)
    .then(data => {
      console.log(data);
      showThanksModal(message.success);
      statusMessage.remove();
    })
    .catch(() => {
      showThanksModal(message.failure);
    })
    .finally(() => {
      form.reset();
    })
  })
}

function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal__dialog')
  prevModalDialog.style.display = 'none';
  openModalFunction();
  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog')
  thanksModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>
  `;
  document.querySelector('.modal').append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.style.display = 'block';
    closeModalFunction();
  }, 4000);
}

//*********************** SLIDER************************ */


const sliderItems = document.querySelectorAll('.offer__slide'),
      sliderCounter = document.querySelector('.offer__slider-counter'),
      sliderPrevBtn = sliderCounter.querySelector('.offer__slider-prev'),
      sliderNextBtn = sliderCounter.querySelector('.offer__slider-next'),
      sliderCurrent = sliderCounter.querySelector('#current'),
      sliderTotal = sliderCounter.querySelector('#total'),
      sliderLine = document.querySelector('.offer__slider-wrapper-2'),
      sliderDotsContainer = document.querySelector('.carousel-indicators');

sliderDotsContainer.innerHTML = '';
for (let i = 0; i < sliderItems.length; i++) {
  const element = document.createElement('div');
  element.classList.add('dot');
  sliderDotsContainer.append(element)
}
let sliderDots = document.querySelectorAll('.dot');
let sliderI = 1;
sliderDots[0].classList.add('dot-active')

sliderDots.forEach((item, i) => {
  item.addEventListener('click', () => {
    sliderI = i + 1;
    showSlide(sliderI);
    changeDot(sliderI);
    sliderCurrent.textContent = getZiro(sliderI);
  })
})

const sliderWidth = 650 * sliderItems.length;
sliderLine.style.width = sliderWidth + 'px';

sliderTotal.textContent = getZiro(sliderItems.length);

sliderCurrent.textContent = getZiro(sliderI);

sliderNextBtn.addEventListener('click', () => {
  nextSlider();
})
sliderPrevBtn.addEventListener('click', () => {
  prevSlider();
})

function nextSlider() {
    if (sliderI < sliderItems.length) {
    sliderI++;
  } else {
    sliderI = 1;
  }
  sliderCurrent.textContent = getZiro(sliderI);
  showSlide(sliderI);
  changeDot(sliderI);
}

function prevSlider(params) {
  if (sliderI > 1) {
    sliderI--;
  } else {
    sliderI = sliderItems.length;
  }
  sliderCurrent.textContent = getZiro(sliderI);
  showSlide(sliderI);
  changeDot(sliderI);
}

function changeDot(i) {
  sliderDots.forEach((item) => {
    item.classList.remove('dot-active')
    sliderDots[i-1].classList.add('dot-active')
  })
}

function showSlide(i) {
  sliderLine.style.right = addPX((i * 650) - 650);

}

function addPX(num) {
  return num + 'px'
}

// sliderItems[0].style.display = 'block';
// sliderTotal.textContent = getZiro(sliderItems.length);
// let sliderI = 1;
// sliderCurrent.textContent = getZiro(sliderI);

// sliderNextBtn.addEventListener('click', () => {
//   nextSlider();
// })
// sliderPrevBtn.addEventListener('click', () => {
//   prevSlider();
// })

// function nextSlider(params) {
//   if (sliderI < sliderItems.length) {
//     sliderI++;
//   } else {
//     sliderI = 1;
//   }
//   sliderCurrent.textContent = getZiro(sliderI);
//   showSlide(sliderI);
// }

// function prevSlider(params) {
//   if (sliderI > 1) {
//     sliderI--;
//   } else {
//     sliderI = sliderItems.length;
//   }
//   sliderCurrent.textContent = getZiro(sliderI);
//   showSlide(sliderI);
// }

// function showSlide(i) {
//   sliderItems.forEach(item => {
//     item.style.display = '';
//   })
//   sliderItems[i-1].style.display = 'block';
// }
