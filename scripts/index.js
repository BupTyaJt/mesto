const profileOpenPopupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const popupSaveButton = document.querySelector('.popup__save')
const popupContainer = document.querySelector('.popup__container')
const profile = document.querySelector('.profile')
const profileTitle = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__info')
const nameInput = document.querySelector('.popup__name')
const infoInput = document.querySelector('.popup__info')
const elementLike = document.querySelector('.element__like')


nameInput.value = profileTitle.textContent
infoInput.value = profileInfo.textContent

function openPopup(event) {
  event.preventDefault()
  popup.classList.add('popup__opened')
}

function closePopup() {
  popup.classList.remove('popup__opened')
}

function saveDataPopup () {
  profileTitle.textContent = nameInput.value
  profileInfo.textContent = infoInput.value
  closePopup()
// evt.preventDefault();
}

profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
popupSaveButton.addEventListener('click', saveDataPopup)
popup.addEventListener('submit', saveDataPopup)
popup.addEventListener('keyup', function(enterKey) {
  if (enterKey.keyCode == 13)
  saveDataPopup();
});
