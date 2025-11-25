# 📝 Sistema de Gestión de Tareas – Extensión de Google Chrome

Plugin desarrollado en React + Firebase

Este proyecto corresponde al **Proyecto Integrador** de la ETITC para la Tecnología en Desarrollo de Software.  
Consiste en una **extensión para Google Chrome** que permite gestionar tareas de manera rápida y accesible directamente desde el navegador.

El sistema está desarrollado usando **React**, **JavaScript**, **Firebase**, HTML y CSS, integrando autenticación con Google y almacenamiento seguro de datos.

---

## 🚀 Características principales

- ✔ Crear, editar y eliminar tareas
- ✔ Clasificación por estados (pendiente, en progreso, completado)
- ✔ Interfaz tipo **Kanban** intuitiva
- ✔ Autenticación con Google (Firebase Auth)
- ✔ Sincronización en tiempo real con Firestore
- ✔ Extensión ligera integrada en Chrome
- ✔ UI moderna con React
- ✔ Persistencia de datos personalizada por usuario

---

## 🛠️ Tecnologías utilizadas

| Tecnología                | Propósito                                       |
| ------------------------- | ----------------------------------------------- |
| **React**                 | Construcción de la interfaz y manejo del estado |
| **JavaScript**            | Lógica funcional del sistema                    |
| **HTML / CSS**            | Maquetación y estilos del plugin                |
| **Firebase Auth**         | Inicio de sesión con Google                     |
| **Firebase Firestore**    | Almacenamiento y sincronización de tareas       |
| **Chrome Extensions API** | Integración directa con Chrome                  |
| **GitHub**                | Control de versiones                            |

---

## 🧩 Funcionalidades detalladas

### 🔐 Autenticación

El usuario inicia sesión con su cuenta de Google.  
Firebase gestiona la sesión y carga solo las tareas asociadas a ese usuario.

### 🗂️ Gestión de tareas

- Crear nuevas tareas
- Editar o eliminar
- Cambiar de estado arrastrando (Kanban)
- Actualización en tiempo real gracias a Firestore

### 🌐 Extensión de Chrome

Al cargar el build, la interfaz aparece directamente como extensión del navegador, sin abrir otras aplicaciones.

---

## 🧪 Pruebas y resultados

Durante las pruebas se destacó:

- Buen rendimiento incluso con múltiples tareas
- Interfaz intuitiva y fluida
- Accesibilidad directa desde Chrome
- Sincronización estable mediante Firebase
- Buena aceptación en pruebas de usabilidad
