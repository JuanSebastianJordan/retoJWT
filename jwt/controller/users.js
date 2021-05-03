const mdbconn = require("../lib/utils/mongo.js");
const ObjectID = require("mongodb").ObjectID;

const db = "retoJWT";
const clt = "users";

function insertUser(user) {
  return mdbconn.conn().then((client) => {
    return client.db(db).collection(clt).insertOne(user);
  });
}
function getUserByName(name){
    return mdbconn.conn().then((client) => {
      return client.db(db).collection(clt).findOne({ username: name });
    });
  }

module.exports = [insertUser, getUserByName]