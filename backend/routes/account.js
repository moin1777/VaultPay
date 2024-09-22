const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const balance = await Account.findOne({
    userId: req.userId
  });

  res.status(200).json({
    balance
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
   const session = await mongoose.startSession();
  
    session.startTransaction();
    const {to, amount} = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);
    if (!account || (account.balance)/100 < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Insufficient balance"
      });
    } 
    
    const toAccount = await Account.findOne({userId: to}).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Invalid account"
      });
    }

    await Account.updateOne({userId: req.userId}, { "$inc": {balance: -(amount*100)}}).session(session);
    await Account.updateOne({userId: to}, { "$inc": {balance: (amount*100)}}).session(session);

    await session.commitTransaction();
    res.status(200).json({
      msg: "Transfer successfully"
    });
  } catch (err) {
    return res.status(400).json({
      msg: "Invalid transaction"
    })
  }
});

module.exports = router;