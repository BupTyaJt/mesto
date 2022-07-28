class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card_template')
      .content
      .querySelector('.elements__card')
      .cloneNode(true)
    return cardElement
  }

  _deleteCard() { //удаление элемента
    this._element.remove()
  }

  _cardLikeHandler() { //лайк элементу
    this._element.querySelector('.elements__like').classList.toggle('elements__like_liked')
  }

  _addEventListeners() { //вешаем листенеры
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard();
    })
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._cardLikeHandler();
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.elements__photo').src = this._link
    this._element.querySelector('.elements__title').textContent = this._name
    this._addEventListeners(this._element)
    return this._element
  }
}

export default Card
