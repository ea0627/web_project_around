// src/scripts/components/PopupWithForm.js
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
/**
 * @param {string} popupSelector - selector del popup
 * @param {Function} handleFormSubmit - callback que recibe un objeto con los valores de los inputs
 */
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    }

  // Recolecta valores de todos los inputs (por name)
    _getInputValues() {
        const values = {};
        this._inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

  // Agrega listener de submit además de los heredados (overlay/cerrar)
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

  // Cierra y resetea el formulario
    close() {
        super.close();
        this._form.reset();
    }
}
