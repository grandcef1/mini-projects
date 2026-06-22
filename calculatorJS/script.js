//для глобализации этих переменных
let currentSelectedTask = null;
let choosingRowElement = null;
let editingTask = null;
let originalTask = null;

let timerCircle = null;
let FULL_DASH = 0;

document.addEventListener('DOMContentLoaded', function () {


    timerCircle = document.getElementById('timer-circle');
    FULL_DASH = 2 * Math.PI * 94;
    if (timerCircle) {
        timerCircle.style.strokeDasharray = FULL_DASH;
        timerCircle.style.strokeDashoffset = '0';
    }

    const alertBox = document.getElementById('customAlert');
    const closeBtn = document.getElementById('alertCloseBtn');

    // Закрытие по кнопке
    closeBtn.addEventListener('click', hideAlert);

    // Закрытие по клику на фон
    alertBox.addEventListener('click', function (e) {
        if (e.target === alertBox) {
            hideAlert();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && alertBox.classList.contains('show')) {
            hideAlert();
        }
    });


    //загрузка задач в окне список задач
    let tasks = loadTasks();
    renderTasks(tasks);
    //Проверка параметров
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'converter') {
        // Переключаем на конвертер
        converterWind.style.display = 'flex';
        converterWind.style.opacity = '1';
        converterWind.style.transform = 'scale(1) translateY(0)';

        calcWind.style.display = 'none';
        calcWind.style.opacity = '0';
        calcWind.style.transform = 'scale(0.9) translateY(15px)';

        ToDoWind.style.display = 'none';
        ToDoWind.style.opacity = '0';
        ToDoWind.style.transform = 'scale(0.9) translateY(15px)';

        timerWind.style.display = 'none';
        timerWind.style.opacity = '0';
        timerWind.style.transform = 'scale(0.9) translateY(15px)';

        document.getElementById('mainString').textContent = 'Конвертер валют';
    }
    if (mode === 'ToDoList') {
        // Переключаем на конвертер
        ToDoWind.style.display = 'flex';
        ToDoWind.style.opacity = '1';
        ToDoWind.style.transform = 'scale(1) translateY(0)';

        calcWind.style.display = 'none';
        calcWind.style.opacity = '0';
        calcWind.style.transform = 'scale(0.9) translateY(15px)';

        converterWind.style.display = 'none';
        converterWind.style.opacity = '0';
        converterWind.style.transform = 'scale(0.9) translateY(15px)';

        timerWind.style.display = 'none';
        timerWind.style.opacity = '0';
        timerWind.style.transform = 'scale(0.9) translateY(15px)';

        document.getElementById('mainString').textContent = 'Список задач';
    }

    if (mode === 'timer') {
        // Переключаем на конвертер
        timerWind.style.display = 'flex';
        timerWind.style.opacity = '1';
        timerWind.style.transform = 'scale(1) translateY(0)';

        calcWind.style.display = 'none';
        calcWind.style.opacity = '0';
        calcWind.style.transform = 'scale(0.9) translateY(15px)';

        converterWind.style.display = 'none';
        converterWind.style.opacity = '0';
        converterWind.style.transform = 'scale(0.9) translateY(15px)';

        ToDoWind.style.display = 'none';
        ToDoWind.style.opacity = '0';
        ToDoWind.style.transform = 'scale(0.9) translateY(15px)';

        document.getElementById('mainString').textContent = 'Таймер';
    }


    // Обработчик клика на строки
    choosingRowElement = document.querySelector('.choosingRow');

    let rowsContainer = document.querySelector('.rows-container');
    rowsContainer.addEventListener('click', function (event) {
        let row = event.target.closest('.row');
        if (!row) {
            currentSelectedTask = null;
            choosingRowElement.textContent = 'Выбрано:';
            choosingRowElement.classList.remove('row-active');
            document.querySelectorAll('.row').forEach(r => r.classList.remove('row-active'));
            setButtonMode('add');
            return;
        };

        setButtonMode('edit');
        document.querySelectorAll('.row').forEach(r => r.classList.remove('row-active'));
        let taskId = parseInt(row.getAttribute('data-id'));
        currentSelectedTask = getTaskById(taskId);
        choosingRowElement.textContent = `Выбрано: ${cutText(currentSelectedTask.text)}`;
        choosingRowElement.classList.add('row-active');
        row.classList.add('row-active');
    });
    //доп обработчик для клика вне rows container
    document.addEventListener('click', function (event) {
        let rowsContainer = document.querySelector('.rows-container');
        let isClickInsideTable = rowsContainer.contains(event.target);

        if (!isClickInsideTable && currentSelectedTask !== null) {
            currentSelectedTask = null;
            choosingRowElement.textContent = 'Выбрано:';
            choosingRowElement.classList.remove('row-active');
            document.querySelectorAll('.row').forEach(r => r.classList.remove('row-active'));
            setButtonMode('add');
        }
    });
});


let buttonBack = document.getElementById('back-arrow');
document.addEventListener('click', function (event) {
    if (event.target == buttonBack) {
        location.href = 'index.html';
    }
});
//Инициализация кнопок
let buttonOne = document.getElementById('one');
let buttonTwo = document.getElementById('two');
let buttonThree = document.getElementById('three');
let buttonFour = document.getElementById('four');
let buttonFive = document.getElementById('five');
let buttonSix = document.getElementById('six');
let buttonSeven = document.getElementById('seven');
let buttonEight = document.getElementById('eight');
let buttonNine = document.getElementById('nine');
let buttonZero = document.getElementById('zero');
let buttonClear = document.getElementById('clear');
let buttonEquality = document.getElementById('equality');
let buttonLeftBracket = document.getElementById('leftBracket');
let buttonRightBracket = document.getElementById('rightBracket');
let buttonDivide = document.getElementById('divide');
let buttonTimes = document.getElementById('times');
let buttonPlus = document.getElementById('plus');
let buttonMinus = document.getElementById('minus');
let buttonComma = document.getElementById('comma');
let buttonINFO = document.getElementById('infoMath');


let resultSpan = document.getElementById('resultText');
let currentExpression = '';



