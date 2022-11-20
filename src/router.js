const { Router } = require("express");
const users = require("./controllers/users");
const validateToken = require("./middleware/token");
const balance = require("./controllers/balance");
const transactions = require("./controllers/transactions");

const router = Router();

router.post("/usuario", users.registerUser);
router.post("/login", users.userLogin);

router.use(validateToken);

router.get("/usuario", balance.detailBalance);

router.post("/transacao", transactions.transfer);
router.get("/transacao/extrato", transactions.extract);
router.get("/transacao/detalhada", transactions.extractDetail);

module.exports = router;
