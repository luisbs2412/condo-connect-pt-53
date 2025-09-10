import React from 'react'
import TenantIncidentsList from '../../components/TenantIncidentList';

export const MyIncidents = () => {
    return (
        <div className='container'>
            <div className="col-md-12 mt-4 text-start">
            <div className="mb-4 form-label">
            <h1>My Incidents</h1>
            < TenantIncidentsList />
            </div>
            </div>
        </div>
    )
}