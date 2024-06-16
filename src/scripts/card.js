const cardTemplate = document.querySelector('#card-template').content;

export function handleDelete(evt, cardDeleteEvent) {
  const listItem = evt.target.closest('.card')
  listItem.dispatchEvent(cardDeleteEvent);
};

export function handleLike(evt, cardLikeCounter, cardId, likeAPI, dislikeAPI) {
  const likeButton = evt.target;
  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeAPI(cardId)
      .then(card => {
        likeButton.classList.remove('card__like-button_is-active');
        cardLikeCounter.textContent = card.likes.length;
      })
      .catch(error => console.log(`Ошибка при попытке дизлайка карточки: ${error}`));
  }
  else {
    likeAPI(cardId)
      .then(card => {
        likeButton.classList.add('card__like-button_is-active');
        cardLikeCounter.textContent = card.likes.length;
      })
      .catch(error => console.log(`Ошибка при попытке лайка карточки: ${error}`));
  }
}

export function createCard(cardData, handlers, userId) {
  const isOwned = (cardData.owner._id === userId) ? true : false;
  const isLiked = cardData.likes.some(el => el._id === userId);

  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = cardData.name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardImage.addEventListener('click', handlers.handleImageClick);


  const newCardDelete = newCard.querySelector('.card__delete-button');
  if (isOwned) {
    const cardDeleteEvent = new CustomEvent(`deleteCard`, {
      bubbles: true,
      detail: {
        id: cardData._id
      }
    });
    newCardDelete.addEventListener('click', evt => {
      handlers.handleDelete(evt, cardDeleteEvent);
    });
  }
  else {
    newCardDelete.remove();
  }

  const newCardLike = newCard.querySelector('.card__like-button');
  const newCardLikeCounter = newCard.querySelector('.card__like-counter');

  if (isLiked) {
    newCardLike.classList.add('card__like-button_is-active');
  }
  else {
    newCardLike.classList.remove('card__like-button_is-active');
  }

  newCardLikeCounter.textContent = cardData.likes.length;
  newCardLike.addEventListener('click', (evt) => {
    handlers.handleLike(evt, newCardLikeCounter, cardData._id, handlers.likeCard, handlers.dislikeCard);
  });

  return newCard;
};
