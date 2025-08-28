import React from 'react'

const TenantRegisterForm = () => {
    return (
        // * Crear la logica del Formulario aqui * 
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