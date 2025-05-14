const productList = document.getElementById('product-list');

fetch('/api/products')
    .then(res => res.json())
    .then(products => {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">$${parseFloat(product.price).toFixed(2)}</p>

                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    })
    .catch(err => {
        console.error('Error fetching products:', err);
        productList.innerHTML = '<p>Error loading products.</p>';
    });

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartLink = document.getElementById('cart-link');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartLink.textContent = `Go to Cart (${cartCount})`;
}

updateCartCount();
