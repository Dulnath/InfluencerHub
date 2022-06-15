import React, { useEffect, useState } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import ParseJwt from "../Utilities/ParseJwt";

function CommentForm(props) {
    const [comment, setComment] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [category, setCategory] = useState();

    const addComment = (event) => {
        event.preventDefault();

        let commentTime = new Date().toLocaleString();
        let postID = props.postID;

        let commentAuthor;
        if (category === 'business') {
            commentAuthor = firstName;
        } else if (category === 'influencer') {
            commentAuthor = firstName + " " + lastName;
        }

        axios.post('http://localhost:5000/addComment', {
            commentAuthor,
            postID,
            comment,
            commentTime
        }).then((res) => {
            setComment("");
            console.log("Comment saved successfully");
        });
    }

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        axios.get(`http://localhost:5000/api/users/getuser/${user._id}`).then((res) => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setCategory(res.data.category);
        });
    }, []);

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