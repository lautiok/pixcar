# Pixcar - Backend

Pixcar es un software de gestión para concesionarias de autos usados. Este backend está desarrollado en **TypeScript** utilizando **Express** como framework y **MongoDB** como base de datos. Ofrece funcionalidades esenciales para la gestión de inventarios, usuarios, autenticación y operaciones comerciales de una concesionaria.

## Características

- **Gestión de inventario**: Manejo de autos disponibles, en la concesionaria.
- **Gestión de usuarios**: Roles y autenticación de usuarios (administradores y empleados).
- **Documentación interactiva de API**: Implementada con Swagger UI en la ruta `/documentation`.
- **Tecnologías modernas**: TypeScript, MongoDB y herramientas para una experiencia de desarrollo óptima.

## Tecnologías

- **Node.js**: Entorno de ejecución.
- **Express**: Framework web.
- **MongoDB**: Base de datos NoSQL.
- **TypeScript**: Tipado estático para un código más robusto.
- **Swagger UI**: Para la documentación de la API.
- **Zod**: Validación de datos.

## Requisitos previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Una instancia de **MongoDB** en funcionamiento.


## Installation

1. Clona el repositorio:

```bash
  git clone https://github.com/tu-usuario/pixcar-backend.git
  cd pixcar-backend
```
2. Instala las dependencias:
```bash
  npm install
```
3. Crea un archivo .env en la raíz del proyecto con las siguientes variables:
```bash
PORT=8080
MONGO_URI= mongodb+srv://username+pasasword@cluster0.eccud.mongodb.net/
JWT_SECRET=tuclavesecreta
URL_FRONTEND=http://localhost:3000 
```
4. Compila el proyecto:

```bash
npm run tsc
```
5. Inicia el servidor en modo desarrollo:
 ```bash
npm run dev
```
O en modo producción:
```bash
npm start
```
# Uso 
Accede a la documentación completa de la API en la ruta:
```bash
http://localhost:3000/documentation
```
