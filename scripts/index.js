const profileOpenPopupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const profileTitle = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__info')
const form = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_value_name')
const infoInput = document.querySelector('.popup__input_value_info')
const elementLike = document.querySelector('.element__like')

nameInput.value = profileTitle.textContent
infoInput.value = profileInfo.textContent

function openPopup() {
  nameInput.value = profileTitle.textContent
  infoInput.value = profileInfo.textContent
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function saveDataPopup (evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileInfo.textContent = infoInput.value
  closePopup()
}

profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
form.addEventListener('submit', saveDataPopup)
popup.addEventListener('keyup', function(enterKey) {
  if (enterKey.keyCode == 13)
  saveDataPopup(evt);
});
