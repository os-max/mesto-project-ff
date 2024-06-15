const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16/',
  headers: {
    authorization: 'd59d3d9d-a030-463c-bab7-37a80825e20e',
    'Content-Type': 'application/json'
  }
}

export const getMyData = () => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
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
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
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
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatar}`
    })
  })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}
