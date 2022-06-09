import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Row } from "react-bootstrap";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import styles from "./styles.module.css";

function AllPosts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfComments, setListOfComments] = useState([]);
  const [openCommentForm, setOpenCommentForm] = useState();
  const [openComments, setOpenComments] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setListOfPosts(response.data);
    });
    axios.get("http://localhost:5000/getComments").then((response) => {
      setListOfComments(response.data);
    });
  }, []);

  function onDelete(_id) {
    axios.delete(`http://localhost:5000/post/delete/${_id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    const newList = listOfPosts.filter((posts) => posts._id !== _id);
    alert("Post was deleted");
    setListOfPosts(newList);
  }

  const commentForm = (id) => {
    setSelected(id);
    setOpenCommentForm(!openCommentForm);
  };

  const viewComments = (id) => {
    setSelected(id);
    setOpenComments(!openComments);
  };

  let navigate = useNavigate();

  return (
    <div className={styles.background}>
      <h1>All posts</h1>
      <button className={styles.btnGreen}>
        <a href="/add" style={{ textDecoration: "none", color: "white" }}>
          Create New Post
        </a>
      </button>
      {listOfPosts.map((posts) => {
        return (
          <div>
            <Card className={styles.record}>
              <a href={`/post/${posts._id}`}>
                <Card.Header>
                  <b>{posts.PostTopic}</b>
                </Card.Header>
              </a>
              <Card.Body>
                <Row>
                  <Card.Text as={Col}>{posts.Postdescription}</Card.Text>
                </Row>
                <br />

                <img
                  src={`${posts.PostImage}`}
                  alt=""
                  width="500"
                  height="300"
                  loading="eager"
                ></img>
                <br />
                <br />
                <Button
                  className="postButton2"
                  variant="warning"
                  size="sm"
                  type="submit"
                  onClick={() => {
                    navigate(`/edit/${posts._id}`);
                  }}
                >
                  Edit Post
                </Button>
                <br />
                <br />
                <Button
                  className="postButton2"
                  variant="danger"
                  size="sm"
                  type="submit"
                  onClick={() => onDelete(posts._id)}
                >
                  Delete Post
                </Button>
                <br />
                <br />
                <Button
                  size="sm"
                  type="submit"
                  onClick={() => {
                    commentForm(posts._id);
                  }}
                >
                  Add Comment
                </Button>
              </Card.Body>
              <Card.Footer>
                {selected === posts._id
                  ? openCommentForm && (
                      <div>
                        <CommentForm postID={posts._id} />
                      </div>
                    )
                  : null}

                {listOfComments.filter(
                  (comment) =>
                    comment.postId === posts._id && comment.isVisible === true
                ).length > 0 ? (
                  <p
                    style={{
                      fontWeight: "500",
                      textDecorationLine: "underline",
                    }}
                  >
                    <a href="#/" onClick={() => viewComments(posts._id)}>View Comments</a>
                  </p>
                ) : null}

                {selected === posts._id
                  ? openComments && (
                      <div>
                        <CommentList postID={posts._id} />
                      </div>
                    )
                  : null}
              </Card.Footer>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default AllPosts;
