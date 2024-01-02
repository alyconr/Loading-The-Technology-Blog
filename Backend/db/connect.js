const mysql = require("mysql2");
const fs = require("fs");
const dbUrl = process.env.MYSQL_URI;
const caPath = process.env.CA_PATH;

const createPool = (url, caPath) => {
  const connectionConfig = {
    ...mysql.createConnection(url).config,
    ssl: {
      ca: fs.readFileSync(caPath),
    },
  };

  delete connectionConfig.maxPacketSize;
  delete connectionConfig.clientFlags;

  const pool = mysql.createPool(connectionConfig);

  // Handle disconnections
  pool.on("connection", (connection) => {
    console.log("Connected to MySQL");

    connection.on("error", (err) => {
      console.error("MySQL connection error:", err);

      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Attempting to reconnect...");

        // Attempt to reconnect to the database
        pool.getConnection((reconnectErr, newConnection) => {
          if (reconnectErr) {
            console.error("Reconnection failed:", reconnectErr);
          } else {
            console.log("Reconnected to MySQL");

            // Update the existing connection with the new connection configuration
            connection.config = newConnection.config;

            // Release the new connection back to the pool
            newConnection.release();
          }
        });
      } else {
        throw err;
      }
    });
  });

  return pool;
};

module.exports = createPool(dbUrl, caPath);