//Обработчики кнопок калькулятора
document.querySelector('.Math').addEventListener('click', function (event) {
    const target = event.target;

    // цифры
    if (target === buttonZero) {
        currentExpression += '0';
    } else if (target === buttonOne) {
        currentExpression += '1';
    } else if (target === buttonTwo) {
        currentExpression += '2';
    } else if (target === buttonThree) {
        currentExpression += '3';
    } else if (target === buttonFour) {
        currentExpression += '4';
    } else if (target === buttonFive) {
        currentExpression += '5';
    } else if (target === buttonSix) {
        currentExpression += '6';
    } else if (target === buttonSeven) {
        currentExpression += '7';
    } else if (target === buttonEight) {
        currentExpression += '8';
    } else if (target === buttonNine) {
        currentExpression += '9';
    }
    // операторы
    else if (target === buttonPlus) {
        currentExpression += '+';
    } else if (target === buttonMinus) {
        currentExpression += '-';
    } else if (target === buttonTimes) {
        currentExpression += '*';
    } else if (target === buttonDivide) {
        currentExpression += '/';
    }

    // скобки и запятая
    else if (target === buttonLeftBracket) {
        currentExpression += '(';
    } else if (target === buttonRightBracket) {
        currentExpression += ')';
    } else if (target === buttonComma) {
        currentExpression += '.';
    }

    // очистка
    else if (target === buttonClear) {
        currentExpression = '';
    }

    // вычисление
    else if (target === buttonEquality) {
        currentExpression = calculate(currentExpression);
    }
    else if (target.closest('#infoMath')) {
        showAlert('◆ Возможности:\n' +
            '   • Сложение, вычитание, умножение, деление\n' +
            '   • Скобки, десятичные дроби, унарный минус\n' +
            '   • Приоритет операций\n\n' +
            '◆ Исключения:\n' +
            '   • Деление на ноль - ошибка\n' +
            '   • Несбалансированные скобки - ошибка\n' +
            '   • Две точки в числе - ошибка\n' +
            '   • Пустое выражение - игнорируется\n\n' +
            '◆ Советы:\n' +
            '   • CE - очистить выражение\n' +
            '   • Используйте запятую для дробей\n\n' +
            '◆ Детали:\n' +
            '   • Точность: до 10 знаков\n' +
            '   • Убирает лишние нули', icon = 'ⓘ');
    }

    // обновление
    resultSpan.textContent = currentExpression;
    resultSpan.scrollLeft = resultSpan.scrollWidth;
});
function calculate(expr) {
    // Очищаем строку от пробелов и недопустимых символов
    expr = expr.replace(/\s+/g, '');

    // Заменяем запятые на точки для дробных чисел
    expr = expr.replace(/,/g, '.');

    if (expr === '') return '';

    // Валидация: проверяем, что строка содержит только допустимые символы
    if (!/^[0-9+\-*/()\.]+$/.test(expr)) {
        return 'Ошибка';
    }

    try {
        // Проверка деления на ноль
        if (/\/0(?!\.)/.test(expr)) {
            showAlert('Ошибка: деление на ноль!');
            return '';
        }

        // Преобразуем выражение в обратную польскую запись и вычисляем
        let result = evaluateExpression(expr);

        // Проверяем, является ли результат целым числом
        if (Number.isInteger(result)) {
            return result.toString();
        } else {
            // Убираем лишние нули в конце
            return parseFloat(result.toFixed(10)).toString();
        }
    } catch (e) {
        showAlert('Ошибка: неккоректный ввод!', '❌');
        return '';
    }
}

// Функция вычисления через обратную польскую запись (алгоритм сортировочной станции)
function evaluateExpression(expr) {
    let outputQueue = [];
    let operatorStack = [];

    // Приоритеты операторов
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    // Ассоциативность (левая)
    const associativity = {
        '+': 'left',
        '-': 'left',
        '*': 'left',
        '/': 'left'
    };

    // Токенизация выражения
    let i = 0;
    let lastTokenWasOperator = true; // Для определения унарного минуса/плюса

    while (i < expr.length) {
        let char = expr[i];

        // Пропускаем пробелы
        if (char === ' ') {
            i++;
            continue;
        }

        // Число (целое или дробное)
        if (/[0-9.]/.test(char)) {
            let numStr = '';
            let hasDecimal = false;

            while (i < expr.length && (/[0-9.]/.test(expr[i]))) {
                if (expr[i] === '.') {
                    if (hasDecimal) {
                        throw new Error('Две точки в числе');
                    }
                    hasDecimal = true;
                }
                numStr += expr[i];
                i++;
            }

            // Проверка на корректность числа
            if (numStr === '.' || numStr.startsWith('..')) {
                throw new Error('');
            }

            let num = parseFloat(numStr);
            if (lastTokenWasOperator && numStr[0] !== '.') {
                // Это унарный минус/плюс уже обработан в парсинге операторов
            }
            outputQueue.push(num);
            lastTokenWasOperator = false;
            continue;
        }

        // Оператор или скобка
        if (char === '(') {
            operatorStack.push(char);
            lastTokenWasOperator = true;
            i++;
        } else if (char === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            if (operatorStack.length === 0) {
                throw new Error('');
            }
            operatorStack.pop(); // Удаляем '('
            lastTokenWasOperator = false;
            i++;
        } else if ('+-*/'.includes(char)) {
            // Обработка унарного минуса/плюса
            if (lastTokenWasOperator && (char === '-' || char === '+')) {
                if (char === '-') {
                    operatorStack.push('_'); // Специальный токен для унарного минуса
                }
                // Унарный плюс игнорируем
                i++;
                continue;
            }

            // Бинарный оператор
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                let topOp = operatorStack[operatorStack.length - 1];
                if (topOp === '_') break;

                if (precedence[topOp] > precedence[char] ||
                    (precedence[topOp] === precedence[char] && associativity[char] === 'left')) {
                    outputQueue.push(operatorStack.pop());
                } else {
                    break;
                }
            }
            operatorStack.push(char);
            lastTokenWasOperator = true;
            i++;
        } else {
            throw new Error('');
        }
    }

    // Выталкиваем оставшиеся операторы
    while (operatorStack.length > 0) {
        let op = operatorStack.pop();
        if (op === '(') {
            throw new Error('');
        }
        outputQueue.push(op);
    }

    // Вычисление обратной польской записи
    let stack = [];

    for (let token of outputQueue) {
        if (typeof token === 'number') {
            stack.push(token);
        } else if (token === '_') {
            // Унарный минус
            let a = stack.pop();
            stack.push(-a);
        } else {
            // Бинарный оператор
            let b = stack.pop();
            let a = stack.pop();

            if (a === undefined || b === undefined) {
                throw new Error('');
            }

            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    if (b === 0) {
                        throw new Error('Деление на ноль');
                    }
                    stack.push(a / b);
                    break;
            }
        }
    }

    if (stack.length !== 1) {
        throw new Error('Ошибка вычисления');
    }

    return stack[0];
}

