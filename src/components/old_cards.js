import {formDeleteElement, elementTemplate, wrapElement, popupImage, popupDelete, image, nameImage} from './utils.js';
import {closePopup, openPopup, renderLoading} from './modal.js';
import {addLike, removeLike, deleteCardServer} from './old_api.js';

//проверка совпадения id лайка
export function checkIsLiked(cards, currentUserId) {
  for (let like of cards.likes) {
    if (like._id === currentUserId) {
      return true;
    }
  }
  return false;
}

//установка лайка и его счетчик 
export function handleLikes(cards, likeButton, likeCounterElement) {
  if (!likeButton.classList.contains('element__button-like_active')) {
    addLike(cards._id)
    .then ((cards) => {
      likeButton.classList.add('element__button-like_active'),
      likeCounterElement.textContent = cards.likes.length
  })}
  else {
    removeLike(cards._id)
    .then ((cards) => {
      likeButton.classList.remove('element__button-like_active'),
      likeCounterElement.textContent = cards.likes.length
    })
}};

//удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
  cardElement = null;
};

//создание картинки
function getCardElement(cards, currentUserId, isLiked) {
  const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__text');
  const cardElementImage = cardElement.querySelector('.element__image');

  //лайк картинки
  const likeButton = cardElement.querySelector('.element__button-like');
  const likeCounterElement = cardElement.querySelector('.element__sum_likes');

  likeCounterElement.textContent = cards.likes.length.toString();

  //активный лайк при загрузке
  if (isLiked) {
    likeButton.classList.add('element__button-like_active');
  } 

  //клик по иконке лайка
  likeButton.addEventListener('click', function() { 
    handleLikes(cards, likeButton, likeCounterElement)});

  //иконка удаления картинки
  const deleteButton = cardElement.querySelector('.element__button-delete');
  if (Boolean(cards.owner._id != currentUserId)) {
    deleteButton.classList.add('element_button-delete_is_hidden');
  }
  else {
    deleteButton.classList.add('element_button-delete_is_visible');
    deleteButton.addEventListener('click', function () { 
      openPopup(popupDelete); 
      const cardId = cards._id; 
      
      const submitDeleteForm = (event) => {
        event.preventDefault();
        renderLoading(popupDelete, 'Удаление...')
        deleteCardServer(cardId)
        .then (() => {
          deleteCard(cardElement)
          })
        .then (() => {
          closePopup(popupDelete)
          })
        .finally(() => {
          renderLoading(popupDelete, "Да"),
          formDeleteElement.removeEventListener('submit', submitDeleteForm)
        })
      }
      formDeleteElement.addEventListener('submit', submitDeleteForm);
    });
}

  cardTitle.textContent = cards.name;
  cardElementImage.src = cards.link;
  cardElementImage.alt = cards.name;

  //открытие попапа картинки
  cardElementImage.addEventListener('click', function (evt) {
    evt.preventDefault();
    nameImage.innerText = cards.name
    image.setAttribute('src', cards.link)
    image.setAttribute('alt', cards.link)
    openPopup(popupImage)
  })
  return cardElement;
}

//работа с карточками
export function renderCard(cards, currentUserId, isLiked) {
  const cardElement = getCardElement(cards, currentUserId, isLiked); 
  wrapElement.prepend(cardElement);
}
