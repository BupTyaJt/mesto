class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    data.alt = this._name
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true)
    return cardElement
  }

  _deleteCard() { //удаление элемента
    this._element.remove()
    this._element = null
  }

  _cardLikeHandler() { //лайк элементу
    this._likeList.classList.toggle('elements__like_liked')
  }

  _openPopupPhoto(evt) { //открвтие попапа большой картинки элемента
    const cardPopupPhoto = document.querySelector('.popup_photo')
    const popupBigPhoto = cardPopupPhoto.querySelector('.popup__big-photo')
    const popupTitlePhoto = cardPopupPhoto.querySelector('.popup__photo-title')
    const target = evt.target
    popupBigPhoto.src = target.src
    popupTitlePhoto.textContent = target.alt
    cardPopupPhoto.classList.add('popup_opened')
    document.addEventListener('keydown', closePopupPhotoEsc) // листенер на еск на закрытие большой картинки

    function closePopupPhotoEsc(evt) { // функция листенера на еск
      if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened') //определяем открытый попап
        closePopupPhoto(popupOpened)
      }
    }

    function closePopupPhoto() { //закрытие попапа большой картинки
      cardPopupPhoto.classList.remove('popup_opened')
      document.removeEventListener('keydown', closePopupEsc) //удаляем листенер Esc
    }
  }

  _addEventListeners() { //вешаем листенеры
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard()
    })
    this._likeList.addEventListener('click', () => {
      this._cardLikeHandler()
    })
    this._element.querySelector('.elements__photo').addEventListener('click', (evt) => {
      this._openPopupPhoto(evt)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.elements__photo').src = this._link
    this._element.querySelector('.elements__title').textContent = this._name
    this._element.querySelector('.elements__photo').alt = this._name
    this._likeList = this._element.querySelector('.elements__like')
    this._addEventListeners(this._element)
    return this._element
  }
}

export default Card
