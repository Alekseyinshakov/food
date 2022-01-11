function modal(params) {
  //*********************** MODAL************************ */

  const modal = document.querySelector('.modal')
  const openModal = document.querySelectorAll('[data-modal]')
  const modalTimerId = setTimeout(openModalFunction, 500000)

  openModal.forEach(item => {
    item.addEventListener('click', () => {
      openModalFunction();
    })
  })



  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
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
}

module.exports = modal;