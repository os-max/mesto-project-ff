const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, img, handleDelete) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardName = newCard.querySelector('.card__title');
  newCardName.textContent = name;

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = img;
  newCardImage.alt = name;

  const newCardDelete = newCard.querySelector('.card__delete-button');
  newCardDelete.addEventListener('click', handleDelete);

  return newCard;
}

function addCard(name, img) {
  placesList.append(createCard(name, img, deleteCard));
}

function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}

function addInitialCards() {
  initialCards.forEach(el => {
    addCard(el.name, el.link);
  })
}

addInitialCards();