// On récupère la div dans laquelle on va injecter l'html de la page
let myApp = document.getElementById('contenu-principal');

// Je récupère l'id du produit a afficher dans l'url
const _id = getParameterId()


// On construit le endpoint d'envois de commande au quel on ajoute l'id récuperé dans l'url
const url = endPoint + catalogue + '/' + _id;

// Fonction permettant de créer un élément html
// Méthode utilisée uniquement pour la page produit
// Pour les autre on utilise les ``.
/*
 * createNode()
 *    Fonction permettant de créer un élément html 
 * 
 * @param element
 *    Type d'élément a créer (a, div, span)
 * 
 */
function createNode(element) {
    return document.createElement(element);
}
// Fonction permetant d'accrocher un élément html a un autre
/*
 * pTag()
 *    Fonction permettant d'ajouter un élément html a un autre élément html
 * 
 * @param parent,
 *    élément html au quel on voudrait ajouter un autre élément
 * @param el,
 *    élément html a ajouter au parent
 * 
 */
function pTag(parent, el) {
    return parent.appendChild(el);
}


// Fonction réalisant la requête fetch d'un produit
function loadProduct() {
    //je lance ma requête avec la fonction fetch
    fetch(url)
        .then((resp) => resp.json())
        .then(function(produit) {
            // on test si un produit nous est retourné. 
            //si l'objet est retourné vide on affiche un message d'erreur
            if (Object.keys(produit).length === 0) {
                myApp.innerHTML = `<h2>Produit inexistant.</h2>
                <p>Il n'y a pas de produit avec cet id.</p>`
            }else{
                //sinon je récupère un produit
                //je supprime le spinner
                myApp.innerText = ''

                // je crée un élément div avec class row
                let rowContent = createNode('div');
                rowContent.classList.add('row')

                // je crée un élément div avec class COL-SM-8 pour l'image
                let colContent8 = createNode('div');
                colContent8.classList.add("col-sm-8","my-5");
                // je crée un élément img
                let img = createNode('img');
                // et je lui renseigne la source de l'image et un class fluide pour le responsive
                img.src = produit.imageUrl;
                img.classList.add("img-fluid");
                //ensuite j'accroche l'image a ma première col
                pTag(colContent8, img);

                // je crée un élément div avec class COL-SM-4 pour les infos
                let colContent4 = createNode('div');
                colContent4.classList.add("col-sm-4","my-5");
                // je crée un élément h1 avec avec en innertext le titre du produit
                let titleH1 = createNode('h1');
                titleH1.innerText = produit.name;
                pTag(colContent4, titleH1);
                // je crée un élément strong avec avec en innertext le prix du produit
                let prixP = createNode('strong');
                prixP.innerText = formatPriceToCurrency(parseInt(produit.price));
                pTag(colContent4, prixP);
                // je crée un élément p avec avec en innertext la description du produit
                let descriptionP = createNode('p');
                descriptionP.innerText = produit.description;
                pTag(colContent4, descriptionP);
                // je crée un élément button avec avec en innertext 'Ajout au panier'
                let submitA = createNode('a');
                submitA.innerText = 'Ajouter au panier';
                submitA.href = '#';
                submitA.classList.add("btn", "btn-primary");
                submitA.onclick = function () {
                    addToCard(produit._id, produit.name, produit.imageUrl, produit.price)
                };
                pTag(colContent4, submitA);

                // On inject les col dans la row
                pTag(rowContent, colContent8);
                pTag(rowContent, colContent4);
                // On inject la row dans lehtml
                pTag(myApp, rowContent);

            }

        })
        .catch(function(error) {
            myApp.innerHTML = `<h2>Erreur de requete.</h2>
            <p>Veuillez contacter l'administrateur.</p>`
        });
}

// Je load le produit
loadProduct()