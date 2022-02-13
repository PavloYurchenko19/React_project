import React, {useState} from 'react';

import styles from './MovieTrailer.module.css'

const MovieTrailer = ({trailer: {key, name}}) => {

    const [show, setShow] = useState(false)

    return (
        <>
            {name.toLowerCase().includes('trailer') ? (<div className={styles.trailer__box}>
                <h2 onClick={() => setShow(!show)}>{name}</h2>

                <div className={show ? styles.show__box : styles.hidden__box}>
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${key}`}
                            title={name} frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                </div>
            </div>) : ''}
        </>
    );
};

export {MovieTrailer};