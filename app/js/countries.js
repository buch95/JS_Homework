let renderCountriesHtml = (countries) => {
    let htmlStr = '';
    let countriesTranslation = {};
    for(let country of countries) {
        countriesTranslation[country['alpha3code']] = country['name'];
    }
    for(let country of countries) {
        country.borderNames = [];
        // for(let border of country.borders) {
        //     for(let countryObj of countries) {
        //         if(border === countryObj['alpha3code']) {
        //             country.borderNames.push(countryObj['name']);
        //         }
        //     }
        // }
        let currenciesArray = country.currencies.map(currency => currency.name);
        let langArray = country.languages.map(language => language.name);
                                                                // for(let i of borderArray){
                                                                //     if(i === country.alpha3code){
                                                                //         borderArray[i] = country.name;
                                                                //     }
                                                                // };
        htmlStr += `<tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${langArray.join(', ')}</td>
            <td>${country.region}</td>
            <td>${country.population}</td>
            <td>${country.area + " km²"}</td>
            <td>${country.borderNames}</td>
            <td>${currenciesArray.join(', ')}</td>
            <td><img height="50" src="${country.flag}"></td>
        </tr>`;
    }
    $('table.countries tbody').html(htmlStr);
};

let loadCountries = e => {
    $.ajax({
        method: 'GET',
        url: 'https://restcountries.eu/rest/v2/all',
        success: (response) => {
            renderCountriesHtml(response);
            
        }
    })
}

let sortTable = e => {
    let dataAttr = $(e.currentTarget).attr('data-attr');
    countries.sort((a,b) =>{
        return a[dataAttr] < b[dataAttr];
    })

    // renderCountriesHtml(countires.reverse());
}

// $('.load-countries').click(loadCountries);
loadCountries();

$('.sorttable').click(sortTable);
// nazivaetsa CONCATENATION, TO CONCATENATE