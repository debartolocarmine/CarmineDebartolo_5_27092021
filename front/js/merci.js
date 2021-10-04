// On récupère la div dans laquelle l'on va injecter l'html de la page
let myApp = document.getElementById('contenu-principal');

// debut de la fontion thanks qui envoie l'html à la page
function thanks(){

    // je récupère l'order id que j'ai enregistré dans le localStorage
    let contactOrderId = localStorage.getItem('contactOrderId');

    // je récupère les informtions du customer que j'ai enregistré dans le localStorage
    let contact = localStorage.getItem('contact');

    // J'initialise la variable du html
    let templeteMerci = "" ;
    // Si un order id existe
    // j'envoie le message de remerciement
    if (contactOrderId) {
        
        // Je parse les informations du customer que j'ai récuperérecupere plus haut (ligne 12)
        let contactParse = JSON.parse(contact);

        // je calcule le montant total des produits dans le panier
        let totalPrice = getTotalPrice();

        // Je build mon template avec les variables nécéssaires
        templeteMerci += `<div class="row"><div class="col-sm-12">
        <div class="items">
            <h2 class="card-title mb-5">Merci ${contactParse.firstName} ${contactParse.lastName}</h2>
            <p>Votre commande n° ${contactOrderId}${totalPrice ? ' pour un montant de ' + totalPrice : ''} a bien été enregistrée.</p>
            <p>Vous recevrez bientôt un email de confirmation ainsi que la facture.</p>
            <p class="mt-5">À bientôt</p>
            <p>L'équipe de Orinoco</p>
        </div>
        </div></div>`;
        
    } else {
        // On clean le localstorage
        clearLocalStorage()
        window.location.href = "./index.html";
    }
    myApp.innerHTML = templeteMerci;
}

// Appel de la fonction thanks()
thanks()