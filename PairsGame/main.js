// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
let count = 3,
  arr = [],
  cardsArray = [],
  firstCard = null,
  secondCard = null;

function createNumbersArray(count) {
  for (i = 0; i <= count; i++) {
    arr.push(i);
    arr.push(i);
  }
}

createNumbersArray(count);

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  arr = arr.sort(() => Math.random() - 0.5);
  return arr;
}

shuffle(arr);

console.log(arr);


// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
class Card {
  _open = false
  _success = false
  constructor(container, number, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = number;
    this.number = number;
    this.card.addEventListener('click', () => {
      if (this.open == false && this._success == false) {
        this.open = true;
        action(this);
      }
    })
    container.append(this.card);
  }

  set open(value) {
    this._open = value;
    value ? this.card.classList.add('open') : this.card.classList.remove('open');
    }

  get open() {
    return this._open;
  }
  set success(value) {
    this._success = value;
    value ? this.card.classList.add('success') : this.card.classList.remove('success');
    }
  get success() {
    return this._successs;
  }
}

// let newCard = new Card(document.getElementById('card-field'), 7, flip);
function startGame(container, count) {
  for (const cardNumber of arr) {
    cardsArray.push(new Card(container, cardNumber, flip));
  }

  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }
    if (firstCard == null) {
      firstCard = card;
    }

    else {
      if (secondCard == null) {
        secondCard = card;
      }
    }
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;

        firstCard = null;
        secondCard = null;
      }
    }
    if (document.querySelectorAll('.success').length == cardsArray.length) {
      alert('Win!');
      container.innerHTML = '';
      let ending = document.createElement('h2');
      ending.textContent = 'Всего хорошего';
      container.append(ending);
    }
  }
}

startGame(document.getElementById('card-field', count));
