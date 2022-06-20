import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import { Button } from 'react-bootstrap';

const colors = {
    gold: '#FFD700',
    gray: '#A9A9A9'
}

function Ratings(props) {
    const [currentValue, setCurrentValue] = useState();
    const [hoverValue, setHoverValue] = useState();
    const [influencerID, setInfluencerID] = useState();
    const [businessID, setBusinessID] = useState();

    const stars = Array(5).fill(0);
    let category = props.category;

    const handleClick = (value) => {
        setCurrentValue(value);
    }

    const handleMouseOver = (currentHoverValue) => {
        setHoverValue(currentHoverValue);
    }

    const handleMouseLeave = () => {
        setHoverValue();
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/getProject/${props.projectID}`).then((res) => {
            setInfluencerID(res.data.project.influencerID);
            setBusinessID(res.data.project.businessID);
        })
    }, []);

    function addRating(event) {
        event.preventDefault();
        if(props.category === 'business'){
            axios.post("http://localhost:5000/addRatingBusiness", {
            businessID,
            influencerID,
            category,
            currentValue
        }).then((res) => {
            console.log("Sent succcessfully");
        });
        }else if (props.category === 'influencer'){
            axios.post("http://localhost:5000/addRatingInfluencer", {
            businessID,
            influencerID,
            category,
            currentValue
        }).then((res) => {
            console.log("Sent succcessfully");
        });
        }

        axios.put(`http://localhost:5000/ratingAdded/${props.projectID}`,{
        }).then(() => {
            console.log("Rating has been added");
        })

        console.log("rating = " + currentValue);
    }
    console.log("currentValue = " + currentValue);

    return (
        <div className="page">
            <p>Please rate your experience with this user</p>
            <div>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={28}
                            onClick={() => { handleClick(index + 1) }}
                            onMouseOver={() => { handleMouseOver(index + 1) }}
                            onMouseLeave={() => { handleMouseLeave() }}
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            color={(hoverValue || currentValue) > index ? colors.gold : colors.gray}
                        />
                    )
                })}
            </div><br />
            <Button variant="success" onClick={addRating}>Add rating</Button>
        </div>
    );
}

export default Ratings;