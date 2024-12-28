// Функция открытия попапа
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.classList.remove('popup_is-animated');
    document.addEventListener('keydown', closeByEsc); // Вешаем слушатель на клавишу Escape
}

// Функция закрытия попапа
export function closeModal(modal) {
    modal.classList.add('popup_is-animated');
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc); // Удаляем слушатель с клавиши Escape
}

// Функция закрытия попапа по клавише Escape
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}
