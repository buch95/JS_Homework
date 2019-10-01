function loadCurrency() {
    let reqDate = 0;
    let dateStorage = [];
    $('table tbody tr').remove();
    $('table').show();                                          // how to do slide in from top? .slideDown( function(){.show}) || opposite?
    reqDate = $('.curDate').val().split('-').join('');          //cascade
    if (reqDate === '') {
        let d = new Date();
        let mnth = d.getMonth() + 1;                            // starts from 0, so + 1
        if (mnth < 10) {
            mnth = '0' + mnth;
        }
        reqDate = [d.getFullYear(), mnth, d.getDate()].join('');
        // reqDate = "${ d.getFullYear() }${ mnth }${ d.getDate() }" Concatenation through html (htmlof Fullyear + mnth + getDate)
    };
    localStorage.setItem("date", reqDate);
    dateStorage = localStorage.getItem("date");