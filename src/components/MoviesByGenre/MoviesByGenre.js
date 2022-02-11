import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MovieByGenre} from "../MovieByGenre/MovieByGenre";
import styles from "./MoviesByGenre.module.css";
import ReactPaginate from "react-paginate";
import {Outlet, useParams} from "react-router-dom";
import {getMovieByGenrePage, getNowPlaying, setPageNumber} from "../../store";
import {Carousel} from "@trendyol-js/react-carousel";
import {NowPlayingMovie} from "../NowPlayingMovie/NowPlayingMovie";
import moviesStyle from "../Movies/Movies.module.css";

const MoviesByGenre = () => {
    const [pageQuantity, setPageQuantity] = useState(500)
    const {moviesSortedByGenrePage, totalPages, popularity,nowPlayingMovies} = useSelector(state => state['moviesReducer'])
    const {results, total_pages,page} = moviesSortedByGenrePage
    console.log(results);
    const [pageNum, setPage] = useState(page)
    const {genreMovie} = useParams();


    const dispatch = useDispatch();

    // Я так зробив бо після 500 ст не виводились дані
    const pageQuantityMax = (total_pages) => {
        console.log(total_pages);
        if (total_pages  > 500) {
            setPageQuantity(500)
        } else {
            setPageQuantity(total_pages ? total_pages : 500)
        }
    }
    console.log(popularity);


    useEffect(() => {
        dispatch(getMovieByGenrePage({genreMovie, pageNum}))
        dispatch(getNowPlaying())
        pageQuantityMax(total_pages)

    }, [pageNum])


    const choosePage = (data) => {
        setPage(data.selected + 1)

    }

    return (<div>
            <div className={moviesStyle.nowPlaying__box}>
                <h2>People now watching</h2>
                <Carousel show={4} slide={1} swiping={true}>

                    {nowPlayingMovies.map(nowPlayingMovie => <NowPlayingMovie key={nowPlayingMovie.id}
                                                                              nowPlayingMovie={nowPlayingMovie}/>)}
                </Carousel>
            </div>
            <div>

                <Outlet/>
            </div>


            <div className={styles.container__for_moviesBox}>
                {results && results.map(movie => <MovieByGenre key={movie.id} movie={movie}/>)}
                <div>
                    <ReactPaginate
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
                    />
                </div>
            </div>
        </div>

    );
};

export {MoviesByGenre};