const getCart = () => {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

$(document).ready(function () {
    function renderCart() {
        let cart = getCart();
        let html = '';
        let total = 0;

        if (cart.length === 0) {
            html = '<p>Your cart is empty.</p>';
        } else {
            html = `<table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>`;
            cart.forEach((item, idx) => {
                let subtotal = item.price * item.quantity;
                total += subtotal;
                html += `<tr>
                    <td><img src="${item.image}" width="60"></td>
                    <td>${item.description}</td>
                    <td>₱ ${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>₱ ${(subtotal).toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm remove-item" data-idx="${idx}">&times;</button></td>
                </tr>`;
            });
            html += `</tbody></table>
                <h4>Total: ₱ ${total.toFixed(2)}</h4>`;
        }

        $('#cartTable').html(html);
    }

    // Remove item event
    $('#cartTable').on('click', '.remove-item', function () {
        let idx = $(this).data('idx');
        let cart = getCart();
        cart.splice(idx, 1);
        saveCart(cart);
        renderCart();
    });

    // Checkout event (example)
   
    $('#checkoutBtn').on('click', function () {

        itemCount = 0;
        priceTotal = 0;
        let cart = getCart()
        console.log(JSON.stringify(cart));
        // var data = JSON.stringify(items);

        $.ajax({
            type: "POST",
            url: "/api/items/checkout",
            data: JSON.stringify(cart),

            dataType: "json",
            processData: false,
            contentType: 'application/json; charset=utf-8',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function (data) {
                console.log(data);
                alert(data.status);
                Swal.fire({
                    icon: "success",
                    
                    text: data.status,
                    // position: 'bottom-right'
                    
                });
                localStorage.removeItem('cart')
                 renderCart();

            },
            error: function (error) {
                console.log(error);
            }
        });
       
    });
    renderCart();
});