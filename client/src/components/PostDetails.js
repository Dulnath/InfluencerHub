import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetails() {
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      setTopic(res.data.post.PostTopic);
      setDescription(res.data.post.Postdescription);
    });
  }, []);

  return (
    <div>
      <h2>Topic: {PostTopic}</h2>

      <h2>Description: {Postdescription}</h2>
    </div>
  );
}