import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

function EditPost() {
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();
  const [PostCategory, setPostCategory] = useState();

  const { id } = useParams();

  const EditPost = () => {
    axios
      .put(`http://localhost:5000/post/update/${id}`, {
        PostTopic,
        Postdescription,
        PostCategory,
      })
      .then((res) => {
        alert("Post edited successfully");
      });
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/post/${id}`).then((res) => {
      setTopic(res.data.post.PostTopic);
      setDescription(res.data.post.Postdescription);
      setPostCategory(res.data.post.PostCategory);
    });
  }, []);

  return (
    <div>
      <div className="editPostCard">
        <Card border="dark">
          <Card.Header>
            <div className="editPostHeader">Edit post</div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <h5>Edit Post Topic</h5>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Edit Post topic"
                  value={PostTopic}
                  onChange={(event) => {
                    setTopic(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>

              <Form.Group>
                <h5>Edit Post Description</h5>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Edit Post Description"
                  value={Postdescription}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></Form.Control>
                <br />
              </Form.Group>
              <Form.Group>
                <h5>Edit Post Category</h5>
                <Form.Control
                  as="select"
                  name="state"
                  value={PostCategory}
                  onChange={(event) => setPostCategory(event.target.value)}
                >
                  <option value="null" selected>
                    No category
                  </option>
                  <option value="Entertaintment">Entertaintment</option>
                  <option value="Product Promotion">Product Promotion</option>
                </Form.Control>
                <br />
              </Form.Group>
            </Form>

            <Card.Footer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button variant="warning" type="submit" onClick={EditPost}>
                Edit Selected Post
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default EditPost;
