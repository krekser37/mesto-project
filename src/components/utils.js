
import { api, imagePopup} from './index.js';


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
export const avatarButton= document.querySelector('.profile__edit-image'); 
export const profileEditButton = document.querySelector('.profile__button_is_edit');

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




