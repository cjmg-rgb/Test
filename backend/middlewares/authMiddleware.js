const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

  const { authorization } = req.headers;
  if(!authorization) {
    return res.status(400).json({ error: 'No Token'})
  };

  const token = authorization.split(' ')[1];

  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({_id});
    next()
  } catch(err) {
    res.status(400).json({ error: 'Not authorized, please login'})
  }
}

module.exports = requireAuth;