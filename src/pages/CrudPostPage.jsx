import { useState } from "react";

import { Card, CardContent, Typography } from "@mui/material";

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
        <div className="container">
            <NavBar />
            <img src={logo} className="logo" alt="CRUD Post App logo" style={{width: "100px", height: "100px", paddingBottom: "1px"}} />
            <h1 style={{marginTop: "1px"}}>CRUD Post App</h1>
            <label>User Id</label>
            <input type="text" name="userId" id="userId" title="userId" defaultValue={userId} disabled={true} onChange={(e) => setUserId(e.target.value)} />
            <br />
            <label>Title</label>
            <input type="text" name="title" id="title" title="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Content</label>
            <textarea rows="4" cols="50" name="body" id="body" title="body" defaultValue={body} onChange={(e) => setBody(e.target.value)} />
            <br />
            <button onClick={() => handleSubmit()}>Submit</button>
            <hr />
            {
                postContent === null
                ? ""
                :
                postContent.map((content, idx) => {
                    return(
                        <Card key={idx} sx={{ maxWidth: 400 }}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" style={{marginBottom: "1px"}}>
                                {content.title}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" style={{fontSize: "14px", marginBottom: "15px"}}>
                                By User ID {content.userId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{textAlign: "left"}}>
                                {content.body}
                            </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default CrudPostPage;