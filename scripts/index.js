import Api from "./components/Api.js";

// ⚠️ Token
const TOKEN = "2bd7dcf7-127d-448b-a5cb-70f8f3d9d2ea".trim();
console.log(TOKEN);
console.log("TOKEN len:", TOKEN.length);

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: { authorization: TOKEN }
});

// Guardaremos el id del usuario (para delete en el punto 7)
let currentUserId = null;

// ======= Imports =======
import Card from './Card.js';
import FormValidator from './FormValidator.js';
// ⛔️ Quitamos initialCards: solo queda validationConfig
import { validationConfig } from './Constants.js';
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

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__image'
});

// ========================
// POPUPS
// ========================

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  (formValues) => {
    editProfilePopup.setSaving?.(true);
    api.updateUserInfo({ name: formValues.name, about: formValues.about })
      .then((upd) => {
        userInfo.setUserInfo({ name: upd.name, about: upd.about, avatar: upd.avatar });
        editProfilePopup.close();
      })
      .catch((err) => console.log("❌ Error al actualizar perfil:", err))
      .finally(() => editProfilePopup.setSaving?.(false));
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  '.popup_type_add-card',
  ({ title, link }) => {
    addCardPopup.setSaving?.(true, "Creando…");
    api.addCard({ name: title, link })
      .then((newCard) => {
        const card = new Card(newCard, '#card-template', handleImageClick, handleLikeClick);
        const cardElement = card.generateCard();
        // Aparece arriba
        cardsSection.addItemPrepend
          ? cardsSection.addItemPrepend(cardElement)
          : cardsSection.addItem(cardElement);
        addCardPopup.close();
        formAddCard.reset();
        formValidatorAdd.resetValidation();
      })
      .catch((err) => console.log("❌ Error al crear tarjeta:", err))
      .finally(() => addCardPopup.setSaving?.(false));
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

// Likes a través de API
function handleLikeClick(cardId, isLiked, updateLikeUI, onError) {
  const req = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
  req
    .then((updatedCard) => {
      updateLikeUI(!!updatedCard.isLiked);
    })
    .catch((err) => {
      console.log("❌ Error al alternar like:", err);
      onError?.();
    });
}

// ========================
// SECTION: instanciación (sin items locales)
// ========================

const cardsSection = new Section(
  {
    renderer: (data) => {
      const card = new Card(data, '#card-template', handleImageClick, handleLikeClick);
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
// CARGA INICIAL: usuario + tarjetas del servidor
// ========================

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;
    userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar });
    // Renderiza tarjetas del backend (cada una ya trae isLiked)
    // Si tu Section tiene renderItems(items), puedes usarlo; sino, forEach:
    cards.forEach((cardData) => {
      const card = new Card(cardData, '#card-template', handleImageClick, handleLikeClick);
      const cardElement = card.generateCard();
      cardsSection.addItem(cardElement);
    });
  })
  .catch((err) => console.log("❌ Error al cargar inicial:", err));
