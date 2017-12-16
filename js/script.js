// modal windows start

// переменные для модальных окон
var contactBtn = document.querySelector(".contact-btn");
var modalOverlay = document.querySelector(".modal-overlay");
var feedbackPopup = document.querySelector(".feedback-modal");

var closePopup = document.querySelector(".feedback-modal .feedback-modal-close");

// появление окна обратной связи при клике по кнопке Написать нам
contactBtn.addEventListener("click", function(event){
  event.preventDefault();
  modalOverlay.classList.add("modal-overlay-show");
  feedbackPopup.classList.add("feedback-modal-show");
});

// скрытие окна обратной связи при клике по кнопке Закрыть модального окна
closePopup.addEventListener("click", function(event) {
  event.preventDefault();
  modalOverlay.classList.remove("modal-overlay-show");
  feedbackPopup.classList.remove("feedback-modal-show");
  feedbackPopup.classList.remove("modal-error");
});

// скрытие окна обратной связи при клике вне модального окна
modalOverlay.addEventListener("click", function(event) {
  event.preventDefault();
  modalOverlay.classList.remove("modal-overlay-show");
  feedbackPopup.classList.remove("feedback-modal-show");
  feedbackPopup.classList.remove("modal-error");
});

// скрытие окна обратной связи при нажатии клавиши ESC
window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (feedbackPopup.classList.contains("feedback-modal-show")) {
      modalOverlay.classList.remove("modal-overlay-show");
      feedbackPopup.classList.remove("feedback-modal-show");
      feedbackPopup.classList.remove("modal-error");
    };
  };
});
// modal windows end


// slider auto scrolling start
var sliderInputs = document.getElementsByClassName('slider-input');

if (sliderInputs.length > 0) {
    setInterval (sliderChanges, 5000); // интервал вызова функции смены слайдов
  };


/* Функция смены слайдов
 * запускаем цикл поиска активного слайда в коллекции
 * проверяем активность текущего слайда
 * если слайд последний, активируем первый
 * иначе активируем следующий
 */
 function sliderChanges() {
  for (var i = 0; i <= sliderInputs.length - 1; i++) {
    if (sliderInputs[i].checked == true) {
      if(i == sliderInputs.length - 1) {
        sliderInputs[0].checked = true;
        return;
      } else {
        sliderInputs[i+1].checked = true;
        return;
      };
    };
  };
};
// slider auto scrolling end


// range price controls start
var rangeFilter = document.getElementById('range-filter');
var scale = document.getElementById('scale');
var scaleRange = document.getElementById('scale-range');
var toggleMin = document.getElementById('min-toggle');
var toggleMax = document.getElementById('max-toggle');
var minPriceInput = document.getElementById('min-price');
var maxPriceInput = document.getElementById('max-price');
var minPrice = 0; // будет определяться на сервере
var maxPrice = 12000; // будет определяться на сервере

