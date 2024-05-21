const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const handlers = {
  handleDelete,
  handleLike,
  openImage,
};

function createCard(element, handlers, handleModal) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = element.name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = element.link;
  newCardImage.alt = element.name;
  newCardImage.addEventListener('click', (evt) => {handlers.openImage(evt, handleModal)});

  const newCardDelete = newCard.querySelector('.card__delete-button');
  newCardDelete.addEventListener('click', handlers.handleDelete);

  const newCardLike = newCard.querySelector('.card__like-button');
  newCardLike.addEventListener('click', handlers.handleLike);

  return newCard;
};

function handleDelete(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
};

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

function openImage(evt, handleModal) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  handleModal(popupTypeImage);
}

export function addCard(place, position, element, handleModal) {
  switch(position) {
    case 'start':
      place.prepend(createCard(element, handlers, handleModal));
      break;
    case 'end':
      place.append(createCard(element, handlers, handleModal));
      break;
    default:
      place.append(createCard(element, handlers, handleModal));
  }
};
