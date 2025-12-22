const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/response");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return error(res, "Email and password required", 400);
  }

  const existingUser = await User.findUserByEmail(email);
  if (existingUser) {
    return error(res, "Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.createUser({
    name,
    email,
    password: hashedPassword,
  });

  success(res, {}, "User registered successfully", 201);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return error(res, "Email and password required", 400);
  }

  const user = await User.findUserByEmail(email);
  if (!user) {
    return error(res, "User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return error(res, "Invalid credentials", 401);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  success(res, { token }, "Login successful");
});
