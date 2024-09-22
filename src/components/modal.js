export {openModal, closeModal, formElement, nameInput, jobInput, profileTitle, profileDesc, modals, closeModalOverlay}

const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const modals = document.querySelectorAll('.popup');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDesc.textContent;

function openModal(modal) {
    modal.classList.add('popup_is-animated', 'popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
}

function closeModal(popup) {
    popup.forEach(popup => {popup.classList.remove('popup_is-opened')});
    popup.forEach(popup => {popup.classList.add('popup_is-animated')});
}

function closeModalEsc (evt) {
    if (evt.key === "Escape") {
        closeModal(modals);
    }
    document.removeEventListener('keydown', closeModalEsc);  
}

function closeModalOverlay (evt) {
    if (evt.currentTarget === evt.target) {
        closeModal(modals);
      }
}