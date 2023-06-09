const argon2 = require("argon2");
const UserModel = require("../models/user");

async function hashPassword(password) {
  // Hash the password
  const hash = await argon2.hash(password);
  return hash;
}

// Sign up a user
async function signup(req, res) {
  const { email, password, name, surname } = req.body;

  // Validate input
  if (!email || !password || !name || !surname) {
    return res.status(400).json({ message: "`email`, `password`, `name`, and `surname` are required" });
  }

  try {
    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create User
    const newUser = new UserModel({
      email,
      passwordHash: await hashPassword(password),
      name,
      surname,
    });

    await newUser.save();
    return res.status(201).json({ message: 'Signup success! Please sign in' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error signing up, please try again.' });
  }
}

module.exports = signup;