//Функция кастомного alert
// Функция для показа кастомного уведомления
function showAlert(message, icon = '⚠️') {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = alertBox.querySelector('.custom-alert-icon');

    alertIcon.textContent = icon;
    alertMessage.textContent = message;
    alertBox.classList.add('show');
}

// Функция для скрытия
function hideAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.classList.remove('show');
}


//Логика переключения окон с анимацией
let mathTab = document.getElementById('Math');
let converterTab = document.getElementById('Converter');
let ToDoTab = document.getElementById('ToDoList');
let TimerTab = document.getElementById('Timer');

let calcWind = document.getElementById('calculatorWind');
let converterWind = document.getElementById('converterWind');
let ToDoWind = document.getElementById('ToDoWind');
let timerWind = document.getElementById('timerWind');



// Установка начальных стилей
calcWind.style.opacity = '1';
calcWind.style.transform = 'scale(1) translateY(0)';
calcWind.style.display = 'flex';

converterWind.style.opacity = '0';
converterWind.style.transform = 'scale(0.9) translateY(15px)';
converterWind.style.display = 'none';

ToDoWind.style.opacity = '0';
ToDoWind.style.transform = 'scale(0.9) translateY(15px)';
ToDoWind.style.display = 'none';

timerWind.style.opacity = '0';
timerWind.style.transform = 'scale(0.9) translateY(15px)';
timerWind.style.display = 'none';


// Функция для переключения с анимацией
function switchToWindow(showWind) {
    const allWindows = [calcWind, converterWind, ToDoWind, timerWind];

    allWindows.forEach(win => {
        if (win !== showWind && win.style.display !== 'none') {
            win.style.opacity = '0';
            win.style.transform = 'scale(0.9) translateY(15px)';

            setTimeout(() => {
                if (win.style.opacity === '0' || win.style.opacity === '') {
                    win.style.display = 'none';
                }
            }, 300);
        }
    });

    showWind.style.display = 'flex';
    showWind.style.opacity = '0';
    showWind.style.transform = 'scale(0.9) translateY(-15px)';

    setTimeout(() => {
        showWind.style.opacity = '1';
        showWind.style.transform = 'scale(1) translateY(0)';
    }, 300);
}

// Обработчик для "Калькулятор"
mathTab.addEventListener('click', function () {
    if (calcWind.style.display !== 'flex') {
        switchToWindow(calcWind);
        document.getElementById('mainString').textContent = 'Калькулятор';
    }
});

// Обработчик для "Конвертер валют"
converterTab.addEventListener('click', function () {
    if (converterWind.style.display !== 'flex') {
        switchToWindow(converterWind);
        document.getElementById('mainString').textContent = 'Конвертер валют';
    }
});

// Обработчик для "Список задач"
ToDoTab.addEventListener('click', function () {
    if (ToDoWind.style.display !== 'flex') {
        switchToWindow(ToDoWind);
        document.getElementById('mainString').textContent = 'Список задач';
    }
});
//Обработчик для "Таймер"
TimerTab.addEventListener('click', function () {
    if (timerWind.style.display !== 'flex') {
        switchToWindow(timerWind);
        document.getElementById('mainString').textContent = 'Таймер';
    }
});

//Обьект хранящий курсы валют
let currencyRates = {};
//Функция получения API актуальных курсов валют отнгосительно BYN
async function loadCurrencyRates() {
    try {
        let response = await fetch();
        let data = await response.json();
        currencyRates = data.conversion_rates;
    } catch (error) {
        console.log(error);
    }
}
loadCurrencyRates();
function convertation() {
    if (Object.keys(currencyRates).length === 0) {
        showAlert('Подождите...Идет загрузка', '⏳');
        return;
    }
    let resultStr = document.getElementById('toInput');
    let selectElementFrom = document.getElementById('fromCurrency');
    let selectElementTo = document.getElementById('toCurrency');
    let selectValue = document.getElementById('fromInput').value;
    let result = (selectValue / currencyRates[selectElementFrom.value]) * currencyRates[selectElementTo.value];
    resultStr.value = result.toFixed(3);
}
//обработчик кнопки 'кновертировать'
let convertBtn = document.getElementById('convertBtn');
convertBtn.addEventListener('click', convertation);
//кнопка INFO
let infoConverter = document.getElementById('infoConverter');
infoConverter.addEventListener('click', () => {
    showAlert('★ Возможности:\n' +
        '   • Конвертация между 5 валютами\n' +
        '   • Актуальные курсы с ExchangeRate-API\n' +
        '   • Обновление курсов при загрузке\n\n' +
        '★ Использование:\n' +
        '   • Ввод суммы в левом поле\n' +
        '   • Выбор валюты "Из" и "В"\n' +
        '   • Результат до 3 знаков после запятой\n\n' +
        '★ Советы:\n' +
        '   • При загрузке курсов — ожидание\n\n' +
        '★ Примечания:\n' +
        '   • BYN — Белорусский рубль\n' +
        '   • USD — Доллар США\n' +
        '   • EUR — Евро\n' +
        '   • RUB — Российский рубль\n' +
        '   • CNY — Китайский юань', 'ⓘ')
});

