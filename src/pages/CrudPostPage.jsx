import { useState } from "react";

import { Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"

import NavBar from "../components/NavBar";

import logo from "../assets/crud-post-icon.png";

const CrudPostPage = () => {
    const [userId, setUserId] = useState("23");
    const [title, setTitle] = useState("How do we find our KENergy?");
    const [body, setBody] = useState("It's there the whole time. You've got it so strong I can feel it right now... Look no further, you are KENough.");

    const [postContent, setPostContent] = useState([]);

    const handleSubmit = async () => {
        try {
            //console.log("userId:", userId);
            //console.log("title:", title);
            //console.log("body:", body);

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({
                        "userId": userId,
                        "title": title,
                        "body": body,
                    }),
                }
            )

            setPostContent(prevPostContent => [
                ...prevPostContent,
                {
                    "userId": userId,
                    "title": title,
                    "body": body,
                }
            ]);

            const result = response.json();
            console.log(result);
            console.log("Post Content: ", postContent)
        }
        catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    return (
        <Container className="container">
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <img src={logo} className="logo" alt="CRUD Post App logo" style={{ width: "100px", height: "100px", paddingBottom: "1px" }} />
                </Grid>
                <Grid item xs={12}>
                    <h1 style={{ marginTop: "1px" }}>CRUD Post App</h1>
                </Grid>
                <Grid item xs={12}>
                    <label>User Id</label>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "1px" }}>
                    <input
                        type="text"
                        name="userId"
                        id="userId"
                        title="userId"
                        defaultValue={userId}
                        disabled={true}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <label>Title</label>
                </Grid>
                <Grid item xs={12}>
                    <input type="text" name="title" id="title" title="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <label>Content</label>
                </Grid>
                <Grid item xs={12}>
                    <textarea rows="4" cols="50" name="body" id="body" title="body" defaultValue={body} onChange={(e) => setBody(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <button onClick={() => handleSubmit()}>Submit</button>
                </Grid>
                {
                    postContent === null
                        ? ""
                        :
                        postContent.map((content, idx) => {
                            return (
                                <Grid item sx={12} sm={6} md={4} key={idx}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: "1px" }}>
                                                {content.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="div" style={{ fontSize: "14px", marginBottom: "15px" }}>
                                                By User ID {content.userId}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" style={{ textAlign: "left" }}>
                                                {content.body}
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

export default CrudPostPage;