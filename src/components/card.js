import likeActive from '../images/like-active.svg';
import likeInactive from '../images/like-inactive.svg';
import { closeModal } from './modal.js'; 

// Обработчик лайков
export function handleLikeButtonClick(likeButton, likeCountElement, cardData, userId) {
    const isActive = likeButton.classList.toggle('card__like-button_is-active');
    likeButton.style.backgroundImage = isActive
        ? `url(${likeActive})`
        : `url(${likeInactive})`;

    // Обновляем массив лайков и отображение их количества
    if (isActive) {
        cardData.likes.push({ _id: userId });
    } else {
        cardData.likes = cardData.likes.filter((user) => user._id !== userId);
    }

    likeCountElement.textContent = cardData.likes.length;
}

// Обработчик открытия попапа для подтверждения удаления
export function openDeleteConfirmationPopup(cardElement, cardId) {
    const confirmationPopup = document.querySelector('.popup_type_confirm-delete');
    const confirmButton = confirmationPopup.querySelector('.popup__confirm-button');
    const cancelButton = confirmationPopup.querySelector('.popup__cancel-button');

    confirmationPopup.classList.add('popup_is-opened');

    // Подтверждение удаления карточки
    confirmButton.addEventListener('click', () => {
        deleteCardFromServer(cardId);  // Удаляем карточку с сервера
        cardElement.remove();  // Удаляем карточку с UI
        closeModal(confirmationPopup);  // Закрываем попап
    });

    // Закрытие попапа без удаления
    cancelButton.addEventListener('click', () => closeModal(confirmationPopup));
}

// Удаление карточки с сервера
function deleteCardFromServer(cardId) {
    fetch(`https://nomoreparties.co/v1/cohortId/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log("Карточка удалена:", data);
            }
        })
        .catch(error => console.log("Ошибка при удалении карточки:", error));
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
    likeButton.style.backgroundImage = likes.some((user) => user._id === userId)
        ? `url(${likeActive})`
        : `url(${likeInactive})`;
    likeCountElement.textContent = likes.length;

    // Скрываем или показываем кнопку удаления, если карточка принадлежит текущему пользователю
    if (owner._id !== userId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => openDeleteConfirmationPopup(cardElement, _id));  // Открываем попап для подтверждения удаления
    }

    // Добавляем обработчики
    likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton, likeCountElement, { name, link, likes }, userId));
    cardImage.addEventListener('click', () => handleImageClick(name, link));

    return cardElement;
}
