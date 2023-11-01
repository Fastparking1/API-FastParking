const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Importe a configuração do Sequelize

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
  },
});

module.exports = Usuario;
