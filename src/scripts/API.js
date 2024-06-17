const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16/',
  headers: {
    authorization: 'd59d3d9d-a030-463c-bab7-37a80825e20e',
    'Content-Type': 'application/json'
  }
}

function getResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const getMyData = () => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then (getResult)
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then (getResult)
}

export const setNewUserData = (name, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
    .then (getResult)
}

export const sendNewCard = (name, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
   .then (getResult)
}

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then (getResult)
}

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then (getResult)
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then (getResult)
}

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatar}`
    })
  })
    .then (getResult)
}
