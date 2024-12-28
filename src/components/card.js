import likeActive from '../images/like-active.svg';
import likeInactive from '../images/like-inactive.svg';

// Обработчик лайков
export function handleLikeButtonClick(likeButton) {
    const isActive = likeButton.classList.toggle('card__like-button_is-active');
    likeButton.style.backgroundImage = isActive
        ? `url(${likeActive})`
        : `url(${likeInactive})`;
}

// Обработчик удаления карточки
export function handleDeleteCard(cardElement) {
    cardElement.remove();
}

// Функция создания карточки
export function createCard({ name, link }, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    // Устанавливаем данные для карточки
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Устанавливаем начальное состояние кнопки лайка
    likeButton.style.backgroundImage = `url(${likeInactive})`;

    // Добавляем обработчики
    likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton));
    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
    cardImage.addEventListener('click', () => handleImageClick(name, link));

    return cardElement;
}
