const { knex } = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const userExistes = await knex("users").where({ username }).first();

    if (userExistes) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o username informado.",
      });
    }

    const newAccount = await knex("accounts")
      .insert({ balance: 10000 })
      .returning("*");

    const hash = await bcrypt.hash(senha, 10);

    const registredUser = await knex("users")
      .insert({ username, senha: hash, accountid: newAccount[0].id })
      .returning("*");

    if (!registredUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o usuário." });
    }

    delete registredUser.senha;

    return res.status(201).json(registredUser[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function userLogin(req, res) {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const userExistes = await knex("users").where({ username }).first("*");

    if (!userExistes) {
      return res
        .status(404)
        .json({ mensagem: "Usuário e/ou senha inválido(s)" });
    }

    const verifiedPassword = await bcrypt.compare(senha, userExistes.senha);

    if (!verifiedPassword) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)" });
    }

    const token = jwt.sign(
      {
        id: userExistes.id,
      },
      process.env.JWTSECRET
    );

    delete userExistes.senha;

    return res.status(200).json({ usuario: userExistes, token: token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registerUser,
  userLogin,
};
