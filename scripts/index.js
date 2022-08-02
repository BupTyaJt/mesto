import initCards from './initCards.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'

//попап изменения профиля
const popupEdit = document.querySelector('.popup_edit') //попап измения
const profileTitle = document.querySelector('.profile__title') //титл профиля
const profileInfo = document.querySelector('.profile__info') //инфо профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button') //кнопка изменить профиль
const profileNameInput = document.querySelector('.popup__input_value_name') //инпут имя профиля
const profileInfoInput = document.querySelector('.popup__input_value_info') //инпут инфо профиля
const formEdit = popupEdit.querySelector('.popup__form') //форма профиля

//попап добавления элементов
const popupAdd = document.querySelector('.popup_add') //попап добавления
const buttonAddPopup = document.querySelector('.profile__add-button') //кнопка добавить элемент
const popupPhotoName = document.querySelector('.popup__input_photo_name') //инпут имя фото
const popupPhotoLink = document.querySelector('.popup__input_photo_link') //инпут линк фото
const formAdd = popupAdd.querySelector('.popup__form') //форма добавления

const popupCloseButtons = document.querySelectorAll('.popup__close') //закрытие

const cardSelector = '#card_template' //селектор темплейта

const elements = document.querySelector('.elements') //задаем класс элементов куда складываем

//валидация конфиг
const set = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

//включаем валидацию
const formEditValidation = new FormValidator(set, formEdit)
formEditValidation.enableValidation()

const formAddValidation = new FormValidator(set, formAdd)
formAddValidation.enableValidation()


function createCard(data) { //генерация карточек через класс
  const newCard = new Card(data, cardSelector)
  const newItem = newCard.generateCard()
  return newItem
}

function addCard(data, ending) { //добавление карточек (в конец или в начало) c листенером попапа большого фото
  const newItem = createCard(data)
  const direction = ending ? 'append' : 'prepend'
  elements[direction](newItem)
}

function renderInitCards() { //функция рендера заданных карточек
  initCards.forEach(data => {
    addCard(data, true)
  })
}

renderInitCards()

//слушатель изменить
profileOpenPopupButton.addEventListener('click', function () { //данные из профиля в инпуты
  profileNameInput.value = profileTitle.textContent
  profileInfoInput.value = profileInfo.textContent
  formEditValidation.resetValidation() //скидываем валидацию профиля
  openPopup(popupEdit)
})

//слушатель добавить с очисткой инпутов (чистка инпутов перенесена из закрытия исходя из предыдущих замечаний)
buttonAddPopup.addEventListener('click', function () {
  popupPhotoName.value = ''
  popupPhotoLink.value = ''
  openPopup(popupAdd)
})

popupCloseButtons.forEach(button => { //слушатель кнопок закрыть
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
  popup.addEventListener('mouseup', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  })
})

function openPopup(item) { //открытие попапа
  item.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc) //вешаем листенер Esc
}

function closePopupEsc(evt) { //функция листенера для закрытия попапа по Esc
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened') //определяем открытый попап
    closePopup(popupOpened)
  }
}

function closePopup(item) { //закрытие попапа очистка инпутов перенесена в открытие (хотя полагаю что им место здесь)
  //popupPhotoName.value = ''
  //popupPhotoLink.value = ''
  item.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc) //удаляем листенер Esc
}

function saveDataPopupEdit(evt) { //сохранение профиля с инпутов
  evt.preventDefault()
  profileTitle.textContent = profileNameInput.value
  profileInfo.textContent = profileInfoInput.value
  closePopup(popupEdit)
}

function savePopupAdd(evt) { //данные из инпутов в функцию создания нового элемента
  evt.preventDefault()
  const newCard = { //новый элемент
    name: popupPhotoName.value,
    link: popupPhotoLink.value,
    alt: popupPhotoName.value,
  }
  addCard(newCard)
  closePopup(popupAdd)
  popupPhotoName.value = ''
  popupPhotoLink.value = '' //чистим инпуты
}

formEdit.addEventListener('submit', saveDataPopupEdit) //субмит на попап изменить

formAdd.addEventListener('submit', savePopupAdd) //субмит на попап создать
