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

  _getInputsValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value
    });
    this._formValues = formValues;
    return formValues;
    }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputsValues())
    })
  } 

  setInputValues(values) {
    Object.keys(values).forEach((input) => {
      this._form[input].value = values[input]
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
