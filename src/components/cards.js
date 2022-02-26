import {profilAvatar, popupAvatar, inputAvatar, formDeleteElement, elementTemplate, wrapElement, 
  popupAdd, popupEdit, popupImage, popupDelete, image, nameImage, title, activity,
   profilName, profilJob, inputName, inputJob} from './utils.js';

import {closePopup, disabledButton, undisabledButton, openPopup, renderLoading} from './modal.js';
import {addNewCard, addLike, removeLike, changeAvatar, addUser, deleteCard} from './api.js';
import {currentUserId} from './index.js';

  //создание картинки
function getCardElement(cards) {
const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);
const cardTitle = cardElement.querySelector('.element__text');
const cardElementImage = cardElement.querySelector('.element__image');

//лайк картинки
const likeButton = cardElement.querySelector('.element__button-like');
const likeCounterElement = cardElement.querySelector('.element__sum_likes');
likeCounterElement.textContent = cards.likes.length.toString();
const isLiked = (cards) => Boolean(cards.likes.find(user => cards.user._id === currentUserId));

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
  renderLoading(popupAdd, 'Сохранение...');
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
  .finally(() => renderLoading(popupAdd, "Cохранить"))
};

export function submitEditForm (evt) {
  evt.preventDefault();
  renderLoading(popupEdit, 'Сохранение...');
  addUser({
    name: inputName.value,
    about: inputJob.value
  })
  .then(res => {
    profilName.textContent = res.name,
    profilJob.textContent = res.about,
    closePopup(popupEdit),
    disabledButton()
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popupEdit, "Cохранить"))
};

export function submitAvatarForm(evt) {
  evt.preventDefault();
  renderLoading(popupAvatar, 'Сохранение...');
  changeAvatar({
    name: inputName.value,
    avatar: inputAvatar.value
  })
  .then(res => {
    profilAvatar.src  = res.avatar,
    profilAvatar.alt = res.name,
    closePopup(popupAvatar),
    disabledButton()
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popupAvatar, "Cохранить"))
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
