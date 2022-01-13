function openModalFunction(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector)
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
  console.log(modalTimerId);
  if (modalTimerId) {
    clearTimeout(modalTimerId)
  }
  removeEventListener('scroll', showModalByScroll)
}
function closeModalFunction(modalSelector) {
  const modal = document.querySelector(modalSelector)
  modal.style.display = ''
  document.body.style.overflow = '';
  
}

function showModalByScroll(modalSelector, modalTimerId) {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openModalFunction(modalSelector, modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //*********************** MODAL************************ */

  const modal = document.querySelector(modalSelector)
  const openModal = document.querySelectorAll(triggerSelector)


  openModal.forEach(item => {
    item.addEventListener('click', () => {
      openModalFunction(modalSelector, modalTimerId);
    })
  })



  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModalFunction(modalSelector);
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.style.display) {
      closeModalFunction(modalSelector);
    }
  })

  window.addEventListener('scroll', showModalByScroll(modalSelector, modalTimerId))






}

export default modal;
export {openModalFunction};
export {closeModalFunction};
export {showModalByScroll};