import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetails() {
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      setTopic(res.data.post.topic);
      setDescription(res.data.post.description);
      setCategory(res.data.post.postCategory);
    });
  }, []);

  return (
    <div>
      <h2>Topic: {topic}</h2>

      <h2>Description: {description}</h2>

      <h2>Category: {category}</h2>
    </div>
  );
}
