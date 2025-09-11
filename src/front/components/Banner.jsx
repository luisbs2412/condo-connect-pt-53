import React from 'react';
import rigoImageUrl from "../assets/img/large_Hero.jpg";

const Banner = () => {
  return (
    <div>
      <div
        className="hero d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage: `url(${rigoImageUrl})`,
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
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        ></div>

        {/* Contenido del Hero */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 20px" }}>
          <h1 className="display-2 fw-bold mb-3">New York Residences</h1>
          <p className="lead mb-4">
            Exclusive luxury apartment complex offering elegant design and top-tier amenities
          </p>
          <div>
            <button className="btn btn-primary mx-2">Learn About Us</button> 
            <button className="btn btn-primary mx-2">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;