// Открытие модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.classList.remove('popup_is-animated');
}

// Закрытие модального окна
export function closeModal(modal) {
    modal.classList.add('popup_is-animated');
    modal.classList.remove('popup_is-opened');
}
