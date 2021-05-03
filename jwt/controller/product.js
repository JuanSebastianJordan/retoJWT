const mdbconn = require("../lib/utils/mongo.js");
const ObjectID = require("mongodb").ObjectID;

const db = "retoJWT";
const clt = "products";

function insertProduct(user) {
  return mdbconn.conn().then((client) => {
    return client.db(db).collection(clt).insertOne(user);
  });
}
function getProducts(){
    return mdbconn.conn().then((client) => {
        return client.db(db).collection(clt).find({}).toArray();
    });
}

function updateProd(productUpdate, id){
    return mdbconn.conn().then((client) =>{
      return client.db(db).collection(clt).updateOne(
        { _id: new ObjectID(id) },
        { $set: productUpdate }
      )
    });
  }


module.exports = [insertProduct, getProducts, updateProd]