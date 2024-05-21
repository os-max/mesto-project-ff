const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

function createCard(name, img, handleDelete, handleLike, openImage, handleModal) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = img;
  newCardImage.alt = name;
  newCardImage.addEventListener('click', (evt) => {openImage(evt, handleModal)});

  const newCardDelete = newCard.querySelector('.card__delete-button');
  newCardDelete.addEventListener('click', handleDelete);

  const newCardLike = newCard.querySelector('.card__like-button');
  newCardLike.addEventListener('click', handleLike);

  return newCard;
};

function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

function openImage(evt, handleModal) {
  popupImage.src = evt.target.src;
  popupImage.name = evt.target.name;
  popupCaption.textContent = evt.target.name;
  handleModal(popupTypeImage);
}

export function addCard(place, position, name, img, handleModal) {
  switch(position) {
    case 'start':
      place.prepend(createCard(name, img, deleteCard, likeCard, openImage, handleModal));
      break;
    case 'end':
      place.append(createCard(name, img, deleteCard, likeCard, openImage, handleModal));
      break;
    default:
      place.append(createCard(name, img, deleteCard, likeCard, openImage, handleModal));
  }
};
