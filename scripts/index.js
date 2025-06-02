// =======================
// VARIABLES DEL POPUP
// =======================

// Seleccionamos el popup de edición de perfil
const popup = document.querySelector('.popup_type_edit-profile');

// Botón de abrir y cerrar
const openButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');

// Formulario y campos
const form = document.forms.editProfileForm;
const nameInput = form.elements.name;
const aboutInput = form.elements.about;

// Elementos del perfil
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// =======================
// FUNCIONES
// =======================

// Abre el popup y precarga los valores actuales
function openPopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  popup.style.display = 'flex';
}

// Cierra el popup
function closePopup() {
  popup.style.display = 'none';
}

// Guarda los cambios y actualiza el DOM
function handleFormSubmit(evt) {
  evt.preventDefault(); // Evita recargar la página

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closePopup(); // Cierra el popup después de guardar
}

// =======================
// EVENTOS
// =======================

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);


// Selecciona todos los botones de like
const likeButtons = document.querySelectorAll('.element__like-button');

likeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('element__like-button_active');
  });
});
