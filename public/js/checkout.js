"use strict";

const cart =  JSON.parse(localStorage.getItem("cart"));
console.log(cart);

// DISPLAY ORDER SUMMARY
const detailRowFragment = document.getElementById("detailRowTemplate")


window.onload = function displayOrderSummary() {

	const orderItemsBody = document.getElementById("orderItems"); 

	//add items	
	cart.items.forEach(item => {
		const newDetailsRow = document.importNode(detailRowFragment.content, true);

		newDetailsRow.querySelector(".detail-name").innerHTML = item.quantity + " - " + item.name;
		newDetailsRow.querySelector(".detail-price").innerHTML = "$" + item.total;

		orderItemsBody.appendChild(newDetailsRow);
	});

	document.querySelector(".order-subtotal").innerHTML = "$" + cart.total;
	// document.querySelector(".order-tax").innerHTML = "$" + cart.tax;
	document.querySelector(".order-total").innerHTML = "$" + cart.total;
}

// ACTIVATE Return to order page LINK
document.getElementById("returnLink").addEventListener("click", (e) => {

	e.preventDefault();

	document.location.href = "index.html#order";
});


// PAYPAL
const checkoutBtn = document.getElementById("paypal-button-container");

const product = {

    price: cart.total,
	description: "Online carryout/pickup purchase",
	// items: cart.items
}

paypal.Buttons({

	createOrder: function(data, actions) {

		return actions.order.create({

			purchase_units: [
				{
					description: product.description,
					amount: {
						currency_code: "USD",
						value: product.price
					},
					// items: product.items,
				}
			]
		});
	},

  	onApprove: function(data, actions) {

		return actions.order.capture().then(function(details) {
			localStorage.clear();
			document.location.href = "/index.html";
		});
	}
}).render('#paypal-button-container'); // Display payment options on your web page