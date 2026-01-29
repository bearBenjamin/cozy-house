const DESKTOP = 1280;
const TABLET = 768;
const NUM_SLIDES_DESKTOP = 3;
const NUM_SLIDES_TABLET = 2;
const NUM_SLIDES_MOBILE = 1;

const getCardsCount = () => {
  let currentCount;
  const isDesktop = window.matchMedia(`(min-width: ${DESKTOP}px)`).matches;
  const isTablet = window.matchMedia(`(min-width: ${TABLET}px) and (max-width: ${DESKTOP - 1}px)`).matches;

  if (isDesktop) {
    currentCount = NUM_SLIDES_DESKTOP;
    return currentCount;
  }

  if (isTablet) {
    currentCount = NUM_SLIDES_TABLET;
    return currentCount;
  }

  currentCount = NUM_SLIDES_MOBILE;
  return currentCount;
};

const genereteUniqueSet = (datas, count, excludeSet = []) => {
  const results = [];

  const availabels = datas.filter((pet) => !excludeSet.some((item) => item.name === pet.name));

  const shuffledAvailabels = [...availabels].sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i += 1) {
    results.push(shuffledAvailabels[i]);
  }

  return results;
};

const shiftSets = (direction, currentSets, count, data) => {
  if (direction === 'next') {
    const newCenter = [...currentSets.right];
    return {
      left: [...currentSets.center],
      center: newCenter,
      right: genereteUniqueSet(data, count, newCenter)
    };
  } else {
    const newCenter = [...currentSets.left];
    return {
      right: [...currentSets.center],
      center: newCenter,
      left: genereteUniqueSet(data, count, newCenter)
    };
  }
};

export { getCardsCount, genereteUniqueSet, shiftSets };
