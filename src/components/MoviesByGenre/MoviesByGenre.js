import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useParams} from "react-router-dom";

import {MovieByGenre} from "../MovieByGenre/MovieByGenre";
import styles from "./MoviesByGenre.module.css";
import {getMovieByGenrePage, getTotalPage, setPageNumber} from "../../store";
import {Pagination} from "../Pagination/Pagination";

const MoviesByGenre = () => {

    const {
        moviesSortedByGenrePage,
        pageNum,
    } = useSelector(state => state['moviesReducer'])

    const {results, total_pages, page} = moviesSortedByGenrePage

    const {genreMovie} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageNumber({pageNum: page}))
    }, [page])

    useEffect(() => {
        dispatch(getMovieByGenrePage({genreMovie, pageNum}))
        dispatch(getTotalPage({totalPage: total_pages}))
    }, [pageNum])

    const indexComa = genreMovie.indexOf(',');
    const genreWithOutId = genreMovie.slice(0, indexComa);

    return (<div>
            <div>
                <h1>{genreWithOutId === 'All genres' ? 'All movies' : `Movies with genre ${genreWithOutId}`} </h1>
                <Outlet/>
            </div>

            <div className={styles.container__for_moviesBox}>
                {results && results.map(movie => <MovieByGenre key={movie.id} movie={movie}/>)}
            </div>
            <Pagination/>
        </div>
    );
};

export {MoviesByGenre};