import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";

import styles from "../MoviesByGenre/MoviesByGenre.module.css";
import {getPageFromPagination} from "../../store";

const Pagination = () => {

    const {totalPage} = useSelector(state => state['moviesReducer'])
    const [pageQuantity, setPageQuantity] = useState(500)

    const [pageNum, setPage] = useState(1)
    const dispatch = useDispatch();

    useEffect(() => {
        pageQuantityMax(totalPage)
        dispatch(getPageFromPagination({page: pageNum}))
    }, [pageNum])

    // Я так зробив бо після 500 ст не виводились дані
    const pageQuantityMax = (total_pages) => {
        if (total_pages > 500) {
            setPageQuantity(500)
        } else {
            setPageQuantity(total_pages ? total_pages : 500)
        }
    }

    const choosePage = (data) => {
        setPage(data.selected + 1)
    }

    return (

        <div>
            <ReactPaginate
                pageCount={pageQuantity}
                previousLabel={'Previous'}
                nextLabel={"Next"}
                breakLabel={'...'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={6}
                onPageChange={choosePage}
                containerClassName={styles.pagination}
                pageClassName={styles.pagination__item}
                pageLinkClassName={styles.pagination__link}
                previousClassName={styles.pagination__link}
                nextClassName={styles.pagination__link}
                breakClassName={styles.pagination__link}
                activeLinkClassName={styles.pagination__active}
                initialPage={0}
            />
        </div>
    );
};

export {Pagination};