const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middlewares");

const router = Router();

const signupBody = zod.object({
  username: zod.string().email().min(3).max(30),
  password: zod.string().min(6),
  firstName: zod.string().max(40),
  lastName: zod.string().max(40)
});

const signinBody = zod.object({
  username: zod.string().email().min(3).max(30),
  password: zod.string().min(6)
});

const updateBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
});


router.post("/signup", async (req, res) => {
  const body = req.body;
  const {success} = signupBody.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Incorrect Inputs"
    });
  }

  const isUser = await User.findOne({username: body.username});
  if (isUser) {
    return res.status(411).json({
      msg: "Email already taken"
    });
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName
  });
  
  if (!user) {
    res.status(500).json({
      msg: "Something bad happen"
    });
  }

  await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random()*1000000)
  });

  const token = jwt.sign({userId: user._id}, JWT_SECRET)
  res.status(200).json({
    msg: "User created successfully",
    token: token
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const {success} = signinBody.safeParse(body);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect Inputs"
    });
  }

  const user = await User.findOne({username: body.username, password: body.password});

  if (!user) {
    return res.status(411).json({
      msg: "Error While logging in"
    });
  }

  const token = jwt.sign({userId: user._id}, JWT_SECRET)
  res.status(200).json({
    token: token
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const {success} = updateBody.safeParse(req.body);
  if(!success) {
    return res.status(411).json({
      msg: "Error while updating information"
    });
  }

  const user = await User.findOneAndUpdate({_id: req.userId}, req.body);
  if (!user) {
    return res.status(411).json({
      msg: "Error while updating information"
    });
  }

  res.status(200).json({
    msg: "Updated successfully"
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const user = await User.find({
    $or: [{
      firstName: {
        "$regex": filter
      }
    }, {
      lastName: {
        "$regex": filter
      }
    }]
  });

  res.json({
    users: user.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  });
});

module.exports = router;