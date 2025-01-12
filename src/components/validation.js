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
    // Если поле не подходит под pattern
    if (inputElement.validity.patternMismatch) {
      const errorMessage =
        inputElement.dataset.errorMessage ||
        'Разрешены только латинские/кириллические буквы, знаки дефиса и пробелы.';
      inputElement.setCustomValidity(errorMessage);
    } else {
      // Сбрасываем кастомную ошибку, если всё ок
      inputElement.setCustomValidity('');
    }
  
    // Дальше стандартная логика показа/сокрытия ошибки
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(inputElement, settings);
    }
  }

// Функция для включения валидации на всей странице
function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach((form) => {
      form.addEventListener('submit', (evt) => evt.preventDefault());
  
      const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
      const button = form.querySelector(settings.submitButtonSelector);
  
      // Навешиваем обработчики на все поля
      inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          checkInputValidity(inputElement, settings);
          toggleButtonState(inputs, button, settings);
        });
      });
  
      // Изначальная проверка кнопки
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
