import { finalPaginationData } from './data.js';
import { getCardsCount } from './util.js';
import { createCardPet } from './render.js';

const numCards = {
  DESKTOP: 8,
  TABLET: 6,
  MOBILE: 3
};


const firstPageBtn = document.querySelector('.pets__pagination-start');
const prevBtn = document.querySelector('.pets__pagination-left');

const lastPageBtn = document.querySelector('.pets__pagination-end');
const nextBtn = document.querySelector('.pets__pagination-right');

const conteinerCards = document.querySelector('.pets__list-catalog');
const numPage = document.querySelector('.pets__count');

let currentPage = 1;
let sumSize;

let currentCardsCount = getCardsCount(numCards);

const updateButtons = (numPageElement) => {
  numPageElement.textContent = currentPage;

  const isFirst = currentPage === 1;
  firstPageBtn.disabled = isFirst;
  prevBtn.disabled = isFirst;

  const isLast = currentPage === sumSize;
  lastPageBtn.disabled = isLast;
  nextBtn.disabled = isLast;
};

const renderPage = (countPage, container) => {
  sumSize = Math.ceil(finalPaginationData.length / currentCardsCount);

  const start = (countPage - 1) * currentCardsCount;
  const end = start + currentCardsCount;

  container.innerHTML = '';

  const currentItems = finalPaginationData.slice(start, end);
  currentItems.forEach((item) => {
    container.appendChild(createCardPet(item));
  });
};

const initResizeWatcher = () => {
  const observer = new ResizeObserver(() => {
    const newCount = getCardsCount(numCards);

    if (newCount !== currentCardsCount) {
      currentCardsCount = newCount;
      currentPage = 1;
      renderPage(currentPage, conteinerCards);
      updateButtons(numPage);
    }
  });

  observer.observe(document.body);
};


const initPagination = () => {
  if (!firstPageBtn || !prevBtn || !lastPageBtn || !nextBtn) {
    return;
  }

  renderPage(currentPage, conteinerCards);
  updateButtons(numPage);
  initResizeWatcher();


  nextBtn.addEventListener('click', () => {
    if (currentPage < sumSize) {
      currentPage += 1;
      renderPage(currentPage, conteinerCards);
      updateButtons(numPage);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage(currentPage, conteinerCards);
      updateButtons(numPage);
    }
  });

  lastPageBtn.addEventListener('click', () => {
    currentPage = sumSize;
    renderPage(currentPage, conteinerCards);
    updateButtons(numPage);
  });

  firstPageBtn.addEventListener('click', () => {
    currentPage = 1;
    renderPage(currentPage, conteinerCards);
    updateButtons(numPage);
  });
};


export { initPagination };
