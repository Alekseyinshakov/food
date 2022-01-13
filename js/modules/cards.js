import {getResource} from '../services/services';

function cards(params) {
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
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
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
}

export default cards;