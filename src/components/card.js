export {createCard, handleDelete, pressLikeButton}
import { deleteCard, addCardLike, deleteCardLike} from "../scripts/api";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardData, handleDelete, pressLikeButton, zoomImg, user) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likesCounter = cardElement.querySelector('.card__like-button-count');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    likesCounter.textContent = cardData.likes.length;
    if(cardData.owner._id != user) {
        cardDeleteButton.classList.add('card__delete-button-hidden');
    }

    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardData._id).then(res => {handleDelete(cardElement)})});
    cardLikeButton.addEventListener('click', (evt) => {
        pressLikeButton(evt);
        updateLikesNumber(evt, cardData._id, likesCounter);     
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

function updateLikesNumber(evt, cardId, likesCounter) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        addCardLike(cardId).then((result) => {           
                likesCounter.textContent = result.likes.length;
                }).catch((err) => {console.log(err)});
    } else {
        deleteCardLike(cardId).then((result) => {
                    likesCounter.textContent = result.likes.length;
               }).catch((err) => {console.log(err)});
    }
}
