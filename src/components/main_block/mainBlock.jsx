import React, {useEffect, useState} from 'react';
import classes from "./mainBlock.module.css";
import MovieList from "../movie_list/movieList";
import MovieBlock from "../movie_block/movieBlock";
import MovieService from "../../API/MovieService";
import CreateOrEditMovieBlock from "../create_movie_block/createOrEditMovieBlock";
import movieList from "../movie_list/movieList";

const MainBlock = (props) => {

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);



    const [originalMovies, setOriginalMovies] = useState([]); // Оригинальный список фильмов

    const [movies, setMovies] = useState([]);

    const [movie, setMovie] = useState({id : -1, title: '', year: '', runtime: '',
        genres: [], director: '', actors: '', plot: '', posterUrl: ''});

    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [genresList, setGenresList] = useState([])


    function getNextId(obj) {
        return (Math.max.apply(Math, obj.map(o => o.id)) + 1);
    }

    async function fetchMovies() {
        const movies = await MovieService.getAllMovies();
        setMovies(movies);
        setOriginalMovies(movies);
    }

    async function fetchGenres(){
        const genres = await MovieService.getAllGenres();
        setGenresList(genres);
    }

    async function createMovie(newMovie){
        const response = await MovieService.createMovie(getNextId(originalMovies), newMovie);
        if(response.status === 201) {
            setMovie(response.data);
            fetchMovies();
        }
    }

    async function updateMovie(newMovie){
        await MovieService.editMovie(newMovie.id, newMovie);
        setMovie(newMovie);
        fetchMovies();
    }


    async function onClickMovie(id){
        const movie = await MovieService.getMovieById(id);
        setMovie(movie);
        setIsCreate(false);
        setIsEdit(false);
    }

    function onClickEdit(){
        setIsEdit(true);
    }

    function onClickCreate(){
        setIsCreate(true);
        setMovie({id : -1, title: '', year: '', runtime: '',
            genres: [], director: '', actors: '', plot: '', posterUrl: ''});
    }

    function onSearch(value, selectedGenre){
        if (value === '' && !selectedGenre) {
            setMovies(originalMovies);
        }
        else {
            // Фильтрация по названию и выбранному жанру одновременно
            const filteredMovies = originalMovies.filter(movie => {
                const matchesSearch = movie.title.toLowerCase().startsWith(value.trim().toLowerCase());
                const matchesGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true;
                return matchesSearch && matchesGenre;
            });
            setMovies(filteredMovies);
        }
    }


    function onSave(movie){
        if(isCreate) {
            createMovie(movie)
            setIsCreate(false);
        }
        else if(isEdit){
            updateMovie(movie);
            setIsEdit(false);
        }
    }

    function onCancel(){
        setIsCreate(false);
        setIsEdit(false);
    }

    function InfoBlock(){
        if(isCreate || isEdit) return <CreateOrEditMovieBlock
            genresList={genresList}
            movie={movie}
            onSave={onSave}
            onCancel={onCancel}
        />
        else return <MovieBlock
            movie={movie}
            onClickEdit={onClickEdit}
        />;
    }


    return (
        <div className={classes.mainBlock}>
            <MovieList
                movies={movies}
                genres={genresList}
                onClickItem={onClickMovie}
                onSearch={onSearch}
                onClickCreate={onClickCreate}
            />
            <InfoBlock/>
        </div>
    );
};

export default MainBlock;