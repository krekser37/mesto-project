import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmit){
        super(popupSelector);
        this.formSubmit = formSubmit;
        this.form = this.popup.querySelector('form');
        
    }

    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', this.formSubmit)
    }

    close() {
        super.close();
        title.value = '';
        activity.value = '';
    }
}