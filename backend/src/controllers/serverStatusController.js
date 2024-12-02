const mongoose = require("mongoose");

exports.checkServerStatus = async (req, res) => {
  try {
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbState = mongoose.connection.readyState;
    const dbStatus = ["Disconnected", "Connected", "Connecting", "Disconnecting"][dbState];

    res.status(200).send({
      message: "Server health check successful",
      status: {
        server: "Running",
        database: dbStatus
      }
    });
  } catch (err) {
    console.error("Error checking server status:", err);
    res.status(500).send({
      message: "Internal Server Error",
      status: {
        server: "Down",
        database: "Unknown"
      }
    });
  }
};
