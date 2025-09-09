// Api.js
export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl.replace(/\/$/, ""); // evita barra final doble
        this._headers = headers;
    }

  // método interno para factorizar todas las solicitudes
    _request(path, options = {}) {
        return fetch(`${this._baseUrl}${path}`, {
            headers: { ...this._headers, ...(options.headers || {}) },
            ...options,
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

  // --- Usuario ---
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

    updateAvatar(avatarUrl) {
        return this._request("/users/me/avatar", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar: avatarUrl }),
        });
    }

  // --- Tarjetas ---
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
        return this._request(`/cards/${cardId}`, {
            method: "DELETE",
        });
    }

  // --- Likes ---
    addLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: "PUT",
        });
    }

    removeLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: "DELETE",
        });
    }
}
// Api.js