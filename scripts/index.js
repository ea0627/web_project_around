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

// Guarda tu id para usos posteriores (propietario, etc.)
let currentUserId = null;

// =======================
// USER INFO (modelo de cabecera)
// =======================
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar"
});

// =======================
// VALIDACIÓN DE FORMULARIOS
// =======================
const formEditProfile = document.forms.editProfileForm;
const formAddCard    = document.forms.addCardForm;
const formUpdateAvatar = document.forms.updateAvatarForm;

const validatorEdit   = new FormValidator(validationConfig, formEditProfile);
const validatorAdd    = new FormValidator(validationConfig, formAddCard);
const validatorAvatar = new FormValidator(validationConfig, formUpdateAvatar);

validatorEdit.enableValidation();
validatorAdd.enableValidation();
validatorAvatar.enableValidation();

// =======================
// POPUPS COMUNES
// =======================
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");
confirmPopup.setEventListeners();

// =======================
// HANDLERS (Card)
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

// =======================
// SECTION (listado de tarjetas)
// =======================
const cardsSection = new Section(
  {
    renderer: (data) => {
      const card = new Card(
        data,
        "#card-template",
        handleImageClick,
        handleLikeClick,
        handleDeleteClick
      );
      const el = card.generateCard();
      cardsSection.addItem(el);
    }
  },
  ".elements__list"
);

// =======================
// POPUP: Editar perfil
// =======================
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

// Abrir popup editar perfil
const openEditButton = document.querySelector(".profile__edit-button");
openEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  formEditProfile.elements.name.value = name;
  formEditProfile.elements.about.value = about;
  validatorEdit.resetValidation();
  editProfilePopup.open();
});

// =======================
// POPUP: Nueva tarjeta
// =======================
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
          handleDeleteClick
        );
        const el = card.generateCard();
        // Si tu Section no tiene addItemPrepend, addItem es suficiente
        cardsSection.addItemPrepend ? cardsSection.addItemPrepend(el) : cardsSection.addItem(el);
        addCardPopup.close();
        formAddCard.reset();
        validatorAdd.resetValidation();
      })
      .catch((e) => console.log("❌ Error al crear tarjeta:", e))
      .finally(() => addCardPopup.setSaving?.(false));
  }
);
addCardPopup.setEventListeners();

// Abrir popup nueva tarjeta
const openAddButton = document.querySelector(".profile__add-button");
openAddButton.addEventListener("click", () => {
  formAddCard.reset();
  validatorAdd.resetValidation();
  addCardPopup.open();
});

// =======================
// POPUP: Actualizar avatar (NUEVO)
// =======================
const updateAvatarPopup = new PopupWithForm(
  ".popup_type_update-avatar",
  ({ avatar }) => {
    updateAvatarPopup.setSaving?.(true, "Guardando…");
    api.updateAvatar(avatar)
      .then((u) => {
        userInfo.setUserInfo({ name: u.name, about: u.about, avatar: u.avatar });
        updateAvatarPopup.close();
        formUpdateAvatar.reset();
        validatorAvatar.resetValidation();
      })
      .catch((err) => console.log("❌ Error al actualizar avatar:", err))
      .finally(() => updateAvatarPopup.setSaving?.(false));
  }
);
updateAvatarPopup.setEventListeners();

// ---- disparador del popup de avatar ----
const avatarEl = document.querySelector(".profile__avatar");
console.log("¿Encontré .profile__avatar?", !!avatarEl);

function openUpdateAvatarPopup() {
  console.log("Abriendo popup de avatar…");
  formUpdateAvatar.reset();
  validatorAvatar.resetValidation();
  updateAvatarPopup.open();
}

if (avatarEl) {
  avatarEl.style.cursor = "pointer";     // opcional, para UX
  avatarEl.addEventListener("click", openUpdateAvatarPopup);
} else {
  console.warn("No se encontró .profile__avatar en el DOM");
}


// Abrir popup de avatar: con botón si existe, si no con la imagen
const openAvatarButton =
  document.querySelector(".profile__avatar-edit-button") ||
  document.querySelector(".profile__avatar");

openAvatarButton?.addEventListener("click", () => {
  formUpdateAvatar.reset();
  validatorAvatar.resetValidation();
  updateAvatarPopup.open();
});

// =======================
// CARGA INICIAL
// =======================
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;
    userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar });

    cards.forEach((cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleImageClick,
        handleLikeClick,
        handleDeleteClick
      );
      const el = card.generateCard();
      cardsSection.addItem(el);
    });
  })
  .catch((err) => console.log("❌ Error al cargar inicial:", err));