// On récupère la div avec la méthode document.getElementById dans laquelle l'on va injecter l'html de la page
let myApp = document.getElementById('contenu-principal');

// On construit le endpoint d'envois de commande
const url = endPoint + catalogue;

// fonction qui requête la liste des produits
// Et qui l'injecte dans le html
function loadListProducts() {

    // On déclare notre variable de retour
    let templeteProducts = ''; 

    // la requête fetch prend en argument le chemin de la ressource (url) que nous souhaitons récupérer 
    // et que nous souhaitons injecter dans l'html 
    fetch(url)

    // et renvoie une promesse(promise) contenant, en réponse de la part du navigateur, un objet (de type Response).
    // puis la promesse est retourné parsée au format JSON (objet contenant les données).
    .then((resp) => resp.json())
    
    // une autre promesse est crée dans la quelle une fonction contient le resultat de ce resp.jon.
    .then(function(produits) {
    console.log(produits)
        // j'ouvre la div template
        templeteProducts += '<div class="row">';  

        // Si la requête renvoie des produits 
        // On loop le tableau de produits pour construire le template qu'on injecte dans le html
        if (produits && produits.length > 0 ) {
            produits.map(function(produit) {

                templeteProducts += `<div class="col-sm-4 mb-4">
                    <div class="card">
                        <img src="${produit.imageUrl}" class="card-img-top" alt="illustration du produit ${produit.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                            <a href="./produit.html?_id=${produit._id}">${produit.name}</a>
                            </h5>
                            <p class="card-text">${formatPriceToCurrency(parseInt(produit.price))}</p>
                            <p class="card-text"> ${produit.description}</p>
                            <p class="card-text"> ${produit.colors}</p>
                            <a href="#" class="btn btn-primary" onclick="event.preventDefault();addToCard('${produit._id}', '${produit.name}', '${produit.imageUrl}', '${produit.price}')">Ajouter au panier</a>
                        </div>
                    </div>
                </div>`
                
            })
        }else {
            // si le tableau est vide
            // On en informe le customer.
            templeteProducts += `<p>Liste vide.</p>`
        }

        templeteProducts += '</div>'; 
        // On injecte le html dans la page
        myApp.innerHTML = templeteProducts;

    })
    .catch(function(error) {
        templeteProducts = `<h2>Erreur de requete</h2><p>Désolé, il semble y avoir un problème de requête, veuillez contacter l'administrateur du site.</p>`
        // On injecte le html dans la page
        myApp.innerHTML = templeteProducts;
    });
}

loadListProducts()