import React from 'react'
import IncidentList from '../../components/IncidentList.jsx';

export const IncidentManagement = () => {
    return (
        <div className='container'>
            <div className="col-md-12 mt-4 text-start">
            <div className="mb-4 form-label">
            <h1>Report an Incident</h1>
            <IncidentList />
            </div>
            </div>
        </div>
    )
}