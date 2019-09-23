$.ajax({
    url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
    method: 'GET',
    dataType: 'json',
    success: (data) => {
        $(data).each(function (i, currency) {
                    $('#jsontb').append($("<tr>")
                        .append($("<td>").append(currency.txt))
                        .append($("<td>").append(currency.rate))
                        .append($("<td>").append(currency.cc))
                        .append($("<td>").append(currency.exchangedate)));
                });
    },
    error: (e) => {
        console.log(e);
    }
});

// $.getJSON('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', function (data) {
//     // esli vivesti v consol: console.log(data)
//     $(data).each(function (i, currency) {
//         $('#jsontb').append($("<tr>")
//             .append($("<td>").append(currency.txt))
//             .append($("<td>").append(currency.rate))
//             .append($("<td>").append(currency.cc))
//             .append($("<td>").append(currency.exchangedate)));
//     });
// })
//     .done(function () {
//         console.log("Completed");
//     })
//     .fail(function (e) {
//         console.log('error:');
//         console.error(e);
//     });
