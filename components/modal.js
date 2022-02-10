


export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
  }

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
  }

  //закрываем по клавише ESC (проверить на компьютере!!!)

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  } 