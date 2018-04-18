$(document).ready(function() {
    var ltcData = $.parseJSON($.ajax({
        url: "https://api.coinmarketcap.com/v1/ticker/litecoin/",
        dataType: "json",
        async: false
    }).responseText);

    var bchData = $.parseJSON($.ajax({
        url: "https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/",
        dataType: "json",
        async: false
    }).responseText);

    console.log(ltcData)
    let price = Number.parseFloat(ltcData[0].price_usd).toFixed(2);
    let bch_price = Number.parseFloat(bchData[0].price_usd).toFixed(2);
    let change_24h = ltcData[0].percent_change_24h;
    let change_1h = ltcData[0].percent_change_1h;
    let change_7d = ltcData[0].percent_change_7d;
    let coins = ltcData[0].available_supply.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.").slice(0, -7);;

    let cap = ltcData[0].market_cap_usd.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.").slice(0, -11);

    $('#usd_price').text("USD: $" + price);
    $('#btc_price').text("BTC: " + ltcData[0].price_btc.slice(0,-2));
    $('#bch_price').text("BCH: " + (price / bch_price).toFixed(4));
    $('#change_7d').text(change_7d + "%");
    $('#change_24h').text(change_24h + "%");
    $('#change_1h').text(change_1h + "%");
    $('#market_cap').text(cap + "B");
    $('#rank').text(ltcData[0].rank);
    $('#coins').text(coins + "M");

    if (change_7d >= 0)
        $('#change_7d').css('color', '#40ba00');
    if (change_24h >= 0)
        $('#change_24h').css('color', '#40ba00');
    if (change_1h >= 0)
        $('#change_1h').css('color', '#40ba00')

    $('#usd-chart-btn').click(function() {
        $('#btc-chart-btn').removeClass('active-btn');
        $(this).toggleClass('active-btn');
        $('#ltc-btc-chart').hide();
        $('#ltc-usd-chart').toggle();
    });

    $('#btc-chart-btn').click(function() {
        $('#usd-chart-btn').removeClass('active-btn');
        $(this).toggleClass('active-btn');
        $('#ltc-usd-chart').hide();
        $('#ltc-btc-chart').toggle();
    });

    $('.donationButton').click(function() {
        $('#donationsModal').show();
    });

    $('.closeDonations').click(function() {
        $('#donationsModal').hide();
    });

    if ($(window).width() <= 600) {
        $('#1h_row').insertBefore($('#7d_row'));
        $('#24h_row').insertBefore($('#7d_row'));
    }
});

