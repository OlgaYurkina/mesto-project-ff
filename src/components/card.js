import { closeModal } from './modal.js';
import { updateLike, deleteCard } from './api.js';

// Обработчик лайков
export function handleLikeButtonClick(likeButton, likeCountElement, cardData) {
    const isActive = likeButton.classList.toggle('card__like-button_is-active');

    // Отправляем запрос на сервер для обновления лайка
    updateLike(cardData._id, isActive)
    .then((updatedCardData) => {
        // Обновляем количество лайков на основе ответа с сервера
        cardData.likes = updatedCardData; 
        likeCountElement.textContent = updatedCardData.length;
    })
    .catch((err) => console.error('Ошибка при обновлении лайков:', err));
}

// Функция для открытия попапа для подтверждения удаления
export function openDeleteConfirmationPopup(cardElement, cardId) {
    const confirmationPopup = document.querySelector('.popup_type_confirm-delete');
    const confirmButton = confirmationPopup.querySelector('.popup__confirm-button');
    
    confirmationPopup.classList.add('popup_is-opened');

    // Удаляем старый обработчик, если он существует
    confirmButton.removeEventListener('click', handleConfirmButtonClick);

    // Добавляем новый обработчик с флагом once
    confirmButton.addEventListener('click', handleConfirmButtonClick, { once: true });

    // Функция для подтверждения удаления карточки
    function handleConfirmButtonClick() {
        // Удаляем карточку с сервера
        deleteCard(cardId)
        .then(() => {
            cardElement.remove();  // Удаляем карточку с UI
        })
        .catch((err) => console.error(`openDeleteConfirmationPopup: Ошибка ${err} удаления карточки ${cardId}`))
        .finally(() => closeModal(confirmationPopup)); // Ошибка-не ошибка, закрываем попап
    }
}

// Функция создания карточки
export function createCard({ _id, name, link, likes, owner }, handleImageClick, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCountElement = cardElement.querySelector('.card__like-count');

    // Устанавливаем данные для карточки
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Устанавливаем начальное состояние кнопки лайка и количество лайков
    if (likes.some((user) => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
    likeCountElement.textContent = likes.length;

    // Скрываем или показываем кнопку удаления, если карточка принадлежит текущему пользователю
    if (owner._id !== userId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => openDeleteConfirmationPopup(cardElement, _id));  // Открываем попап для подтверждения удаления
    }

    // Добавляем обработчики
    likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton, likeCountElement, { _id, likes }, userId));
    cardImage.addEventListener('click', () => handleImageClick(name, link));

    return cardElement;
}
