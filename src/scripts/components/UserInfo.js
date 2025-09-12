export default class UserInfo {
  // Mantengo jobSelector (about) y agrego avatarSelector (opcional)
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarElement = avatarSelector
            ? document.querySelector(avatarSelector)
            : null;
    }

  // Devuelve el estado actual del header
    getUserInfo() {
        return {
            name: this._nameElement?.textContent || "",
            about: this._jobElement?.textContent || "",
            avatar: this._avatarElement?.src || ""
        };
    }

  // Actualiza nombre, about y (si viene) avatar
    setUserInfo({ name, about, avatar }) {
        if (name && this._nameElement) this._nameElement.textContent = name;
        if (about && this._jobElement) this._jobElement.textContent = about;
        if (avatar) this.setAvatar(avatar);
    }

  // Actualiza sólo el avatar (si existe el selector)
    setAvatar(avatarUrl) {
        if (!this._avatarElement) return;
        this._avatarElement.src = avatarUrl;
        this._avatarElement.alt = "Avatar del usuario";
    }
}