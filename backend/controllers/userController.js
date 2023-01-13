const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = _id => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '1d'})
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  try {
    const user = await User.register(firstName, lastName, email, password);
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch(err) {
    console.log(err.message);
    res.status(400).json({ error: err.message })
  } 
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch(err) {
    console.log(err.message);
    res.status(400).json({ error: err.message })
  } 
}

module.exports = {
  registerUser,
  loginUser
}