import React from 'react';
import { useState } from "react";
import IncidentList from '../../components/IncidentList.jsx';

export const IncidentManagement = () => {
  return (
    <div>
      <h1 className="text-center mt-5">Incident Management</h1>
      <IncidentList />
    </div>
  );
}; 