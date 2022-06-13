import React, { useState } from "react";
import Axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import ParseJwt from "../Utilities/ParseJwt";

function CreatePost() {
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();
  const [PostImage, setPostImage] = useState();
  const [PostAuthorID,setPostAuthorID] = useState();
  const loggedInUser = localStorage.getItem("token")
  const user = ParseJwt(loggedInUser)
  
  const CreatePost = async () => {
    setPostAuthorID(user._id)
    Axios.post("http://localhost:5000/post/save", {
      PostTopic,
      Postdescription,
      PostImage,
      PostAuthorID
    }).then((res) => {
      alert("Post created successfully");
      console.log("Post created");
    });
  };

  return (
    <div>
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
              justifyContent: "space-around"
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
