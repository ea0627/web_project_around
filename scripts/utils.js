// utils.js

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) closePopup(openedPopup);
  }
}

// Función de utilidad para cerrar al hacer clic en el overlay
export function setPopupOverlayClose(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
}