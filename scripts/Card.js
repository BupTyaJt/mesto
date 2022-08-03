class Card {
  constructor(data, cardSelector, openImagePopup) {
    this._name = data.name
    this._link = data.link
    data.alt = this._name
    this._cardSelector = cardSelector
    this._openImagePopup = openImagePopup
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

  _addEventListeners() { //вешаем листенеры
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard()
    })
    this._likeList.addEventListener('click', () => {
      this._cardLikeHandler()
    })
    this._cardImage.addEventListener('click', () => {
      this._openImagePopup(this._name, this._link)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.elements__photo') //поиск и определение элемента картинки
    this._cardImage.src = this._link
    this._element.querySelector('.elements__title').textContent = this._name
    this._cardImage.alt = this._name
    this._likeList = this._element.querySelector('.elements__like') //поиск и определение элемента лайка
    this._addEventListeners(this._element)
    return this._element
  }
}

export default Card
