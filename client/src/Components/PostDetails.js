import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function PostDetails() {
  const [commentList, setCommentList] = useState([]);
  const [PostTopic, setTopic] = useState();
  const [Postdescription, setDescription] = useState();
  const [PostImage, setPostImage] = useState();
  const [openCommentForm, setOpenCommentForm] = useState();
  const [openComments, setOpenComments] = useState();

  const { id } = useParams();

  const commentForm = () => {
    setOpenCommentForm(!openCommentForm);
  };

  const viewComments = () => {
    setOpenComments(!openComments);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/post/${id}`).then((res) => {
      setTopic(res.data.post.PostTopic);
      setDescription(res.data.post.Postdescription);
      setPostImage(res.data.post.PostImage);
    });
    axios.get("http://localhost:5000/getComments").then((response) => {
      setCommentList(response.data);
      console.log(response.data);
    })
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
        <Card.Footer style={{ paddingLeft: "50%" }}>
          <Button
            size="lg"
            type="submit"
            onClick={() => {
              commentForm();
            }}
          >
            Add Comment
          </Button>
        </Card.Footer>
        {
          openCommentForm && (
            <div>
              <CommentForm postID={id} />
            </div>
          )
        }

        {commentList.filter((comment) => comment.postId === id && comment.isVisible === true).length > 0 ? (
          <p
            style={{
              fontWeight: "500",
              textDecorationLine: "underline",
            }}
          >
            <a href="#/" onClick={() => viewComments()}>View Comments</a>
          </p>
        ) : null}

        {openComments && (
          <div>
            <CommentList postID={id} />
          </div>
        )}
      </Card>
    </div>
  );
}