//Обработчик для кнопки Info Todo
let infoBtnTodo = document.getElementById('infoTodo');
infoBtnTodo.addEventListener('click', () => {
    showAlert('✸ Возможности:\n' +
        '   • Добавление, редактирование, удаление\n' +
        '   • Сортировка задач в один клик\n\n' +
        '✸ Сортировка:\n' +
        '   • По дате (возрастание/убывание)\n' +
        '   • По статусу (выполненые/невыполненые)\n\n' +
        '✸ Использование:\n' +
        '   • Добавить+ — добавить новую задачу\n' +
        '   • Клик по задаче — редактировать задачу\n' +
        '   • Удалить× — удалить задачу\n\n' +
        '✸ Статусы задач:\n' +
        '   • Не выполнено → В процессе → Выполнено\n\n' +
        '✸ Примечания:\n' +
        '   • Данные сохраняются в localStorage\n' +
        '   • Задачи не пропадут после перезагрузки\n', 'ⓘ')
});

//Обработчик для кнопки добавить
let switchBtn = document.getElementById('switchBtn');
let modalOverlay = document.querySelector('.modalOverlay');
function openModal() {
    modalOverlay.classList.add('show');
    let mainContent = document.querySelector('.main-content');
    let textArea = document.getElementById('taskInput');
    textArea.value = '';
    mainContent.style.filter = 'blur(2px)';
    mainContent.style.pointerEvents = 'none';
    setTimeout(() => {
        textArea.focus();
    }, 50);
}

function closeModal() {
    modalOverlay.classList.remove('show');
    let mainContent = document.querySelector('.main-content');
    mainContent.style.filter = 'none';
    mainContent.style.pointerEvents = 'auto';
}


//Обработчик для кнопки добавить в модальном окне
let modalAddBtn = document.getElementById('modalAddBtn');


// Получить следующий id
function getNextId() {
    let nextId = localStorage.getItem('nextTaskId');

    if (nextId === null) {
        // Если счетчика нет — начинаем с 1
        nextId = 1;
    } else {
        nextId = parseInt(nextId);
    }

    // Увеличиваем и сохраняем
    localStorage.setItem('nextTaskId', nextId + 1);

    return nextId;
}

// загрузить задачи из localStorage
function loadTasks() {
    let saved = localStorage.getItem('todoTasks');
    if (saved) {
        return JSON.parse(saved);
    }
    return [];
}
//сохранить задачи в localStorage
function saveTasks(tasks) {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

let textArea = document.getElementById('taskInput');
modalAddBtn.addEventListener('click', function () {
    let userText = textArea.value.trim();
    if (textArea.value.length == 0) {
        closeModal();
        return;
    }
    let currentId = getNextId();
    let currentDate = new Date().toLocaleDateString();


    const newTask = {
        id: currentId,
        text: userText,
        status: 'Не выполнено',
        date: currentDate
    };

    filterIconImg.src = 'icons/oldestToNewest.png';
    let isDateSortedAscending = false;
    let tasks = loadTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);
    closeModal();
    textArea.value = '';
});

//фукнция перерисовки таблицы
function renderTasks(tasks) {
    let rowsContainer = document.querySelector('.rows-container');
    rowsContainer.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.setAttribute('data-id', tasks[i].id);

        row.innerHTML = `
            <div class="columns">${tasks[i].text}</div>
            <div class="columns">${tasks[i].status}</div>
            <div class="columns">${tasks[i].date}</div>
        `;

        rowsContainer.appendChild(row);
    }
}

//функция сокращения стркои для choosingRow
function cutText(text) {
    let result = text;
    if (text.length > 34) {
        result = text.slice(0, 33) + '...';
        return result;
    } else return result;
}

//функция получения задачи по ее айди
function getTaskById(taskId) {
    let tasks = loadTasks();
    let task = tasks.find(t => t.id === taskId);
    return task;
}



//Обработчик для кнопки удалить
let btnDelete = document.querySelector('.btnDelete');
btnDelete.addEventListener('click', function () {
    if (currentSelectedTask) {
        let tasks = loadTasks();
        let newArrOfTasks = tasks.filter(task => task.id !== currentSelectedTask.id);
        saveTasks(newArrOfTasks);
        renderTasks(newArrOfTasks);
        choosingRowElement.textContent = 'Выбрано: ';
        currentSelectedTask = null;
        setButtonMode('add');
        choosingRowElement.classList.remove('row-active');
        showAlert('Задача успешно удалена!', '✓');
    } else {
        showAlert('Ошибка: выберите задачу!', '⚠️');
    }
});


//функции для смены обработчиков для кнопки switchBtn
function handleAddClick() {
    openModal();
    currentSelectedTask = null;
    choosingRowElement.textContent = 'Выбрано:';
    choosingRowElement.classList.remove('row-active');
    document.querySelectorAll('.row').forEach(r => r.classList.remove('row-active'));
}

function handleEditClick() {
    openEditModal(currentSelectedTask);
}

// смена режима кнопки
function setButtonMode(mode) {
    switchBtn.removeEventListener('click', handleAddClick);
    switchBtn.removeEventListener('click', handleEditClick);

    if (mode === 'edit') {
        switchBtn.addEventListener('click', handleEditClick);
        switchBtn.classList.add('btnEdit');
        switchBtn.textContent = 'Редактировать✎';
    } else {
        switchBtn.addEventListener('click', handleAddClick);
        switchBtn.classList.remove('btnEdit');
        switchBtn.textContent = 'Добавить+';
    }
}

//инициализация при загрузке страницы
setButtonMode('add');

//открытие модального окна редактирования
function openEditModal(currentSelectedTask) {
    originalTask = currentSelectedTask;
    editingTask = currentSelectedTask;
    modalOverlayEdit.classList.add('show');
    let mainContent = document.querySelector('.main-content');
    let textAreaEdit = document.getElementById('taskInputEdit');
    textAreaEdit.value = currentSelectedTask.text;
    mainContent.style.filter = 'blur(2px)';
    mainContent.style.pointerEvents = 'none';
    updateSelectedStatusInMenu(currentSelectedTask.status);
    setTimeout(() => {
        textAreaEdit.focus();;
    }, 50);
}
//закрытие модального окна редактирования
function closeEditModal() {
    modalOverlayEdit.classList.remove('show');
    let mainContent = document.querySelector('.main-content');
    mainContent.style.filter = 'none';
    mainContent.style.pointerEvents = 'auto';
    editingTask = null;
    originalTask = null;
}


