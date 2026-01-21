const profileEditBtn = document.querySelector(".profile__edit-button");

const editProfilePopup = document.querySelector("#edit-popup");
const closeEditPopup = editProfilePopup.querySelector(".popup__close");
const profileForm = editProfilePopup.querySelector(".popup__form");

// Functions to open and close modals/Popups
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

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
}

//Handle opening edit profile popup
function handleOpenEditModal(editProfilePopup) {
  openModal(editProfilePopup);
  fillProfileForm();
}

// Handle profile form submission
function handleProfileFormSubmit(event) {
  event.preventDefault();

  //Look for input values elements in DOM
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
