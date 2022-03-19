
export default class Card {
    constructor(card, selector) {
      this._selector = selector;
      this._name = card.name;
      this._image = card.image;
      this._likes = card.likes;
      this._link = card.link;
      this._cardId = card._id;
      this._ownerId = card.owner._id;
      // this._isLiked = this._checkIsLiked();
    }


    _getCardTemplate() {
      const cardTemplate = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardTemplate;
    }



    defineCard() {
       this._element = this._getCardTemplate();
       this._element.querySelector('.element__image').src = this._link;
       this._element.querySelector('.element__text').textContent = this._name;



    // //лайк картинки
    //     this._likeButton = cardElement.querySelector('.element__button-like');
    //     this._likeCounterElement = cardElement.querySelector('.element__sum_likes');

    //     this._likeCounterElement.textContent = this._selector.this._likes.length.toString();

    // //активный лайк при загрузке
    //     if (this._isLiked) {
    //         this._likeButton.classList.add('element__button-like_active');
    //     }
    
    // //клик по иконке лайка
    //     this._likeButton.addEventListener('click', () => this.handleLikes);

    //     cardTitle.textContent = this._name;
    //     cardElementImage.src = this._link;
    //     cardElementImage.alt = this._name;






        return this._element;
      }






    // _checkIsLiked() {
    //     for (let like of this._likes) {
    //         if (like._id === currentUserId) {
    //           return true;
    //         }
    //       }
    //       return false;

    // }
}