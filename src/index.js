import './pages/index.css';
import { initialCards } from './components/cards.js';
import likeActive from './images/like-active.svg';
import likeInactive from './images/like-inactive.svg';

// Функция для создания карточки
function createCard(cardData) {
    const cardElement = createCardElement(cardData);
    const placesList = document.querySelector('.places__list');
    placesList.prepend(cardElement);
}

// Функция для создания элемента карточки
function createCardElement({ name, link }, handleDeleteCard, handleImageClick, handleLikeButtonClick) {
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

    // Добавление обработчика на лайк
    likeButton.addEventListener('click', () => {
        handleLikeButtonClick(likeButton);
    });

    // Добавление обработчика на удаление карточки
    deleteButton.addEventListener('click', () => {
        handleDeleteCard(cardElement);
    });

    // Добавление обработчика на клик по изображению
    cardImage.addEventListener('click', () => {
        handleImageClick(name, link);
    });

    return cardElement;
}





// Функция для удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove();
}

// Функция для отображения всех карточек
function renderCards() {
    const placesList = document.querySelector('.places__list');
    initialCards.forEach((cardData) => {
        const cardElement = createCardElement(
            cardData,
            handleDeleteCard,
            handleImageClick,
            handleLikeButtonClick
        );
        placesList.append(cardElement);
    });
}

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

// Закрытие попапа при клике на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target === popup) {
            closePopup(popup);
        }
    });
});

// Закрытие попапа при нажатии на Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
});

// Отобразить все карточки при загрузке страницы
renderCards();

// Обработчики для попапа добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closePopupButton = newCardPopup.querySelector('.popup__close');
const form = newCardPopup.querySelector('form');
const placeNameInput = form.querySelector('input[name="place-name"]');
const linkInput = form.querySelector('input[name="link"]');

// Открытие попапа
addCardButton.addEventListener('click', () => {
    openPopup(newCardPopup);
});

// Закрытие попапа
closePopupButton.addEventListener('click', () => {
    closePopup(newCardPopup);
});

// Добавление новой карточки
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const placeName = placeNameInput.value;
    const imageLink = linkInput.value;

    const newCard = {
        name: placeName,
        link: imageLink
    };

    createCard(newCard);

    closePopup(newCardPopup);
    form.reset();
});

// Элементы для попапа редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = editProfilePopup.querySelector('form');
const nameInput = editProfileForm.querySelector('input[name="name"]');
const descriptionInput = editProfileForm.querySelector('input[name="description"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close');

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
    // Заполняем поля текущими данными
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;

    // Открываем попап
    openPopup(editProfilePopup);
});

// Закрытие попапа редактирования профиля
closeEditProfilePopupButton.addEventListener('click', () => {
    closePopup(editProfilePopup);
});

// Сохранение данных профиля
editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Обновляем данные профиля
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    // Закрываем попап
    closePopup(editProfilePopup);
});

// Элементы попапа изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

// Функция открытия попапа изображения
function handleImageClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openPopup(imagePopup);
}

// Закрытие попапа изображения
closeImagePopupButton.addEventListener('click', () => {
    closePopup(imagePopup);
});

//функция обработки лайков
function handleLikeButtonClick(likeButton) {
    const isActive = likeButton.classList.toggle('card__like-button_is-active');
    likeButton.style.backgroundImage = isActive
        ? `url(${likeActive})`
        : `url(${likeInactive})`;
}