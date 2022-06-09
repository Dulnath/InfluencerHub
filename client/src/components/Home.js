import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";

function AllPosts() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  function onDelete(_id) {
    axios.delete(`/post/delete/${_id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    const newList = listOfPosts.filter((posts) => posts._id !== _id);
    alert("Post was deleted");
    setListOfPosts(newList);
  }

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
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default AllPosts;
