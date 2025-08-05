// Importaciones
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './Constants.js';
import { openPopup, closePopup, setPopupOverlayClose } from './Utils.js';

// ========================
// VALIDACIÓN DE FORMULARIOS
// ========================

const formEditProfile = document.forms.editProfileForm;
const formAddCard = document.forms.addCardForm;

const formValidatorEdit = new FormValidator(validationConfig, formEditProfile);
const formValidatorAdd = new FormValidator(validationConfig, formAddCard);

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

// ========================
// VARIABLES DEL DOM
// ========================

// Popup Editar Perfil
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupEditProfile.querySelector('.popup__close-button');

// Popup Agregar Tarjeta
const popupAddCard = document.querySelector('.popup_type_add-card');
const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = popupAddCard.querySelector('.popup__close-button');

// Popup Imagen Ampliada
const popupImage = document.querySelector('.popup_type_image');
const popupImgElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
const closeImageButton = popupImage.querySelector('.popup__close-button');

// Inputs y elementos de perfil
const nameInput = formEditProfile.elements.name;
const aboutInput = formEditProfile.elements.about;
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Inputs de nueva tarjeta
const titleInput = formAddCard.elements.title;
const linkInput = formAddCard.elements.link;

// Contenedor de tarjetas
const cardsContainer = document.querySelector('.elements__list');


// ========================
// FUNCIONES
// ========================

// Abrir popup de edición de perfil
function handleEditPopupOpen() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  formValidatorEdit.resetValidation();
  openPopup(popupEditProfile);
}

// Enviar formulario de edición de perfil
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

// Abrir popup de nueva tarjeta
function handleAddCardPopupOpen() {
  
  formAddCard.reset();
  formValidatorAdd.resetValidation();
  openPopup(popupAddCard);
}

// Enviar formulario de nueva tarjeta
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const card = new Card({ name: titleInput.value, link: linkInput.value }, '#card-template', handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAddCard);
}

// Mostrar imagen ampliada
function handleImageClick(name, link) {
  popupImgElement.src = link;
  popupImgElement.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

// ========================
// EVENTOS
// ========================

// Editar perfil
openEditButton.addEventListener('click', handleEditPopupOpen);
closeEditButton.addEventListener('click', () => closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', handleEditFormSubmit);

// Agregar tarjeta
openAddButton.addEventListener('click', handleAddCardPopupOpen);
closeAddButton.addEventListener('click', () => closePopup(popupAddCard));
formAddCard.addEventListener('submit', handleAddCardSubmit);

// Imagen ampliada
closeImageButton.addEventListener('click', () => closePopup(popupImage));

// Cierre de popups al presionar Escape
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    document.querySelectorAll('.popup_opened').forEach(closePopup);
  }
});

// Cierre al hacer clic fuera del contenedor
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) closePopup(popup);
  });
});

// ========================
// RENDER INICIAL DE TARJETAS
// ========================

initialCards.forEach((data) => {
  const card = new Card(data, '#card-template', handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

setPopupOverlayClose(popupEditProfile);
setPopupOverlayClose(popupAddCard);
setPopupOverlayClose(popupImage);