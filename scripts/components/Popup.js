// src/scripts/components/Popup.js
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    if (!this._popup) return;
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    if (!this._popup) return;
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    if (!this._popup) return;
    this._popup.addEventListener('mousedown', (evt) => {
      const clickedOverlay = evt.target === this._popup;
      // ajusta el selector del icono si en tu HTML es diferente
      const clickedCloseIcon = evt.target.closest('.popup__close-button');
      if (clickedOverlay || clickedCloseIcon) this.close();
    });
  }
}