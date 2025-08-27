import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Tenant = () => {
  return (
    <section className="bg-light py-5">
      <h1 className="text-center">Tenant Portal:</h1>
      <hr />
      <div className="container text-end">
        <button className="btn btn-outline-dark mt-2">Logout</button>
      </div>
      <div className="container">
        <div className="row">

          {/* Left form */}
          <div className="col-md-6 mt-4 text-start">
            <div className="mb-3 form-label">
              <p className="h4 fw-bold"> My Incident Reports:</p>
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label"><strong>Name: </strong>*</label>
                  <input type="text" className="form-control" id="inputPassword4" placeholder="Full Name:" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label"><strong>Email: </strong>*</label>
                  <input type="email" className="form-control" id="inputEmail4" placeholder="Email Address:" />
                </div>
                <div className="col-md-6">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" />
                    <label className="form-check-label" for="inlineCheckbox2">Plumbing</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                    <label className="form-check-label" for="inlineCheckbox2">Electrical</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option3" />
                    <label className="form-check-label" for="inlineCheckbox2">General</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label"><strong>Apartment #: </strong></label>
                  <input type="email" className="form-control" id="inputEmail4" placeholder="Apartment Number:" />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label"><strong>Subject:</strong></label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Subject:" />
                </div>
                <div className="mb-3 col-12">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label"><strong>Message: </strong>*</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Explain the issue:"></textarea>
                  <p>*Required Fields</p>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-secondary"><strong>Send Report</strong></button>
                </div>
              </form>
            </div>
          </div>

          {/* Right form */}
          <div className="col-md-6 mt-4 text-start">
            <div className="mb-3 form-label">
              <p className="h4 fw-bold"> Make a Reservations:</p>
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label"><strong>Name: </strong>*</label>
                  <input type="text" className="form-control" id="inputPassword4" placeholder="Full Name:" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label"><strong>Email: </strong>*</label>
                  <input type="email" className="form-control" id="inputEmail4" placeholder="Email Address:" />
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-check form-check">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" />
                    <label className="form-check-label" for="inlineCheckbox2">Gym</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                    <label className="form-check-label" for="inlineCheckbox2">Parking</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option3" />
                    <label className="form-check-label" for="inlineCheckbox2">BBQ and Grill</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label"><strong>Apartment #: </strong></label>
                  <input type="email" className="form-control" id="inputEmail4" placeholder="Apartment Number:" />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div>
                      <select className="form-select" required aria-label="select example">
                        <option value="">Select Day:</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                        <option value="7">Sunday</option>
                      </select>
                      <div className="invalid-feedback">Please select a day.</div>
                    </div>
                  </div>

                  {/* Columna de radio buttons */}
                  <div className="col-md-6">
                    <div className="mb-1">
                      <div className="form-check">
                        <input
                          className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          Morning (7am - 1pm)
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          Afternoon (1pm - 8pm)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 col-12">
                  <label htmlFor="exampleFormControlTextarea2" className="form-label"><strong>Message Request: </strong></label>
                  <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" placeholder="Any special request:"></textarea>
                  <p>*Required Fields</p>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-secondary"><strong>Reserve Now</strong></button>
                </div>
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
