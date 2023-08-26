const User = require("../models/userModal");
const asyncHandler = require("express-async-handler");
const STATUS = require("../messages/statusCode");
const ERROR_MESSAGES = require("../messages/errors");
const SUCCESS = require("../messages/success");

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.find({ email });
  // console.log("findUser", findUser);
  if (findUser.length === 0) {
    const createUser = await User.create({ ...req.body });
    return res
      .status(STATUS.created)
      .send({ data: createUser, message: SUCCESS.created });
  } else {
    throw new Error(ERROR_MESSAGES.user_exist);
  }
});

module.exports = { createUser };
