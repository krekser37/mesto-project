

export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
    }

    openPopup() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose.bind(this));
      document.addEventListener('keydown', this._handleEnterSubmit.bind(this));
    }

    closePopup() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose.bind(this));
      document.removeEventListener('keydown', this._handleEnterSubmit.bind(this));
    }

    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.closePopup();

      }
    }

    renderLoading(isLoading, text) {
      if (isLoading) {
          this._buttonSubmit.textContent = `${text}`;
      } else {
          this._buttonSubmit.textContent = "Сохранить";
      }
  }


    setEventListeners() {
            this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.closePopup();
      }
        else if (evt.target.classList.contains('popup__close-icon')) {
          this.closePopup();
      };
      });
    }

    _handleEnterSubmit(evt) {
      if (evt.key === 'Enter') {
        this.setEventListeners();

      }
    }
}