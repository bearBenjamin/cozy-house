const createCardPet = (data) => {
  const templateCard = document.querySelector('#pet-card-template').content;
  const cardPet = templateCard.cloneNode(true);

  const imgPet = cardPet.querySelector('.pets__list-image');
  const namePet = cardPet.querySelector('.pets__list-title');
  const btnPet = cardPet.querySelector('.pets__list-button');

  imgPet.src = data.img;
  namePet.textContent = data.name;
  btnPet.id = data.id;

  return cardPet;
};

const renderCards = (listElement, datas) => {
  listElement.innerHTML = '';
  datas.forEach((pet) => listElement.appendChild(createCardPet(pet)));
};

export { renderCards, createCardPet };
