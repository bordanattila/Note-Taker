const express = require("express");

const apiRouter = require("./apiroutes");

const router = express();
router.use("/", apiRouter);


module.exports = router;