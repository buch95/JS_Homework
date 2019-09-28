
 $('.curDate').focus(function (){this.type='date'}) // call before or at the end?

function loadCurrency(){
    $('table tbody tr').remove();
    $('table').show();    // how to do slide in from top? .slideDown( function(){.show}) || opposite?
    let reqDate = $('.curDate').val().split('-').join(''); //cascade
    if(reqDate === ''){
        let d = new Date(); 
        let day = d.getDate();
        let mnth = d.getMonth() +1; // starts from 0, so + 1
        if(mnth < 10){
            mnth = '0' + mnth;
        }
        let year = d.getFullYear();
        reqDate = [year, mnth, day].join(''); 
    };

$.ajax({
    url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + reqDate + '&json',
    method: 'GET',
    success: (data) => {
        if(data.length === 0){
            $('.curDate').val('');
        }
        let htmlStr = '';
        for(let i of data){
            htmlStr += `<tr>
                <td>${i.txt}</td>
                <td>${i.rate.toFixed(3)}</td>
                <td>${i.cc}</td>
                <td>${i.exchangedate}</td>
                </tr>`;
        }
        $('table tbody').html(htmlStr);
    },
    error: (e) => {
        console.log(e);
    }
});
};

$('table').hide();
$('.curDate').change(function(){
    loadCurrency();
});
// loadCurrency();

$('.load-currencies').on('click', loadCurrency);













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
