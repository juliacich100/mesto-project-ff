import "../pages/index.css"
import { initialCards } from "./cards.js";
import { createCard, handleDelete, addLike } from "../components/card.js";
import { openModal, closeModal, closeModalOverlay } from "../components/modal.js";

// DOM узлы
const placesList = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPic = imagePopup.querySelector('.popup__image');
const imagePopupDesc = imagePopup.querySelector('.popup__caption');
const newCardForm = popupAddCard.querySelector('.popup__form');
const placeInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');
const formEditProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close');

// функция открытия попапа с картинкой
function zoomImg(evt, cardElement) {
    imagePopupDesc.textContent = cardElement.querySelector('.card__title').textContent;
    imagePopupPic.src = evt.target.src;
    imagePopupPic.alt = evt.target.alt;
    openModal(imagePopup);
}

// отображение шести карточек на странице
initialCards.forEach(item => {
    placesList.append(createCard(item, handleDelete, addLike, zoomImg));
})

// обработчики открытия и закрытия модальных окон
buttonOpenPopupEditProfile.addEventListener('click', () => openModal(popupEditProfile), nameInput.value = profileTitle.textContent, jobInput.value = profileDesc.textContent);
buttonOpenPopupAddCard.addEventListener('click', () => openModal(popupAddCard));

buttonClosePopupEditProfile.addEventListener('click', () => closeModal(popupEditProfile));
buttonClosePopupAddCard.addEventListener('click', () => closeModal(popupAddCard));
buttonCloseImagePopup.addEventListener('click', () => closeModal(imagePopup));

popupEditProfile.addEventListener("click", closeModalOverlay);
popupAddCard.addEventListener("click", closeModalOverlay);
imagePopup.addEventListener("click", closeModalOverlay);

// функция редактирования профиля
function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closeModal(popupEditProfile);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

// функция добавления новой карточки
function submitAddCardForm(evt) {
    evt.preventDefault();
    const singleCard = {};
    singleCard.name = placeInput.value;
    singleCard.link = linkInput.value;
    singleCard.desc = singleCard.name;
    placesList.prepend(createCard(singleCard, handleDelete, addLike, zoomImg));
    closeModal(popupAddCard);
    newCardForm.reset();
}

newCardForm.addEventListener('submit', submitAddCardForm);

