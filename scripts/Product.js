let products = [];
let productCards = [];
let selectedType = "All";
let selectedBrandType = "All";
let minPrice = 0;
let maxPrice = 1000;

window.onload = function() {
    fetch('/json/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then (data => {
        products = data.products;
        console.log(data);
        productCards = products.map(product => {
            return `
            <div class="col-sm-4 text-center">
                <div class="card product-card" id="${product.id}" style="margin-top: 15px">
                    <img src="${product.image}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body product-card-body">
                        <h5 class="card-title">${product.name} - ${product.type}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="card-footer" style="display:flex; background: none; border-top: none;">
                            <div class="product-price" style="flex-grow: 1; font-weight: bold;">€${product.price}</div>
                            <button type="button" class="btn btn-primary" id="addToCartID" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>     
            `;
        });

        const radios = document.querySelectorAll('input[name="productType"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                selectedType = this.value;
                updateProductDisplay();
            });
        });

        const radios2 = document.querySelectorAll('input[name="brandType"]');
        radios2.forEach(radio => {
            radio.addEventListener('change', function() {
                selectedBrandType = this.value;
                updateProductDisplay();
            });
        });
        

        updateProductDisplay();

        document.querySelector('.navbar-toggler').addEventListener('click', function() {
            this.classList.toggle('clicked');
        });


    })
    .catch(function(error) {
        console.log("Error fetching json:", error);
    });
}
// this code fetches the products from the json file and displays them on the page
// it also has event listeners for the radio buttons and the navbar toggler to hide based on filters, etc



$(document).ready(function(){
    $(".js-range-slider").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: minPrice,
        to: maxPrice,
        onFinish: function (data) {
            minPrice = data.from;
            maxPrice = data.to;
            updateProductDisplay();
        },
    });
});
// jquery code for slider price range

function updateProductDisplay() {
    const container = document.querySelector('#products');
    container.innerHTML = '';
    productCards.forEach((productCard, index) => {
        const product = products[index];
        if ((selectedType === "All" || product.type === selectedType)
             && (selectedBrandType === "All" || product.name === selectedBrandType)
             && product.price >= minPrice && product.price <= maxPrice)
            {
            container.innerHTML += productCard;
        }
    });
}
// this code basically manages the filters and updating the relevant products
// checks what radios and price range is selected and adds the relevant products to the page

export { products }
