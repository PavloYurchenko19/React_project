import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";

import {getMovieByName} from "../../store";
import moviesStyle from "../Movies/Movies.module.css";
import {Movie} from "../Movie/Movie";
import styles from "../MoviesByGenre/MoviesByGenre.module.css";

const SearchMovie = () => {

    const {moviesByName} = useSelector(state => state['moviesReducer'])

    const {nameMovie} = useParams();
    const {total_pages, page, results} = moviesByName

    const [pageNum, setPageNum] = useState(page)
    const [pageQuantity, setPageQuantity] = useState(total_pages)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieByName({movieByName: nameMovie, pageNum}))
        pageQuantityMax(total_pages)
    }, [pageNum, nameMovie, total_pages])

    const pageQuantityMax = (total_pages) => {
        if (total_pages > 500) {
            setPageQuantity(500)
        } else {
            setPageQuantity(total_pages ? total_pages : 500)
        }
    }
    const choosePage = (data) => {
        setPageNum(data.selected + 1)
    }

    return (
        <div className={moviesStyle.movies__main_box}>

            <div className={moviesStyle.center__movie}>
                {results && results.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>

            <div className={styles.pagination}><ReactPaginate
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
                initialPage={0}
            /></div>
        </div>
    );
};

export {SearchMovie};