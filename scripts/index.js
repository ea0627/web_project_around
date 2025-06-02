// Selección de elementos
const popup = document.querySelector('.popup_type_edit-profile');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');

// Funciones
function openPopup() {
  popup.style.display = 'flex';
}

function closePopup() {
  popup.style.display = 'none';
}

// Eventos
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
