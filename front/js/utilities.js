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