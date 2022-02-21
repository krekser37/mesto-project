import '../pages/index.css'; 
import {validationSettings, enableValidation} from './validate.js';
import {renderCard, submitEditForm, submitAddForm} from './cards.js'; 
import {closeClickPopup, openPopup} from './modal.js';
import {wrapElement, inputName, profilName, profilAvatar, inputJob, profilJob, buttonEdit, buttonAdd, popupAdd, popupEdit, formEditElement, formAddElement} from './utils.js';
import { getUser, getCards, addCards} from './api.js';

//открываем попапы
buttonEdit.addEventListener('click', function() {
  inputName.value = profilName.textContent;
  inputJob.value = profilJob.textContent;
  openPopup(popupEdit);
}); 

buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd);
});

 //закрываем попапы
  closeClickPopup();

 //сабмиты
formEditElement.addEventListener('submit', submitEditForm);

formAddElement.addEventListener('submit', submitAddForm); 

//Валидация
enableValidation(validationSettings);

const getAppInfo = () => {
  return Promise.all([getUser(), getCards()]);
};

 let currentUserId;

getAppInfo()

  .then(([user, cards]) => {
    currentUserId = user._id;
    
    profilName.textContent = user.name,
    profilJob.textContent = user.about,
    /* profilAvatar.src = user.avatar,
    profilAvatar.alt = user.name, */

    title.textContent = cards.name,
    activity.src  = cards.link,

    console.log(user._id),
    console.log(user),
    console.log(cards)

    cards.forEach(cards => {
      renderCard(cards, wrapElement);
      addCards(cards);
      /* cards(element.name, element.link, wrapElement, addCards)  */
    })
  })
  .catch(err => console.log(err))

  export {
    currentUserId
  }
