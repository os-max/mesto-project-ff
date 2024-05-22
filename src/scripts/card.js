const cardTemplate = document.querySelector('#card-template').content;

function handleDelete(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
};

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

const handlers = {
  handleDelete,
  handleLike,
};

function createCard(cardData, handlers) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = cardData.name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;

  const newCardDelete = newCard.querySelector('.card__delete-button');
  newCardDelete.addEventListener('click', handlers.handleDelete);

  const newCardLike = newCard.querySelector('.card__like-button');
  newCardLike.addEventListener('click', handlers.handleLike);

  return newCard;
};

export function addCard(place, position, cardData) {
  switch(position) {
    case 'start':
      place.prepend(createCard(cardData, handlers));
      break;
    case 'end':
      place.append(createCard(cardData, handlers));
      break;
    default:
      place.append(createCard(cardData, handlers));
  }
};
