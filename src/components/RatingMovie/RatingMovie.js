import React from 'react';
import ReactStars from 'react-rating-stars-component'

const RatingMovie = () => {

    return (
        <div>
            <h2>Rate</h2>
            <ReactStars size={30} isHalf={true}/>
        </div>
    );
};

export {RatingMovie};