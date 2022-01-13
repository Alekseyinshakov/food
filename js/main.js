import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModalFunction} from './modules/modal';
import {showModalByScroll} from './modules/modal';


const modalTimerId = setTimeout(() => {
  openModalFunction('.modal', modalTimerId)
}, 400000);
showModalByScroll('.modal', modalTimerId)


calc()
cards()
forms('form', modalTimerId)
modal('[data-modal]', '.modal', modalTimerId)
slider({
  slide: '.offer__slide',
  nextArr: '.offer__slider-next',
  prewArr: '.offer__slider-prev'
})
tabs('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active')
timer('.timer', '2022-5-6')