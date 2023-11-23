const mysql = require("mysql2");
const fs = require("fs");

const pool = (url, caPath) => {
  const connectionConfig = mysql.createConnection(url).config;

  delete connectionConfig.maxPacketSize;
  delete connectionConfig.clientFlags;

  connectionConfig.ssl = {
    ca: fs.readFileSync(caPath),
  };

  return mysql.createPool(connectionConfig);
};

module.exports = pool;