import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Tenant = () => {
  return (
    <section className="bg-light py-5">
      <h1 className="text-center">Tenant Portal:</h1>
      <div className="container">
        <div className="row">

         {/* Left box with icons */}
<div className="col-md-5 mt-4">
  <p className="h4 fw-bold mb-4">My Incident Reports:</p>
  <div className="d-flex flex-column gap-3">
  
  </div>
  
</div>

          {/* Right form */}
          <div className="col-md-7 mt-4 text-start">
            <div className="mb-3 form-label">
              <p className="h4 fw-bold">Reservations: </p>
             
              <form className="row g-3">
               
              </form>
            </div>
          </div>
 <hr />
        </div>
      </div>
    </section>
  );
};

export default Tenant;
