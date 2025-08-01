# 📸 Proyecto Sprint 10: Alrededor de los EE.UU.

Este proyecto representa una galería interactiva de fotografías con diseño responsivo, iniciada en el Sprint 7 del bootcamp de desarrollo web de TripleTen. En el Sprint 10 se refactorizó completamente el código JavaScript para seguir principios de programación orientada a objetos (POO) y modularización, mejorando la organización y mantenibilidad del proyecto.

---

## 🔗 Vista en vivo

👉 [Ver el proyecto en GitHub Pages](https://ea0627.github.io/web_project_around/)

---

## ⚙️ Funcionalidades implementadas

✏️ Editar perfil del usuario con validación de campos (nombre y ocupación).
➕ Agregar nuevas tarjetas (título + URL), con validación y reinicio del formulario.
✅ Validación en tiempo real usando clases reutilizables (FormValidator.js).
🔒 Botón de envío desactivado hasta que los campos sean válidos.
🖼️ Vista ampliada de imágenes al hacer clic.
🗑️ Eliminar tarjetas individuales.
❤️ Marcar tarjetas como favoritas ("me gusta").
❌ Cerrar ventanas emergentes (popups) con tecla Esc, clic en el fondo o en el ícono de cerrar.
♻️ Reset automático de errores y botones al abrir cada formulario.
🧩 Modularización del JS:
    card.js: clase para creación y comportamiento de tarjetas.
    FormValidator.js: clase para validación de formularios.
    utils.js: funciones para manejo general de popups.
    constants.js: datos y configuración reutilizable.
    index.js: lógica principal.

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
├── blocks/             # CSS organizado por bloques BEM
├── images/             # Recursos gráficos
├── pages/              # CSS principal
├── scripts/
│   ├── card.js         # Clase Card
│   ├── formvalidator.js# Clase FormValidator
│   ├── utils.js        # Funciones de ayuda
│   ├── constants.js    # Datos reutilizables
│   └── index.js        # Lógica principal
├── index.html          # Archivo HTML principal
└── README.md
```

---

## 📸 Captura de pantalla

![Vista previa](./images/screenshot.png)

---

## 👨‍💻 Autor

**Eduardo Amaya**  
Desarrollador Web Junior  
Bootcamp TripleTen – Sprint 10  

📬 eduardo.amaya627@gmail.com  
🔗 [GitHub @ea0627](https://github.com/ea0627)

---

## 📌 Notas adicionales

- El sitio fue desplegado desde la rama `main` usando GitHub Pages.
- Todas las rutas fueron ajustadas para funcionar correctamente en producción.
- Se planea agregar mejoras como validación de formularios o almacenamiento local.

---

> Gracias por visitar este proyecto. ¡Seguimos creciendo con código! 💻✨