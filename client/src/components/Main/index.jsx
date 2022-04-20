import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';


const Main = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>InfluencerHub</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				
			</nav>
			<button className="btn btn-success"
                        onClick={() => {navigate(`/detail/`)}}
                        >View
                        
                    </button>
		</div>
	);
};

export default Main;
