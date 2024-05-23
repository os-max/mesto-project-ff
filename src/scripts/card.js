const cardTemplate = document.querySelector('#card-template').content;

export function handleDelete(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
};

export function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

export function createCard(cardData, handlers) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = cardData.name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardImage.addEventListener('click', handlers.handleImageClick);

  const newCardDelete = newCard.querySelector('.card__delete-button');
  newCardDelete.addEventListener('click', handlers.handleDelete);

  const newCardLike = newCard.querySelector('.card__like-button');
  newCardLike.addEventListener('click', handlers.handleLike);

  return newCard;
};
