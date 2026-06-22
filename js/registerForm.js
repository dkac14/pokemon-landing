const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const enableRegisterForm = () => {
    const form = document.getElementById("registro-form");
    const successMsg = document.getElementById("success-msg");
    const registerResult = document.getElementById("registro-resultado");

    if (!form || !successMsg || !registerResult) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("registro-email").value.trim();
        const level = document.getElementById("registro-nivel").value;

        if (email === "" || level === "") {
            alert("Completa todos los campos antes de enviar.");
            return;
        }

        try {
            const response = await fetch(POST_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    level,
                    project: "PokeAprender"
                })
            });

            if (!response.ok) {
                throw new Error("No se pudo enviar el formulario");
            }

            const data = await response.json();

            successMsg.classList.remove("hidden");

            registerResult.innerHTML = `
                <div class="mt-6 bg-white/20 border border-white/40 text-white px-6 py-4 rounded-2xl text-left">
                    <h3 class="font-black text-lg mb-2">
                        Registro recibido
                    </h3>

                    <p class="text-sm">
                        Correo registrado: <strong>${email}</strong>
                    </p>

                    <p class="text-sm">
                        Nivel seleccionado: <strong>${level}</strong>
                    </p>

                </div>
            `;

            form.reset();
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Ocurrió un error al enviar el formulario.");
        }
    });
};

export { enableRegisterForm };