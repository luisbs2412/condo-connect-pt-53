import React from "react";
import image from "../assets/img/image.webp"; // Adjust the path as necessary

const AboutUs = () => {
  return (
    <>
      <section id="About" className="bg-light py-5">
        <div className="container">
          <div className="row" style={{ display: "flex", textAlign: "justify" }}>
            <div className="col">
              <h2>About Us</h2>
              <p>New York Residence is a prestigious luxury apartment complex in the heart of the city, offering sophisticated architecture, modern interiors, and premium amenities such as concierge services, fitness facilities, and panoramic city views. Designed for those seeking elegance and comfort, it combines an exclusive lifestyle with unmatched convenience.</p>
              <div className="row">
                <div className="col">
                  <h3>50+</h3>
                  <p>Units</p>
                </div>
                <div className="col">
                  <h3>15+</h3>
                  <p> Year Experience </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h3>24/7</h3>
                  <p>Customer Service</p>
                </div>
                <div className="col">
                  <h3>100%</h3>
                  <p>Satisfaction Guarantee</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6" style={{ position: "relative"}}>
              <img className="img-fluid position-relative" src={image} alt="Imagen" style={{ borderRadius: "2%" }}/>
              <div className="position-absolute bg-white rounded-3 shadow p-3  d-inline-flex flex-column"
                style={{
                  left: "0.1rem",
                  bottom: "-0.1rem",
                  width: "fit-content",
                  zIndex: 2,
                  textAlign: "center"
                }}>
                <div>Quality</div>
                <div>living</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;