# 🎥 VideoDigest — Full-Stack Video Management & Summarizer

**VideoDigest** es una plataforma web full-stack diseñada para centralizar, gestionar y resumir contenido de video de plataformas externas. El proyecto implementa una arquitectura desacoplada moderna, utilizando **Next.js 16** para una experiencia de usuario ultra rápida en el cliente y **Strapi v5** como motor de gestión de contenidos y datos en el backend.

---

## 🛠️ Stack Tecnológico

### Frontend (Presentación y UI)
* **Framework:** Next.js 16 (App Router)
* **Estilos:** Tailwind CSS (Diseño interactivo, responsivo y minimalista)
* **Gestión de Datos:** Fetching optimizado mediante componentes del servidor (RSC).

### Backend (Headless CMS & API)
* **Framework:** Strapi v5
* **Base de Datos:** SQLite (`better-sqlite3` integrado para desarrollo local rápido)
* **Gestor de Paquetes:** PNPM (Instalación estricta y eficiente)

---

## 💡 Características Clave & Aprendizajes

Este repositorio consolida las mejores prácticas de la comunidad (siguiendo las bases de **Midudev**) y las extiende hacia un entorno de producción real:

* **Arquitectura Headless (Decoupled):** Separación absoluta entre la lógica de negocio/datos (Strapi) y la interfaz de usuario (Next.js), garantizando modularidad y escalabilidad.
* **Consumo de APIs robusto:** Implementación de servicios de fetching nativos con manejo avanzado de errores de red en entornos locales (control de excepciones comunes como `ECONNREFUSED` y tipado estricto).
* **Modelado de Contenido Relacional:** Configuración de esquemas de datos optimizados en Strapi v5 para conectar usuarios, colecciones, metadatos de videos y sus respectivos bloques de notas o resúmenes.
* **UI Enfocada en el Rendimiento:** Diseño limpio y de alto contraste priorizando la legibilidad de textos largos y la velocidad de carga inicial (Core Web Vitals).

---

## 📁 Estructura del Proyecto

```text
├── frontend/     # Aplicación Next.js 16 (Componentes, Rutas, Servicios)
└── backend/      # API de Strapi v5 (Esquemas, Controladores, Base de Datos)