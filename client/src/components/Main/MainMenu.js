import React from "react";
import image from "../../images/user.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ParseJwt from "../../utilities/ParseJwt";
import { BsBellFill } from "react-icons/bs";
import { Button } from "react-bootstrap";

const MainMenu = (props) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [fname, setUserName] = useState("");
	const [photo,setPhoto] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    if (userToken) {
      const response = axios
        .get(`http://localhost:5000/api/users/getuser/${user._id}`)
        .then((response) => {
          setUserName(response.data.firstName);
          setId(response.data._id);
          setPhoto(response.data.img)
        });
      if (response.staus !== "ok") {
        setUserName("default");
      }
    }
  }, []);

  const DisplayNotifications = () => {
    navigate(`/viewnotifications`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className={styles.navbar}>
      <h1>InfluencerHub</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {fname} &ensp;
          <img src={photo} className={styles.image1_img} alt="..." />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to={`/profileview/${id}`}>Profile</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to={`/update/${id}`}>Settings</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button onClick={DisplayNotifications}>
        <BsBellFill />
      </Button>

      <button
        className={styles.white_btn}
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default MainMenu;
