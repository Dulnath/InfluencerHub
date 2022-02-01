import React from 'react'
import axios from "axios"
import {Container,Card,Button,Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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

    constructor(){
        super();
        this.state = {
            data:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/newuser').then(res => {
            this.setState({
                data: res.data
            });
        });
    }

    render(){
        return(
            <div className="container" style={{marginTop:"30px"}}>
                <div
              className="container"
              style={{
                position: "absolute",
                marginTop: "10px",
                paddingTop:"5px"
              }}
            >
            <Container className="p-10 mb-2" fluid="md">
               {this.state.data.map(data => {
                    return(
                        <React.Fragment style={{padding:"10px"}}>
                            <Card className='pb-1'>
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
                                        <Card.Text as={Col}><b>Description </b> : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae aut alias odio aliquam provident beatae magni eum accusamus, eos molestiae numquam accusantium recusandae dolores maxime velit ipsum ad vitae tempore.</Card.Text>
                                        </Row>
                                        <Row>
                                            <Col sm={9}></Col>
                                            <Col>
                                                <Button variant="danger" as={Col} className="mx-2">Reject</Button>
                                                <Button variant="primary" as={Col} className="mx-2">Approve</Button>
                                            </Col>
                                        </Row>
                                </Card.Body>
                            </Card>
                        </React.Fragment>
                    );
                })}
            </Container>
            </div>
            </div>       
        )
    }
}

export default NewUsers;