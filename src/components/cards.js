import {formDeleteElement, elementTemplate, wrapElement, popupAdd, popupEdit, popupImage, popupDelete, image, nameImage, title, activity, profilName, profilJob, inputName, inputJob} from './utils.js';
import {closePopup, disabledButton, undisabledButton, openPopup} from './modal.js';
import {addNewCard, addLike, removeLike, deleteCard} from './api.js';
import {currentUserId} from './index.js';



  //создание картинки
function getCardElement(cards) {
const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);
console.log(cards.owner._id);
const cardTitle = cardElement.querySelector('.element__text');
const cardElementImage = cardElement.querySelector('.element__image');

//лайк картинки
const likeButton = cardElement.querySelector('.element__button-like');
const likeCounterElement = cardElement.querySelector('.element__sum_likes');
likeCounterElement.textContent = cards.likes.length.toString();
const isLiked = (cards) => Boolean(cards.likes.find(user => cards.user._id === currentUserId));
/* console.log(currentUserId);
console.log(cards.user._id); */
likeButton.addEventListener('click', function (evt) {
  if (!likeButton.classList.contains('element__button-like_active')) {
    addLike(cards._id)
    .then ((res) => {
      likeCounterElement.textContent = res.likes.length,
      evt.target.classList.add('element__button-like_active')})
  }
  else {
    removeLike(cards._id)
    .then ((res) => {
      likeCounterElement.textContent = res.likes.length,
      evt.target.classList.toggle('element__button-like_active')}
    )
}});

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