import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._defaultBtnText = this._submitButton ? this._submitButton.textContent : "Sí";
    this._submitAction = null;
  }

  setSubmitAction(fn) { this._submitAction = fn; }

  setSaving(isSaving, text = "Eliminando…") {
    if (!this._submitButton) return;
    this._submitButton.textContent = isSaving ? text : this._defaultBtnText;
    this._submitButton.disabled = isSaving;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this._submitAction === "function") this._submitAction();
    });
  }

  close() {
    super.close();
    if (this._submitButton) {
      this._submitButton.textContent = this._defaultBtnText;
      this._submitButton.disabled = false;
    }
  }
}