export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

export function closeClickPopup() {
  const popupLists = Array.from(document.querySelectorAll('.popup'));
  popupLists.forEach((popup) => {
    popup.addEventListener('mousedown', function(evt) { //mousedown
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    };
      if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
    };
    });
  });
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

 //закрываем по клавише ESC (проверить на компьютере!!!)
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function renderLoading(popup, text) {
  const buttonElement = popup.querySelector('.form__button-save');
  buttonElement.textContent = text;
}

