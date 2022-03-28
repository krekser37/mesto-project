import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit, popupOpenButton){
        super(popupSelector);
<<<<<<< HEAD
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('form');
        this._buttonSubmit = this._form.querySelector('.form__button-save');  //Лев, объясни потом, пожалуйста, почему здесь с точкой, а выше без
        console.log(this._form);
        console.log(this._formSubmit);
        console.log(this._buttonSubmit);
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



        return this._form.elements;
    }

    renderLoading(isLoading, text) {
        if (isLoading) {
            this._buttonSubmit.textContent = `${text}`;
        } else {
            this._buttonSubmit.textContent = "Сохранить";
        }
=======
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
>>>>>>> fab94b3cc6ecaf4acdaaa0d2f96c3c4753212ed0
    }

    setEventListeners() {
        super.setEventListeners();
<<<<<<< HEAD
        this._form.addEventListener('submit', this._formSubmit.bind(this))
        
=======
        this._popupOpenButton.addEventListener('click', () => this.openPopup());
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputsValues())
        })
>>>>>>> fab94b3cc6ecaf4acdaaa0d2f96c3c4753212ed0
    }

    closePopup() {
        super.closePopup();
<<<<<<< HEAD
        this._form.reset();
=======
        this.form.reset();
>>>>>>> fab94b3cc6ecaf4acdaaa0d2f96c3c4753212ed0
    }
}