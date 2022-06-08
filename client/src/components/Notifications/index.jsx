import styles from "./styles.module.css";
import { BsBellFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from "react"


function ViewNotifications() {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [notificationList, setNotificationList] = useState([]);

	useEffect(()=> {
		axios.get("http://localhost:8080/notifications").then((response) => {
			setNotificationList(response.data);
			console.log(response.data);			
		})
	},[])
	
	let navigate = useNavigate();

	return (
		<div className={styles.main_container}>			
			<nav className={styles.navbar}>
			
				<h1>InfluencerHub</h1>
				<button className={styles.white_btn}>
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