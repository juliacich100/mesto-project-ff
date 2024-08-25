// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки

function addCard() {
    initialCards.forEach(function(place) {
        const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

        cardElement.querySelector('.card__image').src = place.link;
        cardElement.querySelector('.card__title').textContent = place.name;

        placesList.append(cardElement);

        cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
    })
}


// @todo: Функция удаления карточки

function removeCard(button) {
    const targetButton = button.target;
    const buttonCard = targetButton.closest('.places__item'); 
    buttonCard.remove();
}

// @todo: Вывести карточки на страницу

addCard();