import React from "react";
import { Link } from "react-router-dom";

const OurCommunity = () => {
  return (
    <section id="OurComunity" className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Servicios de CondoCommunity</h2>
        <p className="text-muted">
          Las incidencias ocurren en cualquier momento: fallas técnicas, reportes de usuarios o situaciones imprevistas que necesitan atención inmediata. Nuestro servicio está diseñado para gestionar, asignar y dar solución rápida y efectiva a cada incidencia, garantizando continuidad y confianza en tus operaciones.

Al mismo tiempo, entendemos la necesidad de contar con espacios organizados y accesibles. Por eso ofrecemos un sistema de arriendo de estacionamientos, pensado para empresas, comunidades y particulares que buscan orden, seguridad y comodidad diaria.
        </p>
      </div>


      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="position-relative">
              <img
                src="data:image/jpeg;base64,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"
                className="card-img-top"
                alt="lavanderia"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                Modern Residential
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Lavanderia</h5>
              <p className="text-muted"></p>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="position-relative">
              <img
                src="https://t4.ftcdn.net/jpg/03/17/72/47/360_F_317724775_qHtWjnT8YbRdFNIuq5PWsSYypRhOmalS.jpg"
                className="card-img-top"
                alt="Gimnacio"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                Modern Residential
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Gimnacio</h5>
              <p className="text-muted"></p>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="position-relative">
              <img
                src="https://www.naturalgreen.cl/wp-content/uploads/2020/04/3bc7aa7f337d2b6d218588b9fca9e94f.jpg"
                className="card-img-top"
                alt="Quincho"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                Modern Residential
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Quincho</h5>
              <p className="text-muted"></p>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="position-relative">
              <img
                src="https://idea.cl/web/wp-content/uploads/2019/10/Sala-eventos-retocada.jpg"
                className="card-img-top"
                alt="Sala multi-uso"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                Modern Residential
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Sala Multi-uso</h5>
              <p className="text-muted"></p>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="position-relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHmKit7scCP3ikRIUdEYwKcH6SNllCtpvqQ&s"
                className="card-img-top"
                alt="Piscina"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                Modern Residential
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Piscina</h5>
              <p className="text-muted"></p>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="position-relative">
              <img
                src="https://www.mallsyoutletsvivo.cl/content/uploads/sites/3/2023/10/tenemos-estacionamientos-miniatura-1.jpg"
                className="card-img-top"
                alt="reserva de estacionamiento"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                Modern Residential
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Reserva tu estacionamiento</h5>
              <p className="text-muted"></p>
              <p className="text-secondary"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCommunity