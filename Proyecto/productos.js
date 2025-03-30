document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
});

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const cancelButton = document.getElementById("cancelButton");
let editingIndex = null;

if (productForm) {
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("productName").value;
        const category = document.getElementById("productCategory").value;
        const price = document.getElementById("productPrice").value;
        const quantity = document.getElementById("productQuantity").value;
        const total = (parseFloat(price) * parseInt(quantity)).toFixed(2);

        if (!name.trim() || !category.trim() || !price.trim() || !quantity.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        let products = JSON.parse(localStorage.getItem("products")) || [];

        if (editingIndex === null) {
            products.push({ name, category, price, quantity, total });
        } else {
            products[editingIndex] = { name, category, price, quantity, total };
            editingIndex = null;
            cancelButton.style.display = "none";
        }

        localStorage.setItem("products", JSON.stringify(products));
        actualizarTabla();
        resetForm();
    });
}

function actualizarTabla() {
    if (!productList) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>$${product.price}</td>
            <td>$${product.total}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editarProducto(${index})">✏️ Editar</button>
                <button class="delete-btn" onclick="eliminarProducto(${index})">🗑️ Eliminar</button>
            </td>
        `;

        productList.appendChild(row);
    });
}

function cargarProductos() {
    actualizarTabla();
}

function resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQuantity").value = "";
    editingIndex = null;
    cancelButton.style.display = "none";
}

function eliminarProducto(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    actualizarTabla();
}

function editarProducto(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    document.getElementById("productName").value = products[index].name;
    document.getElementById("productCategory").value = products[index].category;
    document.getElementById("productPrice").value = products[index].price;
    document.getElementById("productQuantity").value = products[index].quantity;

    editingIndex = index;
    cancelButton.style.display = "inline-block";
}
