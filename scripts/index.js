import Api from "./components/Api.js";

// ⚠️ Token
const TOKEN = "010d3b6f-1c0b-4567-a029-4273182b9af1";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: { authorization: TOKEN }
});

// ⬇️ NUEVO: guardaremos el id del usuario para pasos posteriores (likes/delete)
let currentUserId = null;

// ======= (el resto de imports que ya tienes) =======
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

const openEditButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');

// Inputs del popup de perfil
const nameInput = formEditProfile.elements.name;
const aboutInput = formEditProfile.elements.about;

// ========================
// MODELO DE USUARIO
// ========================

// ⬇️ Si tienes la imagen en el DOM, pásala como avatarSelector (opcional).
//    Si tu img tiene otra clase, cámbiala aquí.
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__image'   // <-- si existe, se usará; si no, no pasa nada
});

// ⬇️ NUEVO: cargar usuario del servidor y pintar header
api.getUserInfo()
  .then((user) => {
    currentUserId = user._id;
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar
    });
  })
  .catch((err) => {
    console.log("❌ Error al cargar usuario:", err);
  });

// ========================
// POPUPS (instancias)
// ========================

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

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
    cardsSection.addItem(cardElement);
    addCardPopup.close();
  }
);
addCardPopup.setEventListeners();

// ========================
// FUNCIONES
// ========================

function handleEditPopupOpen() {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  formValidatorEdit.resetValidation();
  editProfilePopup.open();
}

function handleAddCardPopupOpen() {
  formAddCard.reset();
  formValidatorAdd.resetValidation();
  addCardPopup.open();
}

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

// ========================
// SECTION: instanciación y render
// ========================

// ⬇️ Por ahora mantenemos initialCards. En el siguiente punto lo quitamos y
//    renderizamos las que vienen del servidor.
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