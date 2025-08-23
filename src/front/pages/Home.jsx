import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Banner from "../components/Banner.jsx";
import OurCommunity from "../components/OurCommunity.jsx";
import AboutUs from "../components/AboutUs.jsx";
import ContactUs from "../components/ContactUs.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
        <div>
            {/* Hero Section */}
            <div
                className="hero d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                    backgroundImage: `url(${rigoImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    color: "white",
                    position: "relative",
                    marginTop: "0",
                    fontFamily: "'Playfair Display', serif" // Fuente elegante
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

                <div style={{ position: "relative", zIndex: 2 }}>
                    <h1 className="display-2 fw-bold mb-3">New York Residences</h1>
                    <p className="lead mb-4">
                        Exclusive luxury apartment complex offering elegant design and top-tier amenities
                    </p>
                    <div>
                        <button className="btn btn-primary mx-2">Conócenos</button>
                        <button className="btn btn-primary mx-2">Contáctanos</button>
                    </div>
                </div>
            </div>

          <div>
                <div className="alert alert-info">
                    {store.message ? (
                        <span>{store.message}</span>
                    ) : (
                        <span className="text-danger">
                            Loading message from the backend (make sure your python 🐍 backend is running)...
                        </span>
                    )}
                </div>
                <AboutUs />
                <OurCommunity />
                <ContactUs />
            </div>
        </div>
    );
};