const router = require("express").Router();
const Commande = require("../../models/Post");
const auth = require("../../middleware/auth");
const user = require("../../models/User");


// @route POST api/commandes
// @desc Create a new command
// @access Public
router.post("/cmd",  async (req, res) => {
  try {
    const { type, details} = req.body;
    const newCommande = new Commande({ type, details });
    const savedCommande = await newCommande.save();
    res.json(savedCommande);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET api/commandes
// @desc Get all commandes
// @access Public
router.get("/tout", async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


router.get("/tout/:userId",  async (req, res) => {

  try {
  const userId = req.userid; // Récupérer l'ID de l'utilisateur

    const commandes = await Commande.find({userId:userId});
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


router.put("/maj/:id", async (req, res) => {
    const { type, quantite, details, lieu, etat } = req.body;
  
    try {
      const commande = await Commande.findById(req.params.id);
  
      if (!commande) {
        return res.status(404).send("Poste non trouvée");
      }
  
      // Mettre à jour les champs de la commande si des données sont fournies
      commande.type = type || commande.type;
      commande.quantite = quantite || commande.quantite;
      commande.details = details || commande.details;
      commande.lieu = lieu || commande.lieu;
      commande.etat = etat || commande.etat;
  
      // Sauvegarder la commande avec les modifications
      await commande.save();
  
      res.send("Mise à jour de la poste avec succès");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur Serveur");
    }
  });
  
// @route DELETE api/commandes/:id
// @desc Delete a commande by ID
router.delete("/supprimer/:id", async (req, res) => {
  try {
    await Commande.findOneAndDelete({ _id: req.params.id });
    res.send("Post est supprimé avec succés");
  } catch (err) {
    console.error(err);
    res.status(500).send("post n'existe pas");
  }
});

module.exports = router;
