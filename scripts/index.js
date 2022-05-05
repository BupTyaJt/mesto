import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// данные на входе
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
const addPopupButton = document.querySelector('.profile__add-button') //кнопка добавить элемент
const popupPhotoName = document.querySelector('.popup__input_photo_name') //инпут имя фото
const popupPhotoLink = document.querySelector('.popup__input_photo_link') //инпут линк фото
const formAdd = popupAdd.querySelector('.popup__form') //форма добавления

//попап фото элемента
const popupPhoto = document.querySelector('.popup_photo')
const popupBigPhoto = popupPhoto.querySelector('.popup__big-photo')
const popupTitlePhoto = popupPhoto.querySelector('.popup__photo-title')

const popup = document.querySelector('.popup') //все попапы

const popupCloseButtons = document.querySelectorAll('.popup__close') //закрытие


const template = document.querySelector('#card_template').content //достаем контент тейплейта

const elements = document.querySelector('.elements') //задаем класс элементов куда складываем

function render() { //элементы из данных на входе
  initialCards.forEach(renderItem);
}

function renderItem(card) { //добавляем заданые элементы в конец
  elements.append(createCard(card))
}

render() //рендерим элементы

const disableSaveButton = (element) => {  //выключакм кнопку сохранения
  const buttonElement = element.querySelector('.popup__save') //выбираем кнопку
  buttonElement.classList.add('popup__save_inactive') //применяем стиль к выключаемой кнопке
  buttonElement.disabled = 'disabled' //выключаем кнопку до валидации
}

//слушатель изменить
profileOpenPopupButton.addEventListener('click', function () { //данные из профиля в инпуты
  profileNameInput.value = profileTitle.textContent
  profileInfoInput.value = profileInfo.textContent
  disableSaveButton(popupEdit)
  openPopup(popupEdit)
})

//слушатель добавить
addPopupButton.addEventListener('click', function () {
  disableSaveButton(popupAdd)
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

function openPopupPhoto(evt) { //попап большой картинки элемента
  popupBigPhoto.src = evt.target.src
  popupTitlePhoto.textContent = evt.target.alt
  popupTitlePhoto.alt = evt.target.alt
  openPopup(popupPhoto)
}

function openPopup(item) { //открытие попапа
  item.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc) //вешаем листенер Esc
}

closePopupEsc = (evt) => { //функция листенера для закрытия попапа по Esc
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened') //определяем открытый попап
    closePopup(popupOpened)
  }
}

function closePopup(item) { //закрытие попапа
  item.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc) //удаляем листенер Esc
}

function deleteCard(evt) { //удаление элемента
  evt.target.closest('.elements__card').remove()
}

function like(evt) { //лайки
  evt.target.classList.toggle('elements__like_liked')
}

function saveDataPopupEdit(evt) { //сохранение профиля с инпутов
  evt.preventDefault()
  profileTitle.textContent = profileNameInput.value
  profileInfo.textContent = profileInfoInput.value
  closePopup(popupEdit)
}

function createCard(card) { //создаем новый элемент со слушателями через функцию
  const newItem = template.cloneNode(true);
  const cardName = newItem.querySelector('.elements__title')
  const cardPhoto = newItem.querySelector('.elements__photo')
  cardName.textContent = card.name
  cardPhoto.src = card.link
  cardPhoto.alt = card.name
  addListeners(newItem)
  return newItem
}

function addListeners(newCard) { //добавляем слушателей в новый элемент
  newCard.querySelector('.elements__photo').addEventListener('click', openPopupPhoto)
  newCard.querySelector('.elements__delete').addEventListener('click', deleteCard)
  newCard.querySelector('.elements__like').addEventListener('click', like)
}

function savePopupAdd(evt) { //данные из инпутов в функцию создания нового элемента
  evt.preventDefault()
  const newCard = { //новый элемент
    name: popupPhotoName.value,
    link: popupPhotoLink.value
  }
  addNewCard(newCard)
  closePopup(popupAdd)
  popupPhotoName.value = ''
  popupPhotoLink.value = '' //чистим инпуты
}

function addNewCard(Card) { //новый элемет в начало списка
  elements.prepend(createCard(Card))
}

formEdit.addEventListener('submit', saveDataPopupEdit) //субмит на попап изменить

formAdd.addEventListener('submit', savePopupAdd) //субмит на попап создать
