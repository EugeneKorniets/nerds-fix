// работа с модальными окнами start

// объявление всех переменных для работы с модальными окнами
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
// работа с модальными окнами end
