import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector, imgSelector){
        super(popupSelector);
        this._img = document.querySelector(imgSelector);
    }

    open() {
        super.open(name,link);



        /* nameImage.innerText = cards.name
        image.setAttribute('src', cards.link)
        image.setAttribute('alt', cards.link) */
    }



}