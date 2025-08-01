const Ride = require("../models/Ride");
const bookRide = async (req, res, next) => {
  try {
    const { pickup, dropoff, date } = req.body;
    if (!pickup || !dropoff || !date) {
      const err = new Error("Pickup, dropoff, and date are required");
      err.statusCode = 400;
      return next(err);
    }

    //booking date should be future date
    const rideTime = new Date(date);
    const now = new Date();
    if (rideTime <= now) {
      const err = new Error("Ride date must be in the future");
      err.statusCode = 400;
      return next(err);
    }

    const ride = await Ride.create({
      user: req.user.id,
      pickup,
      dropoff,
      date: rideTime,
      status: "pending",
    });

    return res.status(200).json({newRide: ride});
  } catch (error) {
    next(error);
  }
};

const getRideDetails = async (req, res, next) => {
  try {
    const user = req.user;
    const ride = await Ride.findById(req.params.id);
    if(!ride){
      const error = new Error("Ride not Found");
      error.statusCode = 404;
      return next(error);
    }
    
    //convert ObjectId to string before comparison with the userId from req object because their types are different
    if(ride.user.toString() !== user.id && user.role !== 'admin'){
       const error = new Error("Not Authorized to view the details for this ride");
       error.statusCode = 403;
       return next(error);
    }

    return res.status(200).json(ride);
  } catch (error) {
    next(error);
  }
};

const getUserRides = async (req, res, next) => {
  try {
    const rides = await Ride.find({user: req.user.id});
    res.status(200).json(rides);
  } catch (error) {
    next(error);
  }
};

const cancelRide = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { bookRide, getRideDetails, getUserRides, cancelRide };
