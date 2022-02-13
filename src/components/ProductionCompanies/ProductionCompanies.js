import React from 'react';

import styles from "./ProductionCompanies.module.css"

const ProductionCompanies = ({product: {name, logo_path}}) => {
    return (

        <div className={styles.box__for_companies}>
            {logo_path === null && (<h3>{name}</h3>)}
            <img
                src={logo_path !== null ? `https://image.tmdb.org/t/p/w200${logo_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbrxDT2Y6DnQz_d6FFh1rvqDT-wFUmK2QBUFnGPd44SaYWQet9jQ0VvZnpo6gZKC-opE&usqp=CAU'}
                alt={name}/>
        </div>
    );
};

export default ProductionCompanies;