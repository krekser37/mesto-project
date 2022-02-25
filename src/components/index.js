import '../pages/index.css'; 
import {validationSettings, enableValidation} from './validate.js';
import {renderCard, submitEditForm, submitAddForm, DeleteImage, haveButtonDelet} from './cards.js'; 
import {closeClickPopup, openPopup, undisabledButton} from './modal.js';
import {wrapElement, inputName, profilName, profilAvatar, inputJob, profilJob, likes,
  buttonEdit, buttonAdd, popupAdd, popupEdit, formEditElement, formAddElement, formDeleteElement, popupDelete, buttonDelete} from './utils.js';
import { getUser, getCards, addCards, addLike, removeLike} from './api.js';

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

//api
export let currentUserId = "";

getAppInfo()
  .then(([user, cards]) => {
    currentUserId = user._id,
    console.log(cards),
    profilName.textContent = user.name,
    profilJob.textContent = user.about,
    /* profilAvatar.src = user.avatar,
    profilAvatar.alt = user.name, */
    
    title.textContent = cards.name,
    activity.src  = cards.link,
    likes.textContent = cards.likes,

    cards.forEach(cards => {
      renderCard(cards, wrapElement);
      addCards(cards);
    })
  })
  .catch(err => console.log(err))
  
  

  