"use strict";

const menu = [
    {id: 1, category: "meats", name: "Full Rack Beef Ribs", price: 28},
    {id: 2, category: "meats", name: "Full Rack Pork Ribs", price: 25},
    {id: 3, category: "meats", name: "1/2 Rack Pork Ribs", price: 15},
    {id: 4, category: "meats", name: "Whole Chicken", price: 12},
    {id: 5, category: "meats", name: "1/2 Chicken", price: 7},
    {id: 6, category: "meats", name: "Brisket Sandwich", price: 7},
    {id: 7, category: "meats", name: "Pulled Pork Sandwich", price: 7},
    {id: 8, category: "meats", name: "Pulled Chicken Sandwich", price: 7},
    {id: 9, category: "meats", name: "Chicken Leg Quarters", price: 7},
    {id: 10, category: "meats", name: "Turkey Legs", price: 8},
    {id: 11, category: "meats", name: "Texas Smoked Sausage", price: 6},
    {id: 12, category: "sides", name: "Baked Beans", price: 2},
    {id: 13, category: "sides", name: "Collard Greens", price: 2},
    {id: 14, category: "sides", name: "Green Beans", price: 2},
    {id: 15, category: "sides", name: "Potato Salad", price: 2},
    {id: 16, category: "sides", name: "Drinks", price: 1}
]

// LOAD MENU TO PAGE
window.addEventListener("load", displayMenu());


function displayMenu(){

    const meatsNode = document.getElementById("meats");
    const sidesNode = document.getElementById("sides");

    const menuItemRowFragment = document.getElementById("menuRowTemplate");

    // add new items from <template>
    menu.forEach( item => {

        const newBodyRow = document.importNode(menuItemRowFragment.content, true);

        newBodyRow.querySelector(".menu-row").id = "menu" + item.id;
        newBodyRow.querySelector(".menu-item").innerHTML = item.name;
        newBodyRow.querySelector(".menu-price").innerHTML = item.price;

        item.category === "meats" ?
            meatsNode.appendChild(newBodyRow) :
            sidesNode.appendChild(newBodyRow);
    });
};
