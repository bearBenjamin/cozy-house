const createCardPet = (data) => {
  const templateCard = document.querySelector('#pet-card-template').content;
  const cardPet = templateCard.cloneNode(true);

  const imgPet = cardPet.querySelector('.pets__list-image');
  const imgSource = cardPet.querySelector('.pets__img-source');
  const namePet = cardPet.querySelector('.pets__list-title');
  const btnPet = cardPet.querySelector('.pets__list-button');

  imgPet.src = `${data.img}@1x.jpg`;
  imgPet.srcset = `${data.img}@2x.jpg`;
  imgSource.srcset = `${data.img}@1x.webp 1x, ${data.img}@2x.webp 2x`;
  namePet.textContent = data.name;
  btnPet.id = data.id;

  return cardPet;
};

const renderCards = (listElement, datas) => {
  listElement.innerHTML = '';
  datas.forEach((pet) => listElement.appendChild(createCardPet(pet)));
};

export { renderCards, createCardPet };


