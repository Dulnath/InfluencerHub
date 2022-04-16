import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CloseButton, Form, Card } from "react-bootstrap";
import axios from "axios";

function EditPost() {
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState();
  const [postCategory, setCategory] = useState();

  const { id } = useParams();

  const EditPost = () => {
    axios
      .put(`/post/update/${id}`, {
        topic,
        description,
        postCategory,
      })
      .then((res) => {
        alert("Post edited successfully");
      });
  };
  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      setTopic(res.data.post.topic);
      setDescription(res.data.post.description);
      setCategory(res.data.post.postCategory);
      console.log("PostData", res.data.post);
    });
  }, []);

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Edit Post topic"
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          ></Form.Control>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Edit Post Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></Form.Control>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Edit Post Category"
            value={postCategory}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={EditPost}>
        Edit Selected Post
      </Button>
    </div>
  );
}

export default EditPost;
