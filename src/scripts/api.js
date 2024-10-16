
export const authConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
    headers: {
    authorization: 'c310e6ce-4a92-441b-8e12-437db4f00de4',
    'Content-Type': 'application/json'
    }
}

const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
} 

export const getInitialCards = () => {
    return fetch(`${authConfig.baseUrl}/cards`, {headers: authConfig.headers})
    .then(handleResponse);
}

export const getUserInfo = () => {
    return fetch(`${authConfig.baseUrl}/users/me`, {headers: authConfig.headers})
    .then(handleResponse);
}

export const editUserInfo = (userName, userDesc) => {
    return fetch(`${authConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: authConfig.headers, 
        body: JSON.stringify({
            name: userName,
            about: userDesc
        })
    })
    .then(handleResponse);
}

export const addNewCard = (cardName, cardLink) => {
    return fetch(`${authConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: authConfig.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(handleResponse);
}

export const deleteCard = (cardId) => {
    return fetch(`${authConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: authConfig.headers,
    })
    .then(handleResponse);
}

export const editAvatar = (avatar) => {
    return fetch(`${authConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: authConfig.headers,
        body: JSON.stringify({
            avatar: avatar,
        })
    })
    .then(handleResponse);
}

export const addCardLike = (cardId) => {
    return fetch(`${authConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: authConfig.headers
    })
    .then(handleResponse);
}

export const deleteCardLike = (cardId) => {
    return fetch(`${authConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: authConfig.headers
    })
    .then(handleResponse);
}

