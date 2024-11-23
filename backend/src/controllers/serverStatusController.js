exports.checkServerStatus = async (req, res) => {
  try {
    res.status(200).send({ message: "The server is healthy! :)" });
  } catch (err) {
    console.error("Error checking server status:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
