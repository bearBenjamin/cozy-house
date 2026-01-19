import { petsData } from './data.js';

const initCarousel = () => {
  const track = document.querySelector('.pets__list-track');
  const leftBtn = document.querySelector('.pets__button-left');
  const rightBtn = document.querySelector('.pets__button-right');

  if (!track || !leftBtn || !rightBtn) {
    return;
  }

  const slides = {
    left: track.querySelector('#slide-left .pets__list'),
    center: track.querySelector('#slide-center .pets__list'),
    right: track.querySelector('#slide-right .pets__list')
  };

  const sets = {
    left: [],
    center: [],
    right: []
  };

  let isMoving = false;

  const getCardsCount = () => {
    const isDesktop = window.matchMedia('(min-width: 1280px)').matches;
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches;
    let currentCount;

    if (isDesktop) {
      currentCount = 3;
    } else if (isTablet) {
      currentCount = 2;
    } else {
      currentCount = 1;
    }

    return currentCount;
  };

  let lastCardsCount = 0;

  const genereteUniqueSet = (count, excludeSet = []) => {
    const results = [];

    const availabels = petsData.filter((pet) => !excludeSet.some((item) => item.name === pet.name));

    const shuffledAvailabels = [...availabels].sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i += 1) {
      results.push(shuffledAvailabels[i]);
    }

    return results;
  };

  const createCardPet = (pet) => {
    const templateCard = document.querySelector('#pet-card-template').content;
    const cardPet = templateCard.cloneNode(true);

    const imgPet = cardPet.querySelector('.pets__list-image');
    const namePet = cardPet.querySelector('.pets__list-title');
    const btnPet = cardPet.querySelector('.pets__list-button');

    imgPet.src = pet.img;
    namePet.textContent = pet.name;
    btnPet.id = pet.id;

    return cardPet;
  };

  const renderSet = (listElement, petsSet) => {
    listElement.innerHTML = '';
    petsSet.forEach((pet) => listElement.appendChild(createCardPet(pet)));
  };

  const setup = () => {
    const count = getCardsCount();

    sets.center = genereteUniqueSet(count);
    sets.left = genereteUniqueSet(count, sets.center);
    sets.right = genereteUniqueSet(count, sets.center);

    renderSet(slides.center, sets.center);
    renderSet(slides.left, sets.left);
    renderSet(slides.right, sets.right);
  };

  const handleNavigation = (direction) => {
    if(isMoving) {
      return;
    }

    isMoving = true;

    const count = getCardsCount();

    track.style.transition = 'transform 0.5s ease-in-out';

    if (direction === 'next') {
      track.style.transform = 'translateX(-66.666666%)';
    } else {
      track.style.transform = 'translateX(0%)';
    }

    track.addEventListener('transitionend', () => {
      track.style.transition = 'none';

      if (direction === 'next') {
        sets.left = [...sets.center];
        sets.center = [...sets.right];
        sets.right = genereteUniqueSet(count, sets.center);
      } else {
        sets.right = [...sets.center];
        sets.center = [...sets.left];
        sets.left = genereteUniqueSet(count, sets.center);
      }

      renderSet(slides.center, sets.center);
      renderSet(slides.left, sets.left);
      renderSet(slides.right, sets.right);

      track.style.transform = 'translateX(-33.333333%)';
      isMoving = false;
    }, { once: true });
  };

  rightBtn.addEventListener('click', () => handleNavigation('next'));
  leftBtn.addEventListener('click', () => handleNavigation('prev'));

  const observer = new ResizeObserver(() => {
    const newCount = getCardsCount();

    if (newCount !== lastCardsCount) {
      lastCardsCount = newCount;
      setup();
    } else {
      track.style.transform = 'translateX(-33.333333%)';
    }
  });

  observer.observe(track.parentElement);
};

export { initCarousel };
