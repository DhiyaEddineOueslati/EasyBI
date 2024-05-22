import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import "@/pages/profile/Profile.css";
import Loading from "@/components/loading";

const Profile = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth0();


        const { logout } = useAuth0();


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile);
    };

    const upload = () => {
        if (!file) {
            console.error("No file selected");
            alert("Sélectionnez un fichier svp");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("http://localhost:1337/upload", formData)
            .then((response) => {
                console.log(response.data.message);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error(error);
                // Handle error, e.g., update UI or show an error message
            });
    };
    document.querySelector("html")!.classList.add('js');

    let fileInput  = document.querySelector( ".input-file" ),
        button     = document.querySelector( ".input-file-trigger" ),
        the_return = document.querySelector(".file-return");

    return (
isAuthenticated &&(
        <div>

            <center>
            <div className="card-container">
                <a  className="page-scroll btn btn-xll" onClick={() => logout()}>Logout</a>
                <img className="round" src={user!.picture} alt="user"/>
                <h3>{user!.name}</h3>
                <h6>{user!.email}</h6>
                <p>{user!.sub}<br/> </p>
                <div className="input-file-container">
                    <input className="input-file" id="my-file" type="file" onChange={handleFileChange}/>
                    <label  htmlFor="my-file" className="input-file-trigger">Choose a data file</label>
                </div> <br/>
                <div className="buttons">

                    <button className="primary" type="button" onClick={upload}>
                        Upload
                    </button>

                </div>
                <div className="skills">
                    <h6>Informations supplémentaires</h6>
                    <ul>
                        <li>Nom: {user!.family_name}</li><br/>
                        <li>Prénom: {user!.given_name}</li><br/>
                        <li>Nom d'utilisateur: {user!.nickname}</li>
                        <li>Validantion de l'email:{user!.email_verified}</li><br/>
                        <li>Localisation: {user!.locale}</li><br/>
                        <li>Dernière mise à jour: {user!.updated_at}</li>

                    </ul>
                </div>
            </div>
            </center>
        </div>)

    );
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
});
