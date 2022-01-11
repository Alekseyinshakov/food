function timer(params) {
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
}

module.exports = timer;