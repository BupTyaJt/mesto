export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name
    this._link = link
    this._cardSelector = cardSelector

    console.log(cardSelector)
  }


  _getTemplate() {
    return document.querySelector(cardSelector)
      .content
      .children[0]
      .cloneNode(true)
  }

addCard(card){
  card.render(cardSelector)
}

render(card){
  this._cardSelector.forEach((item) => {
    const card = this._createCard(item.name, item.link)
    card.render(this._getTemplate)
  })
  card.append(this._getTemplate)
}




/*
  generateCard() {
    cardElement = this._getTemplate();
    this._cardElement.querySelector('.elements__photo').src = this._link
    this._cardElement.querySelector('.elements__title').textContent = this._name
  }

  /*
  _setEventListeners() {
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard(evt)
    })
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._like(evt)
    })
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._deleteCard(evt)
    })
  }
  */
}

console.log(Card)
