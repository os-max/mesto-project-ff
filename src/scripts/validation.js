export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup_input_error'
}

function setEventListners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((el) => {
    el.addEventListener('input', () => {
      isInputValid(formElement, el);
      toggleButtonState(formElement, inputList);
    })
  })
}

function isFormValid(inputList) {
  return inputList.some((el) => !el.validity.valid);
}

function toggleButtonState(formElement, inputList) {
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  if (isFormValid(inputList)) {
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    return
  }
  submitButton.classList.remove(validationConfig.inactiveButtonClass);
}

function showError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add(validationConfig.inputErrorClass)
  formError.textContent = errorMessage;
}

function hideError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove(validationConfig.inputErrorClass)
  formError.textContent = '';
}

function isInputValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
    return
  }
  hideError(formElement, inputElement);
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((el) => {
    setEventListners(el);
  })
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((el) => hideError(formElement, el));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}
