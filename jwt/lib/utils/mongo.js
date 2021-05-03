const MongoClient = require("mongodb").MongoClient;
const uri = process.env.mongourl;


let connection;
function MongoUtils() {
  const mu = {};
  // Esta función retorna una nueva conexión a MongoDB.
  // Tenga presente que es una promesa que deberá ser resuelta.
  mu.connect = () => {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connect");
     connection = client.connect();
  };

  mu.conn = () => {
    return connection;
  }
  return mu;
}

module.exports = MongoUtils();