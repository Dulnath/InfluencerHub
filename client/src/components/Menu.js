import axios from "axios";
import React from "react";
import {Nav,Navbar,Container} from 'react-bootstrap'
import { Outlet, Link } from "react-router-dom";
import ParseJwt from "../utilities/ParseJwt";
import { useState,useEffect } from 'react';
import styles from '../styles/styles.module.css';

const handleLogout = () => {
    localStorage.clear();
  };

function Menu(props){
    const [fname,setUserName] = useState('');

    useEffect(()=>{
        const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        if(userToken){
            const response = axios.get('http://localhost:5000/api/useraccounts/'+user.id).then(res=>{
                setUserName(res.data.firstName);
            })
            if(response.staus!=='ok'){
                setUserName('Admin');
            }
        }
    },[])

    return(
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand><Link to='/dashboard' className="text-decoration-none text-light">InfluencerHub</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to='/dashboard'  className={styles.menu_item}>Home</Link></Nav.Link>
                            <Nav.Link><Link to='/allUsers'className={styles.menu_item}> All Users</Link></Nav.Link>
                            <Nav.Link><Link to='/newUsers' className={styles.menu_item}>New Users</Link></Nav.Link>
                            <div className="btn-group">
                                <Nav.Link className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Reports</Nav.Link>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li className="dropdown-item"><Link to='/accountReports' className="text-decoration-none text-dark">Account Reports</Link></li>
                                    <li className="dropdown-item"><Link to='/commentReports' className="text-decoration-none text-dark">Comment Reports</Link></li>
                                </ul>
                            </div>
                            <Nav.Link><Link to='/suspendedUsers' className={styles.menu_item}>Suspended Users</Link></Nav.Link>
                            <Nav.Link><Link to='/adminSettings' className={styles.menu_item}>Settings</Link></Nav.Link>
                            <Nav.Link onClick={handleLogout}><Link to='/' className={styles.menu_item}>Log out</Link></Nav.Link>
                        </Nav>
                        <Navbar.Brand Style={"padding:0px 0px 0px 450px; color:white"}>{fname}</Navbar.Brand>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Outlet />       
        </div>
    )
}

export default Menu;