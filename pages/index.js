import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error-message_active",
};

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleOpenImagePopup,
        (id, isLiked) => api.likeCard(id, isLiked),
        handleDeleteCard,
      );
      cardSection.addItem(card.GetCardElement());
    },
  },
  ".cards__list",
);

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "e9c54c1d-7d1b-4a32-808f-b00f8ab88aa4",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      description: result.about,
    });
    userInfo.setAvatar(result.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((result) => {
    result.forEach((item) => {
      const card = new Card(
        item,
        "#card-template",
        handleOpenImagePopup,
        (id, isLiked) => api.likeCard(id, isLiked),
        handleDeleteCard,
      );
      cardSection.addItem(card.GetCardElement());
    });

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const data = {
    name: inputValues["place-name"],
    link: inputValues.link,
  };

  return api.addCard(data).then((result) => {
    const newCard = new Card(
      result,
      "#card-template",
      handleOpenImagePopup,
      (id, isLiked) => api.likeCard(id, isLiked),
      handleDeleteCard,
    );

    cardSection.addItem(newCard.GetCardElement());
  });
});

addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  return api
    .setUserInfo({
      name: inputValues.name,
      description: inputValues.description,
    })
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        description: result.about,
      });
    });
});

editProfilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation(
  "#confirmation-popup",
  () => {
    api
      .deleteCard()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
);

confirmationPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm("#avatar-popup", (inputValues) => {
  return api.setAvatar(inputValues.avatar).then((result) => {
    userInfo.setAvatar(result.avatar);
  });
});

editAvatarPopup.setEventListeners();

const avatarEditBtn = document.querySelector(".profile__image-container");
const editAvatarPopupEl = document.querySelector("#avatar-popup");
const editAvatarForm = editAvatarPopupEl.querySelector("#edit-avatar-form");

const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfilePopupEl = document.querySelector("#edit-popup");
const profileForm = editProfilePopupEl.querySelector("#edit-profile-form");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopupEl = document.querySelector("#new-card-popup");
const addCardForm = addCardPopupEl.querySelector("#new-card-form");

const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.setEventListeners();

const editAvatarFormValidator = new FormValidator(
  validationConfig,
  editAvatarForm,
);
editAvatarFormValidator.setEventListeners();

//--------------------PROFILE-----------------------
//Fill profile form with current data
function fillProfileForm() {
  const userData = userInfo.getUserInfo();

  const nameInput = editProfilePopupEl.querySelector(".popup__input_type_name");
  const descriptionInput = editProfilePopupEl.querySelector(
    ".popup__input_type_description",
  );

  nameInput.value = userData.name;
  descriptionInput.value = userData.description;

  profileFormValidator.hideInputError(nameInput);
  profileFormValidator.hideInputError(descriptionInput);

  //Activate submitButton
  const submitButton = editProfilePopupEl.querySelector(".popup__button");
  submitButton.disabled = false;
}

//Handle opening edit profile popup
function handleOpenEditModal(editProfilePopup) {
  editProfilePopup.open();
  fillProfileForm();
}

function fillAvatarForm() {
  const userData = userInfo.getUserInfo();

  const avatarInput = editAvatarPopupEl.querySelector(
    ".popup__input-type-avatar",
  );

  avatarInput.value = userData.avatar;

  editAvatarFormValidator.hideInputError(avatarInput);

  const submitButton = editAvatarPopupEl.querySelector(".popup__button");
  submitButton.disabled = false;
}

function handleOpenAvatarModal(editAvatarPopup) {
  editAvatarPopup.open();
  fillAvatarForm();
}
function handleOpenImagePopup(title, imageLink) {
  imagePopup.open(title, imageLink);
}

function handleDeleteCard(cardInstance) {
  confirmationPopup.open();

  confirmationPopup.setConfirmationAction(() => {
    api
      .deleteCard(cardInstance.getId())
      .then(() => {
        cardInstance.removeCard();
        confirmationPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal(editProfilePopup);
});

avatarEditBtn.addEventListener("click", () => {
  handleOpenAvatarModal(editAvatarPopup);
});

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
