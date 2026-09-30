# Proyecto CRUD de Libros

Aplicación de backend desarrollada con **Node.js, TypeScript, MongoDB y Mongoose** para gestionar una colección de libros mediante comandos ejecutados desde la terminal.

## Tecnologías utilizadas

* Node.js
* TypeScript
* MongoDB
* Mongoose
* dotenv

## Base de datos

La aplicación utiliza:

* **Base de datos:** `biblioteca`
* **Colección:** `libros`

Cada libro contiene:

```text
titulo
autor
precio
stock
```

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
URI_DB=mongodb://localhost:27017/biblioteca
```

También se incluye un archivo `.env.example` como referencia.

## Estructura del proyecto

```text
proyecto-libros/
├── src/
│   └── index.ts
├── dist/
│   └── index.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

> La carpeta `dist` se genera automáticamente al ejecutar `npm run build`.

## Scripts disponibles

### Ejecutar en desarrollo

```bash
npm run dev
```

También se pueden pasar comandos:

```bash
npm run dev -- info
```

### Compilar TypeScript

```bash
npm run build
```

Esto genera los archivos JavaScript dentro de `dist`.

### Ejecutar la versión compilada

```bash
npm start
```

### Compilación automática

```bash
npm run watch
```

Este comando recompila el proyecto automáticamente cada vez que se modifica un archivo de TypeScript.

## Comandos CRUD

### Mostrar información de los comandos

```bash
npm run dev -- info
```

### Crear un libro

```bash
npm run dev -- create titulo="El Principito" autor="Antoine de Saint-Exupéry" precio=15000 stock=10
```

Otro ejemplo:

```bash
npm run dev -- create titulo="1984" autor="George Orwell" precio=18500 stock=12
```

### Mostrar todos los libros

```bash
npm run dev -- show
```

Este comando muestra el título y el ID de cada libro.

### Mostrar un libro por ID

```bash
npm run dev -- show ID
```

Ejemplo:

```bash
npm run dev -- show 68db1234567890abcdef1234
```

### Actualizar un libro

```bash
npm run dev -- update ID precio=20000 stock=20
```

También se pueden actualizar otros campos:

```bash
npm run dev -- update ID titulo="Nuevo titulo" autor="Nuevo autor"
```

### Eliminar un libro

```bash
npm run dev -- delete ID
```

Ejemplo:

```bash
npm run dev -- delete 68db1234567890abcdef1234
```

## Manejo de errores

La aplicación contempla algunos errores comunes:

* ID de MongoDB inválido:

```text
Invalid ID
```

* Libro inexistente:

```text
Book not found
```

* Creación sin título:

```text
Titulo is required
```

* Datos inválidos:

```text
Invalid data to create book
```

## Flujo de trabajo recomendado

Para trabajar con el proyecto:

```bash
npm install
npm run dev -- info
```

Crear algunos libros:

```bash
npm run dev -- create titulo="El Principito" autor="Antoine de Saint-Exupéry" precio=15000 stock=10
npm run dev -- create titulo="1984" autor="George Orwell" precio=18500 stock=12
```

Consultar:

```bash
npm run dev -- show
```

Actualizar utilizando el ID obtenido:

```bash
npm run dev -- update ID precio=20000 stock=20
```

Eliminar utilizando el ID:

```bash
npm run dev -- delete ID
```

## Build para producción

Para compilar el proyecto:

```bash
npm run build
```

Luego ejecutar la versión compilada:

```bash
npm start
```

## Autor

Proyecto realizado por Angel Gabriel Mattos.
