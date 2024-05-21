let listnerEscape = undefined;
let listnerClick = undefined;

function handleClick(evt) {
  console.log(evt);
  closeModal(evt.target);
}

const handleEscape = function (window) {
  listnerEscape = function (evt) {
    if (evt.key === 'Escape') {
      closeModal(window);
    }
  }
  return listnerEscape;
}

export function openModal(window) {
  window.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape(window));
  window.addEventListener('click', handleClick);
}

export function closeModal(window) {
  window.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', listnerEscape);
  document.removeEventListener('click', listnerClick);
}
