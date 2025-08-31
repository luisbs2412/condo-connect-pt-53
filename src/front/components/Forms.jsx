import { useState } from "react";

const Forms = () => {
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        textarea: "",
        gym_date: "",
        gym_time: "",
        packing_date: "",
        packing_time: "",
        parking_spot: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (event, tipo) => {
        event.preventDefault();

        const nuevoContacto = {
            tipo,
            name: user.full_name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            textarea: user.textarea,
            ...(tipo === "Gym" && {
                date: user.gym_date,
                time: user.gym_time,
            }),
            ...(tipo === "Packing" && {
                date: user.packing_date,
                time: user.packing_time,
                parking_spot: user.parking_spot,
            }),
        };

        console.log("Enviando reserva:", nuevoContacto);
        // Aquí podrías hacer el fetch al backend
    };

    const renderForm = (tipo) => (
        <form onSubmit={(e) => handleSubmit(e, tipo)}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label"># Full Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="full_name"
                        className="form-control"
                        required
                        value={user.full_name}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label"># Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        className="form-control"
                        required
                        value={user.email}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        name="phone"
                        className="form-control"
                        required
                        value={user.phone}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Apartment</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        name="address"
                        className="form-control"
                        value={user.address}
                    />
                </div>

                {tipo === "Gym" && (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Fecha</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                name="gym_date"
                                className="form-control"
                                value={user.gym_date}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Hora</label>
                            <input
                                onChange={handleChange}
                                type="time"
                                name="gym_time"
                                className="form-control"
                                value={user.gym_time}
                            />
                        </div>
                    </>
                )}

                {tipo === "Packing" && (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Estacionamiento</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="parking_spot"
                                className="form-control"
                                value={user.parking_spot}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Fecha</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                name="packing_date"
                                className="form-control"
                                value={user.packing_date}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Hora</label>
                            <input
                                onChange={handleChange}
                                type="time"
                                name="packing_time"
                                className="form-control"
                                value={user.packing_time}
                            />
                        </div>
                    </>
                )}

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Description
                    </label>
                    <textarea
                        onChange={handleChange}
                        className="form-control"
                        name="textarea"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={user.textarea}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                    Enviar Reserva {tipo}
                </button>
            </div>
        </form>
    );

    return (
        <div className="container mt-4">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="pills-gym-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-gym"
                        type="button"
                        role="tab"
                        aria-controls="pills-gym"
                        aria-selected="true"
                    >
                        Gym
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="pills-packing-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-packing"
                        type="button"
                        role="tab"
                        aria-controls="pills-packing"
                        aria-selected="false"
                    >
                        Packing
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="pills-bbq-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-bbq"
                        type="button"
                        role="tab"
                        aria-controls="pills-bbq"
                        aria-selected="false"
                    >
                        BBQ
                    </button>
                </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="pills-gym"
                    role="tabpanel"
                    aria-labelledby="pills-gym-tab"
                    tabIndex="0"
                >
                    <h2>Gym Reservation</h2>
                    {renderForm("Gym")}
                </div>

                <div
                    className="tab-pane fade"
                    id="pills-packing"
                    role="tabpanel"
                    aria-labelledby="pills-packing-tab"
                    tabIndex="0"
                >
                    <h2>Packing Reservation</h2>
                    {renderForm("Packing")}
                </div>

                <div
                    className="tab-pane fade"
                    id="pills-bbq"
                    role="tabpanel"
                    aria-labelledby="pills-bbq-tab"
                    tabIndex="0"
                >
                    <h2>BBQ Reservation</h2>
                    {renderForm("BBQ")}
                </div>
            </div>
        </div>
    );
};

export default Forms;