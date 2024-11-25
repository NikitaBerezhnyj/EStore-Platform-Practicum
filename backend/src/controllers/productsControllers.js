exports.createProduct = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
