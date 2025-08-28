import React from 'react'
import ReservationForm from '../../components/ReservationForm.jsx';

export const ReservationPage = () => {
    return (
        <div className='container'>
            <div className="col-md-12 mt-4 text-start">
            <div className="mb-4 form-label">
            <h1>Make a Reservation</h1>
            <ReservationForm />
            </div>
            </div>
        </div>
    )
}