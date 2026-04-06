import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import { openModal, closeModal } from "../components/Utils.js";

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

const cardContainer = document.querySelector(".cards__list");

const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const profileForm = editProfilePopup.querySelector("#edit-profile-form");
const closeEditPopup = editProfilePopup.querySelector(".popup__close");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");
const addCardForm = addCardPopup.querySelector("#new-card-form");
const closeAddBtn = addCardPopup.querySelector(".popup__close");

const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.setEventListeners();

const addCardFromValidator = new FormValidator(validationConfig, addCardForm);
addCardFromValidator.setEventListeners();

const imagePopup = document.querySelector("#image-popup");
const imageCaption = imagePopup.querySelector(".popup__caption");
const imageEl = imagePopup.querySelector(".popup__image");
const closeImagePopup = imagePopup.querySelector(".popup__close");

initialCards.forEach((data) => {
  const newCard = new Card(data, "#card-template", handleOpenImagePopup);
  renderCard(newCard, cardContainer);
});

//--------------------PROFILE-----------------------
//Fill profile form with current data
function fillProfileForm() {
  //Look for input values elements in DOM
  const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
  const descriptionInput = editProfilePopup.querySelector(
    ".popup__input_type_description",
  );
  //Get current profile data from DOM
  const profileTitleEl = document.querySelector(".profile__title");
  const profileDescriptionEl = document.querySelector(".profile__description");

  //Set input values to current profile data
  nameInput.value = profileTitleEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;

  //Activate submitButton
  const submitButton = editProfilePopup.querySelector(".popup__button");
  submitButton.disabled = false;
}

//Handle opening edit profile popup
function handleOpenEditModal(editProfilePopup) {
  openModal(editProfilePopup);
  fillProfileForm();
}

// Handle profile form submission
function handleProfileFormSubmit(event) {
  event.preventDefault();

  //Look for input elements in DOM
  const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
  const descriptionInput = editProfilePopup.querySelector(
    ".popup__input_type_description",
  );

  //Get input values
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  //Get profile elements in DOM
  const profileTitleEl = document.querySelector(".profile__title");
  const profileDescriptionEl = document.querySelector(".profile__description");

  //Update profile data in DOM with input values
  profileTitleEl.textContent = nameValue;
  profileDescriptionEl.textContent = descriptionValue;
}

//------------------CARDS------------------------

function renderCard(card, container) {
  container.append(card.GetCardElement());
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const nameInput = addCardForm.querySelector(".popup__input_type_card-name");
  const linkInput = addCardForm.querySelector(".popup__input_type_url");

  const data = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const newCard = new Card(data, "#card-template", handleOpenImagePopup);
  renderCard(newCard, cardContainer);
}

function handleOpenImagePopup(title, imageLink) {
  imageCaption.textContent = title;
  imageEl.src = imageLink;
  imageEl.alt = title;
  openModal(imagePopup);
}

//----------------EVENTS--------------------------
profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal(editProfilePopup);
});

closeEditPopup.addEventListener("click", () => {
  closeModal(editProfilePopup);
});

profileForm.addEventListener("submit", (event) => {
  handleProfileFormSubmit(event);
  closeModal(editProfilePopup);
});

addCardBtn.addEventListener("click", () => {
  openModal(addCardPopup);
});

closeAddBtn.addEventListener("click", () => {
  closeModal(addCardPopup);
});

addCardForm.addEventListener("submit", (event) => {
  handleCardFormSubmit(event);
  closeModal(addCardPopup);
});

closeImagePopup.addEventListener("click", () => {
  closeModal(imagePopup);
});
