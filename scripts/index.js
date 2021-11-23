//открываем попапы
const buttonEdit = document.querySelector('.profile__button_is_edit')
const popupEdit = document.querySelector('.popup_type_edit')
const buttonAdd = document.querySelector('.profile__button_is_add')
const popupAdd = document.querySelector('.popup_type_add')
const popupImage = document.querySelector('.popup_type_image')
const buttonCloseEdit = document.querySelector('.popup__close-icon_is_edit')
const buttonCloseAdd = document.querySelector('.popup__close-icon_is_add')
const buttonCloseImage = document.querySelector('.popup__close-icon_is_image')
const wrapElement = document.querySelector('.elements')
const formAddElement = document.querySelector('.form__add')
const text = document.querySelector('.element__text')
const place = document.querySelector('.element__image')
const formElement = document.querySelector('.form')
const inputName = document.querySelector('.form__item_is_name')
const inputJob = document.querySelector('.form__item_is_job')
const profilName = document.querySelector('.profile__title')
const profilJob = document.querySelector('.profile__subtitle')
const image = document.querySelector('.element__image_type_popup')
const nameImage = document.querySelector('.element__text_type_popup')
const title = document.querySelector('.form__item_is_title')
const activity = document.querySelector('.form__item_is_activity')

//открываем попапы
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
  inputName.value = profilName.textContent;
  inputJob.value = profilJob.textContent;
}); 

buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd);
});

 //закрываем попапы
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

buttonCloseEdit.addEventListener('click', function() {
  closePopup(popupEdit);
}); 

buttonCloseAdd.addEventListener('click', function() {
  closePopup(popupAdd);
}); 

buttonCloseImage.addEventListener('click', function() {
  closePopup(popupImage);
}); 

//закрытие по пустому полю
popupImage.addEventListener('click', function() {
  closePopup(popupImage);
})
//не закрывать по картинке
popupImage.querySelector('.popup__image').addEventListener('click', (evt) => {
  evt.stopPropagation()
})

//кнопка сохранить Edit и отправка данных
function submitProfileForm (evt) {
  evt.preventDefault();
  profilName.textContent = inputName.value;
  profilJob.textContent = inputJob.value;
  closePopup(popupEdit);
}
formElement.addEventListener('submit', submitProfileForm);

//создание картинки
function getCardElement(text, link) {
  const elementTemplate = document.querySelector('.element-template').content;
  const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);
  cardElement.querySelector('.element__text').textContent = text;
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = link;
  cardElementImage.alt = text;
  //лайк картинки
  cardElement.querySelector('.element__button-like').addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__button-like_active');
});
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
