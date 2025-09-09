import React from 'react';
import { Outlet } from 'react-router-dom';
import PrivateNavbar from '../components/PrivateNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export const PrivateLayout = () => {
    return (
        <>
            <PrivateNavbar />
            <div className="container-fluid p-5" style={{ minHeight: '100vh', paddingTop: '70px' }}>
                <Outlet />
            </div>
        </>
    );
}