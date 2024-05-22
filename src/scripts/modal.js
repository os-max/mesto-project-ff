function handleClick(evt) {
  const popupContent = evt.currentTarget.querySelector('.popup__content');
  if (!popupContent.contains(evt.target)) closeModal(evt.target);
}

function handleEscape (evt) {
  if (evt.key === 'Escape') {
    const window = document.querySelector('.popup_is-opened');
    closeModal(window);
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('click', handleClick);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('click', handleClick);
}
