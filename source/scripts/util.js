const DESKTOP = 1280;
const TABLET = 768;

const getCardsCount = (count) => {
  let currentCount;
  const isDesktop = window.matchMedia(`(min-width: ${DESKTOP}px)`).matches;
  const isTablet = window.matchMedia(`(min-width: ${TABLET}px)`).matches;

  if (isDesktop) {
    currentCount = count.DESKTOP;
    return currentCount;
  }

  if (isTablet) {
    currentCount = count.TABLET;
    return currentCount;
  }

  currentCount = count.MOBILE;
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

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { getCardsCount, genereteUniqueSet, shiftSets, shuffle };
