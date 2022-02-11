import React from 'react';
import styles from "./ProductionCompanies.module.css"
const ProductionCompanies = ({product:{name,logo_path}}) => {
    console.log(logo_path);
    return (
        <div className={styles.box__for_companies}>
            <img src={`https://image.tmdb.org/t/p/w200${logo_path}`} alt=""/>

        </div>
    );
};

export default ProductionCompanies;