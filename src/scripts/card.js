const cardTemplate = document.querySelector('#card-template').content;

export function handleDelete(evt, cardId, cardSetter) {
  const cardElement = evt.target.closest('.card');
  cardSetter(cardId, cardElement);
};

export function handleLike(evt, likeButton, cardLikeCounter, cardId, likeAPI, dislikeAPI) {
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
  const isOwned = cardData.owner._id === userId;
  const isLiked = cardData.likes.some(el => el._id === userId);

  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = cardData.name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardImage.addEventListener('click', () => {
    handlers.handleImageClick(newCardImage.src, newCardImage.alt);
  });


  const newCardDelete = newCard.querySelector('.card__delete-button');
  if (isOwned) {
    newCardDelete.addEventListener('click', evt => {
      handlers.handleDelete(evt, cardData._id, handlers.setupCardDelete);
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
    handlers.handleLike(evt, newCardLike, newCardLikeCounter, cardData._id, handlers.likeCard, handlers.dislikeCard);
  });

  return newCard;
};
