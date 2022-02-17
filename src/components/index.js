import '../pages/index.css'; 
import {validationSettings, enableValidation} from './validate.js';
import {submitEditForm, submitAddForm} from './cards.js'; 
import {closeClickPopup, openPopup} from './modal.js';
import {inputName, profilName, inputJob, profilJob, buttonEdit, buttonAdd, popupAdd, popupEdit, formEditElement, formAddElement} from './utils.js';
import {getAppInfo} from './api.js';

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

getAppInfo();


/*   getAppInfo()
  .then(([user, cards]) => {
    // Теперь у нас одновременно есть данные ответов user и cards
  })
  .catch(err => console.log(err)); */