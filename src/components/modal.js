

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
  }

export function closePopup(popupElement) {
  if (popupElement.classList.contains('popup_opened')) {
    popupElement.classList.remove('popup_opened');
  }
    document.removeEventListener('keydown', closePopupEsc);
}

  //закрываем по клавише ESC (проверить на компьютере!!!)
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  }  