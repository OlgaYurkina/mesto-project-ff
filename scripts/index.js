// Функция для создания элемента карточки
function createCardElement({ name, link }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем карточку
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
  
    // Устанавливаем данные для карточки
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
  
    // Добавление обработчика на удаление карточки
    deleteButton.addEventListener('click', () => {
      cardElement.remove(); // Удаление карточки из DOM
    });
  
    // Добавление обработчика на лайк
    likeButton.addEventListener('click', () => {
      if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
      } else {
        likeButton.classList.add('card__like-button_is-active');
      }
    });
    return cardElement;
  }
  
  // Функция для отображения всех карточек
  function renderCards() {
    const placesList = document.querySelector('.places__list');
    initialCards.forEach((cardData) => {
      const cardElement = createCardElement(cardData);
      placesList.append(cardElement); // Добавляем карточки на страницу
    });
  }
  
  // Отобразить все карточки при загрузке страницы
  renderCards();
  