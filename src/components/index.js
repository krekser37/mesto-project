import '../pages/index.css'; 
import {validationSettings, enableValidation} from './validate.js';
import {submitFormPhoto, submitProfileForm} from './cards.js'; 
import {closePopup, openPopup} from './modal.js';
import {inputName, profilName, inputJob, profilJob, buttonEdit, buttonAdd, buttonCloseEdit, buttonCloseAdd, buttonCloseImage, popupImage, popupAdd, popupEdit, formElement, formAddElement} from './utils.js';

//открываем попапы

buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
  inputName.value = profilName.textContent;
  inputJob.value = profilJob.textContent;
}); 

buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd);
});

 //закрываем попапы

buttonCloseEdit.addEventListener('click', function() {
  closePopup(popupEdit);
}); 

buttonCloseAdd.addEventListener('click', function() {
  closePopup(popupAdd);
}); 

buttonCloseImage.addEventListener('click', function() {
  closePopup(popupImage);
}); 

//закрытие по пустому полю картинки/попапу

popupImage.addEventListener('click', function() {
  closePopup(popupImage);
});

popupAdd.addEventListener('click', function() {
  closePopup(popupAdd);
});

popupEdit.addEventListener('click', function() {
  closePopup(popupEdit);
});

//не закрывать по картинке/ по попапу
popupImage.querySelector('.popup__image').addEventListener('click', (evt) => {
  evt.stopPropagation()
});

popupAdd.querySelector('.popup__add').addEventListener('click', (evt) => {
  evt.stopPropagation()
});

popupEdit.querySelector('.popup__edit').addEventListener('click', (evt) => {
  evt.stopPropagation()
});

formElement.addEventListener('submit', submitProfileForm);

formAddElement.addEventListener('submit', submitFormPhoto); 

//Валидация
enableValidation(validationSettings);