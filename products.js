var all_products = [] ;
var cart = JSON.parse(localStorage.getItem("cart")) || [] ;
var request = new XMLHttpRequest();
request.open("GET" , "https://dummyjson.com/products?limit=100") ;
request.send() ; 



request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(request.responseText);
        all_products = response.products;
        displayProducts(all_products);
    }
};


function displayProducts (products)
{
    var products_container = document.getElementById("productsContainer")
    products_container.innerHTML =""

    products.forEach(product  =>
    {
        var product_card  = document.createElement("div") 
        product_card .classList.add("product_card")
        product_card .innerHTML= 
        `   
            <img src="${product.thumbnail}">
            <div class="underimg">
            <P>${product.title} </p>
            <div class="underelement">
            <div class="leftunderelement"> 
            <button class="AddToCartBtn">add to cart </button>
            </div>
            <div class="rightunderelement"> <span> ${product.price} </span> </div>
            </div>
            </div>


        `
        products_container.appendChild(product_card) ; 

        product_card.querySelector(".AddToCartBtn").onclick = () => AddToCart(product)  ;
        
    })
}

function AddToCart (product) 
{
    var existing = cart.find(item => item.id === product.id)
    if(existing)
    {
        existing.quantity += 1 ;
    }
    else
    {
        product.quantity = 1  ; 
        cart.push(product) ; 
    }

    localStorage.setItem("cart" , JSON.stringify(cart))

    updateCartUI();
}

function updateCartUI() {
    const cartCountElement = document.getElementById("cart-count");
    const cartIconContainer = document.getElementById("cart-icon-container");

    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;

    cartIconContainer.classList.add("bump");

    setTimeout(() => {
        cartIconContainer.classList.remove("bump");
    }, 400); 
}

updateCartUI();



function gotocart ()
{
    window.location.href = "cart.html";
}






var searchInputElement = document.getElementById("searchInput"); 

searchInputElement.addEventListener("input", () => {
    
    var value_search = searchInputElement.value.toLowerCase(); 
    
    var filtered = all_products.filter(product => 
        product.title.toLowerCase().includes(value_search)
    );

    displayProducts(filtered); 
});



var categoryItems = document.querySelectorAll('#categoryList li');

categoryItems.forEach(li => {
    li.addEventListener("click", function() {
        categoryItems.forEach(item => item.classList.remove("active"));
        this.classList.add("active"); 
        var cat = this.getAttribute("data-category"); 
        var filtered = (cat === "all") ? all_products : all_products.filter(p => p.category === cat); 

        displayProducts(filtered);
    });
});



var priceRange = document.getElementById('priceRange');
var priceValue = document.getElementById('priceValue');

priceRange.addEventListener('input', function() {
    var val = this.value;
    priceValue.innerText = `$${val}`;
    var filtered = all_products.filter(p => p.price <= val);
    displayProducts(filtered);
});













