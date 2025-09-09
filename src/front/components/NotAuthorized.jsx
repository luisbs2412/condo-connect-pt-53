import React from 'react';
import large_hero from "../assets/img/large_Hero.jpg";
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
    return (
        <div>
            <div
                className="hero d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                    backgroundImage: `url(${large_hero})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    color: "white",
                    position: "relative",
                    paddingTop: "70px",
                    fontFamily: "'Playfair Display', serif"
                }}
            >
                <div
                    className="overlay"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        // backgroundColor: "rgba(0,0,0,0.5)"
                        backgroundColor: "rgba(73, 45, 51, 0.82)"
                    }}
                ></div>

                {/* Contenido del Hero */}
                <div style={{ position: "relative", zIndex: 2, padding: "0 20px" }}>
                    <h1 className="display-2 fw-bold mb-3">Not Authorized</h1>
                    <p className="lead mb-4">
                        You do not have permission to view this page.
                    </p>
                    <div>
                        <Link to='/'> <button className="btn btn-primary mx-2">Return Home</button> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotAuthorized;