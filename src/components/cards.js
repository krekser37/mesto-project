import {elementTemplate, wrapElement, popupAdd, popupEdit, popupImage, image, nameImage, title, activity, profilName, profilJob, inputName, inputJob} from './utils.js';
import {closePopup, disabledButton, openPopup} from './modal.js';
import { addNewCard } from './api.js';
import { currentUserId } from './index.js';

  //создание картинки
function getCardElement(cards, currentUserId, handleLikeClick, handleDeleteClick) {
const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);

const cardTitle = cardElement.querySelector('.element__text');
const cardElementImage = cardElement.querySelector('.element__image');

const likeButton = cardElement.querySelector('.element__button-like');
const deleteButton = cardElement.querySelector('.element__button-delete');
cardTitle.textContent = cards.name;
cardElementImage.src = cards.link;
cardElementImage.alt = cards.name;
//лайк картинки
likeButton.addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__button-like_active');
})
//удаление картинки
deleteButton.addEventListener('click', function () {
  const cardElement = deleteButton.closest('.element-item'); 
  cardElement.remove(); 
}); 
//открытие попапа картинки
cardElementImage.addEventListener('click', function (evt) {
  evt.preventDefault();
  nameImage.innerText = text
  image.setAttribute('src', link)
  image.setAttribute('alt', link)
  openPopup(popupImage)
})
return cardElement;
}

/* //лайк картинки
wrapElement.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__button-like')) {
    evt.target.classList.toggle('element__button-like_active');
  }
}) */

//работа с карточками
export function renderCard(data) {
  const cardElement = getCardElement(data); 
  wrapElement.prepend(cardElement);
};

//кнопка сохранить Edit и отправка данных
export function submitAddForm (evt) {
  evt.preventDefault();
  addNewCard({
    name: title.value,
    link: activity.value
  })
  .then(res => renderCard(res))
  .then(res => {
    closePopup(popupAdd);
    title.value = '';
    activity.value = '';
    disabledButton();
  })
  .catch((err) => console.log(err))
};

export function submitEditForm (evt) {
  evt.preventDefault();
  profilName.textContent = inputName.value;
  profilJob.textContent = inputJob.value;
  closePopup(popupEdit);
  disabledButton();
};

/*  import {addCards} from './api.js'; 
 import {renderCards} from './utils.js';
 renderCards.forEach(function(element) {
  addCards(element)
  /* cards(element.name, element.link, wrapElement, addCards) 
});   */

/* export function addNewCard (cards) {

} */