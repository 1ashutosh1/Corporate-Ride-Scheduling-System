const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {comparePasswords} = require('../utils/authUtil');

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
      id: user._id,
      name: newUser.name,
      email: newUser.email
    }, token});

  } catch (error) {
    next(error);
  }
}


const login = async(req,res,next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
     if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    const isPasswordMatching = await comparePasswords(password, user.password);
    if (!isPasswordMatching) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    //When both credentials are correct then generate a token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

     res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
}


const getProfile = async(req,res,next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (name) {
      user.name = name;
    }

    if (oldPassword || newPassword) {
      if (!oldPassword || !newPassword) {
        const error = new Error("Both password are required");
        error.statusCode = 400;
        return next(error);
      }

      const isMatch = await comparePasswords(oldPassword, user.password);
      if (!isMatch) {
        const error = new Error("Old password is incorrect");
        error.statusCode = 401;
        return next(error);
      }

      //Pre hook will hash this newPassword
      user.password = newPassword;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {register, login, getProfile, updateProfile};