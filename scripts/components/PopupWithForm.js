// src/scripts/components/PopupWithForm.js
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    /**
     * @param {string} popupSelector - selector del popup
     * @param {Function} handleFormSubmit - callback que recibe (values, submitButton)
     */
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector("form");
        if (!this._form) {
        throw new Error(`No se encontró <form> dentro de ${popupSelector}`);
        }

        // ✅ Inicializa la lista de inputs (input y textarea).
        //    Si prefieres por clase: querySelectorAll(".popup__input")
        this._inputList = Array.from(this._form.querySelectorAll("input, textarea"));

        this._handleFormSubmit = handleFormSubmit;

        this._submitButton = this._form.querySelector(".popup__button");
        this._defaultBtnText = this._submitButton ? this._submitButton.textContent : "";
    }

    // Helper de estado de carga
    setSaving(isSaving, text = "Guardando…") {
        if (!this._submitButton) return;
        this._submitButton.textContent = isSaving ? text : this._defaultBtnText;
        this._submitButton.disabled = isSaving;
    }

    // Recolecta valores de inputs por name
    _getInputValues() {
        const values = {};
        (this._inputList || []).forEach((input) => {
        values[input.name] = input.value; // asegúrate de que cada input tenga atributo name
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const values = this._getInputValues();
        // ✅ Llama 1 sola vez y pasa también el botón por si lo usas
        this._handleFormSubmit(values, this._submitButton);
        });
    }

    close() {
        super.close();
        this._form.reset();
        if (this._submitButton) {
        this._submitButton.textContent = this._defaultBtnText;
        this._submitButton.disabled = false;
        }
    }
}
