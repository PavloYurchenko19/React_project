import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesService} from "../services/movies.service";

export const getAllMovies = createAsyncThunk(
    'moviesSlice/getAllMovies',
    async ({pageNum}, {dispatch}) => {
        try {
            const data = await moviesService.getAll(pageNum);
            dispatch(getCurrentPage({data}))
            dispatch(setMovies({movies: data.results}))
        } catch (e) {
            console.log('error');
        }
    }
)

export const getAllGenres = createAsyncThunk(
    'moviesSlice/getAllGenres',
    async (_, {dispatch}) => {
        try {
            const genres = await moviesService.getGenres();
            dispatch(getGenres({genres: genres.genres}))
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
        }
    }
)

export const getMovieByGenre = createAsyncThunk(
    'movieSlice/getMovieByGenre',
    async ({genre}, {dispatch}) => {
        try {
            const movies = await moviesService.getByGenre(genre);
            dispatch(setMoviesByGenrePage({movies}))
        } catch (e) {
        }
    }
)

export const getMovieByGenrePage = createAsyncThunk(
    'movieSlice/getMovieByGenrePage',
    async ({genreMovie, pageNum}, {dispatch}) => {
        try {
            const movies = await moviesService.getByGenrePage(genreMovie, pageNum);
            dispatch(setMoviesByGenrePage({movies: movies.data}))
        } catch (e) {
            console.log('error');
        }
    }
)

export const getMovieTrailer = createAsyncThunk(
    'movieSlice/getMovieTrailer',
    async ({idMovie}, {dispatch}) => {
        try {
            const trailer = await moviesService.getTrailer(idMovie);
            dispatch(setTrailer({trailer}))
        } catch (e) {
            console.log('error');
        }
    }
)

export const getMovieByName = createAsyncThunk(
    'movieSlice/getMovieByName',
    async ({movieByName, pageNum}, {dispatch}) => {
        try {
            const movieName = await moviesService.getByNameAndPage(movieByName, pageNum);
            console.log(movieName);
            dispatch(setTotalPageByName({totalPageByName: movieName.total_pages}))
            dispatch(getByName({movieName}))
        } catch (e) {
            console.log('error');
        }
    }
)

const moviesSlice = createSlice({
    name: "moviesSlice",
    initialState: {
        movies: [],
        movie: [],
        cast: [],
        genres: [],
        trailers: [],
        theme: 'dark',
        pageNum: 1,
        moviesSortedByGenrePage: [],
        totalPage: 500,
        moviesByName: [],
        totalPageByName: null,
        status: null,
        error: null
    },

    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload.movies
        },
        getCurrentPage: (state, action) => {
            state.totalPages = action.payload.data.total_pages
        },
        getMovie: (state, action) => {
            state.movie = action.payload.movie
        },
        getCast: (state, action) => {
            state.cast = action.payload.cast
        },
        getGenres: (state, action) => {
            state.genres = action.payload.genres
        },
        setMoviesByGenrePage: (state, action) => {
            state.moviesSortedByGenrePage = action.payload.movies
        },
        setPageNumber: (state, action) => {
            state.currentPage = action.payload.pageNum
        },
        setTrailer: (state, action) => {
            state.trailers = action.payload.trailer
        },
        setTheme: (state, action) => {
            state.theme = action.payload.theme
        },
        getTotalPage: (state, action) => {
            state.totalPage = action.payload.totalPage
        },
        getPageFromPagination: (state, action) => {
            state.pageNum = action.payload.page
        },
        getByName: (state, action) => {
            state.moviesByName = action.payload.movieName
        },
        setTotalPageByName: (state, action) => {
            state.totalPageByName = action.payload.totalPageByName
        }
    },

    extraReducers: {
        [getAllMovies.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getAllMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
        },
        [getAllMovies.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        [getMovieByGenre.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getMovieByGenre.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
        },
    }
})

const moviesReducer = moviesSlice.reducer
export const {
    setMovies, getCurrentPage, getMovie, getCast, getGenres, setMoviesByGenrePage, setPageNumber, setTrailer,
    setTheme, getTotalPage, getPageFromPagination, getByName, setTotalPageByName
} = moviesSlice.actions
export default moviesReducer