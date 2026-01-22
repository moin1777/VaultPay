const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

  // Hash the password before storing
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  const user = await User.create({
    username: body.username,
    password: hashedPassword,
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

  // Find user by username only
  const user = await User.findOne({username: body.username});

  if (!user) {
    return res.status(411).json({
      msg: "Invalid email or password"
    });
  }

  // Verify password using bcrypt
  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (!isPasswordValid) {
    return res.status(411).json({
      msg: "Invalid email or password"
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

  // If password is being updated, hash it
  const updateData = {...req.body};
  if (updateData.password) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(updateData.password, saltRounds);
  }

  const user = await User.findOneAndUpdate({_id: req.userId}, updateData);
  if (!user) {
    return res.status(411).json({
      msg: "Error while updating information"
    });
  }

  res.status(200).json({
    msg: "Updated successfully"
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const reqUser = await User.findOne({_id: req.userId});
  if (!reqUser) {
    return res.status(411).json({
      msg: "Error while getting data"
    });
  }

  const allUser = await User.find({
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
  
  const result = allUser.filter((user) => String(user._id) !== String(reqUser._id));
  // const result = allUser.filter((value) => value.username !== user.username);
  
  res.json({
    users: result.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  });
});

router.get("/userinfo", authMiddleware, async (req, res) => {
  const user = await User.findOne({_id: req.userId});
  if (!user) {
    return res.status(411).json({
      msg: "Error while getting data"
    });
  }

  const userAccount = await Account.findOne({userId: req.userId});
  res.status(200).json({
    firstName: user.firstName,
    balance: userAccount.balance
  });
});

module.exports = router;