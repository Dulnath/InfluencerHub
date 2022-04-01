import React, { useState } from "react";
import Axios from "axios";
import { Form, Button } from "react-bootstrap";

function CreatePost() {
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState();
  const [postCategory, setCategory] = useState();

  const CreatePost = () => {
    Axios.post("/post/save", {
      topic,
      description,
      postCategory,
    }).then((res) => {
      alert("Post created successfully");
      console.log("Post created");
    });
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Add Post topic"
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          ></Form.Control>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Add Post Description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></Form.Control>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Add Post Category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={CreatePost}>
        Add New Post
      </Button>
    </div>
  );
}

export default CreatePost;
