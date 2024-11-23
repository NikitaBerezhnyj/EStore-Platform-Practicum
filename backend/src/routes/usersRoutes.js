const express = require("express");
const { testController } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    await testController(req, res);
  } catch (error) {
    console.error("Error sending mail: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
