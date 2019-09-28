let renderCountriesHtml = (countries) => {
    let htmlStr = '';
    let countriesTranslation = {};
    for(let country of countries) {
        countriesTranslation[country['alpha3code']] = country['name'];
    }
    for(let country of countries) {
        country.borderNames = [];
        for(let border of country.borders) {
            country.borderNames.push(countriesTranslation[border])
        }
         let currenciesArray = country.currencies.map(currency => currency.name);
        let langArray = country.languages.map(language => language.name);
        htmlStr += `<tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${langArray.join(', ')}</td>
            <td>${country.region}</td>
            <td>${country.population}</td>
            <td>${country.area + " km²"}</td>
            <td>${country.borderNames.join(', ')}</td>
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
            sortTable();
        }
    });
};

let sortTable = e => {
    let savedSort = localStorage.getItem('currencies.sort');
    let dataAttr = '';
    let isActive = '';
    let isReversed = '';
 
    if(!e) {
        if(savedSort) {
            savedSort = JSON.parse(savedSort).data;
            dataAttr = savedSort[0];
            isActive = savedSort[1];
            isReversed = savedSort[2];
        } else {
            renderCountriesHtml(countries);
            return;
        }
    } else {
        dataAttr = $(e.currentTarget).attr('data-attr');
        isActive = $(e.currentTarget).hasClass('active');
        isReversed = $(e.currentTarget).hasClass('reversed');
    }
 
    if(dataAttr) {
        localStorage.setItem('currencies.sort', JSON.stringify({data: [dataAttr, isActive, isReversed]}));
    }
    $('td.sortable').removeClass('active');
    $('td.sortable').removeClass('reversed');
    if(e) {
        $(e.currentTarget).addClass('active');
    } else if(dataAttr) {
        $(`.sortable[data-attr=${dataAttr}]`).addClass('active');
    }
    let sortedCountries = countries.sort((a, b) => {
        return a[dataAttr] > b[dataAttr];
    });
    if(isActive && !isReversed) {
        if(e) {
            $(e.currentTarget).addClass('reversed');
        } else if(dataAttr && isReversed) {
            $(`.sortable[data-attr=${dataAttr}]`).addClass('reversed');
        }
        renderCountriesHtml(sortedCountries.reverse());
    } else {
        renderCountriesHtml(sortedCountries);
    }
};

// $('.load-countries').click(loadCountries);
loadCountries();

$('.sorttable').click(sortTable);
// nazivaetsa CONCATENATION, TO CONCATENATE