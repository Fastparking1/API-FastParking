const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('postgres://fastparkingdb_user:GMd30d1dDUJg1bMgomf8uU6xSLj2yR4X@dpg-cl53fo472pts739qnll0-a/fastparkingdb', {
  dialect: 'postgres',
});

const Cliente = sequelize.define('Cliente', {
  nome: DataTypes.STRING,
  sobrenome: DataTypes.STRING,
  sexo: DataTypes.STRING,
  sexoOutro: DataTypes.STRING,
  nasci: DataTypes.STRING,
  email: DataTypes.STRING,
  cpf: DataTypes.STRING,
  cnpj: DataTypes.STRING,
  cep: DataTypes.STRING,
  endereco: DataTypes.STRING,
  bairro: DataTypes.STRING,
  numero: DataTypes.STRING,
  complemento: DataTypes.STRING,
  senha: DataTypes.STRING,
  confirmacao: DataTypes.STRING
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
      confirmacao: req.body.confirmacao
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar cliente' });
  }
});

// Alteração no endpoint /login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const cliente = await Cliente.findOne({ where: { email } });

  if (cliente && cliente.senha === senha) {
    res.status(200).json({ message: 'Login bem-sucedido', cliente });
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

app.delete('/excluir-cliente/:id', async (req, res) => {
  const clienteId = req.params.id;

  try {
    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await cliente.destroy();
    res.status(200).json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
});

// Alteração no endpoint /atualizar-dados
app.put('/atualizar-dados', async (req, res) => {
  const { id } = req.body; // Alteração para receber o ID do corpo da requisição

  try {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Atualize os dados do cliente
    cliente.email = req.body.email || cliente.email;
    cliente.cnpj = req.body.cnpj || cliente.cnpj;

    await cliente.save();

    res.status(200).json({ message: 'Dados atualizados com sucesso', cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar dados do cliente' });
  }
});

app.get('/detalhes-usuario/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const usuario = await Cliente.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar detalhes do usuário' });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
