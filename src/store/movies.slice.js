import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../services/movies.service";

export const getAllMovies = createAsyncThunk(
    'moviesSlice/getAllMovies',
    async ({pageNum}, {dispatch}) => {
        try{
            const data = await moviesService.getAll(pageNum);
            dispatch(getCurrentPage({data}))
            dispatch(setMovies({movies: data.results}))
        }catch (e) {
            console.log('error');
        }

    }
)
export const getAllGenres = createAsyncThunk(
    'moviesSlice/getAllGenres',
    async (_, {dispatch}) => {
        try {
            const genres = await moviesService.getGenres();
            dispatch(getGenres({genres:genres.genres}))
        }catch (e) {
            console.log('error');
        }

    }
)
export const getMovieById = createAsyncThunk(
    'movieSlice/getMovieById',
    async ({idMovie}, {dispatch}) => {
        try {
            const movie = await moviesService.getById(idMovie);
            dispatch(getMovie({movie}))

        }catch (e) {
            console.log('error');
        }


    }
)
export const getMovieCreditsById = createAsyncThunk(
    'movieSlice/getCreditsById',
    async ({idMovie}, {dispatch}) => {
        try {
            const {cast} = await moviesService.getByIdCredits(idMovie);
            dispatch(getCast({cast}))
        }catch (e){

        }


    }
)
export const getMovieByGenre= createAsyncThunk(
    'movieSlice/getMovieByGenre',
    async ({genre}, {dispatch}) => {
        try {
            const movies = await moviesService.getByGenre(genre);
            dispatch(setMoviesByGenrePage({movies}))

        }catch (e) {

        }

    }
)
export const getMovieByGenrePage= createAsyncThunk(
    'movieSlice/getMovieByGenrePage',
    async ({genreMovie,pageNum}, {dispatch}) => {
        try{
            const movies = await moviesService.getByGenrePage(genreMovie,pageNum);
            dispatch(setMoviesByGenrePage({movies:movies.data}))
        }catch(e){
            console.log('error');

        }

    }
)
export const getMovieTrailer= createAsyncThunk(
    'movieSlice/getMovieTrailer',
    async ({idMovie}, {dispatch}) => {
        try {
            const trailer = await moviesService.getTrailer(idMovie);
            dispatch(setTrailer({trailer}))
        }catch (e) {
            console.log('error');
        }


    }
)

export const getNowPlaying= createAsyncThunk(
    'movieSlice/getNowPlaying',
    async (_, {dispatch}) => {

        try{
            const nowPlaying = await moviesService.getNowPlaying();
            dispatch(setNowPlayingMovies({nowPlaying}))

        }catch (e) {

    }

    }
)

const moviesSlice = createSlice({
    name: "moviesSlice",
    initialState: {
        movies: [],
        movie:[],
        cast:[],
        genres:[],
        trailers:[],
        nowPlayingMovies:[],
        pageNumber:1,
        moviesSortedByGenrePage:[],
        currentPage: undefined,
        totalPages: 500,
    },
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload.movies
        },
        getCurrentPage: (state, action) => {
            state.currentPage = action.payload.data.page
            state.totalPages = action.payload.data.total_pages
        },
        getMovie:(state,action)=>{
            state.movie  =action.payload.movie
        },
        getCast:(state,action)=>{
            state.cast  =action.payload.cast
        },
        getGenres:(state,action)=>{
            state.genres = action.payload.genres
        },

        setMoviesByGenrePage:(state,action)=>{
            state.moviesSortedByGenrePage = action.payload.movies
        },
        setPageNumber:(state,action)=>{
            state.pageNumber = action.payload.pageNum
        },
        setTrailer:(state,action)=>{
            state.trailers = action.payload.trailer

        },setNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload.nowPlaying
        }


    }
})
const moviesReducer = moviesSlice.reducer
export const {setMovies, getCurrentPage,getMovie,getCast,getGenres,setMoviesByGenrePage,setPageNumber,setTrailer, setNowPlayingMovies} = moviesSlice.actions
export default moviesReducer