//кнопка изменить статус в модальнм окне редактирования
let dropdownBtn = document.getElementById('statusDropdownBtn');
let dropdownMenu = document.getElementById('statusDropdownMenu');
let arrow = dropdownBtn.querySelector('.arrow');

// открытие закрытие dropdown
dropdownBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
    arrow.classList.toggle('open');
});

// закрытие при клике вне
document.addEventListener('click', function (e) {
    if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        arrow.classList.remove('open');
    }
});

// обработка выбора статуса
dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.stopPropagation();

        let newStatus = this.getAttribute('data-status');


        let tasksArray = loadTasks();
        let task = tasksArray.find(t => t.id === editingTask.id);

        if (task) {
            task.status = newStatus;
            saveTasks(tasksArray);

            editingTask = task;

            if (currentSelectedTask && currentSelectedTask.id === task.id) {
                currentSelectedTask = task;
            }

            renderTasks(tasksArray);

            if (choosingRowElement && currentSelectedTask && currentSelectedTask.id === task.id) {
                choosingRowElement.textContent = `Выбрано: ${cutText(task.text)}`;
            }

            updateSelectedStatusInMenu(newStatus);
        }


    });
});

// Функция обновления выделенного элемента в меню 
function updateSelectedStatusInMenu(selectedStatus) {
    let dropdownMenu = document.getElementById('statusDropdownMenu');
    if (dropdownMenu) {
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            if (item.getAttribute('data-status') === selectedStatus) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }
}

// обработчик для кнопки "принять" 
modalEditBtn.addEventListener('click', function () {
    let textAreaEdit = document.getElementById('taskInputEdit');
    let newText = textAreaEdit.value.trim();
    if (newText.length === 0) {
        showAlert('Пожалуйста введите текст!', '⚠️');
        return;
    }



    let tasksArray = loadTasks();
    let task = tasksArray.find(t => t.id === editingTask.id);

    //проверка на изменения
    if (originalTask.text == newText && originalTask.status == task.status) {
        currentSelectedTask = task;
        choosingRowElement.textContent = `Выбрано: ${cutText(task.text)}`;
        closeEditModal();
        return
    }
    if (task) {
        task.text = newText;
        saveTasks(tasksArray);
        renderTasks(tasksArray);

        editingTask = task;

        if (currentSelectedTask && currentSelectedTask.id === task.id) {
            currentSelectedTask = task;
            if (choosingRowElement) {
                choosingRowElement.textContent = `Выбрано: ${cutText(task.text)}`;
            }
        }

        showAlert('Задача успешно обновлена!', '✓');
        closeEditModal();
    }

});

//функция дял кнопки отмены
function cancelEditBtn() {
    let tasksArray = loadTasks();
    let task = tasksArray.find(t => t.id === originalTask.id);

    task.text = originalTask.text;
    task.status = originalTask.status;
    saveTasks(tasksArray);

    currentSelectedTask = task;
    renderTasks(tasksArray);
    choosingRowElement.textContent = `Выбрано: ${cutText(task.text)}`;
    closeEditModal();
}


//обработчик для кнопки фильтра статусов
let filterSpanStatus = document.querySelector('.filter-icon-status');
let isSorted = false;
let isSortedFromUncompleted = false;

function sortByStatus() {
    let tasks = loadTasks();
    let arrOfCompleted = tasks.filter((t) => t.status == 'Выполнено');
    let arrOfInProgress = tasks.filter((t) => t.status == 'В процессе');
    let arrOfUncompleted = tasks.filter((t) => t.status == 'Не выполнено');
    if (isSorted === false) {
        let resultArr = [...arrOfUncompleted, ...arrOfInProgress, ...arrOfCompleted];
        isSorted = true;
        isSortedFromUncompleted = true;
        filterIconImg.src = 'icons/oldestToNewest.png';
        renderTasks(resultArr);
    } else if (isSortedFromUncompleted === true) {
        let resultArr = [...arrOfCompleted, ...arrOfInProgress, ...arrOfUncompleted];
        isSortedFromUncompleted = false;
        filterIconImg.src = 'icons/oldestToNewest.png';
        renderTasks(resultArr);
    } else if (isSortedFromUncompleted === false) {
        let resultArr = [...arrOfUncompleted, ...arrOfInProgress, ...arrOfCompleted];
        isSortedFromUncompleted = true;
        filterIconImg.src = 'icons/oldestToNewest.png';
        renderTasks(resultArr);
    }
}
filterSpanStatus.addEventListener('click', () => { sortByStatus() });

//обработчик для кнопки фильтра дат
let filterSpanDate = document.querySelector('.filter-icon-date');
let filterIconImg = filterSpanDate.querySelector('img');
let isDateSortedAscending = true; // По умолчанию от старых к новым

function sortByDate() {
    let tasks = loadTasks();

    function parseDate(dateStr) {
        let parts = dateStr.split('.');
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }

    if (isDateSortedAscending) {
        // от новых к старым (по убыванию)
        let resultArr = tasks.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        isDateSortedAscending = false;
        filterIconImg.src = 'icons/newestToOldest.png';
        renderTasks(resultArr);
    } else {
        // от старых к новым (по возрастанию)
        let resultArr = tasks.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        isDateSortedAscending = true;
        filterIconImg.src = 'icons/oldestToNewest.png';
        renderTasks(resultArr);
    }
}

filterSpanDate.addEventListener('click', sortByDate);


