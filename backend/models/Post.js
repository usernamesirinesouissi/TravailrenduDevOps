const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandeSchema = new Schema({

  type: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  // Autres champs de la commande s'il y en a
});

module.exports = mongoose.model("Post", CommandeSchema);
