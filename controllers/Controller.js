const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected...");
  }
});

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        req.userId = decodedToken.userId;
        next();
      }
    });
  }
};

// post/ Créer un utilisateur
exports.createUser = (req, res) => {

  const { lastname , firstname , password, role, email } = req.body;

  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Opération échouée" });
    } else {
      const newUser = { lastname , firstname , password: hashedPassword, role, email };
      db.query("INSERT INTO user SET ?", newUser, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Opération échouée" });
        } else {
          res.status(201).json({
            message: "Utilisateur créé avec succès",
          });
        }
      });
    }
  });
};

// get/  Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM user", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Échec de la récupération des utilisateurs" });
    } else {
      res.status(200).json(results);
    }
  });
};

// get/:id Récupérer un utilisateur avec son id 
exports.getUser = (req, res) => {

  const userId = req.params.id;

  db.query("SELECT * FROM user WHERE id = ?", userId, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Échec de la récupération de l'utilisateur" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Utilisateur introuvable" });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// put/:id MAJ utilisateur
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { lastname,firstname , password, role, email } = req.body;
  const updatedUser = { lastname,firstname, password, role, email };

  db.query(
    "UPDATE user SET ? WHERE id = ?",
    [updatedUser, userId],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Échec de la mise à jour de l'utilisateur" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Utilisateur introuvable" });
      } else {
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
      }
    }
  );
};

// delete/:id Supprimer utilisateur
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM user WHERE id = ?", userId, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Échec de la suppression de l'utilisateur" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Utilisateur introuvable" });
    } else {
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    }
  });
};

// post/login se logger 

exports.login = (req, res) => {

  const { email, password } = req.body;

  // Vérifiez les informations d'identification de l'utilisateur dans la base de données
  db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Echec demande de la base de données" });
    } else {
      if (results.length === 0) {
        res.status(401).json({ message: 'Informations identification non valides' });
      } else {
        const user = results[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          res.status(401).json({ message: 'mot de passe invalid' });
        } else {
          // Générez le token JWT avec les informations d'identification de l'utilisateur
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(200).json({ token, message: 'Connected...'});
        }
      }
    }
  });

};

// Route GET/me recupérer les infos de l'utilisateur 

exports.me =  (verifyToken , req, res) => {

  const userId = req.user.id;

  db.query("SELECT * FROM user WHERE id = ?", userId, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de l\'exécution de la requête :" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        const user = result[0];
        const { id, lastname,firstname, email, role } = user;
        res.status(200).json({ id, lastname, email, role, firstname });
      }
    }
  });

};
