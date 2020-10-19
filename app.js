const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const api = require("./routes")
const db = require('./db')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


app.use("/api", api);

app.get('/*', (req, res) => {  
  res.sendFile(path.resolve(__dirname, 'public','index.html'))
})

db.sync({force:false})
.then(()=>{
  console.log("DB Conectada!")
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})