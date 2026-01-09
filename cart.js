var cart = JSON.parse(localStorage.getItem("cart")) || []  ; 

function displayCart(cart) {
    var container = document.getElementById("cart-items-container");
    if (cart.length == 0) {
    
        container.innerHTML = "<h2 style='text-align:center; width:100%; margin-top:50px; color:#888;'> Your Cart Is Empty </h2>";
        updateTotals(cart);
        return;
    }

    container.innerHTML = "";

    cart.forEach((item, index) => {
        var product_box = document.createElement("div");
        product_box.classList.add("cart-item-box");

        product_box.innerHTML = `
            <div class="img-container">
                <img src="${item.thumbnail}"> 
            </div> 
            <div class="item_info">
                <h3>${item.title}</h3>
                <button class="remove-btn" onclick="remove_cart(${index})">remove</button>
            </div>
            <div class="body_right">
                <strong class="price">$${(item.price * item.quantity).toLocaleString()}</strong>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>`;
        container.appendChild(product_box);
    });
    updateTotals(cart);
}


function changeQuantity (index , action)
{   
    
    
    if(cart[index].quantity + action > 0)
    {
        cart[index].quantity += action ; 
    }
    else
    {
        cart.splice(index, 1) ;
    }
  
    
    
   

    displayCart(cart) ; 

    localStorage.setItem("cart" , JSON.stringify(cart)) ;
    updateTotals(cart) ; 
}   

function remove_cart(index)
{
    cart.splice(index , 1) ; 
    localStorage.setItem("cart",JSON.stringify(cart)) ;
    displayCart(cart)  ;
    updateTotals(cart)  ;
}


function updateTotals (cart)
{
    var subtotal =0 ;
    cart.forEach( item => subtotal += item.price * item.quantity) ; 

    var subtotal_price =document.getElementById("subtotal-price")
    subtotal_price.innerText = "$" + subtotal.toLocaleString() ; 


    var total_price =document.getElementById("total-price")
    total_price.innerText = "$" + subtotal.toLocaleString() ; 
}





function clearCart()
{
    cart= [] ;  
    localStorage.setItem("cart" , JSON.stringify(cart))

    displayCart(cart) ; 
}

displayCart(cart) ; 

