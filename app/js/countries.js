let renderCountriesHtml = (countries) => {
    let htmlStr = '';
    for(let country of countries) {
        let currenciesArray = country.currencies.map(currency => currency.name);
        let langArray = country.languages.map(language => language.name);
        htmlStr += `<tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${langArray.join(', ')}</td>
            <td>${country.region}</td>
            <td>${country.population}</td>
            <td>${country.area + " km²"}</td>
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


$('.load-countries').click(loadCountries);


// nazivaetsa CONCATENATION, TO CONCATENATE