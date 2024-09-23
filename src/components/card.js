export {createCard, handleDelete, addLike}

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardData, handleDelete, addLike, zoomImg) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.desc;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => handleDelete(cardElement));
    cardElement.querySelector('.card__like-button').addEventListener('click', addLike);
    cardImage.addEventListener('click', (evt) => zoomImg(evt, cardElement));
    
    return cardElement;
}

// Функция удаления карточки
const handleDelete = (cardElement) => {
    cardElement.remove();
}

// функция, обрабатывающая событие лайка
function addLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}