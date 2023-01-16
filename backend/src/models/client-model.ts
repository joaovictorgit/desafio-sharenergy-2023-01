const mongooseModelClient = require("mongoose");

const clientSchema = new mongooseModelClient.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  },
  phone: {
    required: true,
    type: String,
    unique: true,
    validate: /^\(\d{2}\)\s\d{5}-\d{4}/,
  },
  address: {
    number: Number,
    district: String,
    city: String,
  },
  cpf: {
    required: true,
    type: String,
    unique: true,
    validate:
      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
  },
});

module.exports = mongooseModelClient.model("Client", clientSchema);
