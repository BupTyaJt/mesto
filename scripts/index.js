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

//попап профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const profileTitle = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__info')
const form = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_value_name')
const infoInput = document.querySelector('.popup__input_value_info')

const addOpenPopupButton = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_add')
const popupAddCloseButton = document.querySelector('.popup__close_add')

const popupPhoto = document.querySelector('.popup_photo')
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close')
const popupBigPhoto = popupPhoto.querySelector('.popup__big-photo')
const popupTitlePhoto = popupPhoto.querySelector('.popup__photo-title')

const template = document.querySelector('#card_template').content; //достаем контент тейплейта
const elements = document.querySelector('.elements'); //задаем класс элементов

function render() {
  initialCards.forEach(renderItem);
}

render()

function openPopup() {
  nameInput.value = profileTitle.textContent
  infoInput.value = profileInfo.textContent
  popup.classList.add('popup_opened')
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened')
  popupAddCloseButton.addEventListener('click', closePopupAdd)
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened')
}

function closePopupPhoto() {

  popupPhoto.classList.remove('popup_opened')
}

function saveDataPopup(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileInfo.textContent = infoInput.value
  closePopup()
}

function saveDataPopupAdd(evt) {
  evt.preventDefault()
  const newCard = {
    name: popupAddName.value,
    link: popupAddLink.value
  };
  elements.prepend(newCard);
  closePopupAdd();
}

profileOpenPopupButton.addEventListener('click', openPopup)
addOpenPopupButton.addEventListener('click', openPopupAdd)
popupCloseButton.addEventListener('click', closePopup)
popupAddCloseButton.addEventListener('click', closePopupAdd)
form.addEventListener('submit', saveDataPopup)
popup.addEventListener('keyup', function (enterKey) {
  if (enterKey.keyCode == 13)
    saveDataPopup(evt);
});

//рисуем заданые элементы


function renderItem(card) {
  const newItem = template.cloneNode(true);
  const btnLike = newItem.querySelector('.elements__like')
  const delBtn = newItem.querySelector('.elements__delete')
  const photo = newItem.querySelector('.elements__photo')
  newItem.querySelector('.elements__title').innerText = card.name;
  newItem.querySelector('.elements__photo').src = card.link;
  newItem.querySelector('.elements__photo').alt = card.name;


  function openPopupPhoto() {
    popupPhoto.classList.add('popup_opened')
    popupBigPhoto.src = card.link;
    popupBigPhoto.alt = card.name;
    popupTitlePhoto.textContent = card.name;
    popupPhotoCloseButton.addEventListener('click', closePopupPhoto)
  }

  photo.addEventListener('click', openPopupPhoto)

  btnLike.addEventListener('click', function () {
    btnLike.classList.toggle('elements__like_liked');
  })

  delBtn.addEventListener('click', function () {
    delBtn.closest('.elements__card').remove();
  })

  elements.appendChild(newItem);
}
