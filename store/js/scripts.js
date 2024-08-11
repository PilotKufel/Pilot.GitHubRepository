document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
});

function loadProducts() {
    fetch('php/db.php')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="images/${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} PLN</p>
                    <button onclick="addToCart(${product.id})">Dodaj do koszyka</button>
                `;
                productList.appendChild(productItem);
            });
        });
}

function addToCart(productId) {
    fetch('php/add_to_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId })
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
        loadCart();
    });
}

function loadCart() {
    fetch('php/load_cart.php')
        .then(response => response.json())
        .then(data => {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            data.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                    <p>${item.name} - ${item.price} PLN <button onclick="removeFromCart(${item.id})">Usuń</button></p>
                `;
                cartItems.appendChild(cartItem);
            });
        });
}

function removeFromCart(productId) {
    fetch('php/remove_from_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId })
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
        loadCart();
    });
}

function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}

function checkout() {
    fetch('php/checkout.php', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadCart();
        });
}

