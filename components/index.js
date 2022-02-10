
const buttonEdit = document.querySelector('.profile__button_is_edit')
const popupEdit = document.querySelector('.popup_type_edit')
const buttonAdd = document.querySelector('.profile__button_is_add')
export const popupAdd = document.querySelector('.popup_type_add')
const popupImage = document.querySelector('.popup_type_image')
const buttonCloseEdit = document.querySelector('.popup__close-icon_is_edit')
const buttonCloseAdd = document.querySelector('.popup__close-icon_is_add')
const buttonCloseImage = document.querySelector('.popup__close-icon_is_image')
export const wrapElement = document.querySelector('.elements')
export const formAddElement = document.querySelector('.form__add')
export const text = document.querySelector('.element__text')
export const place = document.querySelector('.element__image')
const formElement = document.querySelector('.form')
const inputName = document.querySelector('.form__item_is_name')
const inputJob = document.querySelector('.form__item_is_job')
const profilName = document.querySelector('.profile__title')
const profilJob = document.querySelector('.profile__subtitle')
export const image = document.querySelector('.element__image_type_popup')
export const nameImage = document.querySelector('.element__text_type_popup')
export const title = document.querySelector('.form__item_is_title')
export const activity = document.querySelector('.form__item_is_activity')


import {closePopup, openPopup} from './modal.js'
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
})

popupAdd.addEventListener('click', function() {
  closePopup(popupAdd);
})

popupEdit.addEventListener('click', function() {
  closePopup(popupEdit);
})

//не закрывать по картинке/ по попапу
popupImage.querySelector('.popup__image').addEventListener('click', (evt) => {
  evt.stopPropagation()
})

popupAdd.querySelector('.popup__add').addEventListener('click', (evt) => {
  evt.stopPropagation()
})

popupEdit.querySelector('.popup__edit').addEventListener('click', (evt) => {
  evt.stopPropagation()
})


//кнопка сохранить Edit и отправка данных
function submitProfileForm (evt) {
  evt.preventDefault();
  profilName.textContent = inputName.value;
  profilJob.textContent = inputJob.value;
  closePopup(popupEdit);
}
formElement.addEventListener('submit', submitProfileForm);



//Валидация

export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive', 
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}; 

import {enableValidation} from './validate.js';


enableValidation(validationSettings);






