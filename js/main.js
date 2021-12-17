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
        days = Math.floor(t/(1000*60*60*24)),
        hours = Math.floor((t%(1000*60*60*24))/(1000*60*60)),
        minutes = Math.floor((t%(1000*60*60))/(1000*60)),
        seconds = Math.floor((t%(1000*60))/1000)
        
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
  }
  else {
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
const modalTimerId = setTimeout(openModalFunction, 5000)

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
}

function showModalByScroll(params) {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
    openModalFunction();
    removeEventListener('scroll', showModalByScroll)
  }
}

function closeModalFunction() {
  modal.style.display = ''
  document.body.style.overflow = ''
  clearTimeout(modalTimerId)
}