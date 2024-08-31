// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const db = openDatabase('shoppingCart', '1.0', 'Carrito de Compras', 2 * 1024 * 1024);
    
    // Crear tabla si no existe
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, quantity INTEGER)');
    });

    // Guardar un artículo en la base de datos
    function saveItemToCart(item) {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO cart (name, price, quantity) VALUES (?, ?, ?)', [item.name, item.price, item.quantity]);
        });
    }

    // Cargar artículos del carrito
    function loadCart() {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM cart', [], (tx, results) => {
                const cartItems = results.rows;
                let totalPrice = 0;
                const cartItemsContainer = document.getElementById('cartItems');
                cartItemsContainer.innerHTML = '';

                for (let i = 0; i < cartItems.length; i++) {
                    const item = cartItems.item(i);
                    const div = document.createElement('div');
                    div.textContent = `${item.name} x${item.quantity} - ${item.quantity * item.price}€`;
                    cartItemsContainer.appendChild(div);
                    totalPrice += item.quantity * item.price;
                }

                document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
            });
        });
    }

    // Eliminar un artículo del carrito
    function removeItemFromCart(id) {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM cart WHERE id = ?', [id]);
        });
    }

    // Cargar el carrito al iniciar la página
    loadCart();
});