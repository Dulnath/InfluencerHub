import axios from "axios";
import { React, useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

function Report(props) {
    const [userList, setUserList] = useState([]);
    const [description, setDescription] = useState();

    // Retrieve all comments
    useEffect(() => {
        axios.get("http://localhost:8080/api/users/getUsers").then((response) => {
            setUserList(response.data);
            console.log(response.data);
        })
    }, [])

    // Add report description to reported user
    const reportUser = () => {
        axios.put(`http://localhost:8080/api/users/addReport/${props._id}`, {
            description
        }).then((res) => {
            console.log("User has been reported");
        }).catch((error) => {
            console.log(error.response);
        });

        const newList = userList.filter((user) => user._id !== props._id);
        setUserList(newList);
    }

    return (
        <div>
            <Card>
                <Form>
                    <Form.Group>
                        <Form.Control as="textarea"
                            rows={6}
                            placeholder="Enter reason for reporting user"
                            value = {description}
                            onChange = {(event) => {setDescription(event.target.value)}}>
                        </Form.Control>
                        <Button variant="danger" onClick={() => {reportUser()}}>Report user</Button>
                    </Form.Group>
                </Form>
            </Card>
        </div >
    );
}

export default Report;