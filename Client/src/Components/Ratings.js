import { React, useState } from "react";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import { Button } from 'react-bootstrap';

const colors = {
    gold: '#FFD700',
    gray: '#A9A9A9'
}

function Ratings() {
    const [currentValue, setCurrentValue] = useState();
    const [hoverValue, setHoverValue] = useState();

    const stars = Array(5).fill(0);

    const handleClick = (value) => {
        setCurrentValue(value);
    }

    const handleMouseOver = (currentHoverValue) => {
        setHoverValue(currentHoverValue);
    }

    const handleMouseLeave = () => {
        setHoverValue();
    }

    function addRating(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/addRating", {
            currentValue
        }).then((res) => {
            console.log("Sent succcessfully");
        });
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
            </div>
            <Button onClick={addRating}>Add rating</Button>
        </div>
    );
}

export default Ratings;