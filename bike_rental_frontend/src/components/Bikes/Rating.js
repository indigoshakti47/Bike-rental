import React, { useEffect } from "react";

import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {
    getRating
} from '../../actions/rating';

export default function Rating({ bike, changeRating }) {
    const {rating} = useSelector((state) => state.rating);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRating(bike));
    }, [bike]);
    return (
        <div className="d-flex list-group-content mb-4">
            <StarRatings starDimension="20px" starSpacing="3px" rating={rating?.rating} isAggregateRating={true} starRatedColor="blue" changeRating={changeRating} numberOfStars={5} name='rating' />
        </div>
    );
}