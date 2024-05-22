import React from 'react';
import logo from "./logo.svg"
import './App.css';
const Loading: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Vous devez se connecter - Patientez svp !!
                </p>
                <a
                    className="App-link"
                    href="http://localhost:5173"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Retourner vers la page d'acceuil ?
                </a>
            </header>
        </div>
    );
};

export default Loading;
