const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('postgres://fasparkingbd_user:F6t5VNxQwGgcu3vMBG2KxHdTizIsnNku@dpg-cl4d7c2uuipc738v9p80-a/fasparkingbd', {
  dialect: 'postgres',
});

const Cliente = sequelize.define('Cliente', {
  nome: DataTypes.STRING,
  sobrenome: DataTypes.STRING,
  sexo: DataTypes.STRING,
  sexoOutro: DataTypes.STRING,
  nasci: DataTypes.DATE,
  email: DataTypes.STRING,
  cpf: DataTypes.STRING,
  cnpj: DataTypes.STRING,
  cep: DataTypes.STRING,
  endereco: DataTypes.STRING,
  bairro: DataTypes.STRING,
  numero: DataTypes.STRING,
  complemento: DataTypes.STRING,
  senha: DataTypes.STRING,
  confirmacao: DataTypes.STRING,
});

app.post('/cadastro-cliente', async (req, res) => {
  try {
    const cliente = await Cliente.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      sexo: req.body.sexo,
      sexoOutro: req.body.sexoOutro,
      nasci: req.body.nasci,
      email: req.body.email,
      cpf: req.body.cpf,
      cnpj: req.body.cnpj,
      cep: req.body.cep,
      endereco: req.body.endereco,
      bairro: req.body.bairro,
      numero: req.body.numero,
      complemento: req.body.complemento,
      senha: req.body.senha, 
      confirmacao: req.body.confirmacao,
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar cliente' });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const cliente = await Cliente.findOne({ where: { email } });
  if (cliente && cliente.senha === senha) {
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
