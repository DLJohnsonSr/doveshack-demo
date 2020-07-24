"use strict";

// SET CART empty cart OR from localStorage
const cart = function loadCart() {

    console.log(localStorage.getItem("cart"))
    if(localStorage.getItem("cart") != null){
        console.log("JSON")
        return JSON.parse(localStorage.getItem("cart"));
    }
    else {
        return {
            total: 0,
            numberOfItems: 0,
            items: []
            }
        }
}();

// LOAD CART on window load
window.onload = updateCartDisplay(cart);

// OPEN CART when cart icon clicked
document.getElementById("iconArea").addEventListener("click",()=>{
    
    openCloseCart();
});

//ACTIVATE ADD ITEM buttons from MENU
document.body.addEventListener("transitionrun", () => {

    const menuButtons = document.getElementById("menu").getElementsByTagName("button");

    for(let i = 0; i < menuButtons.length; i++) {

        // NEEN REGEX for MENU & CART ID!!!!!!!!!!!!!!!!!!!!!!!
        menuButtons[i].addEventListener('click', (e)=>{

            // Get Item ID #
            const itemId = Number(e.currentTarget.parentNode.id.slice(4));

            updateCart(cart, itemId, "quantity-plus");

            // if not open, open cart
            if(document.getElementById("tableArea").classList.contains("cart-display")){
                openCloseCart();
            }
        });
    }
});

//ACTIVATE CART QUANTITY BUTTONS
document.getElementById("itemsBody").addEventListener("mousedown", (e)=>{

    const quantityButtons = document.getElementById("itemsBody").getElementsByTagName("button");

    for(let i = 0; i < quantityButtons.length; i++) {

        quantityButtons[i].addEventListener('click', (e)=> {

            const button = e.currentTarget;
            // NEEN REGEX for MENU & CART ID!!!!!!!!!!!!!!!!!!!!!!!
            const itemId = Number(button.parentNode.parentNode.id.slice(4));
            const plusOrMinusItem = button.attributes.class.value;

            updateCart(cart, itemId, plusOrMinusItem);   
        });
    }
});

// ACTIVATE EMPTY CART LINK
document.querySelector("#empty a").addEventListener("click", emptyCart);

// ACTIVATE CHECKOUT BUTTON
document.getElementById("checkout").addEventListener("click", (e) => {

    e.preventDefault();

    if(cart.numberOfItems > 0){
        document.location.href = "/checkout.html";
    }
    else {
        openCloseCart();
        alert("Please add an item to cart!")
    }
});

function emptyCart() {


    Object.assign(cart, {
        total: 0,
        numberOfItems: 0,
        items: []
    });

    updateCartDisplay(cart);
    
    openCloseCart();

    localStorage.clear();
}

function openCloseCart() {

    const close = document.getElementById("close");
    const spacer = document.getElementById("spacer");;
    const table = document.getElementById("tableArea");

    // ADD BACKGROUND COLOR OVER NAVBAR TOP
    document.getElementById("iconArea").classList.toggle("icon-area-bg");
    
    // DISPLAY FULL CART
    [close, spacer, table].forEach(item => item.classList.toggle("cart-display"));
}

function updateCart(cart, itemToAddOrUpdate, plusOrMinusItem) {
    
    addOrUpdateItemInCart(itemToAddOrUpdate, plusOrMinusItem);
    updateNumberOfCartItems(cart);
    updateCartTotal(cart);
    updateCartDisplay(cart);
    updateLocalStorage(cart);
}

function addOrUpdateItemInCart(id, plusOrMinusItem){

    let newItem;
    
    //if item not in cart get item info from menu
    if(cart.items.filter(item => item.id === id).length === 0){
        
        const thisItem = menu.find(item => item.id === id);
        
        // create new item for cart
        newItem = {};
        Object.assign(newItem, thisItem);
        delete newItem.category;
        newItem.quantity = 1;
        newItem.total = newItem.quantity * newItem.price;
        
        //push item to cart
        cart.items.push(newItem);
        return;
    }

    // else get item info from cart & add or minus 1
    else {
        newItem = cart.items.find(item => item.id === id);

        plusOrMinusItem === "quantity-plus" ?
            newItem.quantity += 1 : newItem.quantity -= 1;
    }

    // if item quantity 0 delete item from cart
    if (newItem.quantity <= 0) {
        deleteItemFromCart(newItem.id);
        return;
    }

    // update item total
    else{
    newItem.total = newItem.quantity * newItem.price; 
    }
}

function deleteItemFromCart(itemId){

    const index = cart.items.indexOf(cart.items.find(item => item.id == itemId));
    cart.items.splice(index,1);
}

function updateCartTotal(cart) {

    cart.total = cart.items.reduce((sum, cartItem) => {
        return sum + cartItem.total; 
    }, 0);
}

function updateNumberOfCartItems(cart) {
    
    cart.numberOfItems = cart.items.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
}

function updateCartDisplay(cart) {

    const cartTotalNode = document.getElementById("total");
    const cartBadgeNumbers = document.getElementsByClassName("cart-badge-number");
    const itemsBodyNode = document.getElementById("itemsBody");
    const itemBodyRowFragment = document.getElementById("bodyRowTemplate");
    // update cart Grand Total
    cartTotalNode.innerHTML = cart.total;

    //update cart badge numbers
    for (let i = 0; i < cartBadgeNumbers.length; i++) {

        cartBadgeNumbers[i].innerHTML = cart.numberOfItems;
    }

    // delete current items
    Array.from(itemsBodyNode.children).forEach(childNode => {
        childNode.remove();
    });

    // add new items from <template>
    cart.items.forEach((item) => {

        const newBodyRow = document.importNode(itemBodyRowFragment.content, true);

        newBodyRow.querySelector(".body-row").id = "item" + item.id;
        newBodyRow.querySelector(".item-name").innerHTML = item.name;
        newBodyRow.querySelector(".item-total").innerHTML = item.total;
        newBodyRow.querySelector(".item-price").innerHTML = item.price;
        newBodyRow.querySelector("input").value = item.quantity;

        itemsBodyNode.appendChild(newBodyRow);
    });
}

function updateLocalStorage(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));
}