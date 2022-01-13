function calc(params) {
  //*********************** CALCULATOR************************ */

  const result = document.querySelector('.calculating__result span');
  let gender, height, weight, age, ratio;


  gender = 'female';
  ratio = 1.375


  initLocal();
  calcTotal();

  getStaticInfo('#gender', 'calculating__choose-item_active')
  getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active')

  getDynamicInfo('#height')
  getDynamicInfo('#weight')
  getDynamicInfo('#age')

  function initLocal(params) {
    if (localStorage.getItem('gender')) {
      gender = localStorage.getItem('gender')
      document.querySelectorAll('#gender div').forEach(element => {
        element.classList.remove('calculating__choose-item_active')
      })
      document.querySelector(`#${gender}`).classList.add('calculating__choose-item_active')
    }
    if (localStorage.getItem('height')) {
      document.querySelector('#height').value = localStorage.getItem('height')
      height = +document.querySelector('#height').value
    }
    if (localStorage.getItem('weight')) {
      document.querySelector('#weight').value = localStorage.getItem('weight')
      weight = +document.querySelector('#weight').value
    }
    if (localStorage.getItem('age')) {
      document.querySelector('#age').value = localStorage.getItem('age')
      age = +document.querySelector('#age').value
    }
    if (localStorage.getItem('ratio')) {
      ratio = +localStorage.getItem('ratio')
      document.querySelectorAll('.calculating__choose_big div').forEach(element => {
        element.classList.remove('calculating__choose-item_active')
      })
      document.querySelector(`[data-ratio="${ratio}"]`).classList.add('calculating__choose-item_active')
    }

  }

  function calcTotal(params) {
    if (gender && height && weight && age && ratio) {
      if (gender === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
    } else {
      result.textContent = '_____';
      return;
    }
  }

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red"
      } else {
        input.style.border = "none"
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          localStorage.setItem('height', height)
          break;
        case 'weight':
          weight = +input.value;
          localStorage.setItem('weight', weight)
          break;
        case 'age':
          age = +input.value;
          localStorage.setItem('age', age)
          break;
      }
      calcTotal();
    })
  }

  function getStaticInfo(parantSelector, classActive) {
    const elements = document.querySelectorAll(`${parantSelector} div`);

    elements.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio')
          localStorage.setItem('ratio', ratio)
        } else {
          gender = e.target.getAttribute('id')
          localStorage.setItem('gender', gender)
        }

        elements.forEach(elem => {
          elem.classList.remove(classActive)
        })
        e.target.classList.add(classActive)

        calcTotal();

      })
    })
  }
}

export default calc;