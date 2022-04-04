import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector, image, text){
        super(popupSelector);
        this._image = this._popup.querySelector(image);
        this._text = this._popup.querySelector(text);
    }

    openPopup(name,link) {
        super.openPopup();
        this._image.src = link;
        this._image.alt = name;
        this._text.textContent = name;
        
    }
}