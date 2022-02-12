export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive', 
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active',
}; 

export const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
  }

 export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
  }

export const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
  };

  const disableButtonSave = (buttonElement) => {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.disabled = true;
  };
  
  const enableButtonSave = (buttonElement) => {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  };
  
  export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      disableButtonSave(buttonElement);
    } else {
      enableButtonSave(buttonElement);
    }
  }; 

  const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings.submitButtonSelector, validationSettings.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, validationSettings.submitButtonSelector, validationSettings.inactiveButtonClass);
      });
    });
  };
  
  export const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
      setEventListeners(formElement, validationSettings);
    });
  }; 
  
 