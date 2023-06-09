const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

async function login(req, res) {
  // Get email and password from the request body
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "`email` and `password` are required" });
  }

  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the provided password is correct
    const passwordHash = user.passwordHash;
    const correctPassword = await argon2.verify(passwordHash, password);
    if (!correctPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
    {
        _id: user._id,
        email: user.email,
        role: user.role,
    },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error logging in, please try again.' });
  }
}

module.exports = login;