const Ride = require('../models/Ride');

//if no status is provided in query params return all the rides 
const getRidesByStatus = async (req, res, next) => {
  try {
    const {status} = req.query;
    const validStatus = ['pending', 'approved', 'cancelled'];
    if(status && !validStatus.includes(status)){
      const error = new Error('Not a valid status filter');
      error.statusCode = 400;
      return next(error);
    }
    
    const filter = {};
    if(status) filter.status = status;

    //if there is no filter(no status) in that case it will return all the rides.
    const rides = await Ride.find(filter).populate('user', 'email');
    res.status(200).json(rides);
  } catch (err) {
    next(err);
  }
};


const approveRide = async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
};


const rejectRide = async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
};


const getAnalytics = async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
};

module.exports = {getRidesByStatus, approveRide, rejectRide, getAnalytics};