if (rangeFilter != null) {

  // фиксируем ширину шкалы
  var scaleWidth = scale.offsetWidth;
  // устанавливаем ползунки в начальное и конечное значение
  toggleMin.style.left = 0;
  toggleMax.style.right = 0;
  // растягиваем полосу диапазона на всю ширину
  scaleRange.style.left = 0;
  scaleRange.style.right = 0;
  // указываем в инпутах мин и макс значения
  minPriceInput.value = minPrice;
  maxPriceInput.value = maxPrice;

  // обрабатываем событие нажатия мыши на минимальном переключателе
  toggleMin.addEventListener('mousedown', function(event) {
    // определяем ширину самого элемента
    var toggleWidth = toggleMin.offsetWidth;
    // вычисляем координаты текущего элемента
    var toggleMinCoords = getCoords(toggleMin);
    // вычисляем смещение по X на элементе при клике
    var shiftX = event.pageX - toggleMinCoords.left;
    // вычисляем координаты родителя
    var scaleCoords = getCoords(scale);
    // определяем точки ограничения слева и справа
    var leftEdge = 0;
    var rightEdge = scaleWidth - clearFormat(scaleRange.style.right) - 2 * toggleWidth;

    // начинаем отслеживать передвижения мыши
    document.onmousemove = function(event) {
      // вычисляем новую координату X для элемента
      var newLeft = event.pageX - shiftX - scaleCoords.left;

      // ограничиваем выход слева
      if (newLeft < leftEdge) {
        newLeft = leftEdge;
      };
      
      // ограничиваем выход справа
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      };
      // записываем координаты в стили элемента
      toggleMin.style.left = newLeft + 'px';
      scaleRange.style.left = newLeft + 'px';
      minPriceInput.value = (maxPrice * newLeft / (scaleWidth - 2 * toggleWidth)).toFixed();
    };

    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    };

    return false; // disable selection start (cursor change)
  });

  // обрабатываем событие нажатия мыши на максимальном переключателе
  toggleMax.addEventListener('mousedown', function(event) {
    // определяем ширину самого элемента
    var toggleWidth = toggleMax.offsetWidth;
    // вычисляем координаты текущего элемента
    var toggleMaxCoords = getCoords(toggleMax);
    // вычисляем смещение по X на элементе при клике
    var shiftX = toggleMaxCoords.right - event.pageX;
    // вычисляем координаты родителя
    var scaleCoords = getCoords(scale);
    // определяем точки ограничения слева и справа
    var leftEdge = scaleWidth - clearFormat(scaleRange.style.left) - 2 * toggleWidth;
    var rightEdge = 0;
    
    // начинаем отслеживать передвижения мыши
    document.onmousemove = function(event) {
      // вычисляем новую координату X для элемента
      var newRight = scaleCoords.right - event.pageX - shiftX;
      // курсор ушёл за пределы максимально возможного диапазона
      if (newRight < rightEdge) {
        newRight = rightEdge;
      };
      
      // ограничиваем смещение элемента за минимально допустимые пределы
      if (newRight > leftEdge) {
        newRight = leftEdge;
      };

      // записываем координаты в стили элемента
      toggleMax.style.right = newRight + 'px';
      scaleRange.style.right = newRight  + 'px';
      maxPriceInput.value = (maxPrice * (scaleWidth - 2 * toggleWidth - newRight) / (scaleWidth - 2 * toggleWidth)).toFixed();
    };

    // при отпускании мыши удаляем все назначенные обработчики передвижениями мыши
    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  });

  // предотвращаем обработку события drag HTML API
  toggleMin.addEventListener('dragstart', function() {
    return false;
  });

  // предотвращаем обработку события drag HTML API
  toggleMax.addEventListener('dragstart', function() {
    return false;
  });


  // меняем позицию минимального ползунка при изменении значения в минимальном инпуте
  minPriceInput.addEventListener('change', function() {
    var min = Number(minPriceInput.value);
    var max = Number(maxPriceInput.value);
    var toggleWidth = toggleMin.offsetWidth;

    if (min < minPrice) {
      min = minPrice;
      minPriceInput.value = min;
    };
    if (min > max) {
      min = max;
      minPriceInput.value = min;
    }

    toggleMin.style.left = Math.floor(min * (scaleWidth - 2 * toggleWidth) / maxPrice) + 'px';
    scaleRange.style.left = Math.floor(min * (scaleWidth - 2 * toggleWidth) / maxPrice) + 'px';
  });

    // меняем позицию максимального ползунка при изменении значения в максимальном инпуте
  maxPriceInput.addEventListener('change', function() {
    var min = Number(minPriceInput.value);
    var max = Number(maxPriceInput.value);
    var toggleWidth = toggleMax.offsetWidth;

    if (max > maxPrice) {
      max = maxPrice;
      maxPriceInput.value = max;
    };
    if (max < min) {
      max = min;
      maxPriceInput.value = max;
    }

    toggleMax.style.right = Math.floor((-max * (scaleWidth - 2 * toggleWidth) / maxPrice) + scaleWidth - 2 * toggleWidth) + 'px';
    scaleRange.style.right = Math.floor((-max * (scaleWidth - 2 * toggleWidth) / maxPrice) + scaleWidth - 2 * toggleWidth) + 'px';
  });

  // определение координат элемента
  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
      right: box.right + pageXOffset
    };
  };

  // очистка формата от приставки px
  function clearFormat(string) {
    string = string.substr(0, string.length - 2);
    string = Number(string);
    return string;
  };
};
// range price controls end


// yandex map start
ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
  myMap = new ymaps.Map("map", {
    center: [55.75729150100909,37.612833961195896],
    zoom: 14,
    controls: []
  });

  myPlacemark = new ymaps.Placemark(
    [55.75729150100909,37.612833961195896],
    { 
      hintContent: '',
      balloonContent: 'Дизайн студия NERDS'
    },
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/icon-map.png',
      iconImageSize: [190, 190],
      iconImageOffset: [-50, -190]
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.behaviors
    .disable(['rightMouseButtonMagnifier', 'scrollZoom']);
};

// yandex map end