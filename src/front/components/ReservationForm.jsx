import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ReservationForm = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    apartment: "",
    textarea: "",
    // Gym
    gym_date: "",
    gym_time: "",
    // Packing
    packing_date: "",
    packing_time: "",
    reservationpacking: "",
    // BBQ
    reservationbbq: "",
    bbq_date: "",
    bbq_time: "",
    
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

    let hora = null;

    if (tipo === "Gym") {
      hora = `${user.gym_date}T${user.gym_time}:00`;
    } else if (tipo === "Packing") {
      hora = `${user.packing_date}T${user.packing_time}:00`;
    } else if (tipo === "BBQ") {
      hora = `${user.bbq_date}T${user.bbq_time}:00`;
    }

    const nuevaReserva = {
      first_name: user.full_name,
      type: tipo,
      email: user.email,
      phone: user.phone,
      apartment: user.apartment,
      description: user.textarea,
      hora,
      reservationpacking: user.reservationpacking,
      reservationbbq: user.reservationbbq,
      user_id:store.user.user?.id
    };

    // Enviar al backend
    fetch(`${backendUrl}api/user/reserva`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaReserva),
    })
      .then((res) => {
        if (!res.ok) throw Error("Error al crear la reserva");
        return res.json();
      })
      .then((data) => {
        console.log("Reserva creada:", data);
        alert("Reserva creada con exito");

        // acción dinámica
        const actionType =
          tipo === "Gym"
            ? "addReservaGym"
            : tipo === "Packing"
              ? "addReservaPacking"
              : "addReservaBBQ";

        dispatch({
          type: actionType,
          payload: data,
        });

        navigate("#"); // redirige al home
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        alert("No se pudo crear la reserva");
      });
  };

  // Render dinámico
  const renderForm = (tipo) => (
    <form onSubmit={(e) => handleSubmit(e, tipo)}>
      <div className="row">
        {/* Datos comunes */}
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
            name="apartment"
            className="form-control"
            value={user.apartment}
          />
        </div>

        {/* Gym */}
        {tipo === "Gym" && (
          <>
            <div className="col-md-6 mb-3">
              <label className="form-label">Date</label>
              <input
                onChange={handleChange}
                type="date"
                name="gym_date"
                className="form-control"
                value={user.gym_date}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Time</label>
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

        {/* Packing */}
        {tipo === "Packing" && (
          <>
            <div className="col-md-6 mb-3">
              <label className="form-label">Packing</label>
              <input
                onChange={handleChange}
                type="number"
                name="reservationpacking"
                className="form-control"
                value={user.reservationpacking}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Date</label>
              <input
                onChange={handleChange}
                type="date"
                name="packing_date"
                className="form-control"
                value={user.packing_date}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Time</label>
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

        {/* BBQ */}
        {tipo === "BBQ" && (
          <>
            <div className="col-md-6 mb-3">
              <label className="form-label">BBQ</label>
              <input
                onChange={handleChange}
                type="number"
                name="reservationbbq"
                className="form-control"
                value={user.reservationbbq}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Date</label>
              <input
                onChange={handleChange}
                type="date"
                name="bbq_date"
                className="form-control"
                value={user.bbq_date}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Time</label>
              <input
                onChange={handleChange}
                type="time"
                name="bbq_time"
                className="form-control"
                value={user.bbq_time}
              />
            </div>
          </>
        )}

        {/* Descripción */}
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

export default ReservationForm;