// =======================
// VARIABLES DEL POPUP
// =======================

// Cierra todos los popups al hacer clic en el fondo oscuro
const popups = document.querySelectorAll('.popup');

// Popup de edición de perfil
const popup = document.querySelector('.popup_type_edit-profile');

// Botón de abrir y cerrar
const openButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');

// Formulario y campos
const form = document.forms.editProfileForm;
const nameInput = form.elements.name;
const aboutInput = form.elements.about;

// Elementos visibles del perfil
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// =======================
// FUNCIONES DEL POPUP
// =======================

function openPopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  popup.style.display = 'flex';
}

function closePopup() {
  popup.style.display = 'none';
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closePopup();
}



// =======================
// FUNCIONES DE TARJETAS
// =======================

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

// Función para crear cada tarjeta
function createCard(name, link) {
  const template = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = template.querySelector('.element');

  const image = cardElement.querySelector('.element__image');
  const title = cardElement.querySelector('.element__title');
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__trash-button');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  // Activar botón de "me gusta"
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  });

  // Activar botón de eliminar tarjeta
  deleteButton.addEventListener('click', () => {
    cardElement.remove(); // ⬅ Elimina el <li> completo
  });

  image.addEventListener('click', () => {
    openImagePopup(name, link);
  });


  return cardElement;
}

// Contenedor de tarjetas
const cardsContainer = document.querySelector('.elements__list');

// Renderizar tarjetas iniciales
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
  cardsContainer.append(cardElement);
});

// =======================
// EVENTOS
// =======================

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);

// =======================
// POPUP PARA AGREGAR TARJETA
// =======================

const popupAddCard = document.querySelector('.popup_type_add-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = popupAddCard.querySelector('.popup__close-button');
const formAddCard = document.forms.addCardForm;

const titleInput = formAddCard.elements.title;
const linkInput = formAddCard.elements.link;

function openAddCardPopup() {
  formAddCard.reset(); // limpia el formulario
  popupAddCard.style.display = 'flex';
}

function closeAddCardPopup() {
  popupAddCard.style.display = 'none';
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(titleInput.value, linkInput.value);
  cardsContainer.prepend(newCard); // ⬅ agrega arriba

  closeAddCardPopup();
}

openAddButton.addEventListener('click', openAddCardPopup);
closeAddButton.addEventListener('click', closeAddCardPopup);
formAddCard.addEventListener('submit', handleAddCardSubmit);

// =========================
// POPUP DE IMAGEN AMPLIADA
// =========================

// Selección de elementos
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupCloseImageButton = imagePopup.querySelector('.popup__close-button');

// Función para abrir el popup con imagen
function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  imagePopup.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // bloquea scroll del fondo
}

// Función para cerrar el popup
function closeImagePopup() {
  imagePopup.style.display = 'none';
  document.body.style.overflow = 'auto'; // restaura scroll
}

// Evento de cerrar
popupCloseImageButton.addEventListener('click', closeImagePopup);

// Cerrar el popup de imagen haciendo clic en el fondo oscuro
imagePopup.addEventListener('click', (evt) => {
  if (evt.target === imagePopup) {
    closeImagePopup();
  }
});

// --------------------------------------------//

// ---- Validación del formulario Editar perfil ----

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());

    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit-button');

    // Comprueba el estado inicial del botón
    toggleButtonState(inputList, buttonElement);

    // Añade listeners para validar inputs en tiempo real
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('button_inactive');
    buttonElement.disabled = false;
  }
};

// Lanza la validación en todos los formularios con clase .form
enableValidation();

//Recorrer todos los popups y añadir evento de cierre al hacer clic en el fondo
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      popup.style.display = 'none';
    }
  });
});

