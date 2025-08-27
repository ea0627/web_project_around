# 📸 Proyecto Sprint 11: Alrededor de los EE.UU.

Este proyecto representa una galería interactiva de fotografías con diseño responsivo, iniciada en el Sprint 7 del bootcamp de desarrollo web de TripleTen.  
En el Sprint 11 se refactorizó completamente el código JavaScript para seguir principios de **programación orientada a objetos (POO)** y **modularización**, mejorando la organización, escalabilidad y mantenibilidad del proyecto.

---

## 🔗 Vista en vivo

👉 [Ver el proyecto en GitHub Pages](https://ea0627.github.io/web_project_around/)

---

## ⚙️ Funcionalidades implementadas

✏️ **Editar perfil del usuario** con validación de campos (nombre y ocupación).

➕ **Agregar nuevas tarjetas** (título + URL), con validación y reinicio del formulario.

✅ **Validación en tiempo real** usando clases reutilizables (`FormValidator.js`).

🔒 **Botón de envío desactivado** hasta que los campos sean válidos.

🖼️ **Vista ampliada de imágenes** al hacer clic (con `PopupWithImage`).

🗑️ **Eliminar tarjetas individuales**.

❤️ **Marcar tarjetas como favoritas** ("me gusta").

❌ **Cerrar ventanas emergentes (popups)** con tecla Esc, clic en el fondo o en el ícono de cerrar.

♻️ **Reset automático** de errores y botones al abrir cada formulario.

🧩 **Arquitectura orientada a objetos y modularización del JS**:
- `Card.js`: clase para creación y comportamiento de tarjetas (like, delete, abrir imagen).
- `FormValidator.js`: clase para validación de formularios.
- `UserInfo.js`: clase para obtener y actualizar la información del perfil.
- `Section.js`: clase genérica para renderizar listas de elementos.
- `Popup.js`: clase base para manejar popups.
- `PopupWithForm.js`: clase hija de `Popup` para formularios (editar perfil y añadir tarjeta).
- `PopupWithImage.js`: clase hija de `Popup` para mostrar imágenes ampliadas.
- `Constants.js`: datos iniciales y configuración.
- `index.js`: instancia y conexión de todas las clases.

---

## 🛠️ Tecnologías usadas

- HTML5 + CSS3
- JavaScript (ES6+)
- Responsive Design con Media Queries
- BEM (Block Element Modifier)
- Git + GitHub Pages
- Programación orientada a objetos (POO)
- Módulos ES (import / export)

---

## 📁 Estructura del Proyecto

```
web_project_around/
├── blocks/                         # CSS organizado por bloques BEM
├── images/                         # Recursos gráficos
├── pages/                          # CSS principal
├── scripts/
│ ├── components/                   # Clases modulares
│ │ ├── Card.js
│ │ ├── FormValidator.js
│ │ ├── UserInfo.js
│ │ ├── Section.js
│ │ ├── Popup.js
│ │ ├── PopupWithForm.js
│ │ └── PopupWithImage.js
│ ├── Constants.js                  # Datos reutilizables
│ └── index.js                      # Lógica principal
├── index.html                      # Archivo HTML principal
└── README.md
```

---

## 👨‍💻 Autor

**Eduardo Amaya**  
Desarrollador Web Junior  
Bootcamp TripleTen – Sprint 11  

📬 eduardo.amaya627@gmail.com  
🔗 [GitHub @ea0627](https://github.com/ea0627)

---

## 📌 Notas adicionales

- El sitio fue desplegado desde la rama `main` usando GitHub Pages.
- Todas las rutas fueron ajustadas para funcionar correctamente en producción.

---

> Gracias por visitar este proyecto. ¡Seguimos creciendo con código! 💻✨