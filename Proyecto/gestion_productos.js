document.addEventListener("DOMContentLoaded", loadProducts);

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const cancelButton = document.getElementById("cancelButton");

const statusCheckbox = document.getElementById("productStatus");

let editingIndex = null;

document.getElementById("productQuantity").addEventListener("input", calculateTotal);
document.getElementById("productPrice").addEventListener("input", calculateTotal);

function calculateTotal() {
    const quantity = parseFloat(document.getElementById("productQuantity").value) || 0;
    const price = parseFloat(document.getElementById("productPrice").value) || 0;
    document.getElementById("productTotal").value = (quantity * price).toFixed(2);
}

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const product = {
        code: document.getElementById("productCode").value,
        date: document.getElementById("productDate").value,
        name: document.getElementById("productName").value,
        category: document.getElementById("productCategory").value,
        supplier: document.getElementById("productSupplier").value,
        quantity: document.getElementById("productQuantity").value,
        price: document.getElementById("productPrice").value,
        total: document.getElementById("productTotal").value,
        description: document.getElementById("productDescription").value,
        status: statusCheckbox.checked ? "Agotado" : "Disponible" // Corrige el estado del checkbox
    };

    if (!product.code || !product.date || !product.name || !product.category || !product.supplier || !product.quantity || !product.price || !product.description) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (editingIndex === null) {
        products.push(product);
    } else {
        products[editingIndex] = product;
        editingIndex = null;
        cancelButton.style.display = "none";
    }

    localStorage.setItem("products", JSON.stringify(products));
    updateTable();
    resetForm();
});

function loadProducts() {
    updateTable();
}

function updateTable() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.date}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.supplier}</td>
            <td>${product.quantity}</td>
            <td>$${product.price}</td>
            <td>$${product.total}</td>
            <td>${product.description}</td>
            <td>${product.status}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editProduct(${index})">✏️ Editar</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">🗑️ Eliminar</button>
            </td>
        `;

        productList.appendChild(row);
    });
}

function editProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let product = products[index];

    document.getElementById("productCode").value = product.code;
    document.getElementById("productDate").value = product.date;
    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productSupplier").value = product.supplier;
    document.getElementById("productQuantity").value = product.quantity;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productTotal").value = product.total;
    document.getElementById("productDescription").value = product.description;
    
    // ✅ Corrige la carga del checkbox cuando editas un producto
    statusCheckbox.checked = product.status === "Agotado";

    editingIndex = index;
    cancelButton.style.display = "inline-block";
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    updateTable();
}

cancelButton.addEventListener("click", resetForm);

function resetForm() {
    productForm.reset();
    editingIndex = null;
    cancelButton.style.display = "none";
}
