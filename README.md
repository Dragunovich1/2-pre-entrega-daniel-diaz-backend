
# Primera pre-entrega - CoderHouse - Backend

Alumno: Daniel Diaz

Comisión: 70020

Docente: Luis Alejandro Mera

Tutores: Abigail Salas, Alexis Coronel

# Descripción del proyecto

Este proyecto es un servidor básico de e-commerce que permite gestionar productos y carritos de compra. Está desarrollado utilizando Node.js y Express.

## Instalación

1. Clonar el repositorio:

```sh
git clone https://github.com/Dragunovich1/1-pre-entrega-daniel-diaz-backend
cd 1-pre-entrega-daniel-diaz-backend
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

## Endpoints

### Productos

#### Listar todos los productos

- **URL**: `/api/products`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todos los productos.

#### Obtener un producto por ID

- **URL**: `/api/products/:pid`
- **Método**: `GET`
- **Descripción**: Devuelve un producto específico por su ID.

#### Agregar un nuevo producto

- **URL**: `/api/products`
- **Método**: `POST`
- **Descripción**: Agrega un nuevo producto.
- **Body**:
  ```json
  {
    "title": "Nombre del Producto",
    "description": "Descripción del Producto",
    "code": "Código del Producto",
    "price": 100,
    "status": true,
    "stock": 50,
    "category": "Categoría del Producto",
    "thumbnails": ["ruta/imagen1.jpg", "ruta/imagen2.jpg"]
  }
  ```

#### Actualizar un producto

- **URL**: `/api/products/:pid`
- **Método**: `PUT`
- **Descripción**: Actualiza un producto existente por su ID.
- **Body**: (similar a la estructura del POST)

#### Eliminar un producto

- **URL**: `/api/products/:pid`
- **Método**: `DELETE`
- **Descripción**: Elimina un producto específico por su ID.

### Carritos

#### Crear un nuevo carrito

- **URL**: `/api/carts`
- **Método**: `POST`
- **Descripción**: Crea un nuevo carrito.

#### Listar productos de un carrito

- **URL**: `/api/carts/:cid`
- **Método**: `GET`
- **Descripción**: Devuelve los productos de un carrito específico por su ID.

#### Agregar producto a un carrito

- **URL**: `/api/carts/:cid/product/:pid`
- **Método**: `POST`
- **Descripción**: Agrega un producto al carrito especificado.
- **Body**:
  ```json
  {
    "quantity": 1
  }
  ```

## Pruebas

Utilizar [Postman](https://www.postman.com/) para probar los endpoints mencionados. Verificar que el servidor esté corriendo antes de realizar las pruebas.

### Ejemplo de Prueba

1. **GET** `/api/products` para listar todos los productos.
2. **POST** `/api/products` para agregar un nuevo producto.
3. **GET** `/api/products/:pid` para obtener un producto específico.
4. **PUT** `/api/products/:pid` para actualizar un producto.
5. **DELETE** `/api/products/:pid` para eliminar un producto.
6. **POST** `/api/carts` para crear un nuevo carrito.
7. **GET** `/api/carts/:cid` para listar productos de un carrito.
8. **POST** `/api/carts/:cid/product/:pid` para agregar un producto a un carrito.

## Estructura del Proyecto

```plaintext
1-pre-entrega-daniel-diaz-backend/
├── node_modules/
├── controllers/
│   ├── productController.js
│   └── cartController.js
├── routes/
│   ├── productRoutes.js
│   └── cartRoutes.js
├── data/
│   ├── products.json
│   └── carts.json
├── app.js
├── package.json
└── package-lock.json
```
