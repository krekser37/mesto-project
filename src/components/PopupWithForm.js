import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit, popupOpenButton){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this.form = this._popup.querySelector('form');
        this._inputList = this._popup.querySelectorAll('.form__item');
        this._submitButton = this._popup.querySelector('.form__button-save');
        this._popupOpenButton = popupOpenButton;
        
    }

    _getInputsValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupOpenButton.addEventListener('click', () => this.openPopup());
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputsValues())
        })
    }

    closePopup() {
        super.closePopup();
        this.form.reset();
    }
}