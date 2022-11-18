const jwt = require("jsonwebtoken");
const { knex } = require("../database/connection");

async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || authorization === "Bearer") {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const { id } = jwt.verify(token, process.env.JWTSECRET);

    const userExistes = await knex("users").where({ id }).first("*");

    if (!userExistes) {
      return res.status(400).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    delete userExistes.senha;

    req.user = userExistes;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = validateToken;
