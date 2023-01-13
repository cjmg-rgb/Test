const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

userSchema.statics.register = async function(firstName, lastName, email, password) {

  if(!firstName || !lastName || !email || !password) {
    throw Error('Please fill in all required fields')
  };
  if(!validator.isEmail(email)) {
    throw Error('Not a valid email')
  }
  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  const exist = await this.findOne({ email });
  if(exist) {
    throw Error('Email already registered, please sign in')
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ firstName, lastName, email, password: hashedPassword });

  return user;
};

userSchema.statics.login = async function(email, password) {

  if(!email || !password) {
    throw Error('Please fill in all required fields')
  };
  const user = await this.findOne({ email });
  if(!user) {
    throw Error('Email not registered, please sign up')
  }
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if(!passwordIsCorrect) {
    throw Error('Incorrect Password, please try again')
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);