import styles from "./styles.module.css";
import {  useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
function ViewNotifications() {

    const navigate = useNavigate();
    //logout function
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login')
	};

    const [notificationList, setNotificationList] = useState([]);
	const [loggedinusercategory, setUserCategory] = useState();	
}
export default ViewNotifications;