import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const MyReservations = () => {
  const { store } = useGlobalReducer();
  const user = store.user.user;
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
    return <h2>No user is logged in.</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>{user.first_name}'s Reservations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date/Time</th>
            <th>Apartment</th>
            <th>Description</th>
            <th>Contact</th>
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
                You have no reservations yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyReservations;