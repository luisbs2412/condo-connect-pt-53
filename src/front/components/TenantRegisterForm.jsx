import React from 'react'

const TenantRegisterForm = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [name, setName] = useState("");
    const [lastName, setlastName] = useState("");

  const [email, setEmail] = useState("");
  const [apartment, setApartment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !apartment) {
      setError("Por favor, completa todos los campos obligatorios (*).");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("El email no es válido.");
      return;
    }

    const user = { name, email, apartment };

    try {
      const res = await fetch(`${backendUrl}api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      if (!res.ok) throw new Error("Error al enviar al backend");

      const data = await res.json();
      console.log("Respuesta del backend:", data);
      setSuccess("Tenat creado con éxito ✅");

      setName("");
      setEmail("");
      setApartment("");
    } catch (err) {
      console.error(err);
      setError("Error al crear Tenant ❌");
    }
  };


    return (
        <form>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default TenantRegisterForm