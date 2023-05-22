const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");

// Créer un nouvel utilisateur
router.post("/", Controller.createUser);

// Récupérer tous les utilisateurs
router.get("/", Controller.getAllUsers);

// Récupérer un utilisateur spécifique
router.get("/:id", Controller.getUser);

// Mettre à jour un utilisateur
router.put("/:id", Controller.updateUser);

// Supprimer un utilisateur
router.delete("/:id", Controller.deleteUser);

// créer un login 

router.post("/login", Controller.login);

// récupérer l'utilisateur 

router.get("/me", Controller.me);

module.exports = router;
