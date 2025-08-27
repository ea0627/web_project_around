// src/scripts/components/PopupWithImage.js
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption');
}

    open({ name, link }) {
        this._image.src = link;
        this._image.alt = name;
        this._caption.textContent = name;
        super.open(); // 👈 abre el popup con la lógica del padre
    }
}