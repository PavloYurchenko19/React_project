import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getAllMovies, getTotalPage, setPageNumber} from "../../store";
import moviesStyle from './Movies.module.css'
import {Movie} from "../Movie/Movie";
import {Pagination} from "../Pagination/Pagination";

const Movies = () => {

    const dispatch = useDispatch();

    const {movies, totalPages, pageNum, status} = useSelector(state => state['moviesReducer'])
    const {total_pages, page} = movies

    useEffect(() => {
        dispatch(setPageNumber({pageNum: page}))
    }, [page])

    useEffect(() => {
        dispatch(getAllMovies({pageNum}))
        dispatch(getTotalPage({totalPage: total_pages}))
    }, [pageNum, totalPages])

    return (
        <div className={moviesStyle.movies__main_box}>
            {status === 'pending' && (<h1 className={moviesStyle.loading}>Loading...</h1>)}
            {status === 'fulfilled' && (<div>
                <h1>All movies</h1>
                <div className={moviesStyle.center__movie}>
                    {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
                </div>
            </div>)}
            <Pagination/>
        </div>
    );
};

export {Movies};