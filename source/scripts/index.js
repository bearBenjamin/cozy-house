/*
// логика кнопки бургер меню;
const btnToggle = document.querySelector('.button-toggle');
const mainHeader = document.querySelector('.main-header');
const mainNavigationList = document.querySelector('.main-navigation__list');

btnToggle.addEventListener('click', () => {
  const isClosed = btnToggle.classList.contains('button-toggle--close');

  if (isClosed) {
    btnToggle.classList.remove('button-toggle--close');
    btnToggle.classList.add('button-toggle--open');

    document.body.classList.remove('page__body--noscroll');

    mainHeader.classList.remove('main-header--close');

    mainNavigationList.classList.remove('main-navigation__list--close');
    mainNavigationList.classList.add('main-navigation__list--open');
  } else {
    btnToggle.classList.add('button-toggle--close');
    btnToggle.classList.remove('button-toggle--open');

    document.body.classList.add('page__body--noscroll');

    mainNavigationList.classList.remove('main-navigation__list--open');
    mainHeader.classList.add('main-header--close');
    mainNavigationList.classList.add('main-navigation__list--close');
  }
});

// логика меню навигации сайта;

*/
