var itemCount = 0;
var priceTotal = 0;
var quantity = 0;
var clone = "";
$(document).ready(function () {

	// $.ajax({
	// 	method: "GET",
	// 	url: "/api/items",
	// 	dataType: 'json',
	// 	success: function (data) {
	// 		console.log(data);
	// 		$.each(data, function (key, value) {
	// 			// console.log(key);
	// 			id = value.item_id;
	// 			var item = `<div class='item'><div class='itemDetails'><div class='itemImage'><img src= ${value.image} width='200px', height='200px'/></div><div class='itemText'><p class='price-container'>Price: Php <span class='price'> ${value.sell_price} </span></p><p> ${value.description} </p></div><input type='number' class='qty' name='quantity' min='1' max=${value.stock.quantity}><p class='itemId'> ${value.item_id}</p></div><button type='button' class='btn btn-primary add'>Add to cart</button></div>`;
	// 			$("#items").append(item);

	// 		});

	// 	},
	// 	error: function () {
	// 		console.log('AJAX load did not work');
	// 		alert("error");
	// 	}
	// });

	$.ajax({
		method: "GET",
		url: "/api/item-all",
		dataType: 'json',
		success: function (data) {
			console.log(data);
			$("#items").empty();
			// Start a row
			let row;
			$.each(data, function (key, value) {
				if (key % 4 === 0) {
					row = $('<div class="row"></div>');
					$("#items").append(row);
				}
				// console.log(key);
				var item = `<div class="col-md-3 mb-4">
            <div class="card h-100"><img src="${value.image}" class="card-img-top" alt="${value.description}" ><div class="card-body"><h5 class="card-title">${value.description}</h5><p class="card-text">₱ ${value.sell_price}</p><p class="card-text"><small class="text-muted">Stock: ${value.stock.quantity ?? 0}</small></p><a href="#!" class="btn btn-primary show-details" role="button" data-id="${value.item_id}"
                                data-description="${value.description}"
                                data-price="${value.sell_price}"
                                data-image="${value.image}"
                                data-stock="${value.stock.quantity ?? 0}">Details</a></div></div></div>`;
				row.append(item);

			});
			$(".show-details").on('click', function () {
				// Get product data from button attributes
				const id = $(this).data('id');
				const description = $(this).data('description');
				const price = $(this).data('price');
				const image = $(this).data('image');
				const stock = $(this).data('stock');

				// Build product details div
				const detailsHtml = `
                <div id="productDetailsOverlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">
                  <div id="productDetails" style="background:#fff;padding:30px 20px 20px 20px;max-width:400px;width:100%;border-radius:8px;position:relative;">
                    <button id="closeProductDetails" style="position:absolute;top:10px;right:10px;" class="btn btn-sm btn-secondary">&times;</button>
                    <div class="text-center">
                      <img src="${image}" class="img-fluid mb-3" style="max-height:200px;">
                      <h5>${description}</h5>
                      <p id="price">Price: ₱<strong>${price}</strong></p>
                      <p>Stock: ${stock}</p>
                      <input type="number" class="form-control mb-3" id="detailsQty" min="1" max="${stock}" value="1">
                      <input type="hidden" id="detailsItemId" value="${id}">
                      <button type="button" class="btn btn-primary" id="detailsAddToCart">Add to Cart</button>
                    </div>
                  </div>
                </div>
                `;

				// Remove any existing overlay and append new one
				$("#productDetailsOverlay").remove();
				$("body").append(detailsHtml);



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