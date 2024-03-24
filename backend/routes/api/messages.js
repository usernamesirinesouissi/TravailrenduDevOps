const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const Message = require("../../models/Message");

// @route POST api/messages
// @desc Créer un nouveau message
// @access Public

router.post("/msg", async (req, res) => {
  try {
    const { objet, email, message } = req.body;

    // Vérification des données requises
    if (!objet || !email || !message) {
      return res.status(400).json({ msg: "Veuillez fournir toutes les informations nécessaires" });
    }

    // Création d'un nouveau message
    const newMessage = new Message({ objet, email, message });

    // Sauvegarde du message dans la base de données
    const savedMessage = await newMessage.save();

    res.status(201).json({ message: savedMessage, msg: "Message envoyé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur Serveur" });
  }
});
// @route GET api/messages
// @desc Récupérer tous les messages
// @access Public
router.get("/tout", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur Serveur");
  }
});

// @route DELETE api/messages/:id
// @desc Supprimer un message par ID
// @access Privé && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
  try {
    await Message.findOneAndDelete({ _id: req.params.id });
    res.send("Message supprimé avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Message n'exite pas");
  }
});

module.exports = router;
