// src/scripts/components/Card.js
export default class Card {
  constructor(data, templateSelector, handleCardClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;           // necesario para likes
    this._isLiked = !!data.isLiked;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _renderLikeState() {
    this._likeButton.classList.toggle(
      'element__like-button_active',
      this._isLiked
    );
  }

  _setEventListeners() {
    // abrir imagen
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    // toggle like → API
    this._likeButton.addEventListener('click', () => {
      // si no hay _id o no hay handler, solo togglear UI local (para initialCards)
      if (!this._id || !this._handleLikeClick) {
        this._isLiked = !this._isLiked;
        this._renderLikeState();
        return;
    }

    // con backend
    this._likeButton.disabled = true;

    this._handleLikeClick(
      this._id,
      this._isLiked,
      (newIsLiked) => {
        this._isLiked = newIsLiked;
        this._renderLikeState();
        this._likeButton.disabled = false;
      },
      () => {
        this._likeButton.disabled = false;
      }
    );
  });

    // por ahora la papelera sigue igual (lo mejoraremos en el punto 6)
    this._deleteButton.addEventListener('click', () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__trash-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._renderLikeState();
    this._setEventListeners();

    return this._element;
  }
}