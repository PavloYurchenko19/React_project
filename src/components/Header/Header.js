import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import styles from './Header.module.css'
import {getAllGenres, getMovieByGenrePage, setTheme} from "../../store";
import {Genres} from "../Genres/Genres";

const Header = () => {

    const [selected, setSelected] = useState("genre")
    const dispatch = useDispatch();

    const {genres, theme, pageNum} = useSelector(state => state["moviesReducer"]);
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllGenres())
        dispatch(getMovieByGenrePage({genreMovie: selected, pageNum: pageNum}))
    }, [selected])

    const changTheme = () => {
        dispatch(setTheme({
            theme: theme === 'dark' ? 'light' : 'dark'
        }))
    }

    const {handleSubmit, register, reset} = useForm();

    const searchMovie = (e) => {
        if (e['searchByName'] !== '') {
            navigate(`${e['searchByName']}/search`)
            reset()
            return
        }
    }

    return (
        <header>

            <div className={styles.btn__box}>
                <input type={'checkbox'} onClick={changTheme}
                       className={styles.switchButton}/> <h2>{theme === 'dark' ? 'light' : 'dark'}</h2>
            </div>

            <div className={styles.header__link}>
                <form>
                    <select value={selected} onChange={event => {
                        navigate(`${event.target.value}`)
                        setSelected(event.target.value)
                    }}>
                        <option value={'All genres,'}>Genres All</option>
                        {genres && genres.map(genre => <Genres key={genre.id} genre={genre}/>)}
                    </select>

                </form>
                <div className={styles.header__left}>
                    <nav>
                        <NavLink to={'/'}>Movies</NavLink>
                    </nav>

                    <form onSubmit={handleSubmit(searchMovie)}>
                        <input type="text" placeholder={'Search movie'}
                               name={'All movies'} {...register('searchByName')}/>
                        <button> Send</button>
                    </form>
                </div>
            </div>
        </header>
    );
};

export {Header};