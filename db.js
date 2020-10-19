const Sequelize = require('sequelize');

module.exports = new Sequelize('postgres://postgres:saynomore@localhost:5432/bootcamp2', { logging: false });
