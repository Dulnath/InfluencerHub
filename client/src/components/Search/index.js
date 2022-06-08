

import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
 
} from "mdb-react-ui-kit";
//import "./App.css";

function Search() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  

  useEffect(() => {
    loadUsersData();
  }, []);

  const loadUsersData = async () => {
       let newval= value.toLowerCase();
        return await axios
          .get(
            `http://localhost:8080/api/users/search/${newval}`
           
          )
          .then((response) =>  setData(response.data))
          .catch((err) => console.log(err));
  };
      

  console.log("data", data);

  const handleReset = () => {
    setValue("");
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    let newval= value.toLowerCase();
    return await axios
    .get(`http://localhost:8080/api/users/search/${newval}`)
    .then((response)=>{
      setData(response.data)
      //setValue("");
    })
    .catch((err)=>console.log(err));
  };


 
  return (
    <MDBContainer>
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

        <MDBBtn type="submit" color="dark">
          Search
        </MDBBtn>
        <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
          Reset
        </MDBBtn>
      </form>
      <div style={{ marginTop: "100px" }}>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Category</th>
               
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No Data Found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.category}</td>
                      
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
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
     
    </MDBContainer>
  );
  

  
}

export default Search;


