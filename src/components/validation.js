// Функция для отображения ошибки
function showInputError(inputElement, errorMessage, settings) {
    const errorElement = inputElement.closest(settings.formSelector).querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

// Функция для скрытия ошибки
function hideInputError(inputElement, settings) {
    const errorElement = inputElement.closest(settings.formSelector).querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

// Функция, которая проверяет валидность поля
function checkInputValidity(inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(inputElement, settings);
    }
}

// Функция для проверки действительности URL
function validateImageUrl(url) {
    return fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok || !res.headers.get('Content-Type').includes('image/')) {
          throw new Error('Неверный URL или не изображение');
        }
      })
      .catch((err) => console.error(err));
  }  

// Функция для проверки поля на соответствие паттерну
function checkPatternValidity(inputElement, settings) {
    const pattern = inputElement.pattern;
    const errorMessage = "Неверный формат. Пожалуйста, следуйте заданным правилам.";

    if (pattern && !new RegExp(pattern).test(inputElement.value)) {
        inputElement.setCustomValidity(errorMessage);
        showInputError(inputElement, errorMessage, settings);
    } else {
        inputElement.setCustomValidity('');
        checkInputValidity(inputElement, settings);
    }
}

// Функция для включения валидации на всей странице
function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => evt.preventDefault());
        const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
        const button = form.querySelector(settings.submitButtonSelector);
        
        // Проверка всех инпутов
        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                if (inputElement.pattern) {
                    checkPatternValidity(inputElement, settings);  // Валидация с использованием pattern
                } else {
                    checkInputValidity(inputElement, settings);  // Стандартная валидация
                }
                toggleButtonState(inputs, button, settings);
            });
        });

        // Изначально проверяем состояние кнопки
        toggleButtonState(inputs, button, settings);
    });
}

// Функция для активации или деактивации кнопки в зависимости от валидности формы
function toggleButtonState(inputs, button, settings) {
    const isFormValid = inputs.every(input => input.validity.valid);
    button.disabled = !isFormValid;
    button.classList.toggle(settings.inactiveButtonClass, !isFormValid);
}

// Функция для очистки всех ошибок валидации и деактивации кнопки
function clearValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    inputs.forEach(inputElement => hideInputError(inputElement, settings));
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
}

export { enableValidation, clearValidation };
