var itemCount = 0;
var priceTotal = 0;
var quantity = 0;
var clone = "";
$(document).ready(function () { 

    $.ajax({
		method: "GET",
		url: "/api/items",
		dataType: 'json',
		success: function (data) {
			console.log(data);
			$.each(data, function (key, value) {
				// console.log(key);
				id = value.item_id;
				var item = `<div class='item'><div class='itemDetails'><div class='itemImage'><img src= ${value.image} width='200px', height='200px'/></div><div class='itemText'><p class='price-container'>Price: Php <span class='price'> ${value.sell_price} </span></p><p> ${value.description} </p></div><input type='number' class='qty' name='quantity' min='1' max=${value.stock.quantity}><p class='itemId'> ${value.item_id}</p></div><button type='button' class='btn btn-primary add'>Add to cart</button></div>`;
				$("#items").append(item);

			});

		},
		error: function () {
			console.log('AJAX load did not work');
			alert("error");
		}
	});

    $("#items").on('click', '.add', function () {
		itemCount++;
		$('#itemCount').text(itemCount).css('display', 'block');
		clone = $(this).siblings().clone().appendTo('#cartItems')
			.append('<button class="removeItem">Remove Item</button>');
		// // Calculate Total Price
		var price = parseFloat($(this).siblings().find('.price').text());
		priceTotal += price;
		$('#cartTotal').text(`Total: php ${priceTotal}`);
	});

    $('.openCloseCart').click(function () {
		$('#shoppingCart').show();
	});

    $('#close').click(function () {
		$('#shoppingCart').hide();
	});

    $('#shoppingCart').on('click', '.removeItem', function () {
		$(this).parent().remove();
		itemCount--;
		$('#itemCount').text(itemCount);

		// Remove Cost of Deleted Item from Total Price
		var price = parseInt($(this).siblings().find('.price').text());
		priceTotal -= price;
		$('#cartTotal').text("Total: php" + priceTotal);

		if (itemCount === 0) {
			$('#itemCount').css('display', 'none');
            $('#shoppingCart').hide();
		}
	});

    $('#emptyCart').click(function () {
		itemCount = 0;
		priceTotal = 0;

		$('#itemCount').css('display', 'none');
		$('#cartItems').text('');
		$('#cartTotal').text("Total: php" + priceTotal);
	});

	 $('#checkout').click(function () {
		itemCount = 0;
		priceTotal = 0;
	
		let items = new Array();
		$("#cartItems").find(".itemDetails").each(function (i, element) {
			let itemid = 0;
			let qty = 0;
			qty = parseInt($(element).find($(".qty")).val());
			itemid = parseInt($(element).find($(".itemId")).html());
			items.push(
				{
					item_id: itemid,
					quantity: qty
				}
			);
		});
		console.log(items)
		// console.log(JSON.stringify(items));
		// var data = JSON.stringify(items);

		$.ajax({
			type: "POST",
			url: "/api/items/checkout",
			data: items,
			
			dataType: "json",
			processData: false,
			contentType: 'application/json; charset=utf-8',
			success: function (data) {
				console.log(data);
				alert(data.status);
			},
			error: function (error) {
				alert(data.status);
			}
		});
		$('#itemCount').css('display', 'none');
		$('#cartItems').text('');
		$('#cartTotal').text("Total: php" + priceTotal);
		$('#shoppingCart').hide();

		// console.log(clone.find(".itemDetails"));

	});
})