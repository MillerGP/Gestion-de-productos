document.addEventListener("DOMContentLoaded", function () {
    const carritoLista = document.getElementById("carrito-lista");
    const totalCarrito = document.getElementById("total-carrito");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        if (!carritoLista || !totalCarrito) return; // Si estamos en productos.html, evitar errores

        carritoLista.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            let item = document.createElement("li");
            item.innerHTML = `${producto.nombre} - $${producto.precio} 
                <button class="remove-btn" data-index="${index}">❌</button>`;
            carritoLista.appendChild(item);
            total += parseFloat(producto.precio);
        });

        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
    }

    // Capturar eventos de "Agregar al carrito" dinámicamente
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const boton = event.target;
            const id = boton.getAttribute("data-id");
            const nombre = boton.getAttribute("data-nombre");
            const precio = boton.getAttribute("data-precio");

            const producto = { id, nombre, precio };
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert(`${nombre} agregado al carrito 🛒`);
        }
    });

    // Eliminar productos del carrito
    if (carritoLista) {
        carritoLista.addEventListener("click", function (event) {
            if (event.target.classList.contains("remove-btn")) {
                const index = event.target.getAttribute("data-index");
                carrito.splice(index, 1);
                actualizarCarrito();
            }
        });
    }

    // Vaciar carrito
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", function () {
            carrito = [];
            actualizarCarrito();
        });
    }

    actualizarCarrito(); // Cargar carrito al entrar a la página
});

