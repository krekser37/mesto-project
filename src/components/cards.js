import {elementTemplate, wrapElement, initialCards, popupAdd, popupEdit, popupImage, image, nameImage, title, activity, profilName, profilJob, inputName, inputJob} from './utils.js';
import {closePopup, disabledButton, openPopup} from './modal.js';

  //создание картинки
function getCardElement(text, link) {
const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);
const cardTitle = cardElement.querySelector('.element__text');
const cardElementImage = cardElement.querySelector('.element__image');
const likeButton = cardElement.querySelector('.element__button-like');
const deleteButton = cardElement.querySelector('.element__button-delete');
cardTitle.textContent = text;
cardElementImage.src = link;
cardElementImage.alt = text;
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
function renderCard(text, link, wrapElement) {
  const cardElement = getCardElement(text, link); 
  wrapElement.prepend(cardElement);
};

//кнопка сохранить Edit и отправка данных
export function submitAddForm (evt) {
  evt.preventDefault();
  renderCard(title.value, activity.value, wrapElement);
  title.value = '';
  activity.value = '';
  closePopup(popupAdd);
  disabledButton();
};

export function submitEditForm (evt) {
  evt.preventDefault();
  profilName.textContent = inputName.value;
  profilJob.textContent = inputJob.value;
  closePopup(popupEdit);
  disabledButton();
};

initialCards.forEach(function(element) {
  renderCard(element.name, element.link, wrapElement) 
});