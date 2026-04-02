export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOverlayClick);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopop = document.querySelector(".popup_is-opened");
    if (openedPopop) {
      closeModal(modal);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}
