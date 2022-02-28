import '../pages/index.css'; 
import {validationSettings, enableValidation} from './validate.js';
import {renderCard, checkIsLiked} from './cards.js'; 
import {closeClickPopup, openPopup, closePopup, disabledButton, renderLoading} from './modal.js';
import {profilAvatar, popupAvatar, wrapElement, inputName, profilName, inputJob, profilJob, likes,
  buttonEdit, buttonAdd, popupAdd, popupEdit, formEditElement, formAddElement, buttonAvatar,
   inputAvatar, formAvatarElement, title, activity} from './utils.js';

import {addNewCard, getUser, getCards, changeAvatar, addUser} from './api.js';



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
  return Promise.all([getUser(), getCards()])
  .catch(err => console.log(err))
};

//api
let currentUserId = "";
const isLiked = "";

getAppInfo()
  .then(([user, cards]) => {
    currentUserId = user._id,
/*     isLiked = cards.map(function(el) {
      const like = el.likes;
      console.log(like);
      return like;
    }) */
    /* const isLiked = (cards) => Boolean(cards.likes.find(user => user._id === currentUserId)) */
    profilName.textContent = user.name,
    profilJob.textContent = user.about,
    profilAvatar.src = user.avatar,
    profilAvatar.alt = user.name, 
    
    title.textContent = cards.name,
    activity.src  = cards.link,
    likes.textContent = cards.likes,

    cards.reverse().forEach(cards => {
      let isLiked = checkIsLiked(cards, currentUserId);
      renderCard(cards, currentUserId, isLiked);
    })
  })
  .catch(err => console.log(err))
  
//кнопка сохранить Edit и отправка данных
function submitAddForm (evt) {
  evt.preventDefault();
  renderLoading(popupAdd, 'Сохранение...');
  addNewCard({
    name: title.value,
    link: activity.value
  })
  .then(res => renderCard(res))
  .then(() => {
    closePopup(popupAdd);
    title.value = '';
    activity.value = '';
    disabledButton();
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popupAdd, "Cохранить"))
};

function submitEditForm (evt) {
  evt.preventDefault();
  renderLoading(popupEdit, 'Сохранение...');
  addUser({
    name: inputName.value,
    about: inputJob.value
  })
  .then(res => {
    profilName.textContent = res.name,
    profilJob.textContent = res.about,
    closePopup(popupEdit),
    disabledButton()
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popupEdit, "Cохранить"))
};

function submitAvatarForm(evt) {
  evt.preventDefault();
  renderLoading(popupAvatar, 'Сохранение...');
  changeAvatar({
    name: inputName.value,
    avatar: inputAvatar.value
  })
  .then(res => {
    profilAvatar.src  = res.avatar,
    profilAvatar.alt = res.name,
    closePopup(popupAvatar),
    disabledButton()
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popupAvatar, "Cохранить"))
};
  

  