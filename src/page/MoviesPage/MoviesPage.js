import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

import {Header} from "../../components";
import styles from './MoviesPage.module.css'
import {useDispatch} from "react-redux";
import {getAllGenres} from "../../store";

const MoviesPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres())
    }, [])

    return (
        <div>
            <Header/>
            <div >

                <Outlet/>
            </div>
        </div>
    );
};

export {MoviesPage};