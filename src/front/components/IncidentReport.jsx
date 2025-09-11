import React, { useState } from "react";
import { Alert } from "../components/Alert.jsx";

const IncidentReport = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apartment, setApartment] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !apartment || !title || !description) {
      setError("Please fill in all required fields. (*).");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("The email is not valid.");
      return;
    }

    const incident = { name, email, apartment, title, description };
    try {
      const res = await fetch(`${backendUrl}api/report`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incident),
      });

      if (!res.ok) throw new Error("Error sending to the backend.");

      const data = await res.json();
      console.log("Backend response:", data);
      setSuccess("Report sent successfully.");

      setName("");
      setEmail("");
      setApartment("");
      setTitle(""); 
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Error sending the report. ❌");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h5 className="mb-3">On this page, you can report any incidents that occur in the condominium.
           Please provide clear and detailed information so that the management team can respond effectively 
           and in a timely manner. Your report will help us maintain a safe and well-organized community.
        </h5>

        <Alert type="error" message={error} />
        <Alert type="success" message={success} />

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label"><strong>Name: </strong>*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name:"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label"><strong>Email: </strong>*</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email Address:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label"><strong>Apartment #: </strong></label>
            <input
              type="number"
              className="form-control"
              placeholder="Apartment Number:"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label className="form-label"><strong>Title: </strong>*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Subject:"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3 col-12">
            <label className="form-label"><strong>Description: </strong>*</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Explain the issue:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p>*Required Fields</p>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-secondary">
              <strong>Send Report</strong>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default IncidentReport;
