import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

import logo from "../assets/crud-post-icon.png";

const LoginPage = () => {
    const [username, setUsername] = useState("Moriah.Stanton");
    const [email, setEmail] = useState("Rey.Padberg@karina.biz");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/10");
            const result = await response.json();
            
            //console.log("username:", username);
            //console.log("email:", email);

            if (result.username == username) {
                if (result.email == email) {
                    navigate("/crud-post");
                }
            }
        }
        catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    return (
        <div className="container">
            <NavBar />
            <img src={logo} className="logo" alt="CRUD Post App logo" style={{width: "100px", height: "100px", paddingBottom: "1px"}} />
            <h1 style={{marginTop: "1px"}}>Login</h1>
            <label>Username</label>
            <input type="text" name="username" id="username" title="username" defaultValue={username}  onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label>Email</label>
            <input type="text" name="email" id="email" title="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <button onClick={() => handleSubmit()} style={{marginTop: "20px"}}>Login</button>
        </div>
    );
}

export default LoginPage;