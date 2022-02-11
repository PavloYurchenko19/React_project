import React from 'react';
import {useSelector} from "react-redux";

const Trailer = () => {
    const {trailers} = useSelector(state => state['moviesReducer']);
    const {name,key}=trailers
    console.log(key);
    console.log(trailers);

    return (
        <div>

            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${key}`}
                    title={name} frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
        </div>
    );
};

export {Trailer};