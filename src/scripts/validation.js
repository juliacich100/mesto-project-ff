 // Функция, которая добавляет класс с ошибкой
 const showInputError = (formElement, formInput, validationConfig) => {
    const inputError = formElement.querySelector(`.${formInput.id}-error`);
    inputError.classList.add(validationConfig.errorClass);
    inputError.textContent = formInput.validationMessage;
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput, validationConfig) => {
    const inputError = formElement.querySelector(`.${formInput.id}-error`);
    inputError.classList.remove(validationConfig.errorClass);
    inputError.textContent = '';
}

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput, validationConfig) => {
    if(formInput.validity.patternMismatch) {
        formInput.setCustomValidity(formInput.dataset.errorText);
    } else {
        formInput.setCustomValidity("");
    }
    if(!formInput.validity.valid) {
        showInputError(formElement, formInput, validationConfig);
    } else {
        hideInputError(formElement, formInput, validationConfig);
    }
}

const hasInvalidInput = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

const toggleButton = (formElement, validationConfig) => {
    const buttonElement= formElement.querySelector(validationConfig.submitButtonSelector);
    if(hasInvalidInput(formElement, validationConfig)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      }
}

export function clearValidation(formElement, validationConfig) {
    const buttonElement= formElement.querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((formInput) => {
        hideInputError(formElement, formInput, validationConfig)
    })
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    toggleButton(formElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButton(formElement, validationConfig);
        })
    })
}

export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    })
}
