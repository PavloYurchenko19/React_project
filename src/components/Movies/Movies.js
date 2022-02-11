import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllMovies, getNowPlaying} from "../../store";
import {Movie} from "../Movie/Movie";
import ReactPaginate from "react-paginate";
import styles from "../MoviesByGenre/MoviesByGenre.module.css";
import {NowPlayingMovie} from "../NowPlayingMovie/NowPlayingMovie";
import moviesStyle from './Movies.module.css'
import { Carousel } from '@trendyol-js/react-carousel';

const Movies = () => {
    const dispatch = useDispatch();
    const [pageNum, setPage] = useState(1)
    const [pageQuantity, setPageQuantity] = useState(500)
    const {movies, totalPages, nowPlayingMovies} = useSelector(state => state['moviesReducer'])

    const pageQuantityMax = (totalPages) => {
        console.log(totalPages);
        if (totalPages > 500) {
            setPageQuantity(500)
        } else {
            setPageQuantity(totalPages)
        }
    }
    useEffect(()=>{
        dispatch(getNowPlaying())

    },[])
    useEffect(() => {
        dispatch(getAllMovies({pageNum}))
        pageQuantityMax(totalPages)

        console.log(totalPages);
    }, [pageNum, totalPages])
    console.log(movies);
    const choosePage = (data) => {
        setPage(data.selected + 1)
        console.log(data.selected);

    }

    console.log({nowPlayingMovies: nowPlayingMovies});
    return (
        <div className={moviesStyle.movies__main_box}>

            <div className={moviesStyle.center__movie}>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
                <div><ReactPaginate
                    pageCount={pageQuantity}
                    previousLabel={'Previous'}
                    nextLabel={"Next"}
                    breakLabel={'...'}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={6}
                    onPageChange={choosePage}
                    containerClassName={styles.pagination}
                    pageClassName={styles.pagination__item}
                    pageLinkClassName={styles.pagination__link}
                    previousClassName={styles.pagination__link}
                    nextClassName={styles.pagination__link}
                    breakClassName={styles.pagination__link}
                    activeLinkClassName={styles.pagination__active}
                /></div>
            </div>
        </div>
    );
};

export {Movies};