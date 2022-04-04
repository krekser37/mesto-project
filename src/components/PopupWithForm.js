
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit, popupOpenButton){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._popup.querySelectorAll('.form__item');
        this._buttonSubmit = this._form.querySelector('.form__button-save'); 
        this._popupOpenButton = popupOpenButton;
    }
/*     _getInputValues() {
        let data = {};
        this._inputs.forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    } */

    _getInputsValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        /* this._popupOpenButton.addEventListener('click', () => {this.openPopup()});   */
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputsValues())
        })
    } 

    setInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
          // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
        input.value = formValues[input.name];
        input.value = formValues[input.activity];
        });
        return formValues;
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}