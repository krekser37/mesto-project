//открываем попапы
let popupOpen = document.querySelector('.popup_opened')
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
  }

let buttonEdit = document.querySelector('.profile__button_is_edit')
let popupEdit = document.querySelector('.popup_type_edit')
buttonEdit.addEventListener('click', function() {
    console.log('work')
    openPopup(popupEdit);
}); 

let buttonAdd = document.querySelector('.profile__button_is_add')
let popupAdd = document.querySelector('.popup_type_add')
buttonAdd.addEventListener('click', function() {
    console.log('work')
    openPopup(popupAdd);
}); 

 //закрываем попапы
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

let buttonCloseEdit = document.querySelector('.popup__close-icon_is_edit')
buttonCloseEdit.addEventListener('click', function() {
    console.log('work')
    closePopup(popupEdit);
}); 

let buttonCloseAdd = document.querySelector('.popup__close-icon_is_add')
buttonCloseAdd.addEventListener('click', function() {
    console.log('work')
    closePopup(popupAdd);
}); 

//кнопка сохранить Edit и отправка данных
let saveButton = document.querySelector('.form__button-save')
function formClose() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}
saveButton.addEventListener('click', formClose)

const formElement = document.querySelector('.form')
const inputName = document.querySelector('.form__item_is_name')
const inputJob = document.querySelector('.form__item_is_job')
const profilName = document.querySelector('.profile__title')
const profilJob = document.querySelector('.profile__subtitle')

function formSubmitHandler (evt) {
    evt.preventDefault();
    console.log('work');
    profilName.textContent = inputName.value;
    profilJob.textContent = inputJob.value;
    formClose();
}
formElement.addEventListener('submit', formSubmitHandler);

//создание, добавление, удаление, лайк картинки

const addButton = document.querySelector('.form__button-save_is_add');
const wrapElement = document.querySelector('.elements');
const formAddElement = document.querySelector('.form__add')
const text = document.querySelector('.element__text')
const link = document.querySelector('.element__image')
const place = document.querySelector('.element__image')


function getCardElement(text, link) {
const elementTemplate = document.querySelector('.element-template').content;
const cardElement = elementTemplate.querySelector('.element-item').cloneNode(true);

cardElement.querySelector('.element__text').textContent = text;
cardElement.querySelector('.element__image').src = link;
cardElement.querySelector('.element__image').alt = text;
cardElement.querySelector('.element__button-like').addEventListener('click', function(evt) {
    console.log(evt);
    evt.target.classList.toggle('element__button-like_active');
});

const deleteButton = cardElement.querySelector('.element__button-delete');
deleteButton.addEventListener('click', function () {
    const cardElement = deleteButton.closest('.element-item'); 
    cardElement.remove(); 
}); 

console.log(text);
console.log(link);
console.log(text);

return cardElement;
}

function formAddClose() {
    let popupAdd = document.querySelector('.popup_type_add');
    popupAdd.classList.remove('popup_opened');
}

addButton.addEventListener('click', function() {
  const title = document.querySelector('.form__item_is_title');
  const activity = document.querySelector('.form__item_is_activity');
/*   getCardElement(title.value, activity.value); */
  renderCard(title.value, activity.value, wrapElement);
})

function renderCard(text, link, wrapElement) {
    const cardElement = getCardElement(text, link);
    wrapElement.prepend(cardElement);
}

 function formSubmitPhoto (evt) {
    evt.preventDefault();
    console.log('work');
    formAddClose();
 }
formAddElement.addEventListener('submit', formSubmitPhoto); 


initialCards.forEach(function(element) {
  const cardElement = getCardElement(element.name, element.link);
  wrapElement.append(cardElement);
}) 