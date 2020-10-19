const express = require('express');
const router = express.Router();
const articulos = require("./Api/articulos");
const pasajeros = require("./Api/pasajeros")

router.use("/packages", articulos); 
router.use("/passengers", pasajeros); 

router.get("/", (req, res) => {
    res.json({ message: "Welcome to Api!" });
  });


module.exports = router;