// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.desc;
    cardElement.querySelector('.card__title').textContent = cardData.name;

        cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки

function removeCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
    placesList.append(createCard(item));
})