import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getPersonById, getPersonMovie} from "../../store";
import styles from './Person.module.css'
import PersonMoive from "../PersonMovies/PersonMoives";

const Person = () => {
    const dispatch = useDispatch();
    const {idPerson} = useParams();
    const {person,movies} = useSelector(state => state['personReducer']);
    const {also_known_as, biography, birthday, name, place_of_birth, popularity, profile_path,deathday} = person;
    console.log(idPerson);
    console.log(person);
    useEffect(() => {
        dispatch(getPersonMovie({id:idPerson}))
        dispatch(getPersonById({id: idPerson}))
    }, [idPerson])
    console.log(profile_path);
    console.log(birthday);
    console.log(movies);


    return (
        <div className={styles.person__main}>
            <div className={styles.main__person_div}>

                <div>
                    <h1>{name}</h1>
                    <img
                        src={profile_path === null ? 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png' : `https://image.tmdb.org/t/p/w300${profile_path}`}
                        alt=""/>

                </div>
                <div>



                        <h2>Also Known As</h2>
                        <p>{also_known_as  ? `${also_known_as}` : 'noname'}</p>

                    {biography && (<>
                        <h2>Biography</h2>
                        <p>{biography}</p>
                    </>)}


                    {birthday !== null && (<h3>Birthday: {birthday}{deathday !== null ? `- ${deathday}` : ''}</h3>)}
                    <h3>Popularity: {popularity}</h3>
                <h3>Place of birth: {place_of_birth}</h3>
                </div>
            </div>
            <h2>All movies where {name} was.</h2>
            <div className={styles.person__movies}>
                { movies && movies.map(movie=> <PersonMoive key={movie.id} movie={movie} />)}
            </div>

        </div>
    );
};

export {Person};