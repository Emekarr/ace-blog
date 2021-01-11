const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!value.match(emailRegex)) throw new Error();
    },
    trim: true,
    required: true,
  },
  message: {
      type: String,
      trim: true,
      required: true
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
