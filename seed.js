var model = require("./models")

let Pasajeros = model.Pasajero
let Articulos = model.Articulo


Pasajeros.bulkCreate([
   {
    name: "Fox Mulder",
    reserva: "XXXXX"
},{
    name: "Dana Scully",
    reserva: "XXXXX"
},{
    name: "Walter Skinner",
    reserva: "ASDFG"
},{
    name: "Tigger Woods",
    reserva: "KJHGS"
},{
    name: "Bart Simpson",
    reserva: "AHAGA"
},{
    name: "Rurouni Kenshin",
    reserva: "BMQEA"
},{
    name: "Ozara Tsubasa",
    reserva: "SAUYA"
},{
    name: "Wakbayashi Genzo",
    reserva: "OIUPS"
},{
    name: "Tom Misaki",
    reserva: "SAUYA"
}
])

Articulos.bulkCreate([
    {
        bulto: "GRANDE",
        pasajeroId: 1
    },
    {
        bulto: "MEDIANO",
        pasajeroId: 1
    },
    {
        bulto: "CHICO",
        pasajeroId: 2
    },
    {
        bulto: "GRANDE",
        pasajeroId: 5
    },
    {
        bulto: "CHICO",
        pasajeroId: 6
    },
    {
        bulto: "GRANDE",
        pasajeroId: 2
    },
    {
        bulto: "MEDIANO",
        pasajeroId: 8
    },
]) 

