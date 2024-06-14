import '../styles/index.css';
import {createCard, handleDelete, handleLike} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation, validationConfig} from './validation.js'
import {getMyData, getInitialCards} from './API.js';

const initialCards = [];
let userData;

const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const newCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;

const formNewCard = document.forms["new-place"];
const newCardName = formNewCard['place-name'];
const newCardSource = formNewCard.link;

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const handlers = {
  handleDelete,
  handleLike,
  handleImageClick
};

function addCard(place, position, cardData) {
  const newCard = createCard(cardData, handlers, userData);
  switch(position) {
    case 'start':
      place.prepend(newCard);
      break;
    case 'end':
      place.append(newCard);
      break;
    default:
      place.append(newCard);
  }
};


function addCards(cards) {
  cards.forEach(el => {
    addCard(placesList, 'end', el);
  })
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const name = newCardName.value;
  const link = newCardSource.value;
  addCard(placesList, 'start', {name, link});
  closeModal(popupNewCard);
  formNewCard.reset();
}

function handleImageClick (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupTypeImage);
}

function setMyData(name, about, avatar) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.setAttribute('style', `background-image: url(${avatar});`)
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
});

newCardButton.addEventListener('click', () => {
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
})

popupCloseButtons.forEach(el => {
  const popup = el.closest('.popup');
  el.addEventListener('click', evt => {
    closeModal(popup);
  })
});

formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);

enableValidation();

const dataGetter = getMyData()
  .then(res => {
    userData = res;
    setMyData(userData.name, userData.about, userData.avatar)
  })
  .catch(error => console.log(`Ошибка при получении данных о пользователе: ${error}`))

const cardsGetter = getInitialCards()
  .then(
    cards => {
      addCards(cards);
  })
  .catch(error => console.log(`Ошибка при попытке получения карточек: ${error}`));

Promise.all([dataGetter, cardsGetter])
  .then(res => console.log(res));
