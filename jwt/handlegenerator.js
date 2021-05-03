let jwt = require("jsonwebtoken");
let config = require("./config");
var bcrypt = require("bcryptjs");
var [insertUser, getUserByName] = require("./controller/users");
var [insertProduct, getProducts, updateProd] = require("./controller/product");
// Clase encargada de la creación del token
class HandlerGenerator {

  async register(req, res) {
    let usernameBody = req.body.username;
    let passwordBody = req.body.password;
    /* Roles:
    GET: Tiene permitido solo ver la lista de productos
    CREATE: Tiene permitido solo crear un producto
    ALL: Tiene permitido crear, ver y actualizar los productos
    */
    let roles = req.body.roles;

    if (usernameBody && passwordBody) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(passwordBody, salt);



      let jsonInsert = {
        username: usernameBody,
        password: hash,
        roles: roles
      };

      const user = await insertUser(jsonInsert);
        res.json({
          success: true,
          message: "User registered",
          response: user,
        });
    } else {
      res.send(400).json({
        success: false,
        message: "Registration failed! Please check the request",
      });
    }
  }

  async login(req, res) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;

    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    const user = await getUserByName(username);
    
    let dbUsername = user.username;
    let dbPasswordHash = user.password;
    let roles = user.roles;


    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if (username && password) {
      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      if (username === dbUsername && bcrypt.compareSync(password, dbPasswordHash)) {
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign({ username: username, password:dbPasswordHash, roles:roles }, config.secret, {
          expiresIn: "24h",
        });

        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        res.json({
          success: true,
          message: "Authentication successful!",
          token: token,
        });
      } else {
        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
        res.send(403).json({
          success: false,
          message: "Incorrect username or password",
        });
      }
    } else {
      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send(400).json({
        success: false,
        message: "Authentication failed! Please check the request",
      });
    }
  }

  index(req, res) {
    // Retorna una respuesta exitosa con previa validación del token
    res.json({
      success: true,
      message: "Index page",
    });
  }
  async createProduct(req, res){
    let payload = req.decoded;
    let role = payload.roles;
    let product = req.body;

    if(role.includes('CREATE') || role.includes('ALL')){
      const newProduct = await insertProduct(product);
      res.json({
        success: true,
        message:'Product added correctly',
        response: newProduct
      });
    }
    else{
      res.status(401).send({
        success: false,
        message: "Not authorize to access this content",
      });
    }
  }
  async updateProduct(req, res) {
    let payload = req.decoded;
    let role = payload.roles;
    let update = req.body;

    if(role.includes('ALL')){
      const updateProduct = await updateProd(update, req.params.id);
      if(updateProduct.result.n===0){
        return res.status(404).send("The product with the given ID was not found.");
      }
      res.json({
        success: true,
        message: 'Product updated correctly',
        response: updateProduct
      });
    }
    else{
      res.status(401).send({
        success: false,
        message: "Not authorize to access this content",
      });
    }
  }
  async getProducts(req, res){
    let payload = req.decoded;
    let role = payload.roles;
    if(role.includes('GET') || role.includes('ALL')){

      const products = await getProducts();
      res.json({
        success: true,
        products: products
      });
    }
    else{
      res.status(401).send({
        success: false,
        message: "Not authorize to access this content",
      });
    }
  }
} 

module.exports = HandlerGenerator;
