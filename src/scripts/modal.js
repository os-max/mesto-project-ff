let listnerEscape = undefined;
let listnerClick = undefined;

const handleClick = function (window) {
  listnerClick = function curriedFunction (evt) {
    console.log(evt);
    if (evt.target === window) {
      closeModal(window);
    }
  }
  return listnerClick;
}

const handleEscape = function (window) {
  listnerEscape = function curriedFunction (evt) {
    console.log(evt);
    if (evt.key === 'Escape') {
      closeModal(window);
    }
  }
  return listnerEscape;
}

export function openModal(window) {
  window.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape(window));
  window.addEventListener('click', handleClick(window));
}

export function closeModal(window) {
  window.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', listnerEscape);
  window.removeEventListener('click', listnerClick);
}
