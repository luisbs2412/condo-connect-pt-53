import React from 'react'
import { useReducer } from 'react';
import IncidentList from '../../components/IncidentList.jsx';

export const IncidentManagement = () => {
    return (
        <>
        <div>
            <h1>Incident Management</h1>
            <h1>Welcome </h1>
            <IncidentList />
        </div>
        </>
    )
}
