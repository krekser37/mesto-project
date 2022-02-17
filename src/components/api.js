/* fetch('https://nomoreparties.co/v1/plus-cohort-6/cards', {
  headers: {
    authorization: '2ef8cf34-6b98-4875-b1ea-25ec5874c878'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
*/

/* 
  GET https://nomoreparties.co/v1/plus-cohort-6
 */
  const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      Authorization: '2ef8cf34-6b98-4875-b1ea-25ec5874c878', // Токен
      'Content-Type': 'application/json'
    }
  };

  const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(res => getResponseData(res));
  };
  
  const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
      .then(res => getResponseData(res));
  };

  export const getAppInfo = () => {
    return Promise.all([getUser(), getCards()]);
    .then(([user, cards]) => {
      // Теперь у нас одновременно есть данные ответов user и cards
    })
    .catch(err => console.log(err));
  };