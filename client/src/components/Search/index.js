import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../../images/user.jpg";
import { Table,Row} from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';

function Search() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadAllUsers();
    loadUsersData();
  }, []);

  const loadAllUsers = async () =>{
    axios.get('http://localhost:5000/api/useraccounts').then(res=>{
            setData(res.data);
    })
  }
  const loadUsersData = async () => {
       let newval= value.toLowerCase();
        return await axios
          .get(
            `http://localhost:5000/api/users/search/${newval}`
           
          )
          .then((response) =>  setData(response.data))
          .catch((err) => console.log(err));
  };

  const handleReset = () => {
    loadAllUsers();
    setValue("");
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    let newval= value.toLowerCase();
    return await axios
    .get(`http://localhost:5000/api/users/search/${newval}`)
    .then((response)=>{
      setData(response.data)
      setValue("");
    })
    .catch((err)=>console.log(err));
  };


 
  return (
    <div class ="container">
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name ... "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
<button type="submit" class="btn btn-success">Search</button>
        
        <button type="submit" class="btn btn-primary" onClick={() => handleReset()}>
          Reset
        </button>
      </form>
      <div style={{ marginTop: "100px" }}>
     
 
              {data.length === 0 ? (
                <Table className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No Data Found
                    </td>
                  </tr>
                </Table>
              ) : (
                data.map((item, index) => (
                  (item.category!=='admin'&&item.adminVerified) ?(
                    <div class="card-deck">
                      <div class="card">

                        <div class="card-body">

                          <img src={image} className={styles.image_img} alt="..." />
                          <h3 class="card-title">{item.firstName + " " + item.lastName}</h3>
                          <Row> <h5>{item.category}</h5></Row>
                          <Row> <h10>{item.email}</h10></Row>
                          <button className={styles.button}
                            onClick={() => { navigate(`/view/${item._id}`) }}
                          >View

                          </button>

                        </div>
                      </div>
                  </div>
                  ):(
                    <div></div>
                  )
                ))
              )}
          
 

        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "250px",
            alignContent: "center",
          }}
        >
       
        </div>
      </div>
     
    </div>
  );
  

  
}

export default Search;


