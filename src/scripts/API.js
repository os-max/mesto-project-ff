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
