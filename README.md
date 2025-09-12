# 📸 Proyecto Sprint 12: Alrededor de los EE.UU.

Este proyecto representa una galería interactiva de fotografías con diseño responsivo, iniciada en el Sprint 7 del bootcamp de desarrollo web de TripleTen.
En el Sprint 12 se conectó el proyecto a un servidor real mediante API REST, logrando que el sitio cobre vida con datos dinámicos.

---

## 🔗 Vista en vivo

👉 [Ver el proyecto en GitHub Pages](https://ea0627.github.io/web_project_around/)

---

## ⚙️ Funcionalidades implementadas

👤 Carga de usuario desde el servidor (GET /users/me).
✏️ Editar perfil del usuario con persistencia en el servidor (PATCH /users/me).
🖼️ Actualizar foto de perfil con validación de URL (PATCH /users/me/avatar).

🗂️ Carga inicial de tarjetas desde el servidor (GET /cards).
➕ Agregar nuevas tarjetas con título + URL, guardadas en el backend (POST /cards).
❤️ Dar y quitar "me gusta" sincronizado con el servidor (PUT/DELETE /cards/:id/likes).
🗑️ Eliminar tarjetas propias con confirmación previa (DELETE /cards/:id).

✅ Validación en tiempo real usando clases reutilizables (FormValidator.js).
🔒 Botones de envío desactivados hasta que los campos sean válidos.
♻️ Estados de carga en botones de formularios: "Guardando…", "Creando…", "Eliminando…".
❌ Cerrar popups con tecla Esc, clic en el fondo o en el botón de cerrar.

🧩 **Arquitectura orientada a objetos y modularización del JS**:
Api.js: centraliza todas las solicitudes al servidor.
Card.js: creación y comportamiento de tarjetas (like, delete, abrir imagen).
FormValidator.js: validación de formularios.
UserInfo.js: gestión de datos del usuario (nombre, ocupación, avatar).
Section.js: renderizado genérico de listas de elementos.
Popup.js: clase base para manejar popups.
PopupWithForm.js: formularios (perfil, tarjeta, avatar).
PopupWithImage.js: mostrar imágenes ampliadas.
PopupWithConfirmation.js: popup de confirmación para eliminar.
Constants.js: configuración de validación y selectores.
index.js: orquestación de todas las clases.

---

## 🛠️ Tecnologías usadas

- HTML5 + CSS3
- JavaScript (ES6+)
- Responsive Design con Media Queries
- BEM (Block Element Modifier)
- Git + GitHub Pages
- Programación orientada a objetos (POO)
- Módulos ES (import / export)
- API REST (fetch + headers + JSON)

---

## 📁 Estructura del Proyecto

```
web_project_around/
├── blocks/                         # CSS organizado por bloques BEM
├── images/                         # Recursos gráficos
├── pages/                          # CSS principal
├── scripts/
│ ├── components/                   # Clases modulares
│ │ ├── Api.js
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
Bootcamp TripleTen – Sprint 12  

📬 eduardo.amaya627@gmail.com  
🔗 [GitHub @ea0627](https://github.com/ea0627)

---

## 📌 Notas adicionales

El sitio fue desplegado desde la rama main usando GitHub Pages.

Todas las rutas y recursos fueron ajustados para funcionar en producción.

Token de API almacenado de forma segura en el cliente para pruebas educativas.

---

> Gracias por visitar este proyecto. ¡Seguimos creciendo con código! 💻✨