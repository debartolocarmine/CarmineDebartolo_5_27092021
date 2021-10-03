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

