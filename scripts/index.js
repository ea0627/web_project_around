// Importaciones
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './Constants.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

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

// Botones de acción
const openEditButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');

// Inputs del popup de perfil
const nameInput = formEditProfile.elements.name;
const aboutInput = formEditProfile.elements.about;

// ========================
// MODELO DE USUARIO
// ========================

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
});

// ========================
// POPUPS (instancias)
// ========================

// Popup de imagen
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

// Popups con formulario
const editProfilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  (formValues) => {
    // formValues = { name, about }
    userInfo.setUserInfo(formValues);
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  '.popup_type_add-card',
  ({ title, link }) => {
    const card = new Card({ name: title, link }, '#card-template', handleImageClick);
    const cardElement = card.generateCard();
    // Añadimos arriba
    cardsSection.addItem(cardElement);
    addCardPopup.close();
  }
);
addCardPopup.setEventListeners();

// ========================
// FUNCIONES
// ========================

// Abrir popup de edición de perfil (prefill + validación)
function handleEditPopupOpen() {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  formValidatorEdit.resetValidation();
  editProfilePopup.open();
}

// Abrir popup de nueva tarjeta (reset + validación)
function handleAddCardPopupOpen() {
  formAddCard.reset();
  formValidatorAdd.resetValidation();
  addCardPopup.open();
}

// Mostrar imagen ampliada desde Card
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

// ========================
// SECTION: instanciación y render
// ========================

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, '#card-template', handleImageClick);
      const cardElement = card.generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  '.elements__list'
);

// ========================
// EVENTOS
// ========================

openEditButton.addEventListener('click', handleEditPopupOpen);
openAddButton.addEventListener('click', handleAddCardPopupOpen);

// ========================
// RENDER INICIAL
// ========================

cardsSection.renderItems();
