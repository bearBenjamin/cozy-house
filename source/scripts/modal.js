import { finalPaginationData } from './data';

let modalElements = null;
let lastFocusedElement = null;

const getModalElements = () => {
  const modal = document.querySelector('.modal-container');

  if (!modal) {
    return null;
  }

  const elements = {
    modal,
    imgModal: modal.querySelector('.modal-info__img'),
    imgSource: modal.querySelector('.modal-info__img-source'),
    titleModal: modal.querySelector('.modal-info__title'),
    secondaryTitleModal: modal.querySelector('.modal-info__secondary-title'),
    textModal: modal.querySelector('.modal-info__text'),
    ageList: modal.querySelector('.age'),
    inoculationsList: modal.querySelector('.inoculations'),
    diseasesList: modal.querySelector('.diseases'),
    parasitesList: modal.querySelector('.parasites'),
    btnClose: modal.querySelector('.modal-info__button-close')
  };

  const isAllElementsFound = Object.values(elements).every((element) => element !== null);

  if (!isAllElementsFound) {
    return null;
  }

  return elements;
};

const handleTabKey = (evt) => {
  if (evt.key === 'Tab' && document.activeElement === modalElements.btnClose) {
    evt.preventDefault();
  }
};

const openModal = (id, triggerBtn) => {
  const pet = finalPaginationData.find((item) => item.id === id);

  if (!pet) {
    return;
  }

  modalElements.imgModal.src = `./${pet.img}@1x.jpg`;
  modalElements.imgModal.srcset = `./${pet.img}@2x.jpg`;
  modalElements.imgSource.srcset = `./${pet.img}@1x.webp 1x, ${pet.img}@2x.webp 2x`;
  modalElements.titleModal.textContent = pet.name;
  modalElements.secondaryTitleModal.textContent = `${pet.type} - ${pet.breed}`;
  modalElements.textModal.textContent = pet.description;
  modalElements.ageList.textContent = ` ${pet.age}`;
  modalElements.inoculationsList.textContent = ` ${pet.inoculations.join(', ')}`;
  modalElements.diseasesList.textContent = ` ${pet.diseases.join(', ')}`;
  modalElements.parasitesList.textContent = ` ${pet.parasites.join(', ')}`;

  lastFocusedElement = triggerBtn;

  modalElements.modal.classList.remove('modal-container--close');
  document.body.classList.add('page__body--noscroll');

  modalElements.btnClose.focus();

  document.addEventListener('keydown', handleTabKey);
};


const closeModal = () => {
  modalElements.modal.classList.add('modal-container--close');
  document.body.classList.remove('page__body--noscroll');

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }

  document.removeEventListener('keydown', handleTabKey);
};

const initModal = () => {
  modalElements = getModalElements();

  if (!modalElements) {
    return;
  }

  const sliderContainer = document.querySelector('.pets__slider-container');

  sliderContainer.addEventListener('click', (evt) => {
    const btn = evt.target.closest('.pets__list-button');

    if (btn) {
      openModal(Number(btn.id), btn);
    }
  });

  modalElements.btnClose.addEventListener('click', closeModal);

  modalElements.modal.addEventListener('click', (evt) => {
    if (evt.target === modalElements.modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !modalElements.modal.classList.contains('modal-container--close')) {
      closeModal();
    }
  });
};


export { initModal };
