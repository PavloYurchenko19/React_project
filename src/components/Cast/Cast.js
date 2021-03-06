import React from 'react';
import {Link} from "react-router-dom";

import styles from './Cast.module.css'

const Cast = ({actor: {name, profile_path, id}}) => {

    return (
        <div className={styles.cast__main_box}>
            <h3>{name}</h3>
            <Link to={`/person/cast/${id.toString()}`}><img
                src={profile_path === null ? 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png' : `https://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}/></Link>
        </div>
    );
};

export {Cast};