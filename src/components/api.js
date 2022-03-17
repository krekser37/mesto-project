export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  addUser(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(user)
    })
    .then(this._getResponseData)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    .then(this._getResponse)
  })
}

  addLike(cardsId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardsId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponse)
  }

  removeLike(cardsId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardsId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse)
  }

  deleteCardServer(cardsId) {
    return fetch(`${this._baseUrl}/cards/${cardsId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse)
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._getResponse)
  }

  getAppInfo() {
    return Promise.all([this.getCards(), this.getUser()])
  }
}

