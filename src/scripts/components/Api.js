export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl.replace(/\/$/, "");
        this._headers = headers; // { authorization: TOKEN }
    }

    _request(path, options = {}) {
        return fetch(`${this._baseUrl}${path}`, {
            ...options,
            headers: { ...this._headers, ...options.headers },
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) return res.json();
        return res
        .json()
        .catch(() => res.text())
        .then((data) => {
            const msg = typeof data === "string" ? data : JSON.stringify(data);
            return Promise.reject(`Error ${res.status}: ${msg}`);
        });
    }

  // -------- Usuario --------
    getUserInfo() {
        return this._request("/users/me");
    }

    updateUserInfo({ name, about }) {
        return this._request("/users/me", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, about }),
        });
    }

    updateAvatar(avatar) {
        return this._request("/users/me/avatar", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar }),
        });
    }

  // -------- Tarjetas --------
    getInitialCards() {
        return this._request("/cards");
    }

    addCard({ name, link }) {
        return this._request("/cards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, link }),
        });
    }

    deleteCard(cardId) {
        return this._request(`/cards/${cardId}`, { method: "DELETE" });
    }

  // -------- Likes --------
    addLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, { method: "PUT" });
    }

    removeLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, { method: "DELETE" });
    }
}