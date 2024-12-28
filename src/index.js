import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Элементы страницы
const placesList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closePopupButton = newCardPopup.querySelector('.popup__close');
const form = newCardPopup.querySelector('form');
const placeNameInput = form.querySelector('input[name="place-name"]');
const linkInput = form.querySelector('input[name="link"]');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = editProfilePopup.querySelector('form');
const nameInput = editProfileForm.querySelector('input[name="name"]');
const descriptionInput = editProfileForm.querySelector('input[name="description"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

// Функция для отображения всех карточек
function renderCards() {
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData, handleImageClick);
        placesList.append(cardElement);
    });
}

// Функция открытия попапа с изображением
function handleImageClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(imagePopup);
}

// Добавление новой карточки
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newCard = {
        name: placeNameInput.value,
        link: linkInput.value
    };

    const cardElement = createCard(newCard, handleImageClick);
    placesList.prepend(cardElement);

    closeModal(newCardPopup);
    form.reset();
});

// Открытие попапа добавления карточки
addCardButton.addEventListener('click', () => openModal(newCardPopup));

// Закрытие попапа добавления карточки
closePopupButton.addEventListener('click', () => closeModal(newCardPopup));

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editProfilePopup);
});

// Закрытие попапа редактирования профиля
closeEditProfilePopupButton.addEventListener('click', () => closeModal(editProfilePopup));

// Сохранение изменений профиля
editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal(editProfilePopup);
});

// Закрытие попапа изображения
closeImagePopupButton.addEventListener('click', () => closeModal(imagePopup));

// Закрытие попапа при клике на оверлей
document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
});

// Закрытие попапа при нажатии на Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
});

// Отобразить карточки при загрузке страницы
renderCards();