// Функция для ограничения значения в input
function clampNumberInput(inputElement) {
    const min = parseInt(inputElement.min) || 0;
    const max = parseInt(inputElement.max) || 59;

    inputElement.addEventListener('input', function () {
        let rawValue = this.value;

        // Убираем ведущие нули, кроме одного (если число 0)
        if (rawValue.length > 1 && rawValue.startsWith('0')) {
            // Оставляем только последний символ
            this.value = rawValue.replace(/^0+/, '');
            if (this.value === '') this.value = '0';
            rawValue = this.value;
        }


        if (rawValue === '' || rawValue === '-') {
            this.value = min;
            return;
        }

        let value = parseInt(rawValue);

        // Если ввели не число
        if (isNaN(value)) {
            this.value = min;
            return;
        }


        if (value > max) {
            this.value = max;
        }
        if (value < min) {
            this.value = min;
        }
    });


    inputElement.addEventListener('blur', function () {
        let rawValue = this.value;


        if (rawValue.length > 1 && rawValue.startsWith('0')) {
            this.value = rawValue.replace(/^0+/, '');
            if (this.value === '') this.value = '0';
        }

        let value = parseInt(this.value);
        if (isNaN(value)) {
            this.value = min;
        }
        if (value > max) this.value = max;
        if (value < min) this.value = min;
    });
}

// Применяем ко всем полям
clampNumberInput(document.getElementById('hoursInput'));
clampNumberInput(document.getElementById('minutesInput'));
clampNumberInput(document.getElementById('secondsInput'));


//ТАЙМЕР
let btnStart = document.querySelector('.btnStart');
let confirmBtn = document.querySelector('.confirmBtn');
let btnReset = document.querySelector('.btnReset');
let btnCancel = document.querySelector('.btnCancel');

let inputHours = document.getElementById('hoursInput');
let inputMinutes = document.getElementById('minutesInput');
let inputSeconds = document.getElementById('secondsInput');
let timerCounter = document.getElementById('timerDisplay');

let isRunning = false;
let timerId = null;
let pausedRemainingMs = 0;
totalSeconds =  (Number(inputHours.value) * 3600) +
                (Number(inputMinutes.value) * 60) +
                Number(inputSeconds.value);

function updateTimerCircle(secondsLeft, totalSeconds) {
    if (!timerCircle) return;
    if (totalSeconds <= 0 || secondsLeft <= 0) {
        timerCircle.style.strokeDashoffset = FULL_DASH;
        return;
    }
    const progress = secondsLeft / totalSeconds;
    const offset = FULL_DASH * (1 - progress);
    timerCircle.style.strokeDashoffset = -offset;

}


//сброс круга в полное состояние
function resetTimerCircle() {
    if (!timerCircle) return;
    timerCircle.style.strokeDashoffset = '0';
    timerCircle.style.stroke = '#5a3c98';
}

//обработчик для кнопки старт
btnStart.addEventListener('click', function () {

    let arr = timerCounter.textContent.split(':');
    let leftSeconds = (+arr[0] * 3600) + (+arr[1] * 60) + (+arr[2]);

    // ✅ Проверка: если время на дисплее 00:00:00 и нет сохранённого прогресса
    if (leftSeconds <= 0 && pausedRemainingMs <= 0) {
        showAlert('Пожалуйста введите значения!');
        return;
    }

    // ✅ Если это новый запуск (не после паузы)
    if (pausedRemainingMs === 0) {
        totalSeconds = leftSeconds; // Сохраняем полное время
        pausedRemainingMs = totalSeconds * 1000;
    }

    const initialRemainingMs = pausedRemainingMs;
    const totalTimeMs = totalSeconds * 1000;

    isRunning = true;
    showResetButton();

    const startTime = Date.now();

    function tick() {
        if (!isRunning) return;

        const elapsed = Date.now() - startTime;
        const remainingMs = Math.max(0, initialRemainingMs - elapsed);

        const progress = remainingMs / totalTimeMs;
        timerCircle.style.strokeDashoffset = -FULL_DASH * (1 - progress);

        const sec = Math.ceil(remainingMs / 1000);
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec % 3600) / 60);
        let s = sec % 60;

        timerCounter.textContent =
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        if (remainingMs <= 0) {
            isRunning = false;
            pausedRemainingMs = 0;
            resetTimerCircle();
            showAlert('Дзынь - дзынь! Время закончилось', '✅');
            playSoundAlarm();
            showStartButton();
            
            // ✅ Берём значения из полей ввода как ЧИСЛА
            let h = Number(inputHours.value);
            let m = Number(inputMinutes.value);
            let s = Number(inputSeconds.value);
            
            totalSeconds = (h * 3600) + (m * 60) + s; // ✅ Обновляем totalSeconds
            timerCounterBeforeChange = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; // ✅ Обновляем сохранённое значение

            timerCounter.textContent = timerCounterBeforeChange;
            return;
        }

        pausedRemainingMs = remainingMs;
        timerId = requestAnimationFrame(tick);
    }

    timerId = requestAnimationFrame(tick);
});

//обработчик для кнопки применить
let timerCounterBeforeChange = '00:01:00';
confirmBtn.addEventListener('click', function () {
    if (isRunning) {
        showAlert('Сначала остановите таймер!');
        return;
    }

    let h = Number(inputHours.value);
    let m = Number(inputMinutes.value);
    let s = Number(inputSeconds.value);

    totalSeconds = h * 3600 + m * 60 + s;
    pausedRemainingMs = 0; // ✅ Сбрасываем, чтобы при старте бралось новое время с дисплея

    timerCounterBeforeChange = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; // ✅ Сохраняем для переключения режимов
    timerCounter.textContent = timerCounterBeforeChange;

    resetTimerCircle();
});

//обработчик для кнопки стоп
btnCancel.addEventListener('click', function () {
    if (isRunning && timerId) {
        cancelAnimationFrame(timerId);
        isRunning = false;
        showStartButton();
    } else {
        showAlert('Ошибка: отсчёт не запущен!', '⚠️');
    }
});

//обработчик для кнопки сбросить
btnReset.addEventListener('click', function () {
    cancelAnimationFrame(timerId);
    isRunning = false;
    
    let h = Number(inputHours.value);
    let m = Number(inputMinutes.value);
    let s = Number(inputSeconds.value);
    
    totalSeconds = (h * 3600) + (m * 60) + s;
    pausedRemainingMs = totalSeconds * 1000;
    timerCounterBeforeChange = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    
    resetTimerCircle();
    showStartButton();
    timerCounter.textContent = timerCounterBeforeChange;
});

//Звук по окнчанию таймера
function playSoundAlarm() {
    const audio = new Audio('sounds/alarm.mp3');
    audio.volume = 0.8;

    audio.play().catch(error => {
        console.log('Ошибка воспроизведения:', error);
    });
}

