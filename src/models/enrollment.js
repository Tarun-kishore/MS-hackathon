const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    volunteer: userSchema,
    event: eventSchema,
})

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;