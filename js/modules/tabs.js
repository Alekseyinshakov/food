function tabs(tabListSelector, tabContentSelector, tabItemsSelector, activeClass) {
  //*********************** TABS************************ */

  const tabList = document.querySelector(tabListSelector);
  const tabContent = document.querySelectorAll(tabContentSelector);
  const tabItems = tabList.querySelectorAll(tabItemsSelector);

  function remooveClass(arr, className) {
    arr.forEach(itm => {
      itm.classList.remove(className);
    })
  }

  tabList.addEventListener('click', (e) => {
    tabItems.forEach((item, i) => {
      if (e.target == item) {
        remooveClass(tabItems, activeClass);
        tabItems[i].classList.add(activeClass);

        remooveClass(tabContent, 'active');
        remooveClass(tabContent, 'fade');
        tabContent[i].classList.add('active', 'fade');
      }
    })

  })
}

export default tabs;