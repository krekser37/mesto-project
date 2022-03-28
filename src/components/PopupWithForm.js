import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmit){
        super(popupSelector);
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
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._formSubmit.bind(this))
        
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}