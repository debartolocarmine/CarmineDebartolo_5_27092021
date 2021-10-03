const endPoint = 'http://localhost:3000/api/';
const catalogue = 'cameras';

/*
 * formatPriceToCurrency()
 *    Fonction permettant de formatter un prix en centimes d'euros en euros ou dollars, etc... 
 * 
 * @param price
 *    Le prix a formatter
 * @param country
 *    Le code pays /// en-EN / fr-FR|EUR etc
 *    see https://stackabuse.com/how-to-format-number-as-currency-string-in-javascript/
 * @param currency
 *    La devise courante USD|EUR
 * 
 */
function formatPriceToCurrency(price, country = 'fr-FR', currency = 'EUR') {

    // Prépare la variable de retour
    let priceToConvert = null

    // Si le prix a formatter existe et qu'il est de type integer
    // Formate le
    if (price && typeof price == 'number') {
        // le prix original est en centimes 
        // On le converti en le divisant par 100
        let formatedprice = price / 100
        // On utilise la fonction javascipt toLocaleString pour formatter le prix dans la divise euros
        priceToConvert = formatedprice.toLocaleString(country, { style: 'currency', currency: currency, minimumFractionDigits: 2 })
    }
    return priceToConvert
}

/*
 * getParameterId() 
 *  fonction qui renvoie les ids passés dans l'url
 *
 */
function getParameterId() {
    let _id = null;
    //je récupère le parametre search de l'objet location de window
    //qui renvois tous les paramètres passés dans l'url 
    const paramatersString = window.location.search;
    // Si des paramètres existes
    // On les passe à la fonction javascript URLSearchParams
    if (paramatersString) {
        //Je convertis avec la fonction urlSearchParams qui me transforme la string obtenue dans l'url en objet
        const urlParams = new URLSearchParams(paramatersString);
        //Ce qui me permet d'appeler les parametres par leur nom(id)
        _id = urlParams.get('_id')
    }

    return _id;
}

/*
 * getCard() 
 *  fonction qui renvoie le panier ou null si vide
 *
 */
function getCard() {
    // On prépare une variable
    let shoppingCardParse = null
    // On récupere le panier danslelocalStorage
    let shoppingCard = localStorage.getItem('panier');
    // Si lepanier existe on le parse sinon on renvoie null
    if (shoppingCard) {
        shoppingCardParse = JSON.parse(shoppingCard);
    }
    return shoppingCardParse;
}

/*
 * storeLocalStorageInString()
 *    Fonction permettant de d'enregister un objet en chaine de caractéres dans le locaStorage 
 * 
 * @param key
 *    la clef de l'élément a ajouter 
 * @param value
 *    la valeur de l'élément a ajouter    
 * 
 */
function storeLocalStorageInString(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

/*
 * addToCard()
 *    Fonction permettant d'ajouter un produit au panier
 * 
 * @param id
 *    l'id du produit a ajouter
 * @param name
 *   le nom du produit a ajouter
 * @param img
 *   l'image du produit a ajouter
 * @param price
 *   le prix du produit a ajouter 
 * 
 */
function addToCard(id, name , img, price) {
    let product = {};

    let card = getCard();

    if (card && Array.isArray(card) && card.length != 0) {
     

        product = {
            id, name, img, price
        }

        card.push(product);

        storeLocalStorageInString('panier', card);

    }else{
        product = {
          id, name, img, price
        }
        storeLocalStorageInString('panier', [product]);
    }
}

/*
 * clearLocalStorage()
 *    Fonction permettant de vider le localStorage
 * 
 */
function clearLocalStorage(){
    localStorage.clear()
}