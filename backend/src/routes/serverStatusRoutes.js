const express = require("express");
const { checkServerStatus } = require("../controllers/serverStatusController");

const router = express.Router();

router.post("/status", async (req, res) => {
  try {
    await checkServerStatus(req, res);
  } catch (error) {
    console.error("Backend status check error: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
