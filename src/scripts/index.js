import "../pages/index.css"
import { createCard, handleDelete, pressLikeButton} from "../components/card.js";
import { openModal, closeModal, closeModalOverlay } from "../components/modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import { getInitialCards, getUserInfo, editUserInfo, addNewCard, editAvatar } from "./api.js";

// DOM узлы
const placesList = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditAvatar = document.querySelector('.popup_avatar_edit');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const avatarLinkInput = formEditAvatar.querySelector('.popup__input_type_avatar');
const profileImg = document.querySelector('.profile__image');
const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPic = imagePopup.querySelector('.popup__image');
const imagePopupDesc = imagePopup.querySelector('.popup__caption');
const newCardForm = popupAddCard.querySelector('.popup__form');
const placeInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const buttonClosePopupEditAvatar = popupEditAvatar.querySelector('.popup__close');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close');
const buttonSubmitPopupEditAvatar = popupEditAvatar.querySelector('.popup__button');
const buttonSubmitPopupEditProfile = popupEditProfile.querySelector('.popup__button');
const buttonSubmitPopupAddCard = popupAddCard.querySelector('.popup__button');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive', 
    inputErrorClass: '.form-input-error',
    errorClass: 'form__input-error_active', 
  };

// функция открытия попапа с картинкой
function zoomImg(evt, cardElement) {
    imagePopupDesc.textContent = cardElement.querySelector('.card__title').textContent;
    imagePopupPic.src = evt.target.src;
    imagePopupPic.alt = evt.target.alt;
    openModal(imagePopup);
}

// обработчики открытия и закрытия модальных окон
profileImg.addEventListener('click', function () {
    formEditAvatar.reset();
    clearValidation(formEditAvatar, validationConfig);
    openModal(popupEditAvatar);
})

buttonOpenPopupEditProfile.addEventListener('click', function () {
    openModal(popupEditProfile);
    clearValidation(formEditProfile, validationConfig);
});

buttonOpenPopupAddCard.addEventListener('click', function() {
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig);
    openModal(popupAddCard);
});

buttonClosePopupEditAvatar.addEventListener('click', () => closeModal(popupEditAvatar));
buttonClosePopupEditProfile.addEventListener('click', () => closeModal(popupEditProfile));
buttonClosePopupAddCard.addEventListener('click', () => closeModal(popupAddCard));
buttonCloseImagePopup.addEventListener('click', () => closeModal(imagePopup));

popupEditAvatar.addEventListener("click", closeModalOverlay);
popupEditProfile.addEventListener("click", closeModalOverlay);
popupAddCard.addEventListener("click", closeModalOverlay);
imagePopup.addEventListener("click", closeModalOverlay);

// функция редактирования профиля
function submitEditProfileForm(evt) {
    evt.preventDefault();
    renderLoading(true, buttonSubmitPopupEditProfile);
    editUserInfo(nameInput.value, jobInput.value).then((result) => {
        renderUserInfo(result.name, result.about, result.avatar)
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, buttonSubmitPopupEditProfile);
        closeModal(popupEditProfile);
    });
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

// функция добавления новой карточки
function submitAddCardForm(evt) {
    evt.preventDefault();
     
    renderLoading(true, buttonSubmitPopupAddCard);
    addNewCard(placeInput.value, linkInput.value).then(res => {
        placesList.prepend(createCard(res, handleDelete, pressLikeButton, zoomImg, res.owner._id));
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, buttonSubmitPopupAddCard);
        closeModal(popupAddCard);
        newCardForm.reset();
    });
}

newCardForm.addEventListener('submit', submitAddCardForm);

//функция редактирования аватара
function submitEditAvatarForm(evt) {
    evt.preventDefault();
    renderLoading(true, buttonSubmitPopupEditAvatar);
    editAvatar(avatarLinkInput.value).then(res => {
        renderUserInfo(res.name, res.about, res.avatar)
   })
   .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(false, buttonSubmitPopupEditAvatar);
        closeModal(popupEditAvatar);
    });
}

formEditAvatar.addEventListener('submit', submitEditAvatarForm);

function renderInitialCards(data, userId) { 
    data.forEach((item) => { 
        placesList.append(createCard(item, handleDelete, pressLikeButton, zoomImg, userId));
    })
}

Promise.all([getUserInfo(), getInitialCards()]).then(([userData, cards]) => {
    renderInitialCards(cards, userData._id);
    renderUserInfo(userData.name, userData.about, userData.avatar);
})

function renderUserInfo(userName, userDesc, userAvatar) {
    profileTitle.textContent = userName;
    profileDesc.textContent = userDesc;
    profileImg.style.backgroundImage = `url(${userAvatar})`;
    nameInput.value = userName; 
    jobInput.value = userDesc;
}

function renderLoading(isLoading, submitButton) {
    submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

enableValidation(validationConfig);
