

export default class Card {
    constructor(card, selector, currentUser, api) {
      this._selector = selector;
      this._name = card.name;
      this._image = card.image;
      this._likes = card.likes;
      this._link = card.link;
      this._cardId = card._id;
      this._ownerId = card.owner._id;
      this._currentUser = currentUser;
      this._api = api;
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
     
    //Проверяем наличией лайка на карточке 
    _checkIsLiked() { 
       this._isLiked = Boolean(this._likes.find((user) => { return user._id === this._currentUser}));

     }

     //Проверяем наша ли карточка
     _isMine() {
       this.isMine = this._cardId === this._currentUser;
       return this.isMine;
     }

    //Создаем карточку
    defineCard() {
       this._element = this._getCardTemplate();
       this._element.querySelector('.element__image').src = this._link;
       this._element.querySelector('.element__text').textContent = this._name;

    //Разбираемся с кнопкой удаления // Нужно добавить слушатель на удаление
       this._deleteButton = this._element.querySelector('.element__button-delete')
       if (!this._isMine()) {
         this._deleteButton.classList.add('element_button-delete_is_hidden')
       }
       else {
         this._deleteButton.classList.add('element_button-delete_is_visible')
       }

      
       this._checkIsLiked();
       this._handleLikes();
        return this._element;
      }

    //Обработчик лайков
    _handleLikes() {           /// Нужно обновлять счетчик при нажатии

      this._likeButton = this._element.querySelector('.element__button-like');
      this._likeCounterElement = this._element.querySelector('.element__sum_likes');
      //Отрисовка лайков с сервера

      if (this._isLiked) {
        this._likeButton.classList.add('element__button-like_active');
      }

      //Отрисовка количсетва лайков

        this._likeCounterElement.textContent = this._likes.length;

        //Клик по кнопке лайка
        this._likeButton.addEventListener('click', () => {
          if (!this._likeButton.classList.contains('element__button-like_active')) {
            this._api.addLike(this._cardId)
            .then (() => {
              this._likeButton.classList.add('element__button-like_active')
            })
          }
  
          else { 
            this._api.removeLike(this._cardId)
            .then (() => {
              this._likeButton.classList.remove('element__button-like_active')
            })
  
  
          }this._likeCounterElement.textContent = this._likes.length;
        } );

    }

 }