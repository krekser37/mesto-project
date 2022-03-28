
import { api, imagePopup, imageDeletePopup } from './index.js';


export const options = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      authorization: '2ef8cf34-6b98-4875-b1ea-25ec5874c878',
      'Content-Type': 'application/json'
    }
  }

export const validationSettings = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive', 
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active',
}; 

export const elementTemplate = '.element-template';
export const formElement = document.querySelector('.form');
export const container = document.querySelector('.elements'); 
export const deleteButton= document.querySelector('.form__button-delete'); 


export function handleLikes(card) {
  if (!card._isLiked) {
    api.addLike(card._cardId)
      .then((data) => {
         card.updateLikes(data.likes);
      })
      .catch(err => {
        // openPopup(errorPopup);
      })
  } else {
    api.removeLike(card._cardId)
      .then((data) => { 
          card.updateLikes(data.likes);
      })
      .catch((err) => {
        // openPopup(errorPopup);
      })
  }
}

export function handleImageClick() {
  imagePopup.openPopup(this._name, this._link)
}

export function openDeletePopup() {
  imageDeletePopup.openPopup(this._id);
}

export function submitAvatarForm() {
  /* renderLoading(popupAvatar, 'Сохранение...'); */
  const elements = avatarPopup.getInputValues();
  console.log(elements);

  changeAvatar({
    name: inputName.value,
    avatar: inputAvatar.value
  })
  .then(res => {
    profilAvatar.src  = res.avatar,
    profilAvatar.alt = res.name,
    closePopup(popupAvatar)
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(false))
};


/* export function renderLoading(popup, text) {
  const buttonElement = popup.querySelector('.form__button-save');
  buttonElement.textContent = text;
} */