// Функция переключения кнопок
function showStartButton() {
    btnStart.style.display = 'flex';
    btnReset.style.display = 'none';
}

function showResetButton() {
    btnStart.style.display = 'none';
    btnReset.style.display = 'flex';
}

// функция сброса таймера
function resetTimer() {
    if (timerId) {
        cancelAnimationFrame(timerId);
    }
    timerId = null;
    isRunning = false;
    leftSeconds = 0;
    pausedRemainingMs = 0;
    timerCounter.textContent = '00:00:00';
    showStartButton();
    resetTimerCircle();
}
// Выпадающее меню для таймера
let modeDropdownBtn = document.getElementById('modeDropdownBtn');
let modeDropdownMenu = document.getElementById('modeDropdownMenu');
let modeArrow = modeDropdownBtn.querySelector('.arrow');

// Открытие/закрытие dropdown для таймера
modeDropdownBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    modeDropdownMenu.classList.toggle('show');
    modeArrow.classList.toggle('open');
});

// Закрытие при клике вне
document.addEventListener('click', function (e) {
    if (!modeDropdownBtn.contains(e.target) && !modeDropdownMenu.contains(e.target)) {
        modeDropdownMenu.classList.remove('show');
        modeArrow.classList.remove('open');
    }
});




//обработчик для кнопки инфо таймер
let infoTimer = document.getElementById('infoTimer');
infoTimer.addEventListener('click', () => {
    showAlert('✦ Возможности:\n' +
        '   • Таймер (обратный отсчёт)\n' +
        '   • Установка часов, минут, секунд\n' +
        '   • Секундомер (прямой отсчёт)\n' +
        '   • Фиксация кругов с отображением времени\n\n' +
        '✦ Ограничения:\n' +
        '   • Часы: 0–23, минуты/секунды: 0–59\n' +
        '   • Поля заблокированы во время работы\n' +
        '   • Секундомер не конвертирует минуты в часы\n\n' +
        '✦ Примечания:\n' +
        '   • Звуковой сигнал при окончании таймера\n' +
        '   • Уведомление при завершении\n' +
        '   • Автоисправление некорректных значений\n\n' +
        '✦ Особенности:\n' +
        '   • Интуитивно понятные кнопки\n' +
        '   • Визуальное отображение оставшегося времени', 'ⓘ')
})

//функция отображения текущего режима
let isTimer = true;
function updateSelectedModeInMenu() {
    if (isTimer) {
        let dropdownItemTimer = document.querySelector('[data-mode="Таймер"]');
        let dropdownItemSecundomer = document.querySelector('[data-mode="Секундомер"]');
        dropdownItemTimer.classList.add('selected');
        dropdownItemSecundomer.classList.remove('selected');
    }
    else {
        let dropdownItemSecundomer = document.querySelector('[data-mode="Секундомер"]');
        let dropdownItemTimer = document.querySelector('[data-mode="Таймер"]');
        dropdownItemSecundomer.classList.add('selected');
        dropdownItemTimer.classList.remove('selected');
    }
}
updateSelectedModeInMenu();

//логика переключения режимов
let dropdownMenuTimer = document.querySelector('.custom-dropdown-timer');
dropdownMenuTimer.querySelectorAll('.dropdown-item-timer').forEach(item => {
    item.addEventListener('click', function (e) {
        e.stopPropagation();

        let newMode = this.getAttribute('data-mode');
        let setTimeContainer = document.querySelector('.setTimeContainer');
        let confirmBtn = document.querySelector('.confirmBtn');
        let CirclesContainer = document.querySelector('.CirclesContainer');
        if (newMode === 'Секундомер') {
            if (isRunning) {
                resetTimer();
            }
            setTimeContainer.style.display = 'none';
            confirmBtn.style.display = 'none';
            CirclesContainer.style.display = 'flex';
            isTimer = false;
            updateSelectedModeInMenu()
            timerCounter.textContent = '00:00:00';
            if (timerVisualContainer) {
                timerVisualContainer.classList.add('secundomer-mode');
            }
            //меняем кнопку старта для таймера на кнопку старта секундомера
            let btnStartTimer = document.querySelector('.btnStart');
            let btnStartSecundomer = document.querySelector('.btnStartSecundomer');
            let btnCancelSecundomer = document.querySelector('.btnCancelSecundomer');
            let btnCancelTimer = document.querySelector('.btnCancel');
            btnStartTimer.style.display = 'none';
            btnCancelTimer.style.display = 'none';
            btnStartSecundomer.style.display = 'flex';
            btnCancelSecundomer.style.display = 'flex';
            timerCounter.style.fontVariantNumeric = 'tabular-nums';
        }
        else {
            if (isSecundomerOn) {
                clearInterval(SecundomerId);
                SecundomerId = null;
                isSecundomerOn = false;
                timerCounter.textContent = '00:00:00';
                arrOfCircles = [];
                currentNumberOfCircle = 0;
                renderCircles();
            }
            setTimeContainer.style.display = 'flex';
            confirmBtn.style.display = 'flex';
            CirclesContainer.style.display = 'none';
            isTimer = true;
            updateSelectedModeInMenu()
            timerCounter.textContent = timerCounterBeforeChange;
            if (timerVisualContainer) {
                timerVisualContainer.classList.remove('secundomer-mode');
            }
            //возвращаем кнопку старта для таймера
            //меняем кнопку старта для таймера на кнопку старта секундомера
            let btnStartTimer = document.querySelector('.btnStart');
            let btnStartSecundomer = document.querySelector('.btnStartSecundomer');
            let btnCancelSecundomer = document.querySelector('.btnCancelSecundomer');
            let btnCancelTimer = document.querySelector('.btnCancel');
            let btnCircle = document.querySelector('.btnCircle');
            let btnResetSecundomer = document.querySelector('.btnResetSecundomer');
            btnStartTimer.style.display = 'flex';
            btnCancelTimer.style.display = 'flex';
            btnStartSecundomer.style.display = 'none';
            btnCancelSecundomer.style.display = 'none';
            btnCircle.style.display = 'none';
            btnResetSecundomer.style.display = 'none';
            timerCounter.style.fontVariantNumeric = 'normal';
            resetTimerCircle();
        }


    });
});

