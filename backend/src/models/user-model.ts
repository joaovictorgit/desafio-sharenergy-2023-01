const mongooseModelUser = require("mongoose");

const userSchema = new mongooseModelUser.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

module.exports = mongooseModelUser.model("User", userSchema);
