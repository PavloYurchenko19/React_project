import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Header} from "../../components";
import {getAllGenres} from "../../store";

const MoviesPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres())
    }, [])

    const {theme} = useSelector(state => state['moviesReducer'])

    return (
        <div className={theme === 'light' ? 'light' : 'dark'}>
            <Header/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export {MoviesPage};