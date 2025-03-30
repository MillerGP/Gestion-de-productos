document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const confirmacion = document.getElementById("confirmacion");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío real del formulario

        // Obtiene los valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Verifica que los campos no estén vacíos
        if (nombre === "" || email === "" || mensaje === "") {
            alert("❌ Por favor, completa todos los campos.");
            return;
        }

        // Simula el envío exitoso
        confirmacion.style.display = "block";

        // Limpia los campos del formulario
        form.reset();

        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
            confirmacion.style.display = "none";
        }, 3000);
    });
});
