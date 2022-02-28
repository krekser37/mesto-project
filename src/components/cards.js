import { formDeleteElement, elementTemplate, wrapElement, popupImage, popupDelete, image, nameImage} from './utils.js';
import {closePopup, openPopup, undisabledButton} from './modal.js';
import {addLike, removeLike, deleteCard} from './api.js';

//проверка совпадения id лайка
export function checkIsLiked(cards, currentUserId) {
  for (let like of cards.likes) {
/*     console.log(like._id);
    console.log(currentUserId); */
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

  const deleteButton = cardElement.querySelector('.element__button-delete');
  if (Boolean(cards.owner._id != currentUserId)) {
    deleteButton.classList.add('element_button-delete_is_hidden');
  }
  else {
    deleteButton.classList.add('element_button-delete_is_visible');
  };

  const cardId = cards._id;

  //удаление картинки
  deleteButton.addEventListener('click', function () {
    undisabledButton();
    enableDeleteButton(cardElement, cardId)
  }); 

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
};

function enableDeleteButton (cardElement, cardId) {
  openPopup(popupDelete);
  formDeleteElement.addEventListener('click', handleDeleteClick); 
  function handleDeleteClick (evt) {
  evt.preventDefault()
  deleteCard(cardId)
  .then (() =>{
     cardElement.remove(),
    closePopup(popupDelete)
    })
    .catch(err => console.log(err))
  }
}
