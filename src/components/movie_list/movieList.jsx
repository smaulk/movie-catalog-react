import React, {useState} from 'react';
import classes from "./movieList.module.css";
import MovieListElement from "../movie_list_element/movieListElement";

const MovieList = (props) => {


    const [activeItemId, setActiveItemId] = useState(null);
    const onClick = (id) => {
        props.onClickItem(id);
        setActiveItemId(id);
    }


    const [searchValue, setSearchValue] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('------');


    const onSearch = () => {

        if(selectedGenre === '------') props.onSearch(searchValue, null);
        else  props.onSearch(searchValue, selectedGenre);
    };

    const onClickCreate = () => {
        setActiveItemId(null);
        props.onClickCreate();
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter')
            onSearch();
    };



    return (
        <div className={classes.block}>

            <div className={classes.searchBlock}>
                <div className={classes.searchInfo}>
                    <input placeholder={"Введите название фильма"} value={searchValue}
                           onChange={event => setSearchValue(event.target.value)}
                           onKeyDown={handleEnterPress}
                    />

                    <div className={classes.filterInfo}>
                        <label>Фильтр по жанру:</label>
                        <select value={selectedGenre} onChange={event => setSelectedGenre(event.target.value)}>
                            <option>------</option>
                            {props.genres.map(genre => <option>{genre}</option>)}
                        </select>
                    </div>
                </div>
                <button onClick={onSearch}>Искать</button>
            </div>


            <div className={classes.list}>
                {props.movies.map(movie =>
                    <MovieListElement
                        key={movie.id}
                        movie={movie}
                        activeItemId={activeItemId}
                        onClick={onClick}>
                    </MovieListElement>)}
            </div>

            <div className={classes.footer}>
                <p>Найдено {props.movies.length} элементов</p>
                <button onClick={onClickCreate}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1C7 0.447715 6.55228 0 6 0Z" fill="#333333"/>
                    </svg>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default MovieList;