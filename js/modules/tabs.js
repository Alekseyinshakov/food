function tabs(params) {
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
}

module.exports = tabs;