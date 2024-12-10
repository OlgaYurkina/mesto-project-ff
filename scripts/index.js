// Функция для создания элемента карточки
function createCardElement({ name, link }, handleDeleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем карточку
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // Устанавливаем данные для карточки
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Добавление обработчика на удаление карточки
    deleteButton.addEventListener('click', () => {
      handleDeleteCard(cardElement);
    });

    return cardElement;
}

// Функция для удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove(); // Удаление карточки из DOM
}

// Функция для отображения всех карточек
function renderCards() {
    const placesList = document.querySelector('.places__list');
    initialCards.forEach((cardData) => {
        const cardElement = createCardElement(cardData, handleDeleteCard);
        placesList.append(cardElement); // Добавляем карточки на страницу
    });
}

// Отобразить все карточки при загрузке страницы
renderCards();
