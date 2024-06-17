import '../styles/index.css';
import {createCard, handleDelete, handleLike} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js'
import {
  getMyData,
  getInitialCards,
  setNewUserData,
  sendNewCard,
  likeCard,
  dislikeCard,
  deleteCard,
  changeAvatar
} from './API.js';

let userId = '';

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
const profileSubmitButton = formEditProfile.querySelector('.popup__button');

const formNewCard = document.forms["new-place"];
const newCardName = formNewCard['place-name'];
const newCardSource = formNewCard.link;
const newCardSubmitButton = formNewCard.querySelector('.popup__button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const formChangeAvatar = document.forms["change-avatar"];
const avatarLinkInput = formChangeAvatar.avatar;
const avatarSubmitButton = formChangeAvatar.querySelector('.popup__button');

const popupTypeConfirm = document.querySelector('.popup_type_confirm');
const confirmDeleteButton = popupTypeConfirm.querySelector('.popup__button');

const handlers = {
  handleDelete,
  handleLike,
  handleImageClick,
  likeCard,
  dislikeCard,
  setupCardDelete
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup_input_error'
}

let deleteCardId = undefined;
let deleteCardElement = undefined;

function setupCardDelete(cardId, cardElement) {
  openModal(popupTypeConfirm);
  deleteCardId = cardId;
  deleteCardElement = cardElement;
}

function addCard(place, position, cardData) {
  const newCard = createCard(cardData, handlers, userId);
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


function addInitialCards(cards) {
  cards.forEach(el => {
    addCard(placesList, 'end', el);
  })
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохранение...';
  setNewUserData(nameInput.value, jobInput.value)
    .then(res => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popupEdit);
    })
    .catch(error => {
      console.log(`Ошибка при отправке данных о пользователе: ${error}`)
    })
    .finally(() => profileSubmitButton.textContent = 'Сохранить');
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const name = newCardName.value;
  const link = newCardSource.value;
  newCardSubmitButton.textContent = 'Сохранение...';
  sendNewCard(name, link)
    .then(newCard => {
      addCard(placesList, 'start', newCard);
      formNewCard.reset();
      closeModal(popupNewCard);
      clearValidation(popupNewCard, validationConfig);
    })
    .catch(error => {
      console.log(`Ошибка при отправке карточки: ${error}`);
    })
    .finally(() => newCardSubmitButton.textContent = 'Сохранить');
}

function handleImageClick (src, alt) {
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  openModal(popupTypeImage);
}

function setMyData(name, about, avatar) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.setAttribute('style', `background-image: url(${avatar});`)
}

function handleAvatarChange(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...'
  changeAvatar(avatarLinkInput.value)
    .then(res => {
      profileImage.setAttribute('style', `background-image: url(${avatarLinkInput.value});`);
      closeModal(popupTypeAvatar);
      formChangeAvatar.reset();
      clearValidation(formChangeAvatar, validationConfig);
    })
    .catch(error => {
      console.log(`Ошибка при изменении аватара: ${error}`);
    })
    .finally(() => avatarSubmitButton.textContent = 'Сохранить');
}

function handleCardDeletion(evt) {
  evt.preventDefault();
  confirmDeleteButton.textContent = 'Удаление...';
  deleteCard(deleteCardId)
    .then(res => {
      deleteCardElement.remove();
      closeModal(popupTypeConfirm);
    })
    .catch(error => {
      console.log(`Не удалось удалить карточку, ошибка: ${error}`)
    })
    .finally(() => confirmDeleteButton.textContent = 'Да');
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
});

newCardButton.addEventListener('click', () => openModal(popupNewCard));

profileImage.addEventListener('click', () => openModal(popupTypeAvatar));

popupCloseButtons.forEach(el => {
  const popup = el.closest('.popup');
  el.addEventListener('click', () => closeModal(popup))
});

formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);
formChangeAvatar.addEventListener('submit', handleAvatarChange);

popupTypeConfirm.addEventListener('submit', handleCardDeletion);

enableValidation(validationConfig);

Promise.all([getMyData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    setMyData(userData.name, userData.about, userData.avatar);
    addInitialCards(cards)
  })
  .catch(error => console.log(`Ошибка при загрузке данных пользователя/карточек: ${error}`));
