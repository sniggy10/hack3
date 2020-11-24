const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
    username: { type: String, required: true },
    drop: { type: String, required: true }
});

module.exports = mongoose.model('Destination', destinationSchema);