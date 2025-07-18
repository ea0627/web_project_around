console.log("✅ validate.js cargado");

export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
    console.log("🧪 Revisando formulario:", formElement);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    console.log("👉 Botón encontrado:", buttonElement);

    toggleButtonState(inputList, buttonElement);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement);
            });
        });
    });
}

function checkInputValidity(formElement, inputElement, config) {
    console.log(`Validando ${inputElement.name}:`, inputElement.validity);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
}

function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

export function toggleButtonState(inputList, buttonElement) {
    console.log("¿Hay input inválido?", hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}
