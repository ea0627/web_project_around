// src/scripts/components/Card.js
export default class Card {
  //                 ⬇️ añade currentUserId como último argumento
  constructor(data, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick, currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = !!data.isLiked;

    // owner puede venir como string o como objeto {_id}
    this._ownerId = (data.owner && data.owner._id) ? data.owner._id : data.owner;
    this._currentUserId = currentUserId;
    this._isOwner = this._ownerId === this._currentUserId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
        () => { this._likeButton.disabled = false; }
      );
    });

    // eliminar → sólo si soy dueño
    if (this._isOwner) {
      this._deleteButton.addEventListener("click", () => {
        if (typeof this._handleDeleteClick !== "function") return;
        this._handleDeleteClick(this._id, () => {
          this._element.remove();
          this._element = null;
        });
      });
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage   = this._element.querySelector(".element__image");
    this._cardTitle   = this._element.querySelector(".element__title");
    this._likeButton  = this._element.querySelector(".element__like-button");
    this._deleteButton= this._element.querySelector(".element__trash-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // si no soy dueño, oculto/eliminó la papelera
    if (!this._isOwner && this._deleteButton) {
      // opción A: quitar del DOM
      this._deleteButton.remove();
      // opción B: usar clase (si añadiste el CSS)
      // this._deleteButton.classList.add("element__trash-button_hidden");
    }

    this._renderLikeState();
    this._setEventListeners();

    return this._element;
  }
}
