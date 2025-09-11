// =======================
// IMPORTS
// =======================
import Api from "./components/Api.js";
import Card from "./Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./Constants.js";
import UserInfo from "./components/UserInfo.js";

// =======================
// API / TOKEN
// =======================
const TOKEN = "2bd7dcf7-127d-448b-a5cb-70f8f3d9d2ea".trim();

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: { authorization: TOKEN }
});

// =======================
// POPUP CONFIRM (ELIMINAR)
// =======================
const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");
confirmPopup.setEventListeners();

function handleDeleteClick(cardId, removeCardFromDOM) {
  confirmPopup.setSubmitAction(() => {
    confirmPopup.setSaving(true, "Eliminando…");
    api.deleteCard(cardId)
      .then(() => {
        removeCardFromDOM();
        confirmPopup.close();
      })
      .catch((err) => console.log("❌ Error al eliminar tarjeta:", err))
      .finally(() => confirmPopup.setSaving(false));
  });
  confirmPopup.open();
}

// 🟢 DEBUG: probamos que la función existe
console.log("handleDeleteClick (index.js):", typeof handleDeleteClick);

// =======================
// VARIABLES GLOBALES
// =======================
let currentUserId = null;

// =======================
// POPUPS (instancias base)
// =======================
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  ({ name, about }) => {
    editProfilePopup.setSaving?.(true);
    api.updateUserInfo({ name, about })
      .then((u) => {
        userInfo.setUserInfo({ name: u.name, about: u.about, avatar: u.avatar });
        editProfilePopup.close();
      })
      .catch((e) => console.log("❌ Error al actualizar perfil:", e))
      .finally(() => editProfilePopup.setSaving?.(false));
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  ({ title, link }) => {
    addCardPopup.setSaving?.(true, "Creando…");
    api.addCard({ name: title, link })
      .then((newCard) => {
        const card = new Card(
          newCard,
          "#card-template",
          handleImageClick,
          handleLikeClick,
          handleDeleteClick,
          currentUserId   // para saber si soy dueño
        );
        const el = card.generateCard();
        cardsSection.addItemPrepend ? cardsSection.addItemPrepend(el) : cardsSection.addItem(el);
        addCardPopup.close();
        formAddCard.reset();
        formValidatorAdd.resetValidation();
      })
      .catch((e) => console.log("❌ Error al crear tarjeta:", e))
      .finally(() => addCardPopup.setSaving?.(false));
  }
);
addCardPopup.setEventListeners();

// =======================
// HANDLERS
// =======================
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function handleLikeClick(cardId, isLiked, updateLikeUI, onError) {
  const req = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
  req
    .then((updatedCard) => updateLikeUI(!!updatedCard.isLiked))
    .catch((err) => { console.log("❌ Error al alternar like:", err); onError?.(); });
}

// =======================
// VALIDACIÓN DE FORMULARIOS
// =======================
const formEditProfile = document.forms.editProfileForm;
const formAddCard = document.forms.addCardForm;

const formValidatorEdit = new FormValidator(validationConfig, formEditProfile);
const formValidatorAdd = new FormValidator(validationConfig, formAddCard);

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

// =======================
// DOM
// =======================
const openEditButton = document.querySelector(".profile__edit-button");
const openAddButton = document.querySelector(".profile__add-button");

const nameInput = formEditProfile.elements.name;
const aboutInput = formEditProfile.elements.about;

// =======================
// USER INFO
// =======================
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image"
});

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

// =======================
// SECTION (renderer)
// =======================
const cardsSection = new Section(
  {
    renderer: (data) => {
      const card = new Card(
        data,
        "#card-template",
        handleImageClick,
        handleLikeClick,
        handleDeleteClick,
        currentUserId  // para saber si soy dueño
      );
      const el = card.generateCard();
      cardsSection.addItem(el);
    }
  },
  ".elements__list"
);

// =======================
// EVENTOS
// =======================
openEditButton.addEventListener("click", handleEditPopupOpen);
openAddButton.addEventListener("click", handleAddCardPopupOpen);

// =======================
// CARGA INICIAL
// =======================
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;
    userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar });

    // 🔎 DEBUG: ¿de quién es cada card?
    console.log("currentUserId:", currentUserId);
    console.table(
      cards.map(c => ({
        name: c.name,
        id: c._id,
        owner: (c.owner && c.owner._id) ? c.owner._id : c.owner,
        isMine: ((c.owner && c.owner._id) ? c.owner._id : c.owner) === currentUserId
      }))
    );

    cards.forEach((cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleImageClick,
        handleLikeClick,
        handleDeleteClick,
        currentUserId
      );
      const el = card.generateCard();
      cardsSection.addItem(el);
    });
  })
  .catch((err) => console.log("❌ Error al cargar inicial:", err));