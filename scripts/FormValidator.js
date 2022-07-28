class FormValidator {
  constructor(set, form) { //конструктор класса для валидации
    this._set = set
    this._form = form
    this._inputSelector = set.inputSelector
    this._inputErrorClass = set.inputErrorClass
    this._formList = Array.from(
      this._form.querySelectorAll(this._set.inputSelector)
    )
    this._buttonElement = this._form.querySelector(
      this._set.submitButtonSelector
    )
  }

  enableValidation() {  //включение валидации
    this._form.addEventListener('submit', this._setEventListeners())
  }

  _setEventListeners() { //слушатели проверка валидности и состояния кнопки
    this._toggleButtonState()
    this._formList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  _toggleButtonState() { //активация кнопки при валидности всех полей
    if (this._hasInvalidInput(this._formList)) {
      this._buttonElement.classList.add(this._set.inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._set.inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

  _checkInputValidity(inputElement) { //проверка валидности полей инпутов
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _showInputError(inputElement, errorMessage) { //показываем ошибку и передаем текст ошибки
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
  }

  _hideInputError(inputElement) { //скрываем ошибку
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.textContent = ''
  }

  _hasInvalidInput() { //проверка полей формы на валидность для активации кнопки
    return this._formList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  resetValidation() { //скидываем ошибки и кнопку
    this._formList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState();
  }
}

export default FormValidator
