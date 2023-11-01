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
const Cliente = sequelize.define('Cliente', {
  cli_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cli_nome: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  cli_senha: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  cli_email: {
    type: DataTypes.STRING(60),
    unique: true,
  },
  cli_telefone: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  cli_endereco: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  cli_data_nasc: {
    type: DataTypes.DATE,
  },
  cli_sexo: {
    type: DataTypes.ENUM('M', 'F'),
  },
  cli_cpf: {
    type: DataTypes.STRING(11),
  },
  cli_status: {
    type: DataTypes.BOOLEAN,
  },
});

const Empresa = sequelize.define('Empresa', {
  emp_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp_cnpj: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  emp_situacao_cadastral: {
    type: DataTypes.ENUM(
      'ativa',
      'inativa',
      'suspensa',
      'baixada',
      'inapta',
      'atividade_rural',
      'MEI',
      'estrangeira',
      'concordata',
      'recuperacao_judicial'
    ),
    allowNull: false,
  },
  emp_data_abertura: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  emp_nome_empresarial: {
    type: DataTypes.STRING(100),
  },
  emp_atividades_economicas: {
    type: DataTypes.STRING(255),
  },
  emp_natureza_juridica: {
    type: DataTypes.STRING(255),
  },
  emp_endereco_contato: {
    type: DataTypes.STRING(255),
  },
  emp_capital: {
    type: DataTypes.SMALLINT,
  },
  emp_status: {
    type: DataTypes.BOOLEAN,
  },
});

const Estacionamento = sequelize.define('Estacionamento', {
  est_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  est_qnt_vagas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  est_endereco: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  est_status: {
    type: DataTypes.BOOLEAN,
  },
});

const ClienteEmpresa = sequelize.define('ClienteEmpresa', {}, { timestamps: false });

const EmpresaEstacionamento = sequelize.define('EmpresaEstacionamento', {}, { timestamps: false });

Cliente.belongsToMany(Empresa, { through: ClienteEmpresa });
Empresa.belongsToMany(Cliente, { through: ClienteEmpresa });

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

  app.post('/clientes', async (req, res) => {
    const {
      cli_nome,
      cli_senha,
      cli_email,
      cli_telefone,
      cli_endereco,
      cli_data_nasc,
      cli_sexo,
      cli_cpf,
      cli_status,
    } = req.body;
  
    try {
      const cliente = await Cliente.create({
        cli_nome,
        cli_senha,
        cli_email,
        cli_telefone,
        cli_endereco,
        cli_data_nasc,
        cli_sexo,
        cli_cpf,
        cli_status,
      });
      res.json(cliente);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao inserir cliente');
    }
  });
  
  app.post('/cadastro', async (req, res) => {
    const {
      emp_cnpj,
      emp_situacao_cadastral,
      emp_data_abertura,
      emp_nome_empresarial,
      emp_atividades_economicas,
      emp_natureza_juridica,
      emp_endereco_contato,
      emp_capital,
      emp_status,
    } = req.body;
  
    try {
      const empresa = await Empresa.create({
        emp_cnpj,
        emp_situacao_cadastral,
        emp_data_abertura,
        emp_nome_empresarial,
        emp_atividades_economicas,
        emp_natureza_juridica,
        emp_endereco_contato,
        emp_capital,
        emp_status,
      });
      res.json(empresa);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao inserir empresa');
    }
  });

  app.get('/login', async (req, res) => {
    const { cli_email, cli_senha } = req.query;
  
    try {
      const cliente = await Cliente.findOne({
        where: {
          cli_email,
          cli_senha,
        },
      });
  
      if (cliente) {
        res.json({ message: 'Login bem-sucedido', cliente });
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao autenticar cliente');
    }
  });
  
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
