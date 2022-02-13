import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import axios from "axios";

import {AboutPersonPage, MoviesPage} from "./page";
import {MovieDetails, Movies, MoviesByGenre, Person, SearchMovie} from "./components";
import './App.css'

const App = () => {
    return (
        <div>
            <Routes>
                <Route index element={<Navigate to={'movie'}/>}/>
                <Route path={'/'} element={<MoviesPage/>}>
                    <Route path={'/movie'} element={<Movies/>}/>
                    <Route path={':genreMovie'} element={<MoviesByGenre/>}/>
                    <Route path={':genreMovie/:idMovie/movie'} element={<MovieDetails/>}/>
                    <Route path={'/person'} element={<AboutPersonPage/>}>
                        <Route path={'cast/:idPerson'} element={<Person/>}/>
                    </Route>
                    <Route path={':nameMovie/search'} element={<SearchMovie/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;