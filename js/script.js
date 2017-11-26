// модальные окна start

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
        }
    }
});
// модальные окна end



// автоматическая прокрутка слайдера start
var sliderInputs = document.getElementsByClassName('slider-input');

setInterval (sliderChanges, 5000); // устанавливаем интервал вызова функции смены слайдов

/* Функция смены слайдов
 * Запускаем цикл поиска активного слайда в коллекции
 * Проверяем активность текущего слайда
 * При нахождении активного слайда, деактивируем его
 * Если слайд последний в массиве, активируем первый
 * Если слайд не последний, активируем следующий
*/
function sliderChanges() {
    for (var i = 0; i <= sliderInputs.length - 1; i++) {
        if (sliderInputs[i].checked == true) {
            sliderInputs[i].checked = false;
            if(i == sliderInputs.length - 1) {
                sliderInputs[0].checked = true;
                return;
            } else {
                sliderInputs[i+1].checked = true;
                return;
            }
        }
    }
}
// автоматическая прокрутка слайдера start