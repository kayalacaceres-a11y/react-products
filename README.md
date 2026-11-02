Laboratorio: Práctica de Endpoints en Frontend con React







Descripción del Proyecto
Este proyecto corresponde al Laboratorio: Práctica de Endpoints en Frontend con React, desarrollado como parte de las actividades prácticas de la asignatura.

La aplicación consume el recurso products de la API pública DummyJSON, permitiendo trabajar con diferentes operaciones HTTP desde una interfaz desarrollada con React.

Durante la práctica se implementan funcionalidades de consulta, búsqueda, filtrado, paginación, creación, actualización y eliminación de productos.

El propósito principal es comprender cómo una aplicación frontend puede comunicarse con una API REST y gestionar información externa mediante endpoints.
Información del Estudiante
Campo	Información
Nombre(s)	Karina Lizzette
Apellido(s)	Ayala Cáceres
Correo Electrónico	ayalalizzette778@gmail.com
Asignatura	Desarrollo Web 2
Tutor	Vladimir Mate
Fecha de Entrega	1 de noviembre de 2026


Objetivo del Laboratorio
Desarrollar una aplicación en React que consuma endpoints REST de DummyJSON para gestionar productos mediante operaciones de consulta, búsqueda, filtrado, creación, actualización y eliminación.
Competencia
Implementa la integración de una API REST en React, organizando componentes, servicios y rutas para gestionar datos externos de forma estructurada y funcional.
Tecnologías Utilizadas
- React
- Vite
- JavaScript
- React Router
- CSS3
- Fetch API
- REST API
- DummyJSON
- Visual Studio 2026
- Node.js
- npm
API Utilizada
La aplicación utiliza la API pública:
https://dummyjson.com/products
Documentación:
https://dummyjson.com/docs/products
DummyJSON permite practicar el consumo de APIs REST sin necesidad de desarrollar un backend propio.
Estructura del Proyecto
react-products/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   └── ProductDetail.jsx
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── styles/
│   │   └── main.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
Funcionalidades Implementadas
- Mostrar productos
- Consultar producto por ID
- Buscar productos
- Filtrar productos por categoría
- Implementar paginación
- Crear productos
- Actualizar productos
- Eliminar productos
- Manejar estados de carga
- Manejar errores
- Navegar entre vistas utilizando React Router
Endpoints Utilizados
Operación	Método HTTP	Endpoint
Obtener productos	GET	/products
Obtener producto por ID	GET	/products/:id
Buscar productos	GET	/products/search?q=
Obtener categorías	GET	/products/categories
Productos por categoría	GET	/products/category/:category
Paginar productos	GET	/products?limit=&skip=
Crear producto	POST	/products/add
Actualizar producto	PUT	/products/:id
Eliminar producto	DELETE	/products/:id


Flujo de la Aplicación
Inicio
   ↓
Listado de Productos
   ↓
Buscar / Filtrar / Paginar
   ↓
Ver Detalle
   ↓
Crear / Actualizar / Eliminar
Consideración sobre DummyJSON
DummyJSON permite realizar operaciones POST, PUT y DELETE para fines de prueba.

Sin embargo, estas operaciones son simuladas y los cambios realizados no se almacenan permanentemente en el servidor.

Esto permite practicar el flujo completo de integración de una API REST desde React sin necesidad de desarrollar un backend propio.
Resultados Esperados
Al finalizar el laboratorio, el estudiante deberá ser capaz de:
- Consumir una API REST desde React.
- Utilizar diferentes métodos HTTP.
- Separar la lógica de acceso a datos mediante servicios.
- Mostrar información obtenida desde endpoints.
- Implementar búsqueda, filtros y paginación.
- Crear, actualizar y eliminar información desde la interfaz.
- Manejar estados de carga y posibles errores.
Observaciones
Durante la práctica instalé Node.js y configuré el proyecto con React y Vite. Tuve un inconveniente al ejecutar Vite porque Visual Studio mantenía bloqueados archivos temporales; lo solucioné cerrando el editor y reiniciando el servidor. También corregí la ubicación de los estilos CSS. Finalmente comprobé en el navegador la búsqueda, el detalle de productos, los filtros por categoría, la paginación y las operaciones de creación, edición y eliminación. Aprendí a organizar los componentes y a separar las consultas a la API en un archivo de servicios.
Licencia
Proyecto desarrollado con fines académicos para prácticas de laboratorio.
