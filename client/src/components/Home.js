import React from 'react';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import AdminLogin from './AdminLogin';
import UserCount from './UserCount';
import NonApproved from './NonApproved';
import styles from '../styles/styles.module.css';

function Home() {
    const loggedInUser = localStorage.getItem("token");

    if(loggedInUser){
        return(
            <div className={styles.background}>                
                <Menu/>
                <div className={styles.heading}>
                    <h1 class="h2">Dashboard</h1>
                    <hr />
                </div>
                <div className="home border-secondary text-center">
                    <Container className={styles.container_main}>
                        
                        <div className={styles.card}>
                            <UserCount />
                            <h2>Total Users</h2>
                        </div>
                        <div className={styles.card}>
                            <NonApproved />
                            <h2>New Applicants</h2>
                        </div>
                    </Container>
                </div>
            </div> 
            )
    }else{
        return(
            <div>
                <AdminLogin></AdminLogin>
            </div>  
        )
    }

}

export default Home;