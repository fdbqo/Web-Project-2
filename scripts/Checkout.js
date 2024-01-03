
import { products } from './Product.js';
// imports all products from product.js, since data there is already loaded from the json file
let cart = [];
let groupedCart = {};

function showToast(message) {
    // Create a div for the toast
    const toast = document.createElement('div');

    toast.textContent = message;

    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px';
    toast.style.backgroundColor = 'rgba(150, 210, 255,1)';
    toast.style.color = 'black';
    toast.style.borderRadius = '5px';
    toast.style.opacity = '1';
    toast.style.transition = 'opacity 0.5s';

    // Add the toast to the body
    document.body.appendChild(toast);

    // Move up existing toasts
    const toasts = document.querySelectorAll('div');
    toasts.forEach((existingToast, index) => {
        if (index !== toasts.length - 1) {
            existingToast.style.bottom = `${parseInt(existingToast.style.bottom, 10) + 60}px`;
        }
    });

    // Fade out the toast after 2.5 seconds
    setTimeout(function() {
        toast.style.opacity = '0';
    }, 1500);

    // Remove the toast after 3 seconds
    setTimeout(function() {
        document.body.removeChild(toast);
    }, 2000);
}

function showImportantToast(message, isSuccess) {
    
    const toast = document.createElement('div');
    toast.className = 'mb-3 toast align-items-center text-white bg-success border-0 position-fixed bottom-0 start-50 translate-middle-x';
    toast.role = 'alert';
    toast.classList.add(isSuccess ? 'bg-success' : 'bg-danger');
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    // Add the toast to the body
    document.body.appendChild(toast);

    // Initialize the toast
    var toastElement = new bootstrap.Toast(toast, { autohide: true });
    toastElement.show();

    // Remove the toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toast);
    });

    const toasts = document.querySelectorAll('div');
    toasts.forEach((existingToast, index) => {
        if (index !== toasts.length - 1) {
            existingToast.style.bottom = `${parseInt(existingToast.style.bottom, 10) + 60}px`;
        }
    });

    // Fade out the toast after 2.5 seconds
    setTimeout(function() {
        toast.style.opacity = '0';
    }, 1500);

    // Remove the toast after 3 seconds
    setTimeout(function() {
        document.body.removeChild(toast);
    }, 2000);

    // Remove the toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toast);
    });
}

window.showToast = showToast;
window.showImportantToast = showImportantToast;

async function addToCart(id) {

    let product = products.find(product => product.id == id);

    let item = cart.find(item => item.product.id == id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({
            product: product,
            quantity: 1,
            addedAt: new Date()
        });
    }

    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    let cartButton = document.getElementsByClassName("cart-button")[0];
    cartButton.innerHTML = `<img src="images/icons/cart-fill.svg" style="width: 40px; height: 40px;" alt="cart icon"> Cart (${totalQuantity})`

    showToast(`${product.name}, ${product.type} - added to cart!`);

    console.log(cart);
}
// ads product to cart based on product id from json file

let total = 0;
let previousTotal = 0;

async function cartModal() {
    let modalBody = document.getElementById('cartItems');
    let modalFooter = document.getElementsByClassName('modal-footer')[0];

    let checkoutBody = document.getElementById('checkoutItems');

    
    let newTotal = 0;

   
    
    // When the user clicks the cart button, open the modal and update its content
    document.querySelector('.cart-button').addEventListener('click', function() {
        // Update the modal content with the cart items
        modalBody.innerHTML = '';

        total = 0;
        
        for (let item of cart) {
            let product = item.product;
            let quantity = item.quantity;

            if (groupedCart[product.id]) {
                groupedCart[product.id].quantity = quantity;
            } else {
                groupedCart[product.id] = {
                    product: product,
                    quantity: quantity,
                    addedAt: item.addedAt
                };
            }

    total += parseInt(product.price) * quantity;

        }
        // groups cart items based on quantity to prevent dupes

        for (let id in groupedCart) {
            let item = groupedCart[id];
            let product = item.product;
            let addedAt = item.addedAt;
            let quantity = item.quantity;
 
            let diff = Math.floor((new Date() - addedAt) / 1000 / 60);

            modalBody.innerHTML += 

            `<div class="card" style="margin:5px; overflow:hidden;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${product.image}" class="img-fluid" style="padding-top:5px;" alt="...">
              </div>
              <div class="col-md-8">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}<br><b>€${product.price}</b></p>
                  <p class="card-text"><small class="text-body-secondary">Last updated ${diff} mins ago</small></p>
                  <p class="card-text"><small class="text-body-secondary">Quantity: ${quantity}</small></p>
                  </div>
              </div>
            </div>
          </div>`;
   
        }
        // creates the unique cart div

        
     
        total += newTotal - previousTotal;
        previousTotal = newTotal;

        document.getElementById('totalPrice').innerHTML = `Total: <b>€${total.toFixed(2)}</b>`;

        // Show the modal
        var myModal = new bootstrap.Modal(document.getElementById('cartModal'), {});
        myModal.show();

        console.log("------------- GP ----------------");
        console.log(groupedCart);
        console.log(cart);
        localStorage.setItem('groupedCart', JSON.stringify(groupedCart));
    });
}

function clearCart() {
        cart = [];
        groupedCart = {};

        let cartButton = document.getElementsByClassName("cart-button")[0];
        cartButton.innerHTML = `<img src="images/icons/cart-fill.svg" style="width: 40px; height: 40px;" alt="cart icon"> Cart (${cart.length})`
    
        let modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';
    
        var myModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        myModal.hide();

        total = 0;
    
        document.getElementById('totalPrice').innerHTML = `Total: €0.00`;
}

if (document.getElementById('clearCart') != null) {
    document.getElementById('clearCart').addEventListener('click', clearCart);
}


async function populateCheckout() {
    let groupedCart = JSON.parse(localStorage.getItem('groupedCart')) || {};
    console.log("------------- GP 2 ----------------");
    console.log(groupedCart);
}
// populates the cart modal with the items added to cart

cartModal();  

export { clearCart }
window.addToCart = addToCart;

