import React from 'react';
import styles from "../MovieByGenre/MovieByGenre.module.css";
import {Link} from "react-router-dom";

const NowPlayingMovie = ({nowPlayingMovie}) => {
    const {id, poster_path, original_title, vote_average} = nowPlayingMovie
    return (
        <div className={styles.movie__box_slider}>
            <div className={styles.movie__box_hover}>
                <Link to={`${id.toString()}/movie`}><img className={styles.increase}
                                                         src={poster_path !== null ? `https://image.tmdb.org/t/p/w200${poster_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuRY1nW5huRgiG_VTYN_lYgRcmZDOfr71C7s1PtxFh9-UACJmeeO33Ax_-yamRfPknal0&usqp=CAU'}
                                                         alt={original_title}/></Link>
                <h4>{original_title} </h4>
                <h4>Рейтинг: {vote_average} </h4>


            </div>

        </div>
    );
};

export {NowPlayingMovie};