import React from "react";
import StarRatings from 'react-star-ratings';


export default function Rating({ rating, changeRating }) {

    return (
        <div className="d-flex list-group-content mb-4">
            <StarRatings starDimension="20px" starSpacing="3px" rating={rating? rating : 0} isAggregateRating={true} starRatedColor="blue" changeRating={changeRating} numberOfStars={5} name='rating' />
        </div>
    );
}