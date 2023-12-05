import axios from "axios";

export default class MovieService{

    static url = 'http://localhost:3000';
    static async getAllGenres(){
        const response = await axios.get(`${(MovieService.url)}/genres`);
        return response.data;
    }

    static async getAllMovies() {
        const response = await axios.get(`${(MovieService.url)}/movies`);
        return response.data;
    }

    static async getMovieById(id) {
        const response = await axios.get(`${(MovieService.url)}/movies/${id}`);
        return response.data;
    }

    static async createMovie(newId, newMovie){
        newMovie.id = newId;
        const response = await axios.post(
            `${(MovieService.url)}/movies`,
            newMovie
        )
        return response;
    }

    static async editMovie(id, movie){
        const response = await axios.put(
            `${(MovieService.url)}/movies/${id}`,
            movie
        )
        return response;
    }


}