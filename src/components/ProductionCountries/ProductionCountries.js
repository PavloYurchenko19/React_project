import React from 'react';

const ProductionCountries = ({country:{iso_3166_1,name}}) => {

    return (
        <>
            <abbr title={name}>{iso_3166_1}, </abbr>
        </>
    );
};

export {ProductionCountries};