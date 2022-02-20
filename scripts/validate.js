const enableValidation = (set) => { //валидация по параметрам set
  const formList = Array.from(document.querySelectorAll(set.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formSelector, set);
  })
}

const setEventListeners = (formSelector, set) => { //добавляем слушателей
  const inputList = Array.from(formSelector.querySelectorAll(set.inputSelector));
  const buttonElement = formSelector.querySelector(set.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, set) //проверяем состояние кнопки сразу
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => { //слушатель события Инпут
      checkInputValidity(inputSelector, set); //проверяем валидность
      toggleButtonState(inputList, buttonElement, set); //проверяем состояние кнопки при изменениии полей
    });
  });
}

const toggleButtonState = (inputList, buttonElement, set) => { //активация кнопки при валидности всех инпутов
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(set.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  } else {
    buttonElement.classList.remove(set.inactiveButtonClass);
    buttonElement.disabled = '';
  }
}

const checkInputValidity = (inputSelector, set) => { //проверка валидности полей инпута
  if (!inputSelector.validity.valid) {
    const errorMessage = inputSelector.validationMessage
    showInputError(inputSelector, errorMessage, set); //показываем при невалидности
  } else {
    hideInputError(inputSelector, set); //не показываем при валидности
  }
}

const showInputError = (inputSelector, errorMessage, set) => { //показываем ошибку и передаем текст ошибки
  const errorElement = inputSelector.nextElementSibling; //форма с непрошедшим валидацию полем
  inputSelector.classList.add(set.inputErrorClass); //поле не прошедшее валидацию
  errorElement.textContent = errorMessage; //текст для отображения ошибки
  errorElement.classList.add(set.inputErrorClass); //показываем ошибку
}

const hideInputError = (inputSelector, set) => { //скрываем ошибку и обнуляем текст ошибки
  const errorElement = inputSelector.nextElementSibling; //форма с прошедшими валидацию полем
  inputSelector.classList.remove(set.inputErrorClass); //поле прошедшее валидацию
  errorElement.classList.remove(set.inputErrorClass); //скрываем ошибку
  errorElement.textContent = ''; //чистим текст ошибки
}

const hasInvalidInput = (inputList) => { //проверка всех полей формы на валидность для активации кнопки
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
});
