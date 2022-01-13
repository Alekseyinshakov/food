function slider({slide, nextArr, prewArr}) {
  //*********************** SLIDER************************ */
  function getZiro(num) {
    if (num < 10) {
      return '0' + num
    } else {
      return num
    }
  }
  

  const sliderItems = document.querySelectorAll(slide),
    sliderCounter = document.querySelector('.offer__slider-counter'),
    sliderPrevBtn = sliderCounter.querySelector(prewArr),
    sliderNextBtn = sliderCounter.querySelector(nextArr),
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
      sliderDots[i - 1].classList.add('dot-active')
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

}

export default slider;