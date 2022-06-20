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
import { Button,Row,Col } from "react-bootstrap";

const MainMenu = (props) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [fname, setUserName] = useState("");
	const [photo,setPhoto] = useState('');
  const [category,setCategory] = useState('');
  const [showMenu, setShowMenu] = useState(false)
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = ParseJwt(userToken);
    if (userToken) {
      const response = axios
        .get(`http://localhost:5000/api/users/getuser/${user._id}`)
        .then((response) => {
          setUserName(response.data.firstName);
          setId(response.data._id);
          setPhoto(response.data.img);
          setCategory(response.data.category);
        });
      if (response.staus !== "ok") {
        setUserName("default");
      }
    }
  }, []);

  function showDropdownMenu(event) {
    event.preventDefault();
    setShowMenu(!showMenu);
  }


  const DisplayNotifications = () => {
    navigate(`/viewnotifications`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Row className={styles.navbar}>
        <Col>{(category==='influencer')?<Link to={`/home`} ><h1 className={styles.MenuTitle}>InfluencerHub</h1></Link>:
              <Link to={`/business`} ><h1 className={styles.MenuTitle}>InfluencerHub</h1></Link>}</Col>
        <Col md="auto">
        <BsBellFill className={styles.bellIcon} onClick={DisplayNotifications}/>
        </Col>
        <Col md="auto">
          <div className={styles.dropdown} style={{ background: "#3bb19b", width: "200px", color: "white", fontSize: "20px" }} >
            <div onClick={showDropdownMenu}> {fname} &ensp; {photo?
            <img src={photo} className={styles.image1_img} alt="..." />:<img src={image} className={styles.image1_img} alt="..." />}<div className={styles.button}></div></div>

            {showMenu ? (
              <ul>
                <li className={styles.menu_item}>
                  <Link to={`/profileview/${id}`} >Profile</Link></li>
                <li className={styles.menu_item}>
                {category==='infliencer'?<Link to={`/update/${id}`} >Settings</Link>:<Link to={`/updateb/${id}`} >Settings</Link>}</li>
                <li className={styles.menu_item}>
                  {(category==="influencer")?<Link to={`/allInfluencerProjects`} >Projects</Link>:<Link to={`/allBusinessProjects`} >View Projects</Link>}</li>
                  <li className={styles.menu_item} onClick={() => {
                    handleLogout();
                  }}>Logout</li>
              </ul>
            ) :
              (
                null
              )
            }

          </div>
        </Col>
  
      </Row>
  );
};

export default MainMenu;
