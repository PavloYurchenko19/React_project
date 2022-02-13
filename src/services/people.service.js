import {axiosService} from "./axios.service";
import {myKey} from "../configs/urls";

export const personService = {
    getById: (personId) => axiosService.get(`/person/${personId}${myKey}`).then(value => value.data),
    getMoviePerson: (personId) => axiosService.get(`/person/${personId}/movie_credits${myKey}`).then(value => value.data.cast),
}