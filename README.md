# retoJWT

## Explicación de la solución
### Primera parte del reto
La aplicación usa una base de datos mongo para persistir la informacion de usuarios y posteriormente veremos que tambien productos.
Para la primera parte del reto de persistir la informacion de los usuarios y guardar las contraseñas de forma segura se realizo un servicio de
registro para crear los usuarios y guardarlos en la base de datos. Para hacer esto usamos mongo como se dijo anteriormente. Para guardar la 
contraseña cifrada se uso la libreria de bcryptjs la cual nos permite calcular el hash de una cadena de caracteres. Con lo anterior se guarda el 
hash de la contraseña como se puede ver si se ingresa a la base de datos. Cuando se usa el endpoint del login se modifico para que compare la contraseña
en texto que provee el usuario con el hash que esta en la base de datos con la ayuda del metodo compareSync() de la libreria bcriptjs.
### Segunda parte del reto
Para implementar roles en la solucion se modifico el registrar para que en el body de la peticion post llegara tambien el rol del usuario. En la aplicación
hay 3 roles: GET, CREATE, ALL. Cada uno de estos roles tiene acceso o permiso a diferentes acciones dentro de la aplicacion. Para demostrar los roles se
creo una nueva entidad que se llama producto que se guarda en la base datos mongo. El rol get solo tiene acceso al listar de dichos productos, el rol
CREATE solo tiene acceso a crear productos y el rol ALL tienen acceso a todas las funcionalidades (crear, ver lista y actualizar un producto). El producto 
consta de nombre y descripcion. Para realizar lo anterior se agregar 3 endpoints los cuales corresponeden a los servicios antes mencionados (crear, get all y update).
Ademas, se modifico el middleware.js para que dentro del payload del token se añadiera la contraseña y los roles del usuario para tener acceso a los roles desde
handlegenerator.js. Una vez hecho lo anterior se agrego los metodos respectivos para crear, actualizar y getAll restringiendo su acceso gracias a los roles.
### Uso de la aplicacion
1. Clonar el repositorio
2. Entrar a la carpeta jwt y realizar npm install
3. Ejecutar npm start

En la base datos se encuentran 3 usuarios con los 3 diferentes roles:
#### Usuario1:
username: user1

password: user1pass

roles: [GET]

#### Usuario2:

username: user2

password: user2pass

roles: [CREATE]

#### Usuario3:

username: user3

password: user3pass

roles: [ALL]

Con estos usuarios se puede realizar el login y probar los diferentes endpoints de la aplicacion. O puede crear nuevos y usar la nueva informacion. 
Recordar que al hacer login este retorna el token y este debe ser puesto en los headers de authentication de la peticion en Postman como un Bearer token
para que se pueda usar las funcionalidades de la aplicacion. 
En la carpeta postman esta la coleccion donde estan los diferentes endpoints de la aplicacion.

