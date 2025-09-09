// src/scripts/components/Api.js
export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl.replace(/\/$/, "");
        this._headers = headers; // <- aquí vive tu { authorization: TOKEN }
    }

  // 🔧 IMPORTANTE: fusionar headers al final para no perder authorization
    _request(path, options = {}) {
        const url = `${this._baseUrl}${path}`;

        // headers de la llamada (ej. { "Content-Type": "application/json" })
        const perCallHeaders = options.headers || {};

        return fetch(url, {
            ...options,
            // los globales (this._headers) al final → pisan nada y NO se pierden
            headers: { ...perCallHeaders, ...this._headers },
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) return res.json();
        return res
            .json()
            .catch(() => res.text())
            .then((data) => {
                const details = typeof data === "string" ? data : JSON.stringify(data);
                return Promise.reject(`Error ${res.status}: ${details}`);
        });
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
        return this._request(`/cards/${cardId}`, { method: "DELETE" });
    }

  // --- Likes ---
    addLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, { method: "PUT" });
    }

    removeLike(cardId) {
        return this._request(`/cards/${cardId}/likes`, { method: "DELETE" });
    }
}
