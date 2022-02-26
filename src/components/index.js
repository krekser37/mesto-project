import '../pages/index.css'; 
import {validationSettings, enableValidation} from './validate.js';
import {renderCard, submitEditForm, submitAddForm, submitAvatarForm} from './cards.js'; 
import {closeClickPopup, openPopup} from './modal.js';
import {wrapElement, inputName, profilName, profilAvatar, inputJob, profilJob, likes,
  buttonEdit, buttonAdd, popupAdd, popupEdit, formEditElement, formAddElement, buttonAvatar,
   popupAvatar, inputAvatar, formAvatarElement, popupDelete, buttonDelete} from './utils.js';

import { getUser, getCards} from './api.js';

//открываем попапы
buttonEdit.addEventListener('click', function() {
  inputName.value = profilName.textContent;
  inputJob.value = profilJob.textContent;
  openPopup(popupEdit);
}); 

buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd);
});

buttonAvatar.addEventListener('click', function() {
  inputAvatar.value = profilAvatar.textContent;
  openPopup(popupAvatar);
});

 //закрываем попапы
  closeClickPopup();

 //сабмиты
formEditElement.addEventListener('submit', submitEditForm);

formAddElement.addEventListener('submit', submitAddForm); 

formAvatarElement.addEventListener('submit', submitAvatarForm); 


//Валидация
enableValidation(validationSettings);

const getAppInfo = () => {
  return Promise.all([getUser(), getCards()]);
};

//api
export let currentUserId = "";

getAppInfo()
  .then(([user, cards]) => {
    currentUserId = user._id,

    profilName.textContent = user.name,
    profilJob.textContent = user.about,
    profilAvatar.src = user.avatar,
    profilAvatar.alt = user.name, 
    
    title.textContent = cards.name,
    activity.src  = cards.link,
    likes.textContent = cards.likes,

    cards.forEach(cards => {
      renderCard(cards, wrapElement);
    })
  })
  .catch(err => console.log(err))
  
  

  