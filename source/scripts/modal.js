import { petsData } from './data';

const modal = document.querySelector('.modal-container');
const imgModal = modal.querySelector('.modal-info__img');
const titleModal = modal.querySelector('.modal-info__title');
const secondaryTitleModal = modal.querySelector('.modal-info__secondary-title');
const textModal = modal.querySelector('.modal-info__text');
const ageList = modal.querySelector('.age');
const inoculationsList = modal.querySelector('.inoculations');
const diseasesList = modal.querySelector('.diseases');
const parasitesList = modal.querySelector('.parasites');
const btnClose = modal.querySelector('.modal-info__button-close');


const openModal = (id) => {
  const pet = petsData.find((item) => item.id === id);

  if (!pet) {
    return;
  }

  const nameImg = pet.img.split('/').pop();

  imgModal.src = `./images/pets/${nameImg}`;
  titleModal.textContent = pet.name;
  secondaryTitleModal.textContent = `${pet.type} - ${pet.breed}`;
  textModal.textContent = pet.description;
  ageList.textContent = ` ${pet.age}`;
  inoculationsList.textContent = ` ${pet.inoculations.join(', ')}`;
  diseasesList.textContent = ` ${pet.diseases.join(', ')}`;
  parasitesList.textContent = ` ${pet.parasites.join(', ')}`;

  modal.classList.remove('modal-container--close');
  document.body.classList.add('page__body--noscroll');
};

const closeModal = () => {
  modal.classList.add('modal-container--close');
  document.body.classList.remove('page__body--noscroll');
};

const initModal = () => {
  const sliderContainer = document.querySelector('.pets__slider-container');

  sliderContainer.addEventListener('click', (evt) => {
    const btn = evt.target.closest('.pets__list-button');

    if (btn) {
      openModal(Number(btn.id));
    }
  });

  btnClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !modal.classList.contains('modal-container--close')) {
      closeModal();
    }
  });
};


export { initModal };
