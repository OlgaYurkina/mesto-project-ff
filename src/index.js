import './pages/index.css';
import { getUserData, getCards, updateUserData, addCard, deleteCard, updateAvatar } from './components/api.js'; // Импорт функций API
import { createCard } from './components/card.js'; // Импорт функции создания карточек
import { openModal, closeModal } from './components/modal.js'; // Импорт функций для работы с попапами
import { enableValidation } from './components/validation.js'; // Импорт функции валидации

// Элементы страницы
const placesList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closePopupButton = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('form');
const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
const linkInput = newCardForm.querySelector('input[name="link"]');
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
const confirmationPopup = document.querySelector('.popup_type_confirm-delete');  // Попап подтверждения удаления
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarInput = avatarPopup.querySelector('input[name="avatar"]');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');
const closeAvatarPopupButton = avatarPopup.querySelector('.popup__close');

// Переменная для хранения ID пользователя
let userId = null;
let currentCardId = null; // Для хранения ID карточки, которую нужно удалить

// Функция для отображения всех карточек
function renderCards(cards) {
    cards.forEach((cardData) => {
        const isOwner = cardData.owner._id === userId; // Проверяем, является ли текущий пользователь владельцем карточки
        const cardElement = createCard(cardData, handleImageClick, userId, isOwner);
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

// Функция для загрузки данных с сервера и отображения карточек
function loadData() {
    Promise.all([getUserData(), getCards()])
        .then(([userData, cards]) => {
            userId = userData._id;  // Получаем id пользователя
            renderCards(cards); // Отображаем карточки
        })
        .catch((err) => console.log('Ошибка при загрузке данных:', err));
}

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

// Сохранение изменений профиля с уведомлением о загрузке
editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const about = descriptionInput.value;
    const saveButton = editProfileForm.querySelector('.popup__button');
    
    saveButton.textContent = 'Сохранение...'; // Изменяем текст кнопки
    saveButton.disabled = true; // Отключаем кнопку
    
    updateUserData(name, about)
        .then((updatedUserData) => {
            profileName.textContent = updatedUserData.name;
            profileDescription.textContent = updatedUserData.about;
            closeModal(editProfilePopup);
        })
        .catch((err) => console.log('Ошибка при обновлении данных пользователя:', err))
        .finally(() => {
            saveButton.textContent = 'Сохранить'; // Восстанавливаем исходный текст кнопки
            saveButton.disabled = false; // Включаем кнопку
        });
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

// Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// Функция добавления новой карточки с уведомлением о загрузке
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = placeNameInput.value;
    const link = linkInput.value;
    const saveButton = newCardForm.querySelector('.popup__button');
    
    saveButton.textContent = 'Сохранение...'; // Изменяем текст кнопки
    saveButton.disabled = true; // Отключаем кнопку
    
    addCard({ name, link })
        .then((newCard) => {
            const cardElement = createCard(newCard, handleImageClick, userId);
            placesList.prepend(cardElement);  // Добавляем карточку в начало списка
            closeModal(newCardPopup); // Закрываем попап
            newCardForm.reset(); // Очищаем форму
        })
        .catch((err) => console.log('Ошибка при добавлении карточки:', err))
        .finally(() => {
            saveButton.textContent = 'Создать'; // Восстанавливаем исходный текст кнопки
            saveButton.disabled = false; // Включаем кнопку
        });
});

// Функция для удаления карточки
export function handleDeleteCard(cardElement, cardId) {
    currentCardId = cardId;  // Сохраняем ID карточки, которую нужно удалить
    openModal(confirmationPopup);  // Открываем попап подтверждения удаления
}

// Подтверждение удаления карточки
const confirmButton = confirmationPopup.querySelector('.popup__confirm-button');
const cancelButton = confirmationPopup.querySelector('.popup__cancel-button');

// Удаление карточки с сервера
function deleteCardFromServer() {
    fetch(`https://nomoreparties.co/v1/${userId}/cards/${currentCardId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log("Карточка удалена:", data);
                document.getElementById(currentCardId).remove(); // Удаляем карточку из DOM
                closeModal(confirmationPopup); // Закрываем попап
            }
        })
        .catch(error => console.log("Ошибка при удалении карточки:", error));
}

// Обработчики кнопок подтверждения и отмены
confirmButton.addEventListener('click', deleteCardFromServer);  // Удаляем карточку при подтверждении
cancelButton.addEventListener('click', () => closeModal(confirmationPopup));  // Закрываем попап без удаления

// Открытие попапа редактирования аватара
avatarEditButton.addEventListener('click', () => openModal(avatarPopup));

// Закрытие попапа редактирования аватара
closeAvatarPopupButton.addEventListener('click', () => closeModal(avatarPopup));

// Валидация формы редактирования аватара
avatarInput.addEventListener('input', () => {
  if (avatarInput.validity.valid) {
    avatarSubmitButton.disabled = false;
    avatarSubmitButton.classList.remove('popup__button_disabled');
  } else {
    avatarSubmitButton.disabled = true;
    avatarSubmitButton.classList.add('popup__button_disabled');
  }
});

// Отправка формы для изменения аватара с уведомлением о загрузке
avatarPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  const avatarUrl = avatarInput.value;
  const saveButton = avatarPopup.querySelector('.popup__button');
  
  saveButton.textContent = 'Сохранение...'; // Изменяем текст кнопки
  saveButton.disabled = true; // Отключаем кнопку
  
  updateAvatar(avatarUrl)
    .then(() => {
      document.querySelector('.profile__avatar').src = avatarUrl;
      closeModal(avatarPopup);
    })
    .catch((err) => console.log('Ошибка при обновлении аватара:', err))
    .finally(() => {
        saveButton.textContent = 'Сохранить'; // Восстанавливаем исходный текст кнопки
        saveButton.disabled = false; // Включаем кнопку
    });
});

// Загрузка данных при старте страницы
loadData();
