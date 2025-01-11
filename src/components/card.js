import { updateLike } from './api.js';

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

// Функция создания карточки
export function createCard(cardData, handleImageClick, userId, handleDeleteClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCountElement = cardElement.querySelector('.card__like-count');

    const { _id, name, link, likes, owner } = cardData;

    // Устанавливаем данные для карточки
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    likeCountElement.textContent = likes.length;

    // Устанавливаем начальное состояние кнопки лайка и количество лайков
    if (likes.some((user) => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }

    // Скрываем или показываем кнопку удаления, если карточка принадлежит текущему пользователю
    if (owner._id === userId) {
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => {
          handleDeleteClick(cardData, cardElement);
        });
      } else {
        deleteButton.style.display = 'none';
      }

    // Добавляем обработчики
    likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton, likeCountElement, { _id, likes }, userId));
    cardImage.addEventListener('click', () => handleImageClick(name, link));
    

    return cardElement;
}
