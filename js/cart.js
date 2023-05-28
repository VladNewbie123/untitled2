let cart = {};//корзина

$.getJSON('goods.json', function (data) {
    let goods = data;//все товары в массиве
    //console.log(goods);
    checkCart();
    console.log(cart);
    showCart();

    function showCart() {
        if ($.isEmptyObject(cart)) {
            const outt = 'Кошик порожній. <a href="index.html">Перейти до товарів.</a>'
            $('#my-cart').html(outt);
        } else {
            let out = '';
            let ou = 0;
            for (let key in cart) {
                out += '<button class="delete" data-art="' + key + '">x</button>' + ' ';
                out += '<img src="' + goods[key].image + '" width="100" alt="imege">';
                out += ' ' + goods[key].name + ' ';
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += ' Кількість: ' + cart[key] + ' ';
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += ' Сума: ' + cart[key] * goods[key].cost;
                out += '<br>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);

            for (let key1 in cart) {
                ou += cart[key1] * goods[key1].cost;
            }
            out += '<br>';
            out += '<br>';
            out += 'Загальна сума до сплати: ' + ou + ' грн';
            $('#my-cart').html(out);
        }
    }


    function plusGoods() {
        let articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS();//сохранняю корзину в LocalStorage
        showCart();
    }

    function minusGoods() {
        let articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
            saveCartToLS();//сохранняю корзину в LocalStorage
        }
        showCart();
    }

    function deleteGoods() {
        let articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();//сохранняю корзину в LocalStorage
        showCart();
    }
});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') !== null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

