import React, { useState } from "react";
import Axios from "axios";
import { Form, Button } from "react-bootstrap";

function CreatePost() {
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();
  const [PostImage, setPostImage] = useState();

  const CreatePost = async () => {
    Axios.post("http://localhost:5000/post/save", {
      PostTopic,
      Postdescription,
      PostImage,
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
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
            onChange={(event) => {
              const files = event.target.files;
              if (files.length === 1) {
                const fr = new FileReader();
                fr.readAsDataURL(files[0]);
                fr.onload = () => {
                  setPostImage(fr.result);
                };
              }
            }}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={CreatePost}>
        Add New Post
      </Button>
    </div>
  );
}

export default CreatePost;
