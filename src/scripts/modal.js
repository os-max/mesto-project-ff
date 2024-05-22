function handleClick(evt) {
  closeModal(evt.target);
}

function handleEscape (evt) {
  if (evt.key === 'Escape') {
    const window = document.querySelector('.popup_is-opened');
    closeModal(window);
  }
}

export function openModal(window) {
  window.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
  window.addEventListener('click', handleClick);
}

export function closeModal(window) {
  window.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
  window.removeEventListener('click', handleClick);
}