//обработчик для кнопки старт для секундомера
let isSecundomerOn = false;
let btnStartSecundomer = document.querySelector('.btnStartSecundomer');
let SecundomerId = null;
let pausedElapsed = 0;
let startTime = null;
let elapsed = 0;

btnStartSecundomer.addEventListener('click', function () {
    let btnResetSecundomer = document.querySelector('.btnResetSecundomer');
    let btnCancelSecundomer = document.querySelector('.btnCancelSecundomer');
    let btnCircle = document.querySelector('.btnCircle');
    let btnStartSecundomer = document.querySelector('.btnStartSecundomer');
    btnCircle.style.display = 'flex';
    btnStartSecundomer.style.display = 'none';
    btnResetSecundomer.style.display = 'none';
    btnCancelSecundomer.style.display = 'flex';

    isSecundomerOn = true;

    // Запоминаем время старта с учётом уже прошедшего времени
    startTime = Date.now() - pausedElapsed;

    SecundomerId = setInterval(() => {
        elapsed = Date.now() - startTime;
        let ms = Math.floor((elapsed % 1000) / 10);
        let sec = Math.floor(elapsed / 1000) % 60;
        let min = Math.floor(elapsed / 60000);

        document.querySelector('.timerCounter').textContent =
            `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    }, 10);
});

//обработчик для кнопки стоп для секундомера
let btnCancelSecundomer = document.querySelector('.btnCancelSecundomer');
btnCancelSecundomer.addEventListener('click', function () {
    if (isSecundomerOn && SecundomerId) {
        clearInterval(SecundomerId);
        SecundomerId = null;
        isSecundomerOn = false;
        pausedElapsed = Date.now() - startTime;

        let btnStartSecundomer = document.querySelector('.btnStartSecundomer');
        let btnCircle = document.querySelector('.btnCircle');
        btnStartSecundomer.style.display = 'flex';
        btnCircle.style.display = 'none';
    } else {
        showAlert('Ошибка: отсчёт не запущен!', '⚠️');
        return;
    }
    let btnResetSecundomer = document.querySelector('.btnResetSecundomer');
    let btnCancelSecundomer = document.querySelector('.btnCancelSecundomer');
    btnResetSecundomer.style.display = 'flex';
    btnCancelSecundomer.style.display = 'none'
});



//логика для кнопки сброса секундомера
let btnResetSecundomer = document.querySelector('.btnResetSecundomer');
function ResetSecundomer() {
    clearInterval(SecundomerId);
    SecundomerId = null;
    isSecundomerOn = false;
    timerCounter.textContent = '00:00:00';
    pausedElapsed = 0;

    let btnResetSecundomer = document.querySelector('.btnResetSecundomer');
    let btnCancelSecundomer = document.querySelector('.btnCancelSecundomer');
    btnResetSecundomer.style.display = 'none';
    btnCancelSecundomer.style.display = 'flex';
}
btnResetSecundomer.addEventListener('click', function () {
    ResetSecundomer();
    arrOfCircles = [];
    currentNumberOfCircle = 0;
    renderCircles();
});

//обработчик дял кнопки круг
let circleBtn = document.querySelector('.btnCircle');
let arrOfCircles = [];
let currentNumberOfCircle = 0;
circleBtn.addEventListener('click', function () {
    if (arrOfCircles.length == 0) {
        currentNumberOfCircle = 1;
        let newCircle = [currentNumberOfCircle, elapsed, elapsed];
        formattingCircleTime(newCircle);
        arrOfCircles.push(newCircle);
        renderCircles();
    } else {
        currentNumberOfCircle += 1;
        let previousTime = unformatTime(arrOfCircles[arrOfCircles.length - 1][2]);
        let newCircle = [currentNumberOfCircle, (elapsed - previousTime), elapsed];
        formattingCircleTime(newCircle);
        arrOfCircles.push(newCircle);
        renderCircles();
    }
});
//функция отображения кругов в таблице
function renderCircles() {
    let rowsContainerTimer = document.querySelector('.rows-container-timer');
    rowsContainerTimer.innerHTML = '';
    if (arrOfCircles.length === 0) {
        return;
    }
    for (let i = (arrOfCircles.length - 1); i >= 0; i--) {
        let row = document.createElement('div');
        row.className = 'row-timer';


        row.innerHTML = `
            <div class="columns" style="border-radius: 5px;">${arrOfCircles[i][0]}</div>
            <div class="columns" style="border-radius: 5px;">${arrOfCircles[i][1]}</div>
            <div class="columns" style="border-radius: 5px;">${arrOfCircles[i][2]}</div>
        `;

        rowsContainerTimer.appendChild(row);
    }
}
//функция форматирования времени в массиве кругов
function formattingCircleTime(circle) {
    // Форматируем время круга (индекс 1)
    let ms1 = Math.floor((circle[1] % 1000) / 10);
    let sec1 = Math.floor(circle[1] / 1000) % 60;
    let min1 = Math.floor(circle[1] / 60000);
    circle[1] = `${String(min1).padStart(2, '0')}:${String(sec1).padStart(2, '0')}.${String(ms1).padStart(2, '0')}`;

    // Форматируем общее время (индекс 2)
    let ms2 = Math.floor((circle[2] % 1000) / 10);
    let sec2 = Math.floor(circle[2] / 1000) % 60;
    let min2 = Math.floor(circle[2] / 60000);
    circle[2] = `${String(min2).padStart(2, '0')}:${String(sec2).padStart(2, '0')}.${String(ms2).padStart(2, '0')}`;
}

//функцию разформатирования строки в милисекунды
function unformatTime(timeString) {
    let parts = timeString.split(':');
    let minutes = parseInt(parts[0], 10) || 0;

    let secMsParts = parts[1].split('.');
    let seconds = parseInt(secMsParts[0], 10) || 0;
    let hundredths = parseInt(secMsParts[1], 10) || 0;

    let totalMs = (minutes * 60000) + (seconds * 1000) + (hundredths * 10);

    return totalMs;
}