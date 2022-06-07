import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";

export default function PostDetails() {
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();
  const [PostImage, setPostImage] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      setTopic(res.data.post.PostTopic);
      setDescription(res.data.post.Postdescription);
      setPostImage(res.data.post.PostImage);
    });
  });

  return (
    <div>
      <Card border="dark">
        <Card.Header>
          <h2>Topic: {PostTopic}</h2>
          <h2>Description: {Postdescription}</h2>
        </Card.Header>
        <Card.Body>
          <img
            src={`${PostImage}`}
            alt=""
            width="500"
            height="300"
            loading="eager"
          ></img>
        </Card.Body>
        <Card.Footer style={{ paddingLeft: "50%" }}></Card.Footer>
      </Card>
    </div>
  );
}
