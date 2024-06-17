function setEventListners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((el) => {
    el.addEventListener('input', () => {
      isInputValid(formElement, el, validationConfig);
      toggleButtonState(formElement, inputList, validationConfig);
    })
  })
}

function disableButton(submitButton, validationConfig) {
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;
}

function isFormValid(inputList) {
  return inputList.some((el) => !el.validity.valid);
}

function toggleButtonState(formElement, inputList, validationConfig) {
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  if (isFormValid(inputList)) {
    disableButton(submitButton, validationConfig);
    return
  }
  submitButton.classList.remove(validationConfig.inactiveButtonClass);
  submitButton.disabled = false;
}

function showError(formElement, inputElement, errorMessage, validationConfig) {
  const formError = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
}

function hideError(formElement, inputElement, validationConfig) {
  const formError = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  formError.textContent = '';
}

function isInputValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, validationConfig)
    return
  }
  hideError(formElement, inputElement, validationConfig);
}

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((el) => {
    setEventListners(el, validationConfig);
  })
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((el) => hideError(formElement, el, validationConfig));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  disableButton(submitButton, validationConfig);
}
