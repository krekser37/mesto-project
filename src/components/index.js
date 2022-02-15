import '../pages/index.css'; 
import {validationSettings, enableValidation} from './validate.js';
import {submitEditForm, submitAddForm} from './cards.js'; 
import {closeClickPopup, openPopup, openPopupForm} from './modal.js';
import {inputName, profilName, inputJob, profilJob, buttonEdit, buttonAdd, popupAdd, popupEdit, formEditElement, formAddElement} from './utils.js';

//открываем попапы
buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
}); 

buttonAdd.addEventListener('click', function() {
  openPopupForm(popupAdd);
});

 //закрываем попапы
  closeClickPopup();

 //сабмиты
formEditElement.addEventListener('submit', submitEditForm);

formAddElement.addEventListener('submit', submitAddForm); 

//Валидация
enableValidation(validationSettings);