import "../pages/index.css"
import { initialCards } from "./cards.js";
import { createCard, handleDelete, addLike } from "../components/card.js";
import { openModal, closeModal, formElement, nameInput, jobInput, profileTitle, profileDesc, modals, closeModalOverlay } from "../components/modal.js";


// DOM узлы

const placesList = document.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const newCardForm = addCardModal.querySelector('.popup__form');

// функция открытия попапа с картинкой

function zoomImg(evt, cardElement) {
    const popupImg = imagePopup.querySelector('.popup__image');
    const popupDesc = imagePopup.querySelector('.popup__caption');

    popupDesc.textContent = cardElement.querySelector('.card__title').textContent;
    popupImg.src = evt.target.src;
    openModal(imagePopup);
}

// отображение шести карточек на странице

initialCards.forEach(item => {
    placesList.append(createCard(item, handleDelete, addLike, zoomImg));
})

// обработчики открытия и закрытия модальных окон

editButton.addEventListener('click', () => openModal(editModal));
addCardButton.addEventListener('click', () => openModal(addCardModal));

closeButtons.forEach(button => {
    button.addEventListener('click', () => closeModal(modals));
})

editModal.addEventListener("click", closeModalOverlay);
addCardModal.addEventListener("click", closeModalOverlay);
imagePopup.addEventListener("click", closeModalOverlay);

// функция редактирования профиля

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closeModal(modals);
}

formElement.addEventListener('submit', handleFormSubmit);

// функция добавления новой карточки

function addPlace(evt) {
    evt.preventDefault();
    const placeInput = newCardForm.querySelector('.popup__input_type_card-name');
    const linkInput = newCardForm.querySelector('.popup__input_type_url');
    const singleCard = {}
    singleCard.name = placeInput.value;
    singleCard.link = linkInput.value;
    singleCard.desc = "new place description";
    placesList.prepend(createCard(singleCard, handleDelete, addLike, zoomImg));
    closeModal(modals);
    placeInput.value = '';
    linkInput.value = '';
}

newCardForm.addEventListener('submit', addPlace);

