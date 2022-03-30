import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, confirmedAction) {
        super(popupSelector);
        this._buttonSubmit = this._popup.querySelector('.form__button-delete')
        this._confirmedAction = confirmedAction;
    }



    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', evt => {
            evt.preventDefault();
            this._confirmedAction(this._card)

        })
    }

    openPopup(card) {
        super.openPopup();
        this._card = card;
        
    }

}