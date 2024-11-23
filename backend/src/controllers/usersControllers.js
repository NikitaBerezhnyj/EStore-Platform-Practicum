exports.testController = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
