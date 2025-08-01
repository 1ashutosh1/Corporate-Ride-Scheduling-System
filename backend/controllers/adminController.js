const AdminAction = require('../models/AdminAction');
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
    const ride = await Ride.findById(req.params.id);
    if(!ride){
      const error = new Error("Ride does not Exist");
      error.statusCode = 404;
      return next(error);
    }

    if(ride.status === 'approved' || ride.status === 'cancelled'){
      const error = new Error("This ride cannot be Approved");
      error.statusCode = 400;
      return next(error);
    }

    ride.status = 'approved';
    await ride.save();

    //create this adminAction to track actions of all admins
    const action = {
      ride: ride._id,  //This is better because it is already of ObjectId type
      admin: req.user.id,   //Although string but mongoose will convert it to ObjectId before saving
      action: 'approved'
    }

    await AdminAction.create(action);
    res.status(201).json({message: 'Ride Approved', ride})
  } catch (err) {
    next(err);
  }
};


const rejectRide = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if(!ride){
      const error = new Error("Ride does not Exist");
      error.statusCode = 404;
      return next(error);
    }

    if(ride.status === 'approved' || ride.status === 'cancelled'){
      const error = new Error("This ride cannot be Cancelled");
      error.statusCode = 400;
      return next(error);
    }

    ride.status = 'cancelled';
    await ride.save();

    //create this adminAction to track actions of all admins
    const action = {
      ride: ride._id,
      admin: req.user.id,   
      action: 'rejected'
    }

    await AdminAction.create(action);
    res.status(201).json({message: 'Ride rejected successfully', ride});
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