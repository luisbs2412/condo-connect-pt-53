import React from 'react'
import IncidentReport from '../../components/IncidentReport.jsx';

export const IncidentPage = () => {
    return (
        <div className='container'>
            <div className="col-md-12 mt-4 text-start">
            <div className="mb-4 form-label">
            <h1>Report an Incident</h1>
            <IncidentReport />
            </div>
            </div>
        </div>
    )
}
