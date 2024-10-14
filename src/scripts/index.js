import "../pages/index.css"
import { createCard, handleDelete, pressLikeButton} from "../components/card.js";
import { openModal, closeModal, closeModalOverlay } from "../components/modal.js";
import { clearValidation, setEventListeners } from "./validation.js";
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
const formEditProfile = document.querySelector('.popup_type_edit .popup__form');
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
    clearValidation(formEditAvatar);
    openModal(popupEditAvatar);
})

buttonOpenPopupEditProfile.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent, jobInput.value = profileDesc.textContent;
    openModal(popupEditProfile);
    clearValidation(formEditProfile);
});
buttonOpenPopupAddCard.addEventListener('click', function() {
    newCardForm.reset();
    clearValidation(newCardForm);
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
    
    const singleCard = {};
    singleCard.name = placeInput.value;
    singleCard.link = linkInput.value;
    singleCard.desc = singleCard.name;
    singleCard.likes = '';
    
    renderLoading(true, buttonSubmitPopupAddCard);
    addNewCard(singleCard.name, singleCard.link).then(res => {
        singleCard.owner = res.owner._id;
        placesList.prepend(createCard(singleCard, handleDelete, pressLikeButton, zoomImg));
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

setEventListeners(formEditAvatar);
setEventListeners(formEditProfile);
setEventListeners(newCardForm);

function renderInitialCards(data, user) { 
    data.forEach((item) => { 
        placesList.append(createCard(item, handleDelete, pressLikeButton, zoomImg, user));
    })
}

Promise.all([getUserInfo(), getInitialCards()]).then(([userData, cards]) => {
    renderInitialCards(cards, userData._id);
})

getUserInfo().then((result) => {
        renderUserInfo(result.name, result.about, result.avatar)
    })
    .catch((err) => {
        console.log(err);
    });

function renderUserInfo(userName, userDesc, userAvatar) {
    profileTitle.textContent = userName;
    profileDesc.textContent = userDesc;
    profileImg.style.backgroundImage = `url(${userAvatar})`
}

function renderLoading(isLoading, submitButton) {
    if(isLoading) {
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
}


