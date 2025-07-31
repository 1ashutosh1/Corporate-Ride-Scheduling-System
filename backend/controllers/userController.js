const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async(req,res,next) => {
  try {
    const {name, email, password} = req.body;
    const alreadyExists = await User.findOne({email: email});
    if(alreadyExists)
      return res.status(400).json({error: "Email Already Exists"});

    const user = {
      name,
      email,
      password
    };

    const newUser = await User.create(user);
    
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.status(201).json({user:{
      name: newUser.name,
      email: newUser.email
    }, token});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
}

module.exports = {register};