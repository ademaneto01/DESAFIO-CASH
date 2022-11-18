const { knex } = require("../database/connection");
const jwt = require("jsonwebtoken");

async function detailBalance(req, res) {
  const { user } = req;

  try {
    const balance = await knex("accounts")
      .where({ id: user.accountid })
      .returning("*");

    if (!balance) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    return res.status(200).json(balance[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  detailBalance,
};
