
# Segunda pre-entrega - CoderHouse - Backend

Alumno: Daniel Diaz

Comisión: 70020

Docente: Luis Alejandro Mera

Tutores: Abigail Salas, Alexis Coronel

# Descripción del proyecto

Este proyecto es un servidor básico de e-commerce que permite gestionar productos y carritos de compra. Está desarrollado utilizando Node.js y Express.

## Instalación

1. Clonar el repositorio:

```sh
git clone https://github.com/Dragunovich1/2-pre-entrega-daniel-diaz-backend
cd 2-pre-entrega-daniel-diaz-backend
```

2. Instalar las dependencias:

```sh
npm install
```

## Ejecución del Servidor

### Modo Desarrollo

Para ejecutar el servidor en modo desarrollo (con reinicio automático):

```sh
npm run dev
```

### Modo Producción

Para ejecutar el servidor en modo producción:

```sh
npm start
```

El servidor estará corriendo en `http://localhost:8080`.

## Vistas

#### home.handlebars

- **URL**: `http://localhost:8080`
- **Método**: `GET`
- **Descripción**: se observa la vista `home.handlebars`, muestra la lista de productos.

#### realTimeProducts.handlebars

- **URL**: `http://localhost:8080/realtimeproducts`
- **Método**: `GET, POST, DELETE`
- **Descripción**: Muestra una lista de productos que se actualizará en tiempo real, debajo un formulario que trabaja mediante socket emits, al enviar el formulario, se realiza una solicitud POST al servidor, al eliminar un producto de la lista, se hace una solicitud DELETE al servidor. Cuando el servidor emite el evento update-products, el cliente recibe la lista actualizada de productos y actualiza el DOM para reflejar los cambios en tiempo real

## Estructura del Proyecto

```plaintext
2-pre-entrega-daniel-diaz-backend/
├── app.js
├── controllers/
│   ├── productController.js
│   └── cartController.js
├── data/
│   ├── products.json
│   └── carts.json
├── routes/
│   ├── productRoutes.js
│   └── cartRoutes.js
├── views/
│	│	├── layouts/
│   │	└── main.handlebars
│	├── home.handlebars
│	└── realTimeProducts.handlebars
├── package.json
├── package-lock.json

```

## Instrucciones de uso

- Instalar dependencias `npm install`
- Ejecutar el servidor `npm run dev`
- Ingresar a `http://localhost:8080` para ver la lista de productos
- Ingresar a `http://localhost:8080/realtimeproducts` para agregar/eliminar productos y ver los cambios de la lista en tiempo real