// initialize variables
let date = document.querySelector(".date");
let list = document.querySelector(".list");
let openCart = document.querySelector(".shopping");
let closeCart = document.querySelector(".closeCart");
let body = document.querySelector("body");
let prodCartList = document.querySelector(".prodCartList");
let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total");

let listCarts = [];
let prod;

// copyright date
date.innerHTML = new Date().getFullYear();

// add events on clicked to open and close cart drawer
openCart.addEventListener("click", ()=> {
    body.classList.add("active");
});
closeCart.addEventListener("click", ()=> {
    body.classList.remove("active");
});

// get our products data from json
try {
    fetch("./products.json")
    .then((response)=> response.json())
    .then((data)=> {
        displayProducts(data);
    })
    .catch(Promise);
} catch(msg){
    console.log(msg);
}

function displayProducts(products) {
    prod = products;

    for(let x=0; x < products.length; x++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
                <img src='assets/img/products/${products[x].image}' alt=''>
                <div class='title'>${products[x].name}</div>
                <div class='price'>${products[x].price}</div>
                <button onclick='addToCart(${x})'>ዘንቢል ውስጥ ይግባ</button>
                    `;
        list.appendChild(newDiv);
    }
}

// add to cart method
function addToCart(key){
    if(listCarts[key] == null){
        listCarts[key] = prod[key];
        listCarts[key].quantity =1;
    } else {
        listCarts[key].quantity +=1;
    }
    
    reloadCart();
}

// refresh cart drawer
function reloadCart(){
    prodCartList.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCarts.forEach((item, key) => {
        totalPrice = totalPrice + (item.quantity * item.price);
        count = count + item.quantity;
        if(item != null){
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                    <div><img src='assets/img/products/${item.image}' alt='${item.name}'></div>
                    <div>${item.name}</div>
                    <div>${item.price} ብር</div>
                    <div>
                        <button onclick="updateQuantity(${key}, ${item.quantity -1})">-</button>
                        <div class='count'>${item.quantity}</div>
                        <button onclick="updateQuantity(${key}, ${item.quantity +1})">+</button>
                    </div>`;
            prodCartList.appendChild(newDiv);
        }
    });

    quantity.innerHTML = count;
    total.innerHTML = `${totalPrice.toLocaleString()} ብር`;
}

// increment and decrement product quantity
function updateQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key];
    } else {
        listCarts[key].quantity = quantity;
    }
    reloadCart();
}