

# Orinoco

## Prérequis

Pour disposer de l'api, veuillez suivre les instructions du dossier [**backend**](https://github.com/debartolocarmine/CarmineDebartolo_5_27092021/tree/main/back)

## Architecture générale

### L’application web sera composée de 4 pages :

- une page de vue sous forme de liste, montrant tous les articles disponibles à la vente;
- une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier;
- une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date;
- une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

### Types de données
Tous les produits possèdent les attributs suivants :

| Champ |Type |
| :----------: | :----------: |
| id | ObjectID |
| name | string |
| price | number |
| description | string |
| imageUrl | string |

Chaque type de produit comporte un tableau contenant les strings correspondant aux options de personnalisation :

| Type de produit | Tableau de personnalisation |
| :----------: | :----------: |
| Caméras | lentilles |
| Ours en peluche | couleurs |
| Meubles en chêne | vernis |