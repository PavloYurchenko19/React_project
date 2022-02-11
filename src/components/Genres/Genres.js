import React from 'react';

const Genres = ({genre:{name,id}}) => {
    return (
        <>
            <option value={`${name},${id}`}>{name}</option>
        </>
    );
};

export {Genres};