import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import styles from "./MovieByGenre.module.css";
import moviesStyle from "../Movies/Movies.module.css";

const MovieByGenre = ({movie}) => {

    const {status} = useSelector(state => state['moviesReducer'])
    const {id, original_title, vote_average, poster_path} = movie
    return (

        <div className={styles.movie__box}>
            {status === 'pending' && (<h1 className={moviesStyle.loading}>Loading...</h1>)}

            <div className={styles.movie__box_hover}>
                <Link to={`${id.toString()}/movie`}><img className={styles.increase}
                                                         src={poster_path !== null ? `https://image.tmdb.org/t/p/w200${poster_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuRY1nW5huRgiG_VTYN_lYgRcmZDOfr71C7s1PtxFh9-UACJmeeO33Ax_-yamRfPknal0&usqp=CAU'}
                                                         alt={original_title}/></Link>
                <h4>{original_title} </h4>
                <h4>Рейтинг: <span className={vote_average > 7 ? styles.green : (vote_average < 5 ? styles.red : styles.yellow)}>{vote_average} </span></h4>
            </div>
        </div>
    );
};

export {MovieByGenre};