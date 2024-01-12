import { useEffect, useState } from "react";

import { Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"

import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");

    const { state } = useLocation();
    const { token } = state;

    const fetchData = async () => {
        if (!isLoaded) {
            const response = await fetch(
                "http://localhost:3000/users/",
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )
            const result = await response.json();
            //console.log("result.results: ", result.results);

            setUsers(result.results);
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => fetchData(), 5000);
        return () => clearInterval(intervalId);
    }, []);

    /*
    useEffect(() => {
        console.log("users: ", users);
        console.log("isLoaded: ", isLoaded);
    }, [users, isLoaded]);
    */

    const handleSubmit = async () => {
        try {
            //const response = await fetch("https://jsonplaceholder.typicode.com/users/10");
            const response = await fetch(
                "http://localhost:3000/users",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password,
                        "nama": nama,
                    }),
                }
            );

            const result = await response.json();
            console.log("Result:", result);

            if (response.status == 200) {
                navigate(
                    //"/crud-post",
                    "/user-list",
                    {
                        state:
                        {
                            token: result.token,
                        },
                    }
                );
            }
            //console.log("username:", username);
            //console.log("password:", password);
        }
        catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    return (
        <Container sx={{ maxWidth: '100%' }} maxWidth={false} className="container">
            <NavBar />
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <h1>User List</h1>
                </Grid>
                {
                    !isLoaded
                        ? ""
                        :
                        users.map((content, idx) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: "1px" }}>
                                                {content.nama}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="div" style={{ fontSize: "14px", marginBottom: "15px" }}>
                                                {content.username}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                }
            </Grid>
            <h3 style={{ marginTop: "1px" }}>Register User Baru</h3>
            <label>Username</label>
            <input type="text" name="username" id="username" title="username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label>Password</label>
            <input type="text" name="password" id="password" title="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <label>Nama Lengkap</label>
            <input type="text" name="nama" id="nama" title="nama" defaultValue={nama} onChange={(e) => setNama(e.target.value)} />
            <br />
            <button onClick={() => handleSubmit()} style={{ marginTop: "20px" }}>Login</button>
        </Container>
    )
}

export default UserListPage;