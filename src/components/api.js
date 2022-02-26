  export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      Authorization: '2ef8cf34-6b98-4875-b1ea-25ec5874c878', // Токен
      'Content-Type': 'application/json',
      /* 'Content-Type': 'application/x-www-form-urlencoded', — формат, который кодирует поля формы так,
       чтобы их можно было отправить в URL; */
     /*  'Content-Type': 'multipart/form-data', — для отправки файлов на сервер. 
      Подойдёт, если среди прочего вы отправляете через форму картинку. */
    }
  };

  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

/* res.json — разбирает JSON в объект, этот метод вы уже знаете;
res.text — разбирает тело как текст;
res.blob — разбирает тело ответа как бинарные данные: это нужно при получении файлов (изображений, видео, pdf-документов). */

  export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      })
      .then(res => getResponseData(res))
      .catch(err => console.log(err))
  };
  
  export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      })
      .then(res => getResponseData(res))
      .catch(err => console.log(err))
  };

//запрос на сервер с отправкой данных карточек
  export const addCards = (cards) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(cards),
      })
      .then(res => getResponseData(res))
  };

  export const addUser = (user) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(user),
      })
      .then(res => getResponseData(res))
  };

  export const addNewCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data),
      })
      .then(res => getResponseData(res))
  };

  export const addLike = (cardsId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardsId}`, {
      method: 'PUT',
      headers: config.headers,
      })
      .then(res => getResponseData(res))
  };

  export const removeLike = (cardsId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardsId}`, {
      method: 'DELETE',
      headers: config.headers,
      })
      .then(res => getResponseData(res))
  };

  export const deleteCard = (cardsId) => {
    return fetch(`${config.baseUrl}/cards/${cardsId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(res => getResponseData(res))
  };

  export const changeAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then(res => getResponseData(res))
  };