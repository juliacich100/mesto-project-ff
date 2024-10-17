export {createCard, handleDelete, pressLikeButton}
import { deleteCard, addCardLike, deleteCardLike} from "../scripts/api";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardData, handleDelete, pressLikeButton, zoomImg, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likesCounter = cardElement.querySelector('.card__like-button-count');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    likesCounter.textContent = cardData.likes.length;
    if(cardData.owner._id != userId) {
        cardDeleteButton.classList.add('card__delete-button-hidden');
    } else {
        cardDeleteButton.addEventListener('click', () => {
            deleteCard(cardData._id).then(() => handleDelete(cardElement))});
    }
    if(hasUserLikes(cardData.likes, userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    };

    cardLikeButton.addEventListener('click', (evt) => {
        updateLikesNumber(evt, cardData._id).then((result) => {
            likesCounter.textContent = result.likes.length;
            pressLikeButton(evt);
        }).catch((err) => {console.log(err)});     
    });
    cardImage.addEventListener('click', (evt) => zoomImg(evt, cardElement));

    return cardElement;
}

// Функция удаления карточки
const handleDelete = (cardElement) => {
    cardElement.remove();
}

// функция, обрабатывающая событие лайка
function pressLikeButton(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

function hasUserLikes(cardLikes, userId) {
    const likesList = Array.from(cardLikes);
    return likesList.some((like) => {
        return like._id === userId;
      })
}

const updateLikesNumber = (evt, cardId) => {
    return evt.target.classList.contains('card__like-button_is-active') ? deleteCardLike(cardId) : addCardLike(cardId);
}
