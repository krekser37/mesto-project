/* fetch('https://nomoreparties.co/v1/plus-cohort-6/user/me', {
  headers: {
    authorization: '2ef8cf34-6b98-4875-b1ea-25ec5874c878',
    'Content-Type': 'application/json',
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  })
 */

/* 
 POST https://nomoreparties.co/v1/plus-cohort-6 */

/*  import {currentUserId} from './index.js'; */

  const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      Authorization: '2ef8cf34-6b98-4875-b1ea-25ec5874c878', // Токен
      'Content-Type': 'application/json',
    }
  };

  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

/*   const getResponseData() {
    .then((res) => {
      return res.json(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
      console.log(data.user.name); // если мы попали в этот then, data — это объект
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });  */

  const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET', 
      headers: config.headers,
    /*   body: JSON.stringify(), */
/*       body: JSON.stringify({
        name: userName,
        about: userAbout,
        _id: user_id, */
      })
      .then(res => getResponseData(res));
  };
  
  const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers,
      })
      .then(res => getResponseData(res));
  };

  export const getAppInfo = () => {
    return Promise.all([getUser(), getCards()])
      .then ((getUser, getCards) => {
      console.log(getUser);
      console.log(getCards);
    })

  };

/* 
  
export const user = {
  name: "Loading...",
  about: "Loading...",
  avatar: "",
  _id: ""
} */