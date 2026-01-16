const initPageBurger = () => {
  const btnPageToggle = document.querySelector('.page-button-toggle');
  const pageHeader = document.querySelector('.page-header');
  const pageNavigationList = document.querySelector('.page-navigation__list');

  const listLinkNav = document.querySelectorAll('.page-navigation__list-item-link');

  if (!btnPageToggle) {
    return;
  }

  btnPageToggle.addEventListener('click', () => {
    const isClosed = btnPageToggle.classList.contains('page-button-toggle--close');

    if (isClosed) {
      btnPageToggle.classList.remove('page-button-toggle--close');
      btnPageToggle.classList.add('page-button-toggle--open');

      document.body.classList.remove('page__body--noscroll');

      pageHeader.classList.remove('page-header--close');

      pageNavigationList.classList.remove('page-navigation__list--close');
      pageNavigationList.classList.add('page-navigation__list--open');
    } else {
      btnPageToggle.classList.add('page-button-toggle--close');
      btnPageToggle.classList.remove('page-button-toggle--open');

      document.body.classList.add('page__body--noscroll');

      pageNavigationList.classList.remove('page-navigation__list--open');
      pageHeader.classList.add('page-header--close');
      pageNavigationList.classList.add('page-navigation__list--close');
    }
  });

  listLinkNav.forEach((link) => {
    link.addEventListener('click', () => {
      btnPageToggle.classList.remove('page-button-toggle--close');
      btnPageToggle.classList.add('page-button-toggle--open');

      document.body.classList.remove('page__body--noscroll');

      pageHeader.classList.remove('page-header--close');

      pageNavigationList.classList.remove('page-navigation__list--close');
      pageNavigationList.classList.add('page-navigation__list--open');
    });
  });
};

export { initPageBurger };
