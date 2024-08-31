// main.js
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const dropzone = document.getElementById('dropzone');
    let cart = [];

    draggables.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('drop', dropItem);

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.name);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dropItem(e) {
        e.preventDefault();
        const itemName = e.dataTransfer.getData('text/plain');
        addItemToCart(itemName);
    }

    function addItemToCart(itemName) {
        const item = cart.find(i => i.name === itemName);
        if (item) {
            item.quantity++;
        } else {
            const itemData = {
                name: itemName,
                price: parseFloat(document.querySelector(`[data-name="${itemName}"]`).dataset.price),
                quantity: 1
            };
            cart.push(itemData);
        }
        updateCart();
        saveItemToCart(cart.find(i => i.name === itemName));
    }

    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.name} x${item.quantity} - ${item.quantity * item.price}€`;
            cartItems.appendChild(div);
            totalPrice += item.quantity * item.price;
        });

        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    }
});