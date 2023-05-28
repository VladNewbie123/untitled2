let cart = {}; //моя корзина
$('document').ready(function () {
    loadGoods();
    checkCart();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        let out = '';
        for (let key in data) {
            out += '<div class="single-goods">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Ціна: ' + data[key]['cost'] + ' грн</p>';
            out += '<img src="' + data[key].image + '" alt="image">';
            out += '<button class="add-to-cart" data-art="' + key + '">Покласти до кошика</button>'
            out += '</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart() {
    //добавить товар в корзину
    const articul = $(this).attr('data-art');
    if (cart[articul] !== undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log(cart);
    showMiniCart();
}

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') !== null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    //показывает содержимое корзины
    let out = '';
    for (let w in cart) {
        out += 'Вибрана кількість ' + w + ': ' + cart[w] + '<br>';
    }
    out+='<br><a href="cart.html">Перейти до кошика</a>';
    $('#mini-cart').html(out);
}
