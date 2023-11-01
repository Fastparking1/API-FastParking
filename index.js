const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json')[process.env.NODE_ENV];

const app = express();
const port = 3000;

//Conexão com do sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  database: config.database,
  username: config.username,
  password: config.password,
});

// Criação de tabela
// Atualização do modelo Cliente
const Cliente = sequelize.define('Cliente', {
  cli_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cli_nome: {
    type: DataTypes.STRING,
  },
  cli_sobrenome: {
    type: DataTypes.STRING,
  },
  cli_sexo: {
    type: DataTypes.STRING,
  },
  cli_cpf: {
    type: DataTypes.STRING,
  },
  cli_nascimento: {
    type: DataTypes.STRING,
  },
  cli_senha: {
    type: DataTypes.STRING,
  },
  cli_confirmacao: {
    type: DataTypes.STRING,
  },
  cli_status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

// Atualização do modelo Empresa
const Empresa = sequelize.define('Empresa', {
  emp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_nome_empresarial: {
    type: DataTypes.STRING,
  },
  emp_cnpj: {
    type: DataTypes.STRING,
  },
  emp_cep: {
    type: DataTypes.STRING,
  },
  emp_endereco: {
    type: DataTypes.STRING,
  },
  emp_bairro: {
    type: DataTypes.STRING,
  },
  emp_numero: {
    type: DataTypes.STRING,
  },
  emp_complemento: {
    type: DataTypes.STRING,
  },
  emp_status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

// Atualização do modelo Estacionamento
const Estacionamento = sequelize.define('Estacionamento', {
  est_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  est_qnt_vagas: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
  },
  est_endereco: {
    type: DataTypes.STRING,
  },
  est_status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

// Tabela intermediária para o relacionamento entre Cliente e Empresa
const ClienteEmpresa = sequelize.define('ClienteEmpresa', {});

// Defina a relação muitos para muitos entre Cliente e Empresa
Cliente.belongsToMany(Empresa, { through: ClienteEmpresa });
Empresa.belongsToMany(Cliente, { through: ClienteEmpresa });

// Tabela intermediária para o relacionamento entre Empresa e Estacionamento
const EmpresaEstacionamento = sequelize.define('EmpresaEstacionamento', {});

// Defina a relação muitos para muitos entre Empresa e Estacionamento
Empresa.belongsToMany(Estacionamento, { through: EmpresaEstacionamento });
Estacionamento.belongsToMany(Empresa, { through: EmpresaEstacionamento });

sequelize.sync({ force: true })
  .then(() => {
    console.log('Tabelas criadas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar tabelas:', error);
  });

  app.use(express.json());

  app.post('/cadastro', async (req, res) => {
    const { entidade } = req.body;
  
    try {
      if (entidade === 'cliente') {
        const cliente = await Cliente.create(req.body);
        res.json(cliente);
      } else if (entidade === 'empresa') {
        const empresa = await Empresa.create(req.body);
        res.json(empresa);
      } else if (entidade === 'estacionamento') {
        const estacionamento = await Estacionamento.create(req.body);
        res.json(estacionamento);
      } else {
        res.status(400).json({ message: 'Entidade inválida' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao cadastrar entidade');
    }
  });
  
  
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
