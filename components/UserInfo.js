export default class UserInfo {
  #_nameEl;
  #_descriptionEl;
  #_avatarEl;

  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this.#_nameEl = document.querySelector(nameSelector);
    this.#_descriptionEl = document.querySelector(descriptionSelector);
    this.#_avatarEl = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.#_nameEl.textContent,
      description: this.#_descriptionEl.textContent,
      avatar: this.#_avatarEl.src,
    };
  }

  setUserInfo({ name, description }) {
    this.#_nameEl.textContent = name;
    this.#_descriptionEl.textContent = description;
  }

  setAvatar(link) {
    this.#_avatarEl.src = link;
  }
}
