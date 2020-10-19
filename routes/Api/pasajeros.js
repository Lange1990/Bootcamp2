const express = require('express');
const router = express.Router();
const db = require('../../models');
const cors = require('cors')({origin: true,  credentials: true});

//-----GET-----

router.get('/',async (req,res)=>{
    const pasajeros = await db.Pasajero.findAll()
    res.send(pasajeros)
})
router.get('/all',async (req,res)=>{
    const pasajeros = await db.Pasajero.findAll({
            include: [{
              model: db.Articulo
             }] 
    })
    res.send(pasajeros)
})

router.get('/:name',async (req,res)=>{
    const pax = await db.Pasajero.findAll({
        where: {
            name: req.params.name
        }
    })
    res.send(pax)
})

//-----POST-----

router.post('/',async (req,res)=>{
    
    const pax = await db.Pasajero.findOrCreate({
        where: { name: req.body.name },
        defaults: req.body
      })
    res.send(pax)
})

module.exports = router;