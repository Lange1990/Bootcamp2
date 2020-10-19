const S = require('sequelize');
const sequelize = require('../db');

let Pasajero = sequelize.define('pasajero',{
    id:{
        type: S.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: S.STRING,
    reserva: S.STRING
    }
), Articulo = sequelize.define('articulo',{
        id:{
            type: S.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: 'pasajeros',
                key: 'id',
            }
        },
        bulto: S.STRING
    }
)

Articulo.belongsTo(Pasajero);
Pasajero.hasMany(Articulo);

module.exports = {
    Articulo, Pasajero
}  