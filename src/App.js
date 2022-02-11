import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {AboutPersonPage, MoviesPage} from "./page";
import {
    MoviesByGenre,
    MovieDetails,
    Movies,
    MovieSortedByAverage,
    MoviesSortedByAverage,
    Person,
    MovieTrailer, Trailer
} from "./components";
import './App.css'
import axios from "axios";
import {axiosService} from "./services/axios.service";
import {moviesService} from "./services/movies.service";

const App = () => {
    useEffect(()=>{

        // axios.get(`https://api.themoviedb.org/3/movie/634649/videos?api_key=18cb8333cef14fc90d0fc68b3d1b7437&language=en-US`).then(value => value.data).then(value => console.log(value))

    },[])


    return (
        <div>
            <Routes>
                <Route index element={<Navigate to={'movie'}/>}/>
                <Route path={'/'} element={<MoviesPage/>}>
                    <Route path={'/movie'} element={<Movies/>}/>
                    <Route path={':genreMovie'} element={<MoviesByGenre/>}>
                    </Route>
                    <Route path={':genreMovie/:idMovie/movie'} element={<MovieDetails/>}>
                    </Route>
                    <Route path={'/person'} element={<AboutPersonPage/>}>
                        <Route path={'cast/:idPerson'} element={<Person/>}/>
                    </Route>

                </Route>

            </Routes>

        </div>
    );
};

export default App;