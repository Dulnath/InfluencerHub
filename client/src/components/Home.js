import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

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
    <div className="container">
      <h1>All posts</h1>
      {listOfPosts.map((posts) => {
        return (
          <div>
            <Card className="PostdetailsCard" border="dark">
              <div className="details">
                <span className="title">Post Topic:</span>
                <span className="data">{posts.PostTopic}</span>
              </div>
              <div className="details">
                <span className="title">Post Description:</span>
                <span className="data">{posts.Postdescription}</span>
              </div>
              <div className="details">
                <span className="title">Post Image:</span>
                <span className="data">
                  {
                    <img
                      src={`${posts.PostImage}`}
                      alt=""
                      width="500"
                      height="300"
                      loading="eager"
                    ></img>
                  }
                </span>
              </div>
              <div>
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
                <Button
                  className="postButton2"
                  variant="danger"
                  size="sm"
                  type="submit"
                  onClick={() => onDelete(posts._id)}
                >
                  Delete Post
                </Button>
                <Button
                  size="sm"
                  type="submit">Add Comment</Button>
              </div>
            </Card>
          </div>
        );
      })}
      <button className="btn btn-success">
        <a href="/add" style={{ textDecoration: "none", color: "white" }}>
          Create New Post
        </a>
      </button>
    </div>
  );
}

export default AllPosts;
