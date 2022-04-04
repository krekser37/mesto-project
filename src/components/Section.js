export default class Section {
  constructor ({data, renderer, container}) {
    this._itemsArray = data; //это массив данных, которые нужно добавить на страницу при инициализации класса. Вы получаете эти данные от Api.
    this._renderer = renderer; //это функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = container; //селектор контейнера, в который нужно добавлять созданные элементы.
  }

  addItem(item) {
    this._container.prepend(item)
  }

  renderAll() {
    this._itemsArray.reverse().forEach(item => {
    return this._renderer(item)
    })
  }
}


/* addItem(item) {
  const card = this._renderer(item)
  this._container.prepend(card);
} */