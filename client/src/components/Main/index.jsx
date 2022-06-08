import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import ParseJwt from "../Utilities/ParseJwt";
import axios from "axios";






















const Main = () => {

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [fname, setFName] = useState('');
	const [lname,setLName] = useState('');
	const [email, setEmail] = useState('');
	const [contactNo,setContactNo] = useState('');

useEffect(()=>{
	const userToken = localStorage.getItem('token');//dpasfjfwa.adaisoixfn.sdfawsfcopi
	
	const user = ParseJwt(userToken)//{id=d12313123jop121o,email='kumuthu@gmail.com', fname="kumuthu"}
	console.log(user._id);
	if(userToken){
		axios.get('http://localhost:8080/api/users/getuser/'+user._id).then(res=>{
		setFName(res.data.firstName);
		setLName(res.data.lastName);
		setEmail(res.data.email);
		setContactNo(res.data.phoneNo);
	})
	}
},[])





	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>InfluencerHub</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				<Link to="/detail">
				<button className={styles.white_btn} >View Users</button>
				</Link>
				
			
		

				
			</nav>
			<button className="btn btn-success"
                        onClick={() => {navigate(`/detail/`)}}
                        >View
                        
                    </button>
					<button  className="btn btn-success"
					onClick={()=>{navigate(`/payment/`)}}
					
					>

					Payment
					</button>


				
					<div  style={{"height":"500px","backgroundColor":"#fefae0","display":"flex"}}> 
					<div  className="container" style={{"height":"300px","width":"300px","backgroundColor":"#f2fa40","marginTop":"50px","padding":"20px"}}>
				
					
					</div>
					<div style={{"marginTop":"50px","padding":"20px"}}>
					<h4>{fname}</h4>
					<h4>{lname}</h4>
					<h4>{email}</h4>
					<h4>{contactNo}</h4></div>
					<div>
					<button>
					Edit profile
					</button>
					</div>
				
					</div>
				
					
		</div>
	);
};

export default Main;
