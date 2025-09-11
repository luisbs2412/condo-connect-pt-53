import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MyReservations = () => {
  const { store } = useGlobalReducer();
  const user = store.user.user; // usuario logeado
  const [reservations, setReservations] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${backendUrl}api/user/${user.email}/reservas`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar reservas");
        return res.json();
      })
      .then((data) => {
        setReservations(data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  if (!user) {
    return <h2>No hay usuario logeado</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>Reservas de {user.full_name}</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha/Hora</th>
            <th>Departamento</th>
            <th>Descripción</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.type}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.apartment}</td>
                <td>{reserva.description}</td>
                <td>{reserva.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No tienes reservas aún
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyReservations;