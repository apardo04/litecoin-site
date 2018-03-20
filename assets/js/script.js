$(document).ready(function() {
    var ltcData = $.parseJSON($.ajax({
        url: "https://api.coinmarketcap.com/v1/ticker/litecoin/",
        dataType: "json",
        async: false
    }).responseText);

    let change_24h = ltcData[0].percent_change_24h;
    let change_1h = ltcData[0].percent_change_1h;
    let change_7d = ltcData[0].percent_change_7d;

    let cap = ltcData[0].market_cap_usd.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0, -2);

    $('#usd_price').text("USD: $" + ltcData[0].price_usd)
    $('#change_7d').text(change_7d + "%")
    $('#change_24h').text(change_24h + "%")
    $('#change_1h').text(change_1h + "%")
    $('#btc_price').text("BTC: $" + ltcData[0].price_btc)
    $('#market_cap').text("Market Cap: " + cap)

    if (change_7d >= 0)
        $('#change_7d').css('color', '#40ba00')
    if (change_24h >= 0)
        $('#change_24h').css('color', '#40ba00')
    if (change_1h >= 0)
        $('#change_1h').css('color', '#40ba00')

    googleTrends.interestOverTime({keyword: 'Litecoin'})
        .then(function(results){
            console.log('These results are awesome', results);
        })
        .catch(function(err){
            console.error('Oh no there was an error', err);
        });
});

