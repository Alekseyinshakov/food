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
const closeModal = document.querySelector('[data-close]')
const modalTimerId = setTimeout(openModalFunction, 500000)

openModal.forEach(item => {
  item.addEventListener('click', () => {
    openModalFunction();
  })
})

closeModal.addEventListener('click', () => {
  closeModalFunction();
})

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
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

console.log('bag');
console.log('bag1');
console.log('bag3');

//*********************** CARDS************************ */

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

new Cards('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229, cardsContainer, 'menu__item', 'big').render()

new Cards('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550, cardsContainer, 'menu__item').render()

new Cards('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 430, cardsContainer, 'menu__item').render()