import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  { name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg" },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

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
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleOpenImagePopup);
      cardSection.addItem(card.GetCardElement());
    },
  },
  ".cards__list",
);

cardSection.renderItems();

const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const data = {
    name: inputValues["place-name"],
    link: inputValues.link,
  };

  const newCard = new Card(data, "#card-template", handleOpenImagePopup);
  cardSection.addItem(newCard.GetCardElement());
});

addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
editProfilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

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

  //Activate submitButton
  const submitButton = editProfilePopupEl.querySelector(".popup__button");
  submitButton.disabled = false;
}

//Handle opening edit profile popup
function handleOpenEditModal(editProfilePopup) {
  editProfilePopup.open();
  fillProfileForm();
}

//------------------CARDS------------------------

function handleOpenImagePopup(title, imageLink) {
  imagePopup.open(title, imageLink);
}

//----------------EVENTS--------------------------
profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal(editProfilePopup);
});

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
