import {wrapElement, formAddElement, text, place, popupAdd, image, nameImage, title, activity} from './index.js'
import {closePopup, openPopup} from './modal.js'

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  //создание картинки
function getCardElement(text, link) {
  const elementTemplate = document.querySelector('.element-template').content;
  const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);
  cardElement.querySelector('.element__text').textContent = text;
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = link;
  cardElementImage.alt = text;
//удаление картинки
const deleteButton = cardElement.querySelector('.element__button-delete');
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


//лайк картинки
wrapElement.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__button-like')) {
    evt.target.classList.toggle('element__button-like_active');
  }
})

//работа с карточками
function renderCard(text, link, wrapElement) {
  const cardElement = getCardElement(text, link);
  wrapElement.prepend(cardElement);
}

function submitFormPhoto (evt) {
  evt.preventDefault();
  renderCard(title.value, activity.value, wrapElement);
  title.value = '';
  activity.value = '';
  closePopup(popupAdd);
}
formAddElement.addEventListener('submit', submitFormPhoto); 

initialCards.forEach(function(element) {
  renderCard(element.name, element.link, wrapElement) 
}) 
