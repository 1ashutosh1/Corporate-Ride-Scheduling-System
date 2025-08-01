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

    return res.status(200).json({ newRide: ride });
  } catch (error) {
    next(error);
  }
};

const getRideDetails = async (req, res, next) => {
  try {
    const user = req.user;
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      const error = new Error("Ride not Found");
      error.statusCode = 404;
      return next(error);
    }

    //convert ObjectId to string before comparison with the userId from req object because their types are different
    if (ride.user.toString() !== user.id && user.role !== "admin") {
      const error = new Error(
        "Not Authorized to view the details for this ride"
      );
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
    const rides = await Ride.find({ user: req.user.id });
    res.status(200).json(rides);
  } catch (error) {
    next(error);
  }
};

const cancelRide = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      const error = new Error("Ride not found");
      error.statusCode = 404;
      return next(error);
    }

    if (ride.user.toString() !== req.user.id && req.user.id !== "admin") {
      const error = new Error("Not Authorized to cancel this ride");
      error.statusCode = 401;
      return next(error);
    }

    const now = new Date();
    if (ride.date <= now) {
      const error = new Error(
        "Cannot cancel this ride because it has already happened"
      );
      error.statusCode = 400;
      return next(error);
    }

    if (ride.status === "cancelled") {
      const err = new Error("Ride is already cancelled");
      err.statusCode = 400;
      return next(err);
    }

    ride.status = "cancelled";
    await ride.save();
    res.status(200).json({ message: "Ride Cancelled Successfully", ride });
  } catch (error) {
    return next(error);
  }
};

module.exports = { bookRide, getRideDetails, getUserRides, cancelRide };
