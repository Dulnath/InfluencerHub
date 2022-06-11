import React,{ useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


//business signup form
const Signupb = () => {
	const [repassword,setRepassword] = useState(null);
	const [data, setData] = useState({
		businessName: "",
		businessAddress: "",
		email: "",
		password: "",
		category:"business",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if(data.password===repassword)
		{
			try {
				const url = "http://localhost:5000/api/users";
				const { data: res } = await axios.post(url, data);
				navigate("/login");
				console.log(res.message);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}else{
			alert("password mismatch");
		}
	
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
				
				</div>
				<div className={styles.right}>
					<form   className={styles.form_container} style={{"autoComplete":"off"}} onSubmit={handleSubmit}>
						<h1>Create business account</h1>
						<input
							type="text"
							placeholder="business Name"
							name="businessName"
							onChange={handleChange}
							value={data.businessName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Business Address"
							name="businessAddress"
							onChange={handleChange}
							value={data.businessAddress}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
							<input
							type="password"
							placeholder="ConfirmPassword"
							name="repassword"
							onChange={(e)=>setRepassword(e.target.value)}
							value={repassword}
							required
							className={styles.input}
							style={{"autoComplete":"off"}}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signupb;
