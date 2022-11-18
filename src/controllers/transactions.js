const { knex } = require("../database/connection");

async function transfer(req, res) {
  const { user } = req;
  const { value, usuario } = req.body;

  try {
    const valueExistes = await knex("accounts")
      .where({ id: user.accountid })
      .returning("*");

    const userExistes = await knex("users")
      .where({ username: usuario })
      .returning("*");

    if (
      valueExistes[0].balance < value ||
      value <= 0 ||
      !userExistes[0] ||
      user.username == usuario
    ) {
      return res.status(200).json({ mensagem: "Transação não autorizada" });
    }

    const retirandoSaldo = await knex("accounts")
      .where({ id: user.accountid })
      .update({ balance: valueExistes[0].balance - value });

    const foundBalance = await knex("accounts")
      .where({ id: userExistes[0].accountid })
      .returning("*");

    const creditandoSaldo = await knex("accounts")
      .where({ id: userExistes[0].accountid })
      .update({ balance: foundBalance[0].balance + value });

    const registerTransactions = await knex("transactions").insert({
      debitedaccountid: user.accountid,
      creditedaccountid: userExistes[0].accountid,
      valor: value,
      createdat: new Date(),
    });

    return res
      .status(200)
      .json({ mensagem: "Transação realizada com sucesso!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function extract(req, res) {
  const { user } = req;

  try {
    const extractTransactionsDebited = await knex("transactions")
      .where({
        debitedaccountid: user.accountid,
      })
      .returning("*");
    const extractTransactionsCredited = await knex("transactions")
      .where({
        creditedaccountid: user.accountid,
      })
      .returning("*");
    if (
      !extractTransactionsDebited[0].debitedaccountid &&
      !extractTransactionsCredited[0].debitedaccountid
    ) {
      return res
        .status(200)
        .json({ mensagem: "Não existe transações para este usuario." });
    }

    return res.status(200).json({
      checkOut: extractTransactionsDebited,
      checkIn: extractTransactionsCredited,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  transfer,
  extract,
};
