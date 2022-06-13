import React, { useState } from "react";
import Axios from "axios";
import { Form, Button, Card } from "react-bootstrap";

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
      {/* <Form>
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
      </Button> */}
      <div className="addPostCard">
        <Card border='dark'>
          <Card.Header>
            <div className="addPostHeader">
              Add new post
            </div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <h5>Post Topic</h5>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Add Post topic"
                  onChange={(event) => {
                    setTopic(event.target.value);
                  }}
                ></Form.Control><br />
              </Form.Group>

              <Form.Group>
                <h5>Post Description</h5>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Add Post Description"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></Form.Control><br />
              </Form.Group>

              <h5>Attach image</h5>
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
              /><br /><br />

            </Form>
            <Card.Footer style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
              <Button variant="primary" type="submit" onClick={CreatePost}>
                Add New Post
              </Button>
            </Card.Footer>

          </Card.Body>
        </Card>
      </div>

    </div>
  );
}

export default CreatePost;
