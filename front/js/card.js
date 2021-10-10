// On récupère la div dans laquelle l'on va injecter l'html de la page
let myApp = document.getElementById('contenu-principal');

/*
 * validateFormBeforSubmit()
 *    Fonction pour valider la commande et obtenir son numéro
 * 
 * @param card,
 *    le panier courant du client
 * 
 */
function validateFormBeforSubmit(card) {
    // Je récupere le bouton submit 
    let subMitCard = document.getElementById('cdFormOrderSubmit')

    // Des produits sont dans le panier,
    // J'active le bouton submit
    subMitCard.disabled = false;

    // Function onclic pour envoyer la commande
    subMitCard.onclick = function () {

        // Je récupère les valeurs renseignées par le customer
        const firstName = document.getElementById('cdFormFirstname').value
        const lastName = document.getElementById('cdFormName').value
        const address = document.getElementById('cdFormAddress').value
        const city = document.getElementById('cdFormCity').value
        const email = document.getElementById('cdFormEmail').value

        // je prépare ma forme à valider par le process Boostrap
        const forms = document.querySelectorAll('.needs-validation');
        // Je lance la validation boostrap
        // @see https://getbootstrap.com/docs/5.0/forms/validation/
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                // Je lance la verification au sublit
                form.addEventListener('submit', function (event) {
                    // Je stoppe les action navigateur du submit par défaut
                    event.preventDefault();
                    event.stopPropagation();
                    // Tant que les champs ne sont pas correctement renseignés
                    // J'affiche les message erreurs au customer
                    if (!form.checkValidity()) {
                        // Need validation
                    } else {
                        // Si les informations fournies par le customer sont valides
                        // Jeprépare l'objet contact
                        let contact = {
                            firstName: firstName,
                            lastName: lastName,
                            address: address,
                            city: city,
                            email: email
                        };
                        // Puis je submit le formulaire
                        submitOrder(contact, card);
                    }
                    // Si les c ontrainte de valida tion des champs du formulaire sont valide
                    // Boostrap ajoute la class signifiant que le formulaire est valide
                    form.classList.add('was-validated');
                }, false)
            })
    }
}

/*
 * submitOrder()
 *    Fonction pour valider la commande et obtenir son numéro
 * 
 * @param contact,
 *    objet avec les information que le client a soumis via le formulaire
 * @param card,
 *    le panier courant du client
 * 
 */
function submitOrder(contact, card) {

    // On construit le endpoint d'envoie de commande
    const url = endPoint + catalogue + '/order';

    // Pour valider la commande, l'endpoint order demande un objet contact ainsi qu'un tableau d'ids de produits
    // Je récupère dans mon panier tous les ids des produits avec lequels je crée un tableau
    let tableCard = []
    // Lopp de tous les ids dans le panier
    for (let p_card of card) {
        tableCard.push(p_card.id)
    }

    // J'envoie la commande pour obtenir un numéro de commande
    // Avec la méthode post
    fetch(`${url}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contact: contact,
            products: tableCard
        })
    })
        .then(res => res.json())
        .then(res => {
            // Si je reçois une réponse positive
            if (res) {
                // On enregistre dans le localstorage le numero de commande
                // Ainsi que l'objet contact du customer pour l'afficher dans la page remerciement.
                storeLocalStorageInString('contact', contact)
              
                // On vide le panier
                localStorage.removeItem('panier');
                // On store l'id de la commande
                localStorage.setItem('contactOrderId', res.orderId);
                // Puis On redirige le customer sur la page remerciment
                window.location.href = "./merci.html";
            } else {
                // TODO : Préparer un messsage en cas d'echec de requête
            }
        });
}

// fonction permettant de construire la panier
function loadCard() {

    // Je déclare ma variable de retour
    let templeteCard = "";

    // Je requête le panier
    let card = getCard();

    // Si le panier existe 
    // Je constuit mon template
    if (card) {
          // On enregistre dans le localStorage le montant totalde la commande
          setTotalPrice();

        templeteCard += `<div class="row"><div class="col-sm-12"><table class="table">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th>Nom</th>
                <th>Type</th>
                <th>Prix</th>               
            </tr>
        </thead>
        <tbody>`;

        // je loop mon panier pour afficher les produits
        card.map(function (produit, e) {
            templeteCard += `<tr>
                <th scope="row">${e + 1}</th>
                <td><img style="width:100px;height:auto" src="${produit.img}"></td>
                <td>${produit.name}</td>
                <td>${produit.attr}</td>
                <td>${formatPriceToCurrency(parseInt(produit.price))}</td>
            </tr>`
            }
        );
        templeteCard += `</tbody><tfooter>
        <tr> 
            <th></th>
            <th></th>          
            <th></th>
            <th></th>
            <th>Total<br>${getTotalPrice()}</th>
        </tr>`;
   
        

        // Je clôture mon template
        templeteCard += ` </tfooter></table></div></div>`;


        validateFormBeforSubmit(card);

    } else {
        // S'il n'y a pas de produit dans le panier
        // Informer le customer qu'il doit mettre des produits dedans
        templeteCard += `<p>Le panier est vide.</p>
        <p>Veuillez mettre des produits dans votre panier pour lancer le processus de commande.</p>`;
    }

    // J'injecte le html dans la page
    myApp.innerHTML = templeteCard;
}

loadCard()