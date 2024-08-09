document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'cartItems';
    const FAVORITES_KEY = 'favorites';
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const cartItemsElement = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const saveToFavoritesButton = document.getElementById('saveToFavoritesButton');
    const applyFavoritesButton = document.getElementById('applyFavoritesButton');
    const buyNowButton = document.getElementById('buyNowButton');

    const updateCart = () => {
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.product}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity} ${item.unit}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartItemsElement.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    };

    const addToCart = (product, price, quantity, unit) => {
        const existingItemIndex = cartItems.findIndex(item => item.product === product);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({ product, price, quantity, unit });
        }
        updateCart();
        alert(`${quantity} ${unit} of ${product} added to the cart!`);
    };

    const handleAddToCartClick = event => {
        const button = event.target;
        const product = button.dataset.product;
        const price = parseFloat(button.dataset.price);
        const unit = button.dataset.unit;
        const quantityInput = document.getElementById(product.toLowerCase().replace(/ /g, '-'));
        let quantity = parseFloat(quantityInput.value);

        if (unit === 'quantity') {
            quantity = parseInt(quantityInput.value, 10);
        }

        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            quantityInput.value = '';
            return;
        }

        addToCart(product, price, quantity, unit);
        quantityInput.value = '';
    };

    const saveFavorites = () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(cartItems));
        alert('Favorites saved!');
    };

    const applyFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY));
        if (favorites) {
            cartItems.length = 0;
            favorites.forEach(item => cartItems.push(item));
            updateCart();
        } else {
            alert('No favorites found.');
        }
    };

    const proceedToBuy = () => {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        window.location.href = 'order_details.html';
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });

    saveToFavoritesButton.addEventListener('click', saveFavorites);
    applyFavoritesButton.addEventListener('click', applyFavorites);
    buyNowButton.addEventListener('click', proceedToBuy);

    updateCart();
});

// Order details script
document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'cartItems';
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const orderTableBody = document.querySelector('#orderTable tbody');
    let orderTotal = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity} ${item.unit}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        orderTableBody.appendChild(row);
        orderTotal += itemTotal;
    });

    document.getElementById('orderTotalPrice').textContent = `$${orderTotal.toFixed(2)}`;
});

function pay() {
    const formFields = ['name', 'address', 'email', 'phone', 'postal-code', 'card-number', 'expiration-date', 'cvv'];
    const isFormValid = formFields.every(field => document.getElementById(field).value.trim() !== '') &&
        document.getElementById('terms').checked;

    if (isFormValid) {
        const name = document.getElementById('name').value;
        alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.`);
        localStorage.removeItem('cartItems');
        window.location.href = './Orders.html';
    } else {
        alert('Please fill in all fields and accept the terms and conditions.');
    }
}
