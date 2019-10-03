

let reqDate = 0;
let dateStorage = [];
let textVal = '';

$('.curDate').focus(function () { this.type = 'date' });
$('.curInput').on("keypress", function () { return (event.keyCode > 1071 && event.keyCode < 1112) || (event.keyCode > 1029 && event.keyCode < 1132) }); // only cyrillic letters



function loadCurrency() {
    $('table tbody tr').remove();
    $('table').show();
    reqDate = $('.curDate').val().split('-').join('');
    if (reqDate === '') {
        let d = new Date();
        let mnth = d.getMonth() + 1;
        if (mnth < 10) {
            mnth = '0' + mnth;
        }
        reqDate = [d.getFullYear(), mnth, d.getDate()].join('');
        // reqDate = "${ d.getFullYear() }${ mnth }${ d.getDate() }" Concatenation through html (htmlof Fullyear + mnth + getDate)
    };
    localStorage.setItem("date", reqDate);
    dateStorage = localStorage.getItem("date");

    let appendData = e => {
        if (e.length === 0) {
            alert("No data available for " + $('.curDate').val());
        }
        let htmlStr = '';
        for (let i of e) {
            htmlStr += `<tr>
                <td>${i.txt}</td>
                <td>${i.rate.toFixed(3)}</td>
                <td>${i.cc}</td>
                <td>${i.exchangedate}</td>
                </tr>`;
        }
        $('table tbody').html(htmlStr);
    }

    let filterInput = e => {
        let htmlStr = '';
        for (let i of e) {
            if (i.txt.toLowerCase().indexOf(textVal) != -1) {       //esli est takoi text v pole to index budet ne 0, znachit vivesti na ekran
                htmlStr += `<tr>
                    <td>${i.txt}</td>
                    <td>${i.rate.toFixed(3)}</td>
                    <td>${i.cc}</td>
                    <td>${i.exchangedate}</td>
                    </tr>`;
            }
        }
        $('table tbody').html(htmlStr);
    }

    $.ajax({
        url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + dateStorage + '&json',
        method: 'GET',
        success: (data) => {
            if(textVal === ''){
            appendData(data);
            }else {
            filterInput(data);
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
};



$('table').hide();
$('.curDate').change(function () {
    loadCurrency();
});
$('.curInput').change(function () {
    textVal = $('.curInput').val().toLowerCase();
    loadCurrency();
})
// loadCurrency();
$('.load-currencies').on('click', loadCurrency);




// $('.curInput')








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
