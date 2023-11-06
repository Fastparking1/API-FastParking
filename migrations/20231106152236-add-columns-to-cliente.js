'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clientes', 'sobrenome', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'sexo', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'sexoOutro', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'nasci', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Clientes', 'cpf', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'cnpj', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'cep', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'endereco', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'bairro', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'numero', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'complemento', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'confirmacao', {
      type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Define as instruções para reverter as alterações, caso seja necessário
    await queryInterface.removeColumn('Clientes', 'sobrenome');
    await queryInterface.removeColumn('Clientes', 'sexo');
    await queryInterface.removeColumn('Clientes', 'sexoOutro');
    await queryInterface.removeColumn('Clientes', 'nasci');
    await queryInterface.removeColumn('Clientes', 'cpf');
    await queryInterface.removeColumn('Clientes', 'cnpj');
    await queryInterface.removeColumn('Clientes', 'cep');
    await queryInterface.removeColumn('Clientes', 'endereco');
    await queryInterface.removeColumn('Clientes', 'bairro');
    await queryInterface.removeColumn('Clientes', 'numero');
    await queryInterface.removeColumn('Clientes', 'complemento');
    await queryInterface.removeColumn('Clientes', 'confirmacao');
  }
};
