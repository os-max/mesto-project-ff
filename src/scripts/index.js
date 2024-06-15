import '../styles/index.css';
import {createCard, handleDelete, handleLike} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation, validationConfig} from './validation.js'
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
console.log()

const handlers = {
  handleDelete,
  handleLike,
  handleImageClick,
  likeCard,
  dislikeCard,
};

let cardPendingDelete = undefined
let cardPendingDeleteId = undefined;

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
      console.log(res);
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popupEdit);
      profileSubmitButton.textContent = 'Сохранить';
    })
    .catch(error => console.log(error));
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
      newCardSubmitButton.textContent = 'Сохранить';
    })
    .catch(error => {
      console.log(`Ошибка ${error}. Попробуйте повторить загрузку позже`)
    });
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

function handleAvatarChange(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...'
  changeAvatar(avatarLinkInput.value)
    .then(res => {
      console.log(res);
      profileImage.setAttribute('style', `background-image: url(${avatarLinkInput.value});`);
      closeModal(popupTypeAvatar);
      avatarSubmitButton.textContent = 'Сохранить';
    })
    .catch(error => console.log(error));
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
});

clearValidation(popupNewCard, validationConfig);
newCardButton.addEventListener('click', () => openModal(popupNewCard));

clearValidation(popupTypeAvatar, validationConfig);
profileImage.addEventListener('click', evt => openModal(popupTypeAvatar));

popupCloseButtons.forEach(el => {
  const popup = el.closest('.popup');
  el.addEventListener('click', evt => {
    closeModal(popup);
  })
});

formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);
formChangeAvatar.addEventListener('submit', handleAvatarChange);

enableValidation();

const userDataGetter = getMyData()
  .then(res => res)
  .catch(error => `Ошибка при получении данных о пользователе: ${error}`);

const cardsGetter = getInitialCards()
  .then(cards => cards)
  .catch(error => `Ошибка при попытке получения карточек: ${error}`);

Promise.all([userDataGetter, cardsGetter])
  .then(([userData, cards]) => {
    console.log(cards);
    userId = userData._id;
    setMyData(userData.name, userData.about, userData.avatar);
    addInitialCards(cards);
  })
  .catch(error => console.log(error));

document.addEventListener('deleteCard', evt => {
  cardPendingDelete = evt.target;
  cardPendingDeleteId = evt.detail;
  openModal(popupTypeConfirm);
})

popupTypeConfirm.addEventListener('submit', evt => {
  evt.preventDefault();
  confirmDeleteButton.textContent = 'Удаление...'
  deleteCard(cardPendingDeleteId)
    .then(res => {
      console.log(res)
      cardPendingDelete.remove();
      closeModal(popupTypeConfirm);
      confirmDeleteButton.textContent = 'Да'
    })
    .catch(error => console.log(error));
})
