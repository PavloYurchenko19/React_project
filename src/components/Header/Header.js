import React, {useEffect, useState} from 'react';
import {NavLink, useHistory, useNavigate} from "react-router-dom";

import styles from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllGenres, getMovieByGenre} from "../../store";
import {Genres} from "../Genres/Genres";

const Header = () => {

    const [selected, setSelected] = useState("genre")
    const dispatch = useDispatch();
    const {genres, pageNumber} = useSelector(state => state["moviesReducer"]);
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllGenres())
        dispatch(getMovieByGenre({genre: selected}))
    }, [selected])


    return (
        <header>
            <div className={styles.header__link}>
                <form>
                    <select value={selected}  onChange={event => {
                        navigate(`${event.target.value}`)
                        setSelected(event.target.value)

                    }}>
                        <option >Genres All</option>

                        {genres && genres.map(genre => <Genres key={genre.id} genre={genre}/>)}
                    </select>
                </form>
                <nav>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/'}>Movies</NavLink>

                </nav>
                <div className={styles.search}>
                    <label> <input type="text"/></label>
                </div>
            </div>

        </header>
    );
};

export {Header};