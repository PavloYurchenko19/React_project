import React, {useEffect} from 'react';
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getMovieById, getMovieCreditsById, getMovieTrailer} from "../../store";
import styles from './MoviesDetails.module.css'
import {MovieGenres} from "../MovieGenres/MovieGenres";
import {Cast} from "../Cast/Cast";
import ProductionCompanies from "../ProductionCompanies/ProductionCompanies";
import {ProductionCountries} from "../ProductionCountries/ProductionCountries";
import {MovieTrailer} from "../MovieTrailer/MovieTrailer";


const MovieDetails = () => {
    const {idMovie} = useParams();
    const dispatch = useDispatch();
    const {movie, cast,trailers} = useSelector(state => state['moviesReducer'])
    console.log(movie);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getMovieCreditsById({idMovie}))
        dispatch(getMovieTrailer({idMovie}))
        dispatch(getMovieById({idMovie}))
    }, [idMovie])
    const {
         budget, genres, original_language, overview, popularity, poster_path, production_companies,
        production_countries, release_date, revenue, runtime, status, title, vote_average, vote_count
    } = movie
    console.log(trailers);


    return (
        <div    className={styles.whole__page}>
            <div className={styles.movie__wrap}>

                <h1>{title}</h1>
                <div className={styles.movie__detail_box}>
                    <div>
                        <img src={poster_path !== null ?`https://image.tmdb.org/t/p/w200${poster_path}` :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuRY1nW5huRgiG_VTYN_lYgRcmZDOfr71C7s1PtxFh9-UACJmeeO33Ax_-yamRfPknal0&usqp=CAU'}  alt={title}/>
                    </div>
                    <div className={styles.movie__description}>
                        <h4><span>Рейтинг:</span> {vote_average} Проголосувало :{vote_count}</h4>
                        <div className={styles.df__box}>
                            <h4>Жанри: </h4>
                            <p> {genres && genres.map(genre => <MovieGenres key={genre.id} genre={genre}/>)}</p>
                        </div>
                        <h4><span>Дата релізу:</span> {release_date}</h4>
                        <h4><span>Тривалість:</span> {runtime}хв</h4>
                        <h4><span>Зроблено У:</span> {production_countries && production_countries.map((country,index)=><ProductionCountries key={index} country={country}/>)}</h4>
                        <h4><span>Мова:</span> {original_language}</h4>
                        <h4><span>Бюджет:</span> {budget === 0 ? 'Невідомо' : `${budget} у.о`} </h4>
                        <h4><span>Збір:</span> {revenue === 0 ? 'Невідомо' : `${revenue} у.о`}</h4>
                        <h4><span>Популярність:</span> {popularity}</h4>
                    </div>

                </div>
                <h3>Про фільм:</h3>
                <p>{overview}</p>

                <h2>Актори</h2>

                <div className={styles.cast__box}>
                    {cast && cast.map(actor => <Cast key={actor.id} actor={actor}/>)}
                </div>


            </div>
            {production_companies && (<div className={styles.companies}><h2>Зроблено такими компаніями як :</h2>
                <div
                    className={styles.movies__companies}>{production_companies.map(product => <ProductionCompanies
                    key={product.id} product={product}/>)}

                </div>
            </div>)
            }
            { trailers.map(trailer => <MovieTrailer key={trailer.id} trailer={trailer}/>)}
            <Outlet/>
        </div>
    );
};

export {MovieDetails};