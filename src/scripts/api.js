
export const authConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
    headers: {
    authorization: 'c310e6ce-4a92-441b-8e12-437db4f00de4',
    'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(`${authConfig.baseUrl}/cards`, {headers: authConfig.headers})
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const getUserInfo = () => {
    return fetch(`${authConfig.baseUrl}/users/me`, {headers: authConfig.headers})
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
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
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
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
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${authConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: authConfig.headers,
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const editAvatar = (avatar) => {
    return fetch(`${authConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: authConfig.headers,
        body: JSON.stringify({
            avatar: avatar,
        })
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const addCardLike = (cardId, likesCounter) => {
    return fetch(`${authConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: authConfig.headers
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteCardLike = (cardId, likesCounter) => {
    return fetch(`${authConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: authConfig.headers
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

