import '../styles/index.css';
import {addCard} from './card.js';
import initialCards from './initialCards.js';
import {openModal, closeModal} from './modal.js';

const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const newCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;

const formNewCard = document.forms["new-place"];
const newCardName = formNewCard['place-name'];
const newCardSource = formNewCard.link;

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

function addInitialCards() {
  initialCards.forEach(el => {
    addCard(placesList, 'end', el);
  })
  const cardImages = document.querySelectorAll('.card__image');
  cardImages.forEach(el => el.addEventListener('click', handleImageClick));
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(evt.target.closest('.popup'));
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const name = newCardName.value;
  const link = newCardSource.value
  addCard(placesList, 'start', {name, link});
  closeModal(evt.target.closest('.popup'));
  formNewCard.reset();

  const cardImage = document.querySelector('.card__image');
  cardImage.addEventListener('click', handleImageClick);
}

function handleImageClick (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupTypeImage);
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

newCardButton.addEventListener('click', () => openModal(popupNewCard));

popupCloseButtons.forEach((el) => {
  el.addEventListener('click', (evt) => closeModal(evt.target.closest('.popup')));
})

formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formNewCard.addEventListener('submit', handleFormSubmitNewCard);

addInitialCards();
