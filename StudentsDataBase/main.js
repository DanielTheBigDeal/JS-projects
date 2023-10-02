let studentsList = [
  {
    name: 'Данил',
    surname: 'Узгенбаев',
    lastname: 'Александрович',
    birthday: new Date('1998.06.16'),
    startDate: 2015,
    faculty: 'Экономика',
  },
  {
    name: 'Данил',
    surname: 'Вышкин',
    lastname: 'Александрович',
    birthday: new Date('1998.06.16'),
    startDate: 2016,
    faculty: 'Экономика',
  },
  {
    name: 'Дмитрий',
    surname: 'Цыганов',
    lastname: 'Владимирович',
    birthday: new Date('2004.08.31'),
    startDate: 2021,
    faculty: 'Прикладная информатика',
  },
  {
    name: 'Владимир',
    surname: 'Феттер',
    lastname: 'Вольфович',
    birthday: new Date('2004.02.03'),
    startDate: 2022,
    faculty: 'Прикладная информатика',
  },
];

const $table__body = document.getElementById('table__body');

function formatDate(date) {
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }

  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  let year = date.getFullYear();
  if (year < 10) {
    year = '0' + year;
  }

  return day + '.' + month + '.' + year;
}

let nameInp = document.getElementById('name-inp'),
  surnameInp = document.getElementById('surname-inp'),
  lastnameInp = document.getElementById('lastname-inp'),
  birthdayInp = document.getElementById('birthday-inp'),
  startDayInp = document.getElementById('startDay-inp'),
  facultyInp = document.getElementById('faculty-inp');

function addElement() {

  let nameV = nameInp.value,
    surnameV = surnameInp.value,
    lastnameV = lastnameInp.value,
    birthdayV = birthdayInp.value,
    startDayV = startDayInp.value,
    facultyV = facultyInp.value;

  if (nameV && surnameV && lastnameV && birthdayV && startDayV && facultyV === '') return;
  if (!/^[А-Я]/.test(nameV) || !/^[А-Я]/.test(surnameV)|| !/^[А-Я]/.test(lastnameV) || !/^[А-Я]/.test(facultyV)) {
    alert('Ошибка в правописании! Слова должны начинаться с большой буквы.');
    return;
  }

  let selectedDate = new Date(birthdayV);

  if (selectedDate >= new Date('1990.01.01')) {
    formatDate(selectedDate);
  }
  else {
    alert("Выберите корректную дату рождения.");
  }

  if (startDayV == NaN || startDayV < 2000 && startDayV > 2023) {
    alert('Введите дату в нужном диапозоне');
  }

  element = {
    name: nameV,
    surname: surnameV,
    lastname: lastnameV,
    birthday: selectedDate,
    startDate: startDayV,
    faculty: facultyV
  }

  studentsList.push(element);
  console.log(studentsList);
  $table__body.innerHTML = '';
  getStudentItem();
  nameInp.value = ''
  surnameInp.value = '';
  lastnameInp.value = '';
  facultyInp.value = '';
}

function getStudentItem(studentObj) {
  for (studentObj of studentsList) {
    const $studTr = document.createElement('tr');
    const $studName = document.createElement('td');
    const $studFaculty = document.createElement('td');
    const $studBirthday = document.createElement('td');
    const $studYears = document.createElement('td');

    let endDate = parseInt(studentObj.startDate) + 4;

    $studName.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.lastname}`;
    $studBirthday.textContent = formatDate(studentObj.birthday) + ' (Возраст: ' + calculateAge() + ')';
    $studFaculty.textContent = studentObj.faculty;
    $studYears.textContent = studentObj.startDate + '-' + endDate + gradeDetect();

    $studTr.classList.add('form-tr');

    $studTr.append($studName, $studFaculty, $studBirthday, $studYears);
    $table__body.append($studTr);
  }

  function calculateAge() {
    let today = new Date();
    const birthDate = new Date(studentObj.birthday);

    age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function gradeDetect(grade) {
    let today = new Date();
    const entryDate = studentObj.startDate;
    grade = today.getFullYear() - entryDate;
    const monthDiff = today.getMonth() - 7;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < entryDate.getDate())) {
      grade--;
    }

    if (grade < 5) {
      return ' (Курс ' + grade + ')';
    }

    else if (grade > 4) {
      return ' (Закончил(а))';
    }

    else {
      return ' (Неправильно введен год поступления)';
    }
  }
}

let element = addElement.element;

getStudentItem(studentsList);

function sortStudents(studentsList, prop, direction = false) {
  let result = studentsList.sort(function (a, b) {
    if (a[prop] < b[prop]) return -1;
    if (a[prop] > b[prop]) return 1;
    return 0;
  });
  if (!direction) {
    result = result.reverse(); // перевернем массив, если направление false (убывающий порядок)
  }
  $table__body.innerHTML = '';
  return result;
}

function sortStudentsBySurnameMin1() {
  sortStudents(studentsList, 'surname', true);
  getStudentItem();
}

function sortStudentsBySurnameMax1() {
  sortStudents(studentsList, 'surname', false);
  getStudentItem();
}

function sortStudentsByFacultyMin1() {
  sortStudents(studentsList, 'faculty', true);
  getStudentItem();
}

function sortStudentsByFacultyMax1() {
  sortStudents(studentsList, 'faculty', false);
  getStudentItem();
}

let newList = [];

function filter(arr, prop, value) {
  let result = [],
    copy = [...arr];
  for (const item of copy) {
    if (String(item[prop]).includes(value) == true) result.push(item);
  }
return result;
}

function render(arr) {
  const list = document.querySelector('.ul');
  list.innerHTML = '';

  const inpSurname = document.getElementById('form-surname').value,
      inpFaculty = document.getElementById('form-faculty').value;

  let newArr = [...arr]
  if (inpSurname !== '') newArr = filter(newArr, 'surname', inpSurname)
  if (inpFaculty !== '') newArr = filter(newArr, 'faculty', inpFaculty)

  for (const student of newArr) {
    const li = document.createElement('li');
    li.textContent = student.surname + ', Факультет: ' + student.faculty;
    li.classList.add('li');
    list.append(li);
  }
}

document.getElementById('filter-form').addEventListener('submit', function(event) {
  event.preventDefault()
  render(studentsList);
})

