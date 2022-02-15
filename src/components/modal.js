import {inputName, inputJob, profilName, profilJob} from './utils.js';

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  inputName.value = profilName.textContent;
  inputJob.value = profilJob.textContent;
  document.addEventListener('keydown', closePopupEsc);
}

export function openPopupForm(popup) {
  openPopup(popup);
}

export function closeClickPopup() {
  const popupLists = Array.from(document.querySelectorAll('.popup'));
  popupLists.forEach((popup) => {
    popup.addEventListener('mousedown', function(evt) { //mousedown
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    };
      if (evt.target.classList.contains('popup__close-icon')) {
     /*  evt.stopPropagation() //не закрывать по картинке/ по попапу  */
      closePopup(popup)
    };
    });
  });
}

  //деактивация кнопки "Сохранить" после закрытия
export function disabledButton() {
    const popupLists = Array.from(document.querySelectorAll('.form'));
    popupLists.forEach((popupElement) => {
      const buttonElement = popupElement.querySelector('.form__button-save');
      console.log(buttonElement);
      buttonElement.setAttribute("disabled", "");
    })
}


export function closePopup() {
  const popupLists = Array.from(document.querySelectorAll('.popup'));
    popupLists.forEach((popupElement) => {
      popupElement.classList.remove('popup_opened');
      
  })
}

 //закрываем по клавише ESC (проверить на компьютере!!!)
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
