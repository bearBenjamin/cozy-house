//import { petsData } from './data.js';
const initCarousel = () => {
  const leftBtn = document.querySelector('.pets__button-left');
  const rightBtn = document.querySelector('.pets__button-right');
  const slider = document.querySelector('.pets__list');

  if (!slider || !leftBtn || !rightBtn) {
    return;
  }

  const state = {
    index: 0,
    currentCount: 0,
    currentGap: 0,
    cardWidth: 0,
    lastCount: 0
  };

  const totalCards = slider.querySelectorAll('.pets__list-item').length;

  const updateMetrics = () => {
    const isDesktop = window.matchMedia('(min-width: 1280px)').matches;
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches;

    if (isDesktop) {
      state.currentCount = 3;
      state.currentGap = 90;
    } else if (isTablet) {
      state.currentCount = 2;
      state.currentGap = 40;
    } else {
      state.currentCount = 1;
      state.currentGap = 0;
    }

    if (state.lastCount !== state.currentCount) {
      state.index = 0;
      state.lastCount = state.currentCount;
    }

    const firstCard = document.querySelector('.pets__list-item');

    if (firstCard) {
      state.cardWidth = firstCard.getBoundingClientRect().width;
    }
  };

  const renderSlider = () => {
    const step = state.cardWidth + state.currentGap;
    const offset = state.index * state.currentCount * step;

    slider.style.transform = `translateX(${-offset}px)`;
  };

  const handleNavigation = (direction) => {
    const maxIndex = Math.ceil(totalCards / state.currentCount) - 1;

    if (direction === 'next') {
      state.index = (state.index < maxIndex) ? state.index + 1 : 0;
    } else {
      state.index = (state.index > 0) ? state.index - 1 : maxIndex;
    }

    renderSlider();
  };


  // window.addEventListener('resize', () => {
  //   updateMetrics();
  //   const maxIndex = Math.ceil(totalCards / state.currentCount) - 1;

  //   if (state.index > maxIndex) {
  //     state.index = maxIndex;
  //   }

  //   renderSlider();
  // });

  const observer = new ResizeObserver(() => {
    updateMetrics();

    const maxIndex = Math.ceil(totalCards / state.currentCount) - 1;
    if (state.index > maxIndex) {
      state.index = maxIndex;
    }

    renderSlider();
  });

  observer.observe(slider.parentElement);

  rightBtn.addEventListener('click', () => handleNavigation('next'));
  leftBtn.addEventListener('click', () => handleNavigation('prev'));

  //updateMetrics();
  //renderSlider();
};


export { initCarousel };
