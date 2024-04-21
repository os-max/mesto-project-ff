const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, img) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = img;

  const newCardDelete = newCard.querySelector('.card__delete-button');
  newCardDelete.addEventListener('click', deleteCard);

  return newCard;
}

function addCard(name, img) {
  placesList.append(createCard(name, img));
}

function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}

function initialCardsCreation() {
  initialCards.forEach(el => {
    addCard(el.name, el.link);
  })
}

initialCardsCreation();