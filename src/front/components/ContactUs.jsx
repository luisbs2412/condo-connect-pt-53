import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-light py-5">
      <h1 className="text-center">Contact Us</h1>
      <div className="container">
        <div className="row">

         {/* Left box with icons */}
<div className="col-md-5 mt-4">
  <p className="h4 fw-bold mb-4">Get in Touch:</p>
  <div className="d-flex flex-column gap-3">
    <div className="d-flex align-items-start border rounded p-4 text-dark">
      <FaEnvelope className="me-3 mt-1" size={24} />
      <div className="text-start">
        <h5 className="mb-0 fw-bold">Email:</h5>
        <small className="fw-normal fs-6">info@4GeeksAcademy.com</small>
      </div>
    </div>
    <div className="d-flex align-items-start border rounded p-4 text-dark">
      <FaMapMarkerAlt className="me-3 mt-1" size={24} />
      <div className="text-start">
        <h5 className="mb-0 fw-bold">Address:</h5>
        <small className="fw-normal fs-6">1801 SW 3rd Ave, Miami, FL 33129</small> 
      </div>
    </div>
    <div className="d-flex align-items-start border rounded p-4 text-dark">
      <FaPhone className="me-3 mt-1" size={24} />
      <div className="text-start">
        <h5 className="mb-0 fw-bold">Phone:</h5>
        <small className="fw-normal fs-6">+1 (786) 416-6640</small>
      </div>
    </div>
  </div>
  <hr />
  <div className="mt-4 text-start">
    <h5 className="fw-bold">Office Hours</h5>
    <p className="mb-1"><strong>Monday – Friday:</strong> 9:00 AM – 6:00 PM</p>
    <p className="mb-1"><strong>Saturday:</strong> 10:00 AM – 2:00 PM</p>
    <p className="mb-0"><strong>Sunday:</strong> Closed</p>
  </div>
</div>

          {/* Right form */}
          <div className="col-md-7 mt-4 text-start">
            <div className="mb-3 form-label">
              <p className="h4 fw-bold">Send Us a Message: </p>
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label"><strong>Name: </strong>*</label>
                  <input type="text" className="form-control" id="inputPassword4" placeholder="Full Name:" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label"><strong>Email: </strong>*</label>
                  <input type="email" className="form-control" id="inputEmail4" placeholder="Email Address:" />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label"><strong>Subject:</strong></label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Subject:" />
                </div>
                <div className="mb-3 col-12">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label"><strong>Message: </strong>*</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  <p>*Required Fields</p>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-secondary"><strong>Send Message</strong></button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
