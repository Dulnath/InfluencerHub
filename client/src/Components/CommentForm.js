import { React, useState } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import CommentList from "./CommentList";

function CommentForm(props) {
    const [comment, setComment] = useState();

    const addComment = (event) => {
        event.preventDefault();

        let commentTime = new Date().toLocaleString();
        let postID = props.postID;
        
        axios.post('http://localhost:5000/addComment', {
            postID,
            comment,
            commentTime
        }).then((res) => {
            setComment("");
            console.log("Comment saved successfully");
        });
    }

    return (
        <div className="commentForm">
            <Card border="dark">
                <Form>
                    <Form.Group>
                        <Form.Control as="textarea"
                            value={comment}
                            placeholder="Add a comment"
                            onChange={(event) => { setComment(event.target.value) }}>
                        </Form.Control>
                        <Button className="float-end" variant="dark" onClick={addComment}>Add comment</Button>
                    </Form.Group>
                </Form>
            </Card>           
        </div >
    );
}

export default CommentForm;