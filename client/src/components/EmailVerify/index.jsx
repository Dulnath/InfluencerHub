import { Fragment,useState,useEffect } from 'react';
import styles from './styles.module.css';
//import pic from '../images/pic.jpeg';
import { Link ,useParams} from 'react-router-dom';
import axios from 'axios';

const EmailVerify = () =>{
    const [validUrl,setValidUrl] = useState(false);
    const param = useParams( );
     useEffect(() =>{
         const verifyEmailUrl = async()=>{
             try {
                 const url =`http://localhost:8080/api/users/${param.id }/verify/${param.token} `;
                 const {data} = await axios.get(url)
                 console.log(data );
                 setValidUrl(true); 
             } catch (error) {
                 console.log(error);
                 setValidUrl(false);
                  
             }
         };
         verifyEmailUrl() 
     },[param])
    return(
        <Fragment>
            {
                validUrl?(
                    <div className={styles.container}>
                        {/* <img src={pic.jpeg} alt =""/>  */}
                        <h1>Email verified successfully </h1> 
                        <Link to = "/login">
                            <button className={styles.green_btn}>Login </button>
                        </Link>

                    </div>

                ):(
                    <h1> 404 Not found </h1>
                )
            }
        </Fragment>
    )

};
export default EmailVerify;
