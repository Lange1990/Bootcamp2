const express = require('express');
const router = express.Router();
const db = require('../../models');

//----GET----

router.get('/',async (req,res)=>{
    const articulos = await db.Articulo.findAll(
        {
        include: [{
          model: db.Pasajero,
          required: true
         }]
      }
      )
    res.send(articulos)
})

router.get('/:name',async (req,res)=>{
    console.log(req.params.name)
    const id = await db.Pasajero.findOne({
        where: {
            name: req.params.name
        }
    })
    if(id){
        const articulo = await db.Articulo.findAll({
            where: {
                pasajeroId: id.id
            }
        })
        const response = await [id,articulo]
        res.send(response)
    }else{
        res.send([])
    }
})

//-----DELETE-----

router.delete('/:id',async (req,res)=>{
    try {
        const id = await db.Articulo.destroy({
            where: {
                id: req.params.id
            }
        })
        const response = await id
        if (response) return res.json(response)
         else return res.sendStatus(404)
        
    }catch(error){
        res.sendStatus(404)
    }
})

router.delete('/all/:id',async (req,res)=>{
    try {
        const id = await db.Articulo.destroy({
            where: {
                pasajeroId: req.params.id
            }
        })
        const response = await id
        if (response) return res.json(response)
         else return res.sendStatus(404)
    }catch(error){
        res.sendStatus(404)
    }
})

//-----POST-----

router.post('/',async (req,res)=>{
    const bulto = await db.Articulo.create(req.body)
    res.send(bulto)
})

module.exports = router; 