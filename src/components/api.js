const TOKEN = '88b11ee7-a8a1-438d-9ad0-3ad46297d70f'; // Токен
const GROUP_ID = 'wff-cohort-29'; // Идентификатор группы
const BASE_URL = `https://nomoreparties.co/v1/${GROUP_ID}/`;

const config = {
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json',
  },
};

// Функция для получения данных пользователя
export const getUserData = () => {
  return fetch(`${BASE_URL}users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при получении данных пользователя: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Функция для обновления данных пользователя
export const updateUserData = (name, about) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при обновлении данных пользователя: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Функция для получения карточек
export const getCards = () => {
  return fetch(`${BASE_URL}cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при получении карточек: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Функция для добавления новой карточки
export const addCard = (cardData) => {
  return fetch(`${BASE_URL}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData), // Отправляем данные карточки в формате JSON
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при добавлении карточки: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Функция для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${BASE_URL}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Функция для изменения аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${BASE_URL}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при обновлении аватара: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
};
