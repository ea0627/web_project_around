// src/scripts/components/Card.js
export default class Card {
  constructor(data, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = !!data.isLiked;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick; // <-- GUARDA el handler EN LA INSTANCIA
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  _renderLikeState() {
    this._likeButton.classList.toggle("element__like-button_active", this._isLiked);
  }

  _setEventListeners() {
    // abrir imagen
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    // like via API
    this._likeButton.addEventListener("click", () => {
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

    // eliminar: usa SIEMPRE this._handleDeleteClick
    this._deleteButton.addEventListener("click", () => {
      if (typeof this._handleDeleteClick !== "function") return;
      // pasamos un callback para quitar del DOM cuando la API responda 200
      this._handleDeleteClick(this._id, () => {
        this._element.remove();
        this._element = null;
      });
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__trash-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._renderLikeState();
    this._setEventListeners();

    return this._element;
  }
}