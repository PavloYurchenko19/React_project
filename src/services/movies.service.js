import {axiosService} from "./axios.service";
import {myKey, urls} from "../configs/urls";

export const moviesService = {
    getNowPlaying: () => axiosService.get(`${urls.movie}/now_playing${myKey}`).then(value => value.data.results),
    getAll: (pageNumber) => axiosService.get(`${urls.movies}${myKey}&page=${pageNumber}`).then(value => value.data),
    getByNameAndPage: (movieName, pageNum) => axiosService.get(`/search/movie${myKey}&query=${movieName}&page=${pageNum}`).then(value => value.data),
    getGenres: () => axiosService.get(`${urls.genres}${myKey}`).then(value => value.data),
    getById: (id) => axiosService.get(`${urls.movie}/${id}${myKey}`).then(value => value.data),
    getByIdCredits: (id) => axiosService.get(`${urls.movie}/${id}/credits${myKey}`).then(value => value.data),
    getByGenre: (genre) => axiosService.get(`${urls.movies}${myKey}&with_genres=${genre}`).then(value => value.data),
    getByGenrePage: (genre, pageNum) => axiosService.get(`${urls.movies}${myKey}&page=${pageNum}&with_genres=${genre}`),
    getTrailer: (id) => axiosService.get(`${urls.movie}/${id}/videos${myKey}`).then(value => value.data.results),
}