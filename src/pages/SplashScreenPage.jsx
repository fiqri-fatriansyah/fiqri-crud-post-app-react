import NavBar from "../components/NavBar";
import {Container} from "@mui/material";

import "./SplashScreenPage.css";
import logo from "../assets/crud-post-icon.png"

const SplashScreenPage = () => {
    return (
        <Container className="container">
            <NavBar />
            <a href="/" target="_blank">
                <img src={logo} className="logo" alt="CRUD Post App logo" style={{width: "250px", height: "250px"}} />
            </a>
            <h1 style={{marginTop: "1px"}}>CRUD Post App</h1>
            <h2>Created by Fiqri</h2>
        </Container>
    )
}

export default SplashScreenPage;