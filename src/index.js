import './pages/index.css';
import { getUserData, getCards, updateUserData, addCard, deleteCard, updateAvatar, updateLike } from './components/api.js'; // Импорт функций API
import { createCard } from './components/card.js'; // Импорт функции создания карточек
import { openModal, closeModal } from './components/modal.js'; // Импорт функций для работы с попапами
import { clearValidation, enableValidation } from './components/validation.js'; // Импорт функции валидации

// Элементы страницы
const placesList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closePopupButton = document.querySelectorAll('.popup__close');
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
let cardIdToDelete = null;
let cardElementToDelete = null;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

// Включение валидации
  enableValidation(validationConfig);

  function handleDeleteClick(cardData, cardElement) {
    cardIdToDelete = cardData._id;
    cardElementToDelete = cardElement;
    openModal(confirmationPopup);
  }
  
  // Функция для отображения всех карточек
  function renderCards(cards) {
    cards.forEach((cardData) => {
      const cardElement = createCard(
        cardData, 
        handleImageClick,
        userId,
        handleDeleteClick,
        handleLikeClick
      );
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
            setUserProfile(userData.name, userData.about, userData.avatar)
            renderCards(cards); // Отображаем карточки
        })
        .catch((err) => console.log('Ошибка при загрузке данных:', err));
}

// Открытие попапа добавления карточки
addCardButton.addEventListener('click', () => {
    // Очищаем предыдущие ошибки:
    clearValidation(newCardForm, validationConfig);
  
    // Сбрасываем поля, чтобы форма была пустой:
    newCardForm.reset();
  
    openModal(newCardPopup);
  });

// Закрытие попапа добавления карточки
closePopupButton.forEach((button) => {
    button.addEventListener('click', () => {
      // Ищем ближайший родитель с классом .popup
      const popup = button.closest('.popup');
      closeModal(popup);
    });
  });

  
// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
    // Очищаем предыдущие ошибки:
    clearValidation(editProfileForm, validationConfig);

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
            setUserProfile(updatedUserData.name, updatedUserData.about, updatedUserData.avatar);
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
            const cardElement = createCard(newCard, handleImageClick, userId, handleDeleteClick, handleLikeClick);
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

// Подтверждение удаления карточки
const deleteCardForm = confirmationPopup.querySelector('.popup__form[name="delete-card"]');

deleteCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // Если нечего удалять, выходим
  if (!cardIdToDelete) return;

  deleteCard(cardIdToDelete)
    .then(() => {
      cardElementToDelete.remove(); // убираем DOM-элемент
      cardIdToDelete = null;        // сбрасываем
      cardElementToDelete = null;
      closeModal(confirmationPopup);
    })
    .catch((err) => console.log('Ошибка при удалении карточки:', err));
});

// Открытие попапа редактирования аватара
avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarPopup.querySelector('.popup__form'), validationConfig);
    openModal(avatarPopup);
  });

// Закрытие попапа редактирования аватара
closeAvatarPopupButton.addEventListener('click', () => closeModal(avatarPopup));

// Отправка формы для изменения аватара с уведомлением о загрузке
avatarPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  const avatarUrl = avatarInput.value;
  const saveButton = avatarPopup.querySelector('.popup__button');
  
  saveButton.textContent = 'Сохранение...'; // Изменяем текст кнопки
  saveButton.disabled = true; // Отключаем кнопку
  
  updateAvatar(avatarUrl)
    .then(() => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${avatarUrl})`;

      closeModal(avatarPopup);
    })
    .catch((err) => console.log('Ошибка при обновлении аватара:', err))
    .finally(() => {
        saveButton.textContent = 'Сохранить'; // Восстанавливаем исходный текст кнопки
        saveButton.disabled = false; // Включаем кнопку
    });
});

// Обновление лайков
function handleLikeClick(cardData, likeButton, likeCountElement) {
  // Проверяем, активен ли лайк сейчас
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  updateLike(cardData._id, !isLiked)
    .then((updatedLikes) => {
      
      cardData.likes = updatedLikes;

      if (!isLiked) {
        likeButton.classList.add('card__like-button_is-active');
      } else {
        likeButton.classList.remove('card__like-button_is-active');
      }

      // Обновляем счётчик
      likeCountElement.textContent = updatedLikes.length;
    })
    .catch((err) => console.error('Ошибка при обновлении лайков:', err));
}

// Загрузка данных при старте страницы
loadData();

function setUserProfile(userName, userAbout, userAvatar) {
    profileName.textContent = userName;
    profileDescription.textContent = userAbout;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userAvatar})`;
}
