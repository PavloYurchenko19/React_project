import React, {useEffect, useState} from 'react';
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


import {getMovieById, getMovieCreditsById, getMovieTrailer} from "../../store";
import styles from './MoviesDetails.module.css'
import {MovieGenres} from "../MovieGenres/MovieGenres";
import {Cast} from "../Cast/Cast";
import ProductionCompanies from "../ProductionCompanies/ProductionCompanies";
import {ProductionCountries} from "../ProductionCountries/ProductionCountries";
import {MovieTrailer} from "../MovieTrailer/MovieTrailer";
import {RatingMovie} from "../RatingMovie/RatingMovie";

const MovieDetails = () => {

    const {idMovie} = useParams();
    const dispatch = useDispatch();

    const [openTrailer, setOpenTrailer] = useState(false)
    const {movie, cast, trailers} = useSelector(state => state['moviesReducer'])

    useEffect(() => {
        dispatch(getMovieCreditsById({idMovie}))
        dispatch(getMovieTrailer({idMovie}))
        dispatch(getMovieById({idMovie}))
    }, [idMovie])

    const {
        budget, genres, original_language, overview, popularity, poster_path, production_companies,
        production_countries, release_date, revenue, runtime, title, vote_average, vote_count
    } = movie

    return (
        <div className={styles.whole__page}>
            <div className={styles.movie__wrap}>
                <h1>{title}</h1>
                <div className={styles.movie__detail_box}>

                    <div>
                        <img
                            src={poster_path !== null ? `https://image.tmdb.org/t/p/w200${poster_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuRY1nW5huRgiG_VTYN_lYgRcmZDOfr71C7s1PtxFh9-UACJmeeO33Ax_-yamRfPknal0&usqp=CAU'}
                            alt={title}/>
                    </div>

                    <div className={styles.right__side_description}>
                        <h4><span>Average:</span> {vote_average} voted :{vote_count}</h4>
                        <h4>Genres: </h4>
                        <p> {genres && genres.map(genre => <MovieGenres key={genre.id} genre={genre}/>)}</p>
                        <h4><span>Release data:</span> {release_date}</h4>
                        <h4><span>Runtime:</span> {runtime}хв</h4>
                        <h4>
                            <span>Made in:</span> {production_countries && production_countries.map((country, index) =>
                            <ProductionCountries key={index} country={country}/>)}</h4>
                        <h4><span>Language:</span> {original_language}</h4>
                        <h4><span>Budget:</span> {budget === 0 ? 'unknown' : `${budget} у.о`} </h4>
                        <h4><span>Revenue:</span> {revenue === 0 ? 'unknown' : `${revenue} у.о`}</h4>
                        <h4><span>Popularity:</span> {popularity}</h4>
                    </div>

                </div>
                <RatingMovie/>
                <h3>About movie:</h3>
                <p>{overview}</p>

                <h2>Cast</h2>
                <div className={styles.cast__box}>
                    {cast && cast.map(actor => <Cast key={actor.id} actor={actor}/>)}
                </div>

            </div>
            {production_companies && (<div className={styles.companies}>
                <h2>{production_companies ? `This companies made the ${title}` : `This company made the ${title}`}</h2>
                {<h2>{production_companies.length === 0 ? 'Sorry but info is absent(((' : ''} </h2>}
                <div
                    className={styles.movies__companies}>{production_companies.map(product => <ProductionCompanies
                    key={product.id} product={product}/>)}
                </div>
            </div>)}

            <div className={styles.trailer}>
                <button onClick={() => setOpenTrailer(!openTrailer)}>Show trailers</button>
                {trailers.length === 0 && (<h2>Sorry but trailer is absent(((</h2>)}
                {openTrailer && trailers.map(trailer => <MovieTrailer key={trailer.id} trailer={trailer}/>)}
            </div>

            <Outlet/>
        </div>
    );
};

export {MovieDetails};