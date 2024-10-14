// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, formInput, errorMessage) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add('form__input-error_active');
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formError.classList.remove('form__input-error_active');
    formError.textContent = '';
}

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput) => {
    if(formInput.validity.patternMismatch) {
        formInput.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы")
    } else {
        formInput.setCustomValidity("")
    }
    if(!formInput.validity.valid) {
        showInputError(formElement, formInput, formInput.validationMessage);
    } else {
        hideInputError(formElement, formInput);
    }
}

const hasInvalidInput = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

const toggleButton = (formElement) => {
    const buttonElement= formElement.querySelector('.popup__button');
    if(hasInvalidInput(formElement)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('button_inactive');
      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('button_inactive');
      }
}

export function clearValidation(formElement) {
    const errorList = Array.from(formElement.querySelectorAll('.form-input-error'));
    errorList.forEach((error) => {
        error.classList.remove('form__input-error_active');
        error.textContent = '';
    })
}

export const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    toggleButton(formElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButton(formElement);
        })
    })
}