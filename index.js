const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const config = require('./config/config.json')[process.env.NODE_ENV];

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'https://fastparking-9b5f7.firebaseapp.com', // Substitua pelo domínio do seu aplicativo Angular
  optionsSuccessStatus: 200, // Opcional
};

app.use(cors(corsOptions));

//Conexão com do sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  database: config.database,
  username: config.username,
  password: config.password,
});


const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexoOutro: {
    type: DataTypes.STRING,
  },
  nasci: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronize the model with the database
sequelize.sync()
  .then(() => {
    console.log('Tabela "Cliente" criada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar a tabela "Cliente":', error);
  });

  app.use(express.json());

  app.post('/cadastrar-cliente', async (req, res) => {
    const { nome, sobrenome, sexo, sexoOutro, nasci, email, cpf, cnpj, cep, endereco, bairro, numero, complemento, senha, confirmacao  } = req.body;
  
    try {
      // Crie um novo cliente no banco de dados
      const cliente = await Cliente.create({
        nome,
        sobrenome,
        sexo,
        sexoOutro, 
        nasci, 
        email, 
        cpf, 
        cnpj, 
        cep, 
        endereco, 
        bairro, 
        numero, 
        complemento, 
        senha, 
        confirmacao
      });
  
      // Envie uma resposta de sucesso com o cliente cadastrado
      res.json(cliente);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      res.status(500).json({ message: 'Erro ao cadastrar cliente' });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      // Aqui você deve adicionar a lógica de autenticação
      // Consultar o banco de dados para verificar se o email e senha correspondem a um usuário válido
      // Vou fornecer um exemplo simples usando o modelo de Cliente, mas você deve adaptar isso à sua autenticação real
  
      const cliente = await Cliente.findOne({ where: { email, senha } });
  
      if (cliente) {
        // Autenticação bem-sucedida, você pode gerar um token de autenticação ou definir uma sessão
        res.status(200).json({ message: 'Login bem-sucedido' });
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao fazer login');
    }
  });

  app.get('/listar-clientes', async (req, res) => {
    try {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar clientes');
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
