const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total');

cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
    `;
    cartItems.appendChild(cartItemDiv);
});

const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
totalPriceElem.textContent = totalPrice.toFixed(2);

function checkout() {
    alert('Proceeding to checkout...');
    // Redirect to checkout page or add further checkout functionality
}
