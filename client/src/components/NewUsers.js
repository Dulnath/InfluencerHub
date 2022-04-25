import React from 'react'
import axios from "axios"
import Menu from './Menu';
import {Container,Card,Button,Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';

function RenderType(props){
    let type = props.userType
    if (type === 'influencer') {
        return(
            <Row>
                <Card.Title as={Col}><b>Type</b> : <span className='text-success'>{type}</span></Card.Title>
            </Row>
        );
    } else {
        return(
            <Row>
                <Card.Title as={Col}><b>Type</b> : <span className='text-primary'>{type}</span></Card.Title>
            </Row>
        );
    }
 }

 

class NewUsers extends React.Component{

    constructor(props){
        super(props);
        //this.approveUser = new approveUser.bind(this);
        this.state = {
            data:[],
            isLogged:false
        };
    }

    approveUser(data){
        axios.put('http://localhost:5000/api/useraccounts/approveuser',{
            firstName:data.firstName,
            lastName:data.lastName,
            isActive: 'true',
            adminVerified:'true',
            type: data.type,
            password: data.password,
            phoneNo:data.phoneNo,
            email:data.email,
            description:data.description
        }).then((response) => {
            console.log('request Sent');
            console.log(response);
            this.deleteNewUsers(data)
        }).then(
            this.loadNewUsers()
        ).catch(function (error){
            console.log(error);
        })
    }

    deleteNewUsers(data){
        axios.delete('http://localhost:5000/api/useaccounts/'+data._id)
            .then((res)=>{
                console.log('new user removed')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    loadNewUsers(){
        axios.get('http://localhost:5000/api/useraccounts').then(res => {
            this.setState({
                data: res.data
            });
        });
    }
    
    componentDidMount(){
        const loggedInUser = localStorage.getItem("token");
        if(loggedInUser){
            this.setState({isLogged:true});
            this.loadNewUsers();
        }   
    }

    render(){
        if(this.state.isLogged){
            return(
                <div>
                    <Menu/>
                    <div className="container" style={{marginTop:"30px"}}>
                    <div
                  className="container"
                  style={{
                    position: "absolute",
                    marginTop: "10px",
                    paddingTop:"5px"
                  }}
                >
                <h3>New Users</h3>
                <hr />
                <Container className="p-10 mb-2" fluid="md">
                   {this.state.data.map((data) => {
                        if(!data.adminVerified){
                            return(
                                <React.Fragment key={data._id}>
                                    <Card className='p-3 mb-2 border border-secondary' >
                                        <Card.Header> <b>{data.firstName + " " + data.lastName}</b> </Card.Header>
                                        <Card.Body>
                                               <RenderType userType={data.type}/>
                                                <Row>
                                                    <Card.Text as={Col}><b>Email </b> : {data.email}</Card.Text>
                                                </Row>
                                                <Row>
                                                    <Card.Text as={Col}><b>Contact Number </b> : {data.phoneNo}</Card.Text>
                                                </Row>
                                                <Row>
                                                <Card.Text as={Col}><b>Description </b> : {data.description}</Card.Text>
                                                </Row>
                                                <Row>
                                                    <Col sm={9}></Col>
                                                    <Col>
                                                        <Button variant="danger" as={Col} className="mx-2" onClick={()=>this.deleteNewUsers(data)}>Reject</Button>
                                                        <Button variant="primary" as={Col} className="mx-2" onClick={()=>this.approveUser(data)}>Approve</Button>
                                                    </Col>
                                                </Row>
                                        </Card.Body>
                                    </Card>
                                </React.Fragment>
                            );
                        }
                    })}
                </Container>
                </div>
                </div>
                </div>       
            )
        }else{
            return(
                <div>
                    <AdminLogin></AdminLogin>
                </div>  
            )
        }
        
    }
}

export default NewUsers;