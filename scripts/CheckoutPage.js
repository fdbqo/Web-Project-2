let groupedCart = JSON.parse(localStorage.getItem('groupedCart')) || {};

window.onload = function() {
    populateCheckout();
    console.log("Checkout page loaded");
    console.log("Checkout page loaded");

    let form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            
            
            event.preventDefault();

            // Clear the groupedCart object
            groupedCart = {};
            localStorage.setItem('groupedCart', JSON.stringify(groupedCart));

            // Update the checkoutItems div
            let div = document.getElementById('checkoutItems');
            div.innerHTML = '<h1>Thank you for your purchase!</h1>';
            console.log('FINISHED');
          
            

        
            event.target.submit();

            window.location.href = 'index.html';
            alert("Purchase completed! Thank you for your purchase!");
            window.showImportantToast('Purchase completed! Thank you for your purchase!', true);
 
           
        });
    } else {
        console.log('Form not found');
    }

}

let total = 0;

function populateCheckout() {
    
    console.log("------------- GP 2 ----------------");
    console.log(groupedCart);
    console.log(typeof(groupedCart));

    

    let cartDiv = document.getElementById('checkoutItems');

    for (let key in groupedCart) {
        let item = groupedCart[key];
       
    

        console.log(item);

        // Create a div for each cart item
        let div = document.createElement('div');
        div.classList.add('cart-item');
    
        console.log('----------------');
        console.log(item.product.price);
        console.log(item.quantity);
        console.log('----------------');

        total += Number(item.product.price) * Number(item.quantity);
        total = Number(total.toFixed(2));

        // Add the HTML for the cart item
        div.innerHTML = `
            <div class="card card-checkout" style="margin:5px; overflow:hidden;">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${item.product.image}" class="img-fluid" style="padding-top:5px;" alt="...">
            </div>
            <div class="col-md-8">
                <h5 class="card-title">${item.product.name}</h5>
                <p class="card-text">${item.product.description}<br><b>€${item.product.price}</b></p>
                <p class="card-text"><small class="text-body-secondary">Last updated 0 mins ago</small></p>
                <p class="card-text"><small class="text-body-secondary">Quantity: ${item.quantity}</small></p>
                </div>
            </div>
            </div>
        </div>`;

       

        document.getElementById('totalPrice').innerHTML = `Total: <b>€${total.toFixed(2)}</b>`;
    
    
        // Add the cart item to the div
        cartDiv.appendChild(div);
    }



    


}


