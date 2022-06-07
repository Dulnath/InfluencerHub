import styles from "./styles.module.css";
import { BsBellFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react"

function ViewNotifications() {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	
	let navigate = useNavigate();

	return (
		<div className={styles.main_container}>			
			<nav className={styles.navbar}>
			
				<h1>InfluencerHub</h1>
				<button className={styles.white_btn} onClick={()=> {navigate(`/notifications`)}}>
					<BsBellFill/>
					
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			
		</div>


	);
};

export default ViewNotifications;