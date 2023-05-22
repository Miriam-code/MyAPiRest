Technologie

Pour ce projet, vous devez utiliser NodeJs, Expresse, MySQL, PostMan.

Consignes générales

Pour ce projet, vous êtes en charge de la réalisation de la partie
serveur.
Vous devez donc implémenter une API et mettre en place une base de
données et tout le nécessaire pour qu'elle soit pleinement
fonctionnelle.
Faites attention dans vos développements, privilégiez le bon
fonctionnement d'une route plutôt qu'un de fonctionnement de
plusieurs.

Mode d’accès

On utilisera une authentification http basic.

Les Routes

Route n°1 : POST /users

Cette route permet d’ajouter un nouvel utilisateur exemple de données
pouvant être envoyé.

{
    "lastname": "Zak",
    "firstname": "Kherfi",
    "email": "zakkherfi@gmail.com",
    "password": "pass",
    "role": "admin"
}

Aucun sens, aucun sens envoyer ne sera vide une erreur sera renvoyé.
Les données seront présentés comme dans l’exemple ci-dessus (sauf le champ id qui devra être auto générer par la base de données).
Les réponses possibles sont :
● L'utilisateur a bien été crée
○ On renvoie le status code: 201
○ On renvoie le message: User successfully created
● Une erreur s'est produite
○ On renvoie le status code: 400
○ On renvoie le Message : An error occurred.
Vous devez utiliser le module jwt pour le côté sécurité.
Le password doit être haché.

Route n°2 : PUT /user/{id}

Cette route permet de modifier un utilisateur.
Le paramètre id signifie "user id" autrement dit c'est l'id de
l'utilisateur en base de données.
Le paramètre id est obligatoire s'en quoi une erreur sera renvoyée
Exemple de données pouvant être envoyées.

// PUT / User/13
{
    "lastname": "Zakka"
}

// PUT / User/48
{
    "lastname": "John"
    "firstname": "Doe",
    "email": "John-doe@gmail.com",
}

// PUT / User/98

{
    "role": "admin"
} 

Les réponses possibles sont :
● L'utilisateur a bien été modifié
○ On renvoie le status code: 200
○ On renvoie le message: User successfully modified
● Une erreur s'est produite
○ On renvoie le status code: 400
○ On renvoie le message: An error occurred
● Si l'id est invalide (donc que l'utilisateur en question n'a pas
été trouvé) On renvoie le status code: 404 On renvoie le message:
User was not found.
Route n°3 DELETE /user/{id}
Cette route permet de supprimer un utilisateur
Le paramètre id signifie "user id" autrement dit c'est l'id de
l'utilisateur en base de données.
Le paramètre id est obligatoire s'en quoi une erreur sera renvoyée
Les réponses possibles sont :

● L'utilisateur a bien été supprimé
○ On renvoie le status code: 200
○ On renvoie le message: User successfully deleted
● Une erreur s'est produite
○ On renvoie le status code: 400
○ On renvoie le message : An error occurred
● Si l'uid est invalide (donc que l'utilisateur en question n'a pas
été trouvé)
○ On renvoie le status code: 404
○ On renvoie le message: User was not found
Route n°4 : GET /user/{id}
Cette route permet de récupérer les données d'un utilisateur
Le paramètre id signifie "user id" autrement dit c'est l'id de
l'utilisateur en base de données. Le paramètre uid est obligatoire
s'en quoi une erreur sera renvoyée
Exemple de données devant être renvoyées.

// GET /user/13

{
    "id": 13,
    "lastname": "Zak",
    "firstname": "Kherfi",
    "email": "zakkherfi@gmail.com",
    "password": "pass",
    "role": "admin"
}

Toutes les données concernant un utilisateur devront être renvoyées
sous forme de JSON.
Les réponses possibles sont :
● L'utilisateur bien été récupéré
○ On renvoie le status code: 200
○ On renvoie un objet JSON avec les données de l'utilisateur
comme ci dessus.
● Une erreur s'est produite
○ On renvoie le status code: 400
○ On renvoie le message: An error occurred
● Si l'uid est invalide (donc que l'utilisateur en question n'a pas
été trouvé)
● On renvoie le status code: 404 On renvoie le message: User was
not found

Route n°5 : GET /users
Cette route permet de récupérer les informations de tous les
utilisateurs de la base de données Le type de retour doit être un
tableau JSON d'objets user.
Exemple de données devant être renvoyées.
Toutes les données concernant les utilisateurs devront être renvoyées
sous forme de JSON (sauf le password).
Les réponses possibles sont :
● Les utilisateurs a bien été récupérés
○ On renvoie le status code: 200
○ On renvoie un tableau JSON avec les données des utilisateurs
comme ci-dessus.
● Une erreur s'est produite
○ On renvoie status code: 400
○ On renvoie le message: An error occurred
8
Route n°6 : POST /login
Cette route permet aux utilisateurs de se logger avec un mail et un
password.
Vous devez bien gérer les erreurs et les réponses et leurs codes
status.

Route n°7 : GET /me
Cette route permet de récupérer toutes les informations de la personne connecté.