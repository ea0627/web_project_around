// src/scripts/components/UserInfo.js
export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

  // Devuelve un objeto con la info actual del usuario
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent
        };
    }

  // Recibe un objeto { name, about } y actualiza el DOM
    setUserInfo({ name, about }) {
        if (name) this._nameElement.textContent = name;
        if (about) this._jobElement.textContent = about;
    }
}
