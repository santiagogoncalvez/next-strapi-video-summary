# 🎥 Video Summary Platform

Plataforma web para organizar, procesar y resumir contenido audiovisual mediante una interfaz moderna y un CMS desacoplado.

Desarrollada con **Next.js 16** y **Strapi v5**, permite gestionar vídeos, almacenar contenido estructurado y centralizar información para su posterior consulta y análisis.

---

## 🚀 Características

* Gestión centralizada de contenido mediante CMS Headless.
* Administración de vídeos y metadatos.
* Arquitectura desacoplada entre frontend y backend.
* Renderizado optimizado con Next.js App Router.
* Sistema escalable para futuras funcionalidades de procesamiento y resumen de contenido.
* Tipado estricto con TypeScript.

---

## 🛠️ Tecnologías

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

### Backend

* Strapi v5
* REST API

### Herramientas

* ESLint
* Prettier
* Git

---

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura desacoplada:

```
Next.js (Frontend)
│
▼
REST API
│
▼
Strapi CMS
```

Esto permite administrar el contenido desde Strapi mientras el frontend consume los datos de forma independiente.

---

## 📂 Estructura del proyecto

```
src/
├─ app/
├─ components/
├─ lib/
├─ services/
├─ types/
└─ utils/
```

---

## 🎯 Objetivos del proyecto

* Explorar arquitecturas modernas con Next.js App Router.
* Integrar un CMS Headless en una aplicación real.
* Construir una base escalable para procesamiento y organización de contenido audiovisual.
* Aplicar buenas prácticas de tipado, estructura y mantenibilidad.

---

## 📸 Estado

Proyecto en desarrollo activo.

Nuevas funcionalidades y mejoras continúan incorporándose de forma iterativa.
