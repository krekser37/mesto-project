export default class Section {
  constructor ({data, renderer, containerSelector}) {
    this._itemsArray = data; //это массив данных, которые нужно добавить на страницу при инициализации класса. Вы получаете эти данные от Api.
    this._renderer = renderer; //это функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = containerSelector; //селектор контейнера, в который нужно добавлять созданные элементы.
  }

  addItem(item) {
    this._container.prepend(item)
  }

  renderAll() {
    this._itemsArray.forEach(item => {
    return this._renderer(item)
    })
  }
}
/* 
cards.reverse().forEach(cards => {
  isLiked = checkIsLiked(cards, currentUserId);
  renderCard(cards, currentUserId, isLiked);
}) */