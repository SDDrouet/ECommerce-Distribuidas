# ECommers-Distribuidas


# API de Prueba - Microservicio de Inventario

## Endpoints Disponibles

### Obtener todos los productos
**GET** `/products`

**Respuesta**:

```json
[
  {
    "id": "1",
    "name": "Producto A",
    "description": "Descripción del producto A",
    "stock": 10,
    "price": 100.0,
    "imageBase64": "base64string"
  }
]
```

### Obtener un producto por ID
**GET** `/products/{id}`

**Ejemplo de solicitud**:

```
GET /products/1
```

**Respuesta**:

```json
{
  "id": "1",
  "name": "Producto A",
  "description": "Descripción del producto A",
  "stock": 10,
  "price": 100.0,
  "imageBase64": "base64string"
}
```

### Crear un nuevo producto
**POST** `/products`

**Cuerpo de la solicitud**:

```json
{
  "name": "Producto B",
  "description": "Descripción del producto B",
  "stock": 20,
  "price": 150.5,
  "imageBase64": "base64string"
}
```

**Respuesta**:

- **201 Created**: Producto creado correctamente.

```json
{
  "id": "2",
  "name": "Producto B",
  "description": "Descripción del producto B",
  "stock": 20,
  "price": 150.5,
  "imageBase64": "base64string"
}
```

### Actualizar un producto
**PUT** `/products/{id}`

**Cuerpo de la solicitud**:

```json
{
  "name": "Producto B actualizado",
  "description": "Nueva descripción",
  "stock": 30,
  "price": 180.0,
  "imageBase64": "newBase64string"
}
```

**Respuesta**:

- **200 OK**: Producto actualizado correctamente.

```json
{
  "id": "2",
  "name": "Producto B actualizado",
  "description": "Nueva descripción",
  "stock": 30,
  "price": 180.0,
  "imageBase64": "newBase64string"
}
```

### Eliminar un producto
**DELETE** `/products/{id}`

**Ejemplo de solicitud**:

```
DELETE /products/2
```

**Respuesta**:

- **200 OK**: Producto eliminado correctamente.

```json
true
```

### Actualizar stock de un producto
**PUT** `/products/{id}/stock`

**Ejemplo de solicitud**:

```
PUT /products/id-producrto/stock
```

Parametros:
- quantity = 4

**Respuesta**:

- **200 OK**: Producto actualizado correctamente.

```json
true
```

### Verificar stock de un producto
**GET** `/products/{id}/stock/{quantity}`

**Ejemplo de solicitud**:

```
GET /products/id-producrto/stock/4
```


**Respuesta**:

- **200 OK**: Producto tiene stock.

```json
{
  "id": "2",
  "name": "Producto B actualizado",
  "description": "Nueva descripción",
  "stock": 30,
  "price": 180.0,
  "imageBase64": "newBase64string"
}
```


# Microservicio de Pedidos - API

Este microservicio expone los endpoints necesarios para gestionar los pedidos. Los siguientes endpoints están disponibles para interactuar con el sistema de pedidos:

## Endpoints

### 1. Obtener todos los pedidos

**Método**: `GET`  
**URL**: `/orders`  
**Descripción**: Obtiene todos los pedidos registrados en el sistema.

**Respuesta Exitosa**:
- **Código de Estado**: `200 OK`
- **Cuerpo**: Lista de objetos `Order`

**Ejemplo de respuesta**:
```json
[
    {
        "id": "1",
        "user": {
            "id": "u1",
            "username": "usuario1"
        },
        "address": "Calle Falsa 123",
        "orderDetails": [
            {
                "product": {
                    "id": "p1",
                    "name": "Producto A",
                    "description": "Descripción del Producto A",
                    "price": 100.0
                },
                "quantity": 2,
                "subtotal": 200.0,
                "tax": 30.0,
                "total": 230.0
            }
        ],
        "subTotalCost": 200.0,
        "totalCost": 230.0
    }
]
```

### 2. Obtener pedido por ID

**Método**: `GET`  
**URL**: `/orders/{id}`  
**Descripción**: Obtiene los detalles de un pedido específico por su ID.

**Parámetros**:
- `{id}`: ID del pedido.

**Respuesta Exitosa**:
- **Código de Estado**: `200 OK`
- **Cuerpo**: Objeto `Order`

**Respuesta de Error**:
- **Código de Estado**: `404 NOT FOUND`
- **Cuerpo**: Mensaje de error indicando que no se encontró el pedido con el ID proporcionado.

**Ejemplo de respuesta de error**:
```json
{
    "message": "Pedido con ID 1 no encontrado"
}
```

### 3. Crear un nuevo pedido

**Método**: `POST`  
**URL**: `/orders`  
**Descripción**: Crea un nuevo pedido en el sistema.

**Cuerpo de la Solicitud**:
```json
{
    "user": {
        "id": "u1",
        "username": "usuario1"
    },
    "address": "Calle Falsa 123",
    "orderDetails": [
        {
            "product": {
                "id": "p1",
                "name": "Producto A",
                "description": "Descripción del Producto A",
                "price": 100.0
            },
            "quantity": 2,
            "subtotal": 200.0,
            "tax": 30.0,
            "total": 230.0
        }
    ],
    "subTotalCost": 200.0,
    "totalCost": 230.0
}
```

**Respuesta Exitosa**:
- **Código de Estado**: `201 CREATED`
- **Cuerpo**: Objeto `Order` recién creado.

**Respuesta de Error**:
- **Código de Estado**: `400 BAD REQUEST`
- **Cuerpo**: Mensaje de error con detalles del motivo del fallo.

### 4. Eliminar un pedido

**Método**: `DELETE`  
**URL**: `/orders/{id}`  
**Descripción**: Elimina un pedido del sistema.

**Parámetros**:
- `{id}`: ID del pedido a eliminar.

**Respuesta Exitosa**:
- **Código de Estado**: `204 NO CONTENT`
- **Cuerpo**: Mensaje indicando que el pedido fue eliminado correctamente.

**Respuesta de Error**:
- **Código de Estado**: `404 NOT FOUND`
- **Cuerpo**: Mensaje de error indicando que no se encontró el pedido con el ID proporcionado.

## Estructura de Datos

### Order
```json
{
    "id": "1",
    "user": {
        "id": "u1",
        "username": "usuario1"
    },
    "address": "Calle Falsa 123",
    "orderDetails": [
        {
            "product": {
                "id": "p1",
                "name": "Producto A",
                "description": "Descripción del Producto A",
                "price": 100.0
            },
            "quantity": 2,
            "subtotal": 200.0,
            "tax": 30.0,
            "total": 230.0
        }
    ],
    "subTotalCost": 200.0,
    "totalCost": 230.0
}
```

### OrderDetail
```json
{
    "product": {
        "id": "p1",
        "name": "Producto A",
        "description": "Descripción del Producto A",
        "price": 100.0
    },
    "quantity": 2,
    "subtotal": 200.0,
    "tax": 30.0,
    "total": 230.0
}
```

### Product
```json
{
    "id": "p1",
    "name": "Producto A",
    "description": "Descripción del Producto A",
    "price": 100.0
}
```

### User
```json
{
    "id": "u1",
    "username": "usuario1"
}
```

# Proyecto de Aplicación de Usuarios

## Endpoints Disponibles

### Registro de Usuario

**POST /users/register**

Registra un nuevo usuario. Recibe un objeto JSON con los siguientes campos:

**Cuerpo de la solicitud**:

```json
{
  "username": "john_doe",
  "password": "password123",
  "role": "admin"
}
```

**Respuesta**:

- **201 Created**: Usuario registrado correctamente.

```json
{
  "id": "60d21b4667d0d8992e610c85",
  "username": "john_doe",
  "password": "$2a$10$E9IuX63eA1Yb55z5GrhYl.Zw7khPbmu7cxGp99f9qPToT7J9w2BYq", 
  "role": "admin"
}
```

- **400 Bad Request**: El usuario ya existe o los datos no son válidos.

```json
{
  "error": "Usuario ya existe"
}
```

### Inicio de Sesión

**POST /users/login**

Inicia sesión con el nombre de usuario y la contraseña. Se pasan como parámetros de consulta `username` y `password`.

**Ejemplo de solicitud**:

```
POST /users/login?username=john_doe&password=password123
```

**Respuesta**:

- **200 OK**: Usuario autenticado correctamente.

```json
{
  "id": "60d21b4667d0d8992e610c85",
  "username": "john_doe",
  "role": "admin"
}
```

- **401 Unauthorized**: Usuario o contraseña incorrectos.

```json
{
  "error": "Usuario o contraseña incorrectos"
}
```

### Obtener Todos los Usuarios

**GET /users**

Obtiene todos los usuarios registrados.

**Respuesta**:

- **200 OK**: Devuelve una lista de todos los usuarios.

```json
[
  {
    "id": "60d21b4667d0d8992e610c85",
    "username": "john_doe",
    "password": "$2a$10$E9IuX63eA1Yb55z5GrhYl.Zw7khPbmu7cxGp99f9qPToT7J9w2BYq", 
    "role": "admin"
  },
  {
    "id": "60d21b4667d0d8992e610c86",
    "username": "jane_doe",
    "password": "$2a$10$E9IuX63eA1Yb55z5GrhYl.Zw7khPbmu7cxGp99f9qPToT7J9w2BYq", 
    "role": "user"
  }
]
```

### Obtener Usuario por ID

**GET /users/{id}**

Obtiene un usuario por su `id`.

**Ejemplo de solicitud**:

```
GET /api/users/60d21b4667d0d8992e610c85
```

**Respuesta**:

- **200 OK**: Devuelve el usuario encontrado.

```json
{
  "id": "60d21b4667d0d8992e610c85",
  "username": "john_doe",
  "password": "$2a$10$E9IuX63eA1Yb55z5GrhYl.Zw7khPbmu7cxGp99f9qPToT7J9w2BYq", 
  "role": "admin"
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "error": "Usuario no encontrado"
}
```

### Actualizar Usuario

**PUT /users/{id}**

Actualiza un usuario existente, proporcionando el `id` y un objeto JSON con los campos a actualizar.

**Cuerpo de la solicitud**:

```json
{
  "username": "john_doe_updated",
  "password": "new_password123",
  "role": "user"
}
```

**Respuesta**:

- **200 OK**: Usuario actualizado correctamente.

```json
{
  "id": "60d21b4667d0d8992e610c85",
  "username": "john_doe_updated",
  "password": "$2a$10$E9IuX63eA1Yb55z5GrhYl.Zw7khPbmu7cxGp99f9qPToT7J9w2BYq", 
  "role": "user"
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "error": "Usuario no encontrado"
}
```

### Eliminar Usuario

**DELETE /users/{id}**

Elimina un usuario por su `id`.

**Ejemplo de solicitud**:

```
DELETE /users/60d21b4667d0d8992e610c85
```

**Respuesta**:

- **200 ok**: Usuario eliminado correctamente.

```json
{}
```
