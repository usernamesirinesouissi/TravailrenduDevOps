const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
// @route POST api/users
// @desc Register new user
// @access Public
 router.post("/register", (req, res) => {
 let { nom, prenom, adresse, tel,  email, password, role = "user" } = req.body;

if (!nom || !prenom ||!adresse ||!tel ||!email || !password || !role)
 return res.status(400).send({ msg: "entrez tous les données s'ilvous plait" });

User.findOne({ email: email }).then((user) => {

 if (user) return res.status(400).send({ msg: "Email existe deja" });

 });
  newUser = new User({ nom, prenom, adresse, tel,  email, password, role });

bcrypt.genSalt(10, (err, salt) => {
 if (err) throw err;
 bcrypt.hash(newUser.password, salt, (err, hash) => {
 if (err) throw err;
 newUser.password = hash;
 newUser.save().then((user) => {
 jwt.sign(
 { id: user.id },
 config.get("jwtSecret"),
 { expiresIn: config.get("tokenExpire") },
 (err, token) => {
    if (err) throw err;
 res.json({
 token,
 user: {
 id: user.id,
 nom: user.nom,
 prenom: user.prenom,
 adresse: user.adresse,
 tel: user.tel,
 email: user.email,
 role: user.role,
 },
 });
 }
 );
 });
 });
 });
 });

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get("/", (req, res) => {
   User.find().then((users) => res.json(users));
 });




 // @route   PUT api/users
// @desc    Update user
// @access  Private
router.put("/maj/:id", async (req, res) => {
    const { nom, prenom, adresse, tel,email, password, role } = req.body;
  
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }
  
      // Hasher le nouveau mot de passe s'il est présent
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      // Mettre à jour les autres champs de l'utilisateur
      user.nom = nom || user.nom;
      user.prenom = prenom || user.prenom;
      user.adresse = adresse || user.adresse;
      user.tel = tel || user.tel;
      user.societe = societe || user.societe;
      user.email = email || user.email;
      user.role = role || user.role;
  
      // Sauvegarder l'utilisateur avec les modifications
      await user.save();
  
      res.send("Mise à jour avec succès");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur Serveur");
    }
  });


// @route   POST api/users
// @desc    Delete user
// @access  Private && ADMIN
router.delete("/supprimer/:id",async(req,res)=>{
   try{
       await User.findOneAndDelete({_id:req.params.id})
       res.send("supprimé avec succès")
      
   }
   catch(err){
       console.log(err);
       res.status(500).send("utilisateur n'existe pas");

   }

});


 module.exports = router;