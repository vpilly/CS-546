const MongoClient = require("mongodb").MongoClient;

const mongoConfig = {
  serverUrl: "mongodb://54.87.11.81",
  database: "Varun_Pilly_lab7",
};

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};
