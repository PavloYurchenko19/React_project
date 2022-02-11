import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "./movies.slice";
import personReducer from "./person.slice";

const store = configureStore({
    reducer:{
        moviesReducer,
        personReducer
    }

});
export default store