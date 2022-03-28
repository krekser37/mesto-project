
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit, popupOpenButton){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('form');
        this._inputList = this._popup.querySelectorAll('.form__item');
        this._buttonSubmit = this._form.querySelector('.form__button-save');  //Лев, объясни потом, пожалуйста, почему здесь с точкой, а выше без
        this._popupOpenButton = popupOpenButton;
    }
    _getInputValues() {
        let data = {};
        this._inputs.forEach((input) => {
            data[input.name] = input.value;
        });
        if (this._element) {
            data = [this._cardId, this._element];
            return data;
        }
        return data;
    }
    renderLoading(isLoading, text) {
        if (isLoading) {
            this._buttonSubmit.textContent = `${text}`;
        } else {
            this._buttonSubmit.textContent = "Сохранить";
        }
        
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
        /* this._form.addEventListener('submit', this._handleFormSubmit.bind(this))
        console.log(this._popupOpenButton); */
        /* this._popupOpenButton.addEventListener('click', () => {this.openPopup()});  */
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputsValues())
        })
    } 



    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}