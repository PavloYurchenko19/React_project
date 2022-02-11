import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {personService} from "../services/people.service";


export const getPersonById = createAsyncThunk(
    'personSlice/getPersonById',
    async ({id},{dispatch})=>{
        try{
            const person = await personService.getById(id);
            console.log(person);
            dispatch(setPerson({person}))


        }catch (e) {
            console.log('error');
        }
        }
)

export const getPersonMovie = createAsyncThunk(
    'personSlice/getPersonMovie',
    async ({id},{dispatch})=>{
        try {
            const movies = await personService.getMoviePerson(id);
            dispatch(setPersonMovie({movies}))
        }catch (e) {
            console.log('error');
        }

    }
)

const personSlice =createSlice({
    name:'personSlice',
    initialState:{
        person:[],
        movies:[],

    },
    reducers:{
        setPerson:(state,action)=>{
            state.person = action.payload.person
        },
        setPersonMovie:(state,action)=>{
            state.movies = action.payload.movies
        }
    }
})

const personReducer = personSlice.reducer
const {setPerson,setPersonMovie} = personSlice.actions;
export default personReducer