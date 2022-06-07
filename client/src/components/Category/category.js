
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";
const Category = () => {

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					
				</div>
				<div className={styles.right}>
					<h1>Select category</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Influencer
						</button>
					</Link>
                    <Link to="/signupb">
						<button type="button" className={styles.white_btn}>
							Business
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Category;
