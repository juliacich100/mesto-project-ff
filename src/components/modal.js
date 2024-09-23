export {openModal, closeModal, closeModalOverlay}

function openModal(modal) {
    modal.classList.add('popup_is-animated', 'popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc (evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

function closeModalOverlay (evt) {
    if (evt.currentTarget === evt.target) {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
      }
}