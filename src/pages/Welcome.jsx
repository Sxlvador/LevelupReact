import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/navbar";
import '../App.css';

const Welcome = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleViewGraduates = () => {
        navigate('/viewall'); // Navigate to the /viewall route
    };

    return (
        <div className="welcome-container">
            <Navbar />
            <section className="image-gallery">
                <img 
                    src="../assets/illustrations/cover.webp" 
                    alt="Cover" 
                    className="welcome-image" 
                />

                <img 
                    src="../assets/logos/level-up-logo_mini.webp" 
                    alt="Level Up Logo" 
                    className="welcome-logo" 
                />

                <img 
                    src="../assets/logos/softserve-logo.webp" 
                    alt="Softserve Logo" 
                    className="serve-logo blink-animation" 
                />

                <button 
                    className="pill-button"
                    onClick={handleViewGraduates} // Attach click handler to button
                >
                    View Graduates
                    <img 
                        src="../assets/icons/rocket_white.webp" 
                        alt="Rocket Icon" 
                    />
                </button>

                <img 
                    src="../assets/logos/time-to-level-up.webp" 
                    alt="Time to Level Up Logo" 
                    className="levelup blink-animation" 
                />

                <img 
                    src="../assets/backgrounds/space-background.webp" 
                    alt="Softserve Logo" 
                    className="stars" 
                />   
            </section>
        </div>
    );
};

export default Welcome;
