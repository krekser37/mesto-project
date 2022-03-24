import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector, imageSelector, textSelector){
        super(popupSelector);
        this._image = document.querySelector(imageSelector);
        this._text = document.querySelector(textSelector);
    }

    openPopup(name,link) {
        super.openPopup();
        this._image.src = link;
        this._image.alt = name;
        this._text.textContent = name;
    }
}