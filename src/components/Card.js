

export default class Card {
    constructor(card, selector, currentUser, handleLikes) {
      this._selector = selector;
      this._name = card.name;
      this._image = card.image;
      this._likes = card.likes;
      this._link = card.link;
      this._cardId = card._id;
      this._ownerId = card.owner._id;
      this._currentUser = currentUser;
      this._handleLikes = handleLikes; 
      /* this._api = api; */
     this._isLiked = this._checkIsLiked();
    }

  //Делаем копию шаблона
    _getCardTemplate() {
      const cardTemplate = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardTemplate;
    }
     
    //Создаем карточку
    defineCard() {
       this._element = this._getCardTemplate();
       this._element.querySelector('.element__image').src = this._link;
       this._element.querySelector('.element__text').textContent = this._name;
       this._deleteButton = this._element.querySelector('.element__button-delete');  
       this._likeButton = this._element.querySelector('.element__button-like');
       this._likeCounterElement = this._element.querySelector('.element__sum_likes');
       this._updateDeleteButtonView();
       this._checkIsLiked();
      this._updateLikesView();

      //Клик по кнопке лайка
      this._likeButton.addEventListener('click', () => {this._handleLikes(this)
      
      }); 

      this._checkIsLiked();



        return this._element;
      }

    //Проверяем наличией лайка на карточке 
    _checkIsLiked() { 
      this._isLiked = Boolean(this._likes.find((user) => { return user._id === this._currentUser;
     }));
    }

    //Проверяем наша ли карточка
     _isMine() {
      this.isMine = this._cardId === this._currentUser;
      return this.isMine;
    }
    //проставляем иконку удаления на своих карточках
      _updateDeleteButtonView() {
        if (this._isMine) {
          this._deleteButton.classList.add('element_button-delete_is_hidden');
        } else {
          this._deleteButton.classList.remove('element_button-delete_is_visible');
        };
      };

    //Обработчик лайков
    updateLikes(likes) {
      let cow = likes.stringify()
   console.log(cow)
      this._likes = likes; // Сохранили новые лайки в карточку
 
      this._updateLikesView(); // Перерисовываем сердечко и счетчик (см. ниже)
    }

    //установка количества лайков и цвета сердечка
    _updateLikesView() {
      this._likeCounterElement.textContent = this._likes.length; // Обновили счетчик
      
      this._checkIsLiked();
      // Обновили состояние сердечка
      if (this._isLiked) {
        this._likeButton.classList.add('element__button-like_active');
      } else {
        this._likeButton.classList.remove('element__button-like_active');
      }
    }
  } 
