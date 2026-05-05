export default class Api {
  constructor(options) {
    this.options = options;
  }

  getUserInfo() {
    return fetch(this.options.baseUrl + "users/me", {
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setUserInfo({ name, description }) {
    return fetch(this.options.baseUrl + "users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(this.options.baseUrl + "cards", {
      headers: {
        authorization: this.options.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(this.options.baseUrl + "cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeCard(id, isLiked) {
    return fetch(`${this.options.baseUrl}cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setAvatar(avatar) {
    return fetch(`${this.options.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
