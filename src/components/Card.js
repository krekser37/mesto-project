import {elementTemplate} from './utils.js';

export default class Card {
    constructor(cards, selector, currentUserId) {
      this._selector = selector;
      this._name = cards.name;
      this._image = cards.image;
      this._likes = cards.likes;
      this._link = cards.link;
      this._cardId = cards._id;
      this._ownerId = cards.owner._id;

      this._isLiked = this._checkIsLiked();
    }

    getCardElement() {
        const cardElement = elementTemplate.querySelector(this._selector).cloneNode(true);
        const cardTitle = cardElement.querySelector(this._name);
        const cardElementImage = cardElement.querySelector(this._image);


    
    //лайк картинки
        this._likeButton = cardElement.querySelector('.element__button-like');
        this._likeCounterElement = cardElement.querySelector('.element__sum_likes');

        this._likeCounterElement.textContent = this._selector.this._likes.length.toString();

    //активный лайк при загрузке
        if (this._isLiked) {
            this._likeButton.classList.add('element__button-like_active');
        }
    
    //клик по иконке лайка
        this._likeButton.addEventListener('click', () => this.handleLikes);

        cardTitle.textContent = this._name;
        cardElementImage.src = this._link;
        cardElementImage.alt = this._name;






        return cardElement;
      }

    _checkIsLiked() {
        for (let like of this._likes) {
            if (like._id === currentUserId) {
              return true;
            }
          }
          return false;

    }
}