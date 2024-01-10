import { useEffect, useState } from "react";

import { Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"

import NavBar from "../components/NavBar";

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        if (!isLoaded) {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJGaXFydWkiLCJpYXQiOjE3MDQ4NTg3MjUsImV4cCI6MTcwNzQ1MDcyNX0.nufD1tn8H2TCHIZTsWqoeJfd74YKMfMXSWy4ImA5zLc';
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

        const intervalId = setInterval(() => fetchData(), 300000);
        return () => clearInterval(intervalId);
    }, []);

    /*
    useEffect(() => {
        console.log("users: ", users);
        console.log("isLoaded: ", isLoaded);
    }, [users, isLoaded]);
    */

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
                                                {content.firstName}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="div" style={{ fontSize: "14px", marginBottom: "15px" }}>
                                                {content.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" style={{ textAlign: "left" }}>
                                                Posisi: {content.position.positionName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                }
            </Grid>
        </Container>
    )
}

export default UserListPage;