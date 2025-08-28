import React from 'react'

const IncidentReport = () => {
    return (
        <div>
            {/* Add your incident report form or content here */}
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
    )
}

export default IncidentReport
