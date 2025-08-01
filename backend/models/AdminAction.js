const mongoose = require('mongoose');

const AdminActionSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['approved', 'rejected'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminAction', AdminActionSchema);
