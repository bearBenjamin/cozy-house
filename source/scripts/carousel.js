import { petsData } from './data.js';
import { getCardsCount, genereteUniqueSet, shiftSets } from './util.js';
import { renderCards } from './render.js';

const track = document.querySelector('.pets__list-track');
const leftBtn = document.querySelector('.pets__button-left');
const rightBtn = document.querySelector('.pets__button-right');

const state = {
  sets: { left: [], center: [], right: [] },
  isMoving: false,
  lastCardsCount: 0
};

const updateSlidesUI = (slides) => {
  renderCards(slides.center, state.sets.center);
  renderCards(slides.left, state.sets.left);
  renderCards(slides.right, state.sets.right);
};

const setupCarousel = (slides) => {
  const count = getCardsCount();

  state.sets.center = genereteUniqueSet(petsData, count);
  state.sets.left = genereteUniqueSet(petsData, count, state.sets.center);
  state.sets.right = genereteUniqueSet(petsData, count, state.sets.center);

  updateSlidesUI(slides);
};

const initResizeWatcher = (slides) => {
  const observer = new ResizeObserver(() => {
    const newCount = getCardsCount();
    if (newCount !== state.lastCardsCount) {
      state.lastCardsCount = newCount;
      setupCarousel(slides);
    } else {
      track.style.transform = 'translateX(-33.333333%)';
    }
  });
  observer.observe(track.parentElement);
};

const handleNavigation = (direction, slides) => {
  if(state.isMoving) {
    return;
  }

  state.isMoving = true;

  const count = getCardsCount();

  track.style.transition = 'transform 0.5s ease-in-out';

  if (direction === 'next') {
    track.style.transform = 'translateX(-66.666666%)';
  } else {
    track.style.transform = 'translateX(0%)';
  }

  track.addEventListener('transitionend', () => {
    track.style.transition = 'none';

    state.sets = shiftSets(direction, state.sets, count, petsData);
    updateSlidesUI(slides);

    track.style.transform = 'translateX(-33.333333%)';
    state.isMoving = false;
  }, { once: true });
};

const initCarousel = () => {
  if (!track || !leftBtn || !rightBtn) {
    return;
  }

  const slides = {
    left: track.querySelector('#slide-left .pets__list'),
    center: track.querySelector('#slide-center .pets__list'),
    right: track.querySelector('#slide-right .pets__list')
  };

  rightBtn.addEventListener('click', () => handleNavigation('next', slides));
  leftBtn.addEventListener('click', () => handleNavigation('prev', slides));

  setupCarousel(slides);
  initResizeWatcher(slides);
};

export { initCarousel